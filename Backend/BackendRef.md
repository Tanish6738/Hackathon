import os
import cv2
import base64
import uuid
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
import numpy as np
from fastapi import FastAPI, HTTPException, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
from ultralytics import YOLO

os.environ['DEEPFACE_HOME'] = "/tmp/deepface"

# Now import DeepFace
from deepface import DeepFace
# Load environment variables
load_dotenv()

EMAIL_SENDER = os.getenv("EMAIL_SENDER", "your_email@gmail.com")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your_password")

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "lost_and_found")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
lost_collection = db['lost_people']
found_collection = db['found_people']
live_feed_collection = db['live_feed']
match_collection = db['match_collection']

# FastAPI setup
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize YOLO face detection model
face_model = YOLO("yolov11s-face.pt")


def crop_face(image: np.ndarray) -> np.ndarray:
    results = face_model.predict(image, verbose=False)
    if results and results[0].boxes and results[0].boxes.xyxy.shape[0] > 0:
        x1, y1, x2, y2 = results[0].boxes.xyxy[0].cpu().numpy().astype(int)
        return image[y1:y2, x1:x2]
    raise HTTPException(status_code=400, detail="No face detected in the image")


def save_metadata(collection, metadata: dict):
    return collection.insert_one(metadata).inserted_id


def convert_objectid_to_str(data):
    if isinstance(data, list):
        return [convert_objectid_to_str(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert_objectid_to_str(value) for key, value in data.items()}
    elif isinstance(data, ObjectId):
        return str(data)
    else:
        return data


def match_face_with_db(known_image: np.ndarray, collection) -> [dict]:
    matches = []
    for doc in collection.find():
        try:
            face_blob = doc.get("face_blob")
            if not face_blob:
                continue

            img_bytes = base64.b64decode(face_blob)
            np_arr = np.frombuffer(img_bytes, np.uint8)
            compare_image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

            result = DeepFace.verify(known_image, compare_image, model_name="ArcFace", enforce_detection=False)
            if result["verified"]:
                matches.append(convert_objectid_to_str(doc))
        except Exception as e:
            print(f"Error matching face: {str(e)}")
    return matches


def send_email_alert(subject: str, body: str, to: str, image_blob: str = None):
    if not to:
        print("[EMAIL ERROR] Recipient email not provided.")
        return

    message = MIMEMultipart()
    message["From"] = EMAIL_SENDER
    message["To"] = to
    message["Subject"] = subject
    message.attach(MIMEText(body, "html"))

    if image_blob:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(base64.b64decode(image_blob))
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition", f"attachment; filename=attachment.jpg"
        )
        message.attach(part)

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=ssl.create_default_context()) as server:
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, to, message.as_string())
    except Exception as e:
        print(f"[EMAIL ERROR] {e}")


def send_match_emails(lost: dict, found: dict):
    time_found = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    lost_email = lost.get("contact_details", {}).get("email_id")
    if not lost_email:
        raise HTTPException(status_code=400, detail="Lost person's email ID is missing.")

    found_email = found.get("contact_details", {}).get("email_id")
    if not found_email:
        raise HTTPException(status_code=400, detail="Found person's email ID is missing.")

    lost_body = f"""
    <h3>Match Found!</h3>
    <p>Details about the match:</p>
    <ul>
        <li><strong>Found Location:</strong> {found.get('location_found', 'N/A')}</li>
        <li><strong>Found By:</strong> {found.get('reported_by', {}).get('name', 'N/A')} ({found.get('reported_by', {}).get('organization', 'N/A')})</li>
        <li><strong>Contact:</strong> {found.get('contact_details', {}).get('mobile_no', 'N/A')} | {found_email}</li>
        <li><strong>Time:</strong> {time_found}</li>
    </ul>
    """
    send_email_alert("Lost Person Identified", lost_body, lost_email)

    found_body = f"""
    <h3>Lost Person Identified!</h3>
    <p>Details about the match:</p>
    <ul>
        <li><strong>Name:</strong> {lost.get('name', 'N/A')}</li>
        <li><strong>Where Lost:</strong> {lost.get('where_lost', 'N/A')}</li>
        <li><strong>Reported By:</strong> {lost.get('reporter_name', 'N/A')}</li>
        <li><strong>Contact:</strong> {lost.get('contact_details', {}).get('mobile_no', 'N/A')} | {lost_email}</li>
    </ul>
    """
    send_email_alert("Lost Person Identified", found_body, found_email)


@app.post("/upload_lost")
async def upload_lost_person(
        name: str = Form(...),
        gender: str = Form(...),
        age: int = Form(...),
        where_lost: str = Form(...),
        your_name: str = Form(...),
        relation_with_lost: str = Form(...),
        user_id: str = Form(...),
        mobile_no: str = Form(...),
        email_id: str = Form(...),
        file: UploadFile = File(...)
):
    contents = await file.read()
    image = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_COLOR)

    face_id = str(uuid.uuid4())
    cropped_face = crop_face(image)

    _, buffer = cv2.imencode('.jpg', cropped_face)
    image_blob = base64.b64encode(buffer).decode('utf-8')

    metadata = {
        "face_id": face_id,
        "name": name,
        "gender": gender,
        "age": age,
        "where_lost": where_lost,
        "reporter_name": your_name,
        "relation_with_lost": relation_with_lost,
        "user_id": user_id,
        "contact_details": {
            "mobile_no": mobile_no,
            "email_id": email_id
        },
        "face_blob": image_blob,
        "upload_time": datetime.now().isoformat(),
        "status": "pending"
    }

    save_metadata(lost_collection, metadata)

    # Match against found people
    matched_found = match_face_with_db(cropped_face, found_collection)
    for match in matched_found:
        send_match_emails(metadata, match)

        match_data = {
            **metadata,
            "matched_with": match,
            "match_time": datetime.now().isoformat(),
            "match_status": "success"
        }
        save_metadata(match_collection, match_data)

        # Delete matched record from all relevant collections
        found_collection.delete_one({"face_id": match["face_id"]})
        lost_collection.delete_one({"face_id": metadata["face_id"]})
        live_feed_collection.delete_one({"face_id": match["face_id"]})

    return {"message": "Lost person uploaded successfully.", "matched_found": matched_found}


@app.post("/upload_found")
async def upload_found_person(
        name: str = Form(...),
        gender: str = Form(...),
        age: int = Form(...),
        where_found: str = Form(...),
        your_name: str = Form(...),
        organization: str = Form(...),
        designation: str = Form(...),
        user_id: str = Form(...),
        mobile_no: str = Form(...),
        email_id: str = Form(...),
        file: UploadFile = File(...)
):
    contents = await file.read()
    image = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_COLOR)

    face_id = str(uuid.uuid4())
    cropped_face = crop_face(image)

    _, buffer = cv2.imencode('.jpg', cropped_face)
    image_blob = base64.b64encode(buffer).decode('utf-8')

    metadata = {
        "face_id": face_id,
        "name": name,
        "gender": gender,
        "age": age,
        "location_found": where_found,
        "reported_by": {
            "name": your_name,
            "organization": organization,
            "designation": designation
        },
        "user_id": user_id,
        "contact_details": {
            "mobile_no": mobile_no,
            "email_id": email_id
        },
        "face_blob": image_blob,
        "upload_time": datetime.now().isoformat(),
        "status": "pending"
    }

    save_metadata(found_collection, metadata)

    # Match against lost people
    matched_lost = match_face_with_db(cropped_face, lost_collection)
    for match in matched_lost:
        send_match_emails(match, metadata)

        match_data = {
            **metadata,
            "matched_with": match,
            "match_time": datetime.now().isoformat(),
            "match_status": "success"
        }
        save_metadata(match_collection, match_data)

        # Delete matched record from all relevant collections
        lost_collection.delete_one({"face_id": match["face_id"]})
        found_collection.delete_one({"face_id": metadata["face_id"]})
        live_feed_collection.delete_one({"face_id": match["face_id"]})

    return {"message": "Found person uploaded successfully.", "matched_lost": matched_lost}


@app.post("/upload_live_feed")
async def upload_live_feed(
        camera_id: str = Form(...),
        where_found: str = Form(...),
        location: str = Form(...),
        your_name: str = Form(...),
        organization: str = Form(...),
        designation: str = Form(...),
        user_id: str = Form(...),
        mobile_no: str = Form(...),
        email_id: str = Form(...),
        file: UploadFile = File(...)
):
    contents = await file.read()
    image = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_COLOR)

    face_id = str(uuid.uuid4())
    cropped_face = crop_face(image)

    _, buffer = cv2.imencode('.jpg', cropped_face)
    image_blob = base64.b64encode(buffer).decode('utf-8')

    metadata = {
        "face_id": face_id,
        "camera_id": camera_id,
        "location": location,
        "location_details": where_found,
        "reported_by": {
            "name": your_name,
            "organization": organization,
            "designation": designation
        },
        "user_id": user_id,
        "contact_details": {
            "mobile_no": mobile_no,
            "email_id": email_id
        },
        "face_blob": image_blob,
        "upload_time": datetime.now().isoformat(),
        "status": "active"
    }

    save_metadata(live_feed_collection, metadata)

    # Limit live feed records to 500 entries
    if live_feed_collection.count_documents({}) > 500:
        oldest_records = live_feed_collection.find().sort("upload_time", 1).limit(200)
        for record in oldest_records:
            live_feed_collection.delete_one({"_id": record["_id"]})

    return {"message": "Face added to the live feed successfully.", "metadata": metadata}


@app.get("/get_records_by_user/{user_id}")
async def get_records_by_user(user_id: str):
    collections = [("lost_people", lost_collection),
                   ("found_people", found_collection),
                   ("live_feed", live_feed_collection),
                   ("match_records", match_collection)]
    records = []

    for collection_name, collection in collections:
        docs = collection.find({"user_id": user_id})
        for doc in docs:
            doc = convert_objectid_to_str(doc)
            records.append({"source": collection_name, "data": doc})

    if records:
        return {"message": "Records found.", "records": records}
    return {"message": "No records found.", "records": []}


@app.get("/search_face/{face_id}")
async def search_face(face_id: str):
    collections = [("lost_people", lost_collection),
                   ("found_people", found_collection),
                   ("live_feed", live_feed_collection),
                   ("match_records", match_collection)]

    for collection_name, collection in collections:
        record = collection.find_one({"face_id": face_id})
        if record:
            record = convert_objectid_to_str(record)
            return {"message": f"Face found in {collection_name}.", "record": record}

    raise HTTPException(status_code=404, detail="Face ID not found.")