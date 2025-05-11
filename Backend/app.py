from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from ultralytics import YOLO
from deepface import DeepFace
from typing import Optional, List, Dict, Any
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
from pydantic import BaseModel
import os
import json
import uuid
import base64
import cv2
import numpy as np
import smtplib
import ssl
import uvicorn

# New Pydantic models for admin functionality
class AdminCreate(BaseModel):
    user_id: str
    full_name: str
    email: str
    role: str = "admin"  # Default is regular admin, HeadAdmin is special

# Admin response model
class AdminResponse(BaseModel):
    user_id: str
    full_name: str
    email: str
    role: str
    created_by: str
    created_at: str

# New Pydantic model for Clerk integration
class ClerkUserInfo(BaseModel):
    id: str
    firstName: str
    lastName: str
    fullName: str
    imageUrl: Optional[str] = None
    primaryEmailAddress: str
    primaryPhoneNumber: Optional[str] = None
    username: Optional[str] = None

# Pydantic model for bulk admin creation
class BulkAdminCreate(BaseModel):
    admins: List[AdminCreate]

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load face detection model
face_model = YOLO("YOLOv11s-face.pt")

# Create required folders
for folder in ["db/lost", "db/found", "db/live_feed", "db/matched","db/admins"]:
    os.makedirs(folder, exist_ok=True)

# --------------- Email Sender ---------------- #
EMAIL_SENDER = "krish70bhagat@gmail.com"
EMAIL_PASSWORD = "spfk lgoq cwdo rsfg"  # use app password if 2FA is on


def send_email_alert(subject: str, body: str, to: str, image_blob: Optional[str] = None):
    message = MIMEMultipart()
    message["From"] = EMAIL_SENDER
    message["To"] = to
    message["Subject"] = subject
    message.attach(MIMEText(body, "html"))

    # Attach image if provided
    if image_blob:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(base64.b64decode(image_blob))
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition", f"attachment; filename=image.jpg"
        )
        message.attach(part)

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, to, message.as_string())
    except Exception as e:
        print(f"[EMAIL ERROR] {e}")


# --------------- Helper Functions ---------------- #

def crop_and_save_face(image: np.ndarray, face_id: str, folder: str) -> Optional[np.ndarray]:
    results = face_model.predict(image, verbose=False)
    if results and results[0].boxes and results[0].boxes.xyxy.shape[0] > 0:
        x1, y1, x2, y2 = results[0].boxes.xyxy[0].cpu().numpy().astype(int)
        cropped_face = image[y1:y2, x1:x2]

        # Save the cropped face image in the given folder with face_id.jpg
        cropped_face_path = os.path.join(folder, f"{face_id}.jpg")
        cv2.imwrite(cropped_face_path, cropped_face)

        return cropped_face
    return None


def save_metadata(face_id: str, data: dict, folder: str):
    # Include the path to the cropped image in the metadata
    data["face_path"] = os.path.join(folder, f"{face_id}.jpg")

    with open(os.path.join(folder, f"{face_id}.json"), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def match_face_with_db(known_image: np.ndarray, db_folder: str, source_info: dict) -> List[dict]:
    model_name = "ArcFace"
    matched = []
    for file in os.listdir(db_folder):
        if not file.endswith(".jpg"):
            continue
        compare_image_path = os.path.join(db_folder, file)
        try:
            result = DeepFace.verify(
                img1_path=known_image,
                img2_path=compare_image_path,
                model_name=model_name,
                enforce_detection=False
            )
            if result["verified"]:
                metadata_path = os.path.join(db_folder, file.replace(".jpg", ".json"))
                if os.path.exists(metadata_path):
                    with open(metadata_path, 'r', encoding='utf-8') as f:
                        metadata = json.load(f)
                    # Ensure face_blob is present for frontend display
                    if "face_blob" not in metadata and "face_path" in metadata and os.path.exists(metadata["face_path"]):
                        with open(metadata["face_path"], "rb") as img_file:
                            metadata["face_blob"] = base64.b64encode(img_file.read()).decode()
                    metadata["match_confidence"] = result["distance"]
                    metadata["match_threshold"] = result["threshold"]
                    metadata["match_verified"] = result["verified"]
                    match_id = str(uuid.uuid4())
                    match_path = os.path.join("db/matched", f"{match_id}.jpg")
                    cv2.imwrite(match_path, known_image)
                    match_metadata = {
                        "match_id": match_id,
                        "source": source_info,
                        "matched_with": metadata,
                        "face_path": match_path,
                        "match_time": datetime.now().isoformat()
                    }
                    save_metadata(match_id, match_metadata, "db/matched")
                    if db_folder == "db/lost":
                        send_match_emails(metadata, source_info, "found", match_path)
                    elif db_folder == "db/found":
                        send_match_emails(source_info, metadata, "lost", match_path)
                    matched.append(match_metadata)
        except Exception as e:
            print(f"Error comparing faces: {e}")
    return matched


def send_match_emails(lost: dict, found: dict, context: str, image_path: str):
    time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Read image as base64
    with open(image_path, "rb") as img_file:
        image_blob = base64.b64encode(img_file.read()).decode()

    lost_body = f"""
    <h3>Good News!</h3>
    <p>We found a potential match for your lost person.</p>
    <ul>
        <li><strong>Where Found:</strong> {found.get('where_found')}</li>
        <li><strong>Who Found:</strong> {found.get('your_name')} ({found.get('designation')}, {found.get('organization')})</li>
        <li><strong>Time:</strong> {time_str}</li>
        <li><strong>Contact:</strong> {found.get('mobile_no')}, {found.get('email_id')}</li>
    </ul>
    """
    send_email_alert("Match Found - Lost Person Identified", lost_body, lost["email_id"], image_blob)

    found_body = f"""
    <h3>Lost Person Identified</h3>
    <p>You have potentially found a missing person.</p>
    <ul>
        <li><strong>Name:</strong> {lost.get('name')}</li>
        <li><strong>Where Lost:</strong> {lost.get('where_lost')}</li>
        <li><strong>Reported By:</strong> {lost.get('your_name')} ({lost.get('relation_with_lost')})</li>
        <li><strong>Contact:</strong> {lost.get('mobile_no')}, {lost.get('email_id')}</li>
    </ul>
    """
    send_email_alert("Match Found - Lost Person Identified", found_body, found["email_id"], image_blob)


def send_live_alert(lost: dict, feed: dict, image_path: str):
    time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(image_path, "rb") as img_file:
        image_blob = base64.b64encode(img_file.read()).decode()

    body = f"""
    <h3>Live Feed Alert</h3>
    <p>A person matching the lost individual was spotted in a live camera feed.</p>
    <ul>
        <li><strong>Camera ID:</strong> {feed.get('camera_id')}</li>
        <li><strong>Location:</strong> {feed.get('location')}</li>
        <li><strong>Time:</strong> {time_str}</li>
    </ul>
    """
    send_email_alert("Live Feed Match Alert", body, lost["email_id"], image_blob)


# --------------- Admin Helper Functions (Single File) ---------------- #
ADMIN_JSON_PATH = os.path.join("db/admins", "Admin.json")

def load_admins() -> list:
    if not os.path.exists(ADMIN_JSON_PATH):
        return []
    with open(ADMIN_JSON_PATH, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except Exception:
            return []

def save_admins(admins: list):
    with open(ADMIN_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(admins, f, ensure_ascii=False, indent=4)

def get_admin_status(user_id: str) -> Dict[str, Any]:
    admins = load_admins()
    for admin_data in admins:
        if admin_data.get("user_id") == user_id:
            return {
                "is_admin": True,
                "role": admin_data.get("role", "admin"),
                "full_name": admin_data.get("full_name", ""),
                "email": admin_data.get("email", "")
            }
    return {"is_admin": False}

def validate_head_admin(user_id: str) -> bool:
    admin_status = get_admin_status(user_id)
    return admin_status.get("is_admin", False) and admin_status.get("role") == "HeadAdmin"

def save_admin_data(admin_data: Dict[str, Any]) -> str:
    admins = load_admins()
    # Update if exists, else append
    for i, adm in enumerate(admins):
        if adm.get("user_id") == admin_data.get("user_id"):
            admins[i] = admin_data
            break
    else:
        admins.append(admin_data)
    save_admins(admins)
    return admin_data.get("user_id")

def delete_admin_data(user_id: str) -> bool:
    admins = load_admins()
    new_admins = [adm for adm in admins if adm.get("user_id") != user_id]
    if len(new_admins) == len(admins):
        return False
    save_admins(new_admins)
    return True


# --------------- Endpoints ---------------- #

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
    cropped = crop_and_save_face(image, face_id, "db/lost")

    if cropped is None:
        raise HTTPException(status_code=400, detail="No face detected in the image")

    _, buffer = cv2.imencode('.jpg', cropped)
    image_blob = base64.b64encode(buffer).decode('utf-8')

    metadata = {
        "face_id": face_id,
        "name": name,
        "gender": gender,
        "age": age,
        "where_lost": where_lost,
        "your_name": your_name,
        "relation_with_lost": relation_with_lost,
        "user_id": user_id,
        "mobile_no": mobile_no,
        "email_id": email_id,
        "face_blob": image_blob
    }
    save_metadata(face_id, metadata, "db/lost")

    matched_found = match_face_with_db(cropped, "db/found", metadata)
    matched_live = match_face_with_db(cropped, "db/live_feed", metadata)

    return {
        "message": "Lost person uploaded successfully.",
        "face_id": face_id,
        "matched_found_count": len(matched_found),
        "matched_live_count": len(matched_live),
        "matched_records": matched_found + matched_live
    }


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
    cropped = crop_and_save_face(image, face_id, "db/found")

    if cropped is None:
        raise HTTPException(status_code=400, detail="No face detected in the image")

    _, buffer = cv2.imencode('.jpg', cropped)
    image_blob = base64.b64encode(buffer).decode('utf-8')

    metadata = {
        "face_id": face_id,
        "name": name,
        "gender": gender,
        "age": age,
        "where_found": where_found,
        "your_name": your_name,
        "organization": organization,
        "designation": designation,
        "user_id": user_id,
        "mobile_no": mobile_no,
        "email_id": email_id,
        "face_blob": image_blob
    }
    save_metadata(face_id, metadata, "db/found")

    matched_lost = match_face_with_db(cropped, "db/lost", metadata)

    return {
        "message": "Found person uploaded successfully.",
        "face_id": face_id,
        "matched_lost_count": len(matched_lost),
        "matched_records": matched_lost
    }


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
    cropped = crop_and_save_face(image, face_id, "db/live_feed")
    
    if cropped is None:
        raise HTTPException(status_code=400, detail="No face detected in the image")
    
    _, buffer = cv2.imencode('.jpg', cropped)
    image_blob = base64.b64encode(buffer).decode('utf-8')
    
    metadata = {
        "face_id": face_id,
        "camera_id": camera_id,
        "where_found": where_found,
        "location": location,
        "your_name": your_name,
        "organization": organization,
        "designation": designation,
        "user_id": user_id,
        "mobile_no": mobile_no,
        "email_id": email_id,
        "face_blob": image_blob,
        "timestamp": datetime.now().isoformat()
    }
    save_metadata(face_id, metadata, "db/live_feed")
    
    matched_lost = match_face_with_db(cropped, "db/lost", metadata)
    
    # If we found matches, send alerts to the people who reported them lost
    for match in matched_lost:
        send_live_alert(match, metadata, os.path.join("db/live_feed", f"{face_id}.jpg"))
    
    return {
        "message": "Live feed uploaded and processed successfully.",
        "face_id": face_id,
        "matched_lost_count": len(matched_lost),
        "matched_records": matched_lost
    }


def get_image_blob_from_metadata(metadata: dict) -> Optional[str]:
    # If face_blob in metadata, return it directly,
    # else if face_path, load the image file and convert to base64
    if "face_blob" in metadata:
        return metadata["face_blob"]
    elif "face_path" in metadata and os.path.exists(metadata["face_path"]):
        with open(metadata["face_path"], "rb") as img_file:
            return base64.b64encode(img_file.read()).decode()
    return None


# Endpoint to get records by user_id with image blob
@app.get("/get_records_by_user/{user_id}")
async def get_records_by_user(user_id: str):
    records = []
    # Search in the lost folder
    for file in os.listdir("db/lost"):
        if file.endswith(".json"):
            with open(os.path.join("db/lost", file), 'r', encoding='utf-8') as f:
                metadata = json.load(f)
                if metadata.get("user_id") == user_id:
                    if "face_blob" not in metadata and "face_path" in metadata and os.path.exists(metadata["face_path"]):
                        with open(metadata["face_path"], "rb") as img_file:
                            metadata["face_blob"] = base64.b64encode(img_file.read()).decode()
                    records.append({"folder": "db/lost", "metadata": metadata})
    # Search in the found folder
    for file in os.listdir("db/found"):
        if file.endswith(".json"):
            with open(os.path.join("db/found", file), 'r', encoding='utf-8') as f:
                metadata = json.load(f)
                if metadata.get("user_id") == user_id:
                    if "face_blob" not in metadata and "face_path" in metadata and os.path.exists(metadata["face_path"]):
                        with open(metadata["face_path"], "rb") as img_file:
                            metadata["face_blob"] = base64.b64encode(img_file.read()).decode()
                    records.append({"folder": "db/found", "metadata": metadata})
    # Search in the live_feed folder
    for file in os.listdir("db/live_feed"):
        if file.endswith(".json"):
            with open(os.path.join("db/live_feed", file), 'r', encoding='utf-8') as f:
                metadata = json.load(f)
                if metadata.get("user_id") == user_id:
                    if "face_blob" not in metadata and "face_path" in metadata and os.path.exists(metadata["face_path"]):
                        with open(metadata["face_path"], "rb") as img_file:
                            metadata["face_blob"] = base64.b64encode(img_file.read()).decode()
                    records.append({"folder": "db/live_feed", "metadata": metadata})
    return {
        "message": "Records found" if records else "No records found",
        "records": records
    }


# Endpoint to search for a specific face by face_id with image blob
@app.get("/search_face/{face_id}")
async def search_face(face_id: str):
    print(f"[BACKEND] /search_face/{{face_id}} called with face_id: {face_id}")
    # Look for face in lost, found, and live_feed
    for folder in ["db/lost", "db/found", "db/live_feed"]:
        json_path = os.path.join(folder, f"{face_id}.json")
        print(f"[BACKEND] Checking: {json_path}")
        if os.path.exists(json_path):
            with open(json_path, 'r', encoding='utf-8') as f:
                metadata = json.load(f)
                print(f"[BACKEND] Found metadata in {json_path}: {metadata}")
                metadata["face_blob"] = get_image_blob_from_metadata(metadata)
                print(f"[BACKEND] Added face_blob for {face_id}")
                return {
                    "message": "Face records found",
                    "records": [{"folder": folder, "metadata": metadata}]
                }
    print(f"[BACKEND] Face ID {face_id} not found in any folder.")
    raise HTTPException(status_code=404, detail="Face ID not found")


# Fix legacy endpoint for backward compatibility
@app.get("/{face_id}")
async def legacy_search_face(face_id: str):
    return await search_face(face_id)


# --------------- Admin Endpoints (Single File) ---------------- #

@app.get("/check_admin_status/{user_id}")
async def check_admin_status(user_id: str):
    try:
        admin_status = get_admin_status(user_id)
        return admin_status
    except Exception as e:
        print(f"Error checking admin status: {e}")
        return {"is_admin": False, "error": str(e)}

@app.post("/create_admin", response_model=AdminResponse)
async def create_admin(
    user_id: str = Form(...),
    full_name: str = Form(...),
    email: str = Form(...),
    role: str = Form(...),  # No default, expecting it from the form
    creator_id: str = Form(...)
):
    # Verify creator is a HeadAdmin
    if not validate_head_admin(creator_id):
        raise HTTPException(status_code=403, detail="Only Head Admins can create new admins")
    
    # Create admin record with timestamp
    admin_data = {
        "user_id": user_id,
        "full_name": full_name, 
        "email": email,
        "role": role,
        "created_by": creator_id,
        "created_at": datetime.now().isoformat()
    }
    
    # Save to JSON
    save_admin_data(admin_data)
    
    return admin_data


@app.post("/bulk_create_admins")
async def bulk_create_admins(bulk_admins: BulkAdminCreate, creator_id: str = Form(...)):
    # Verify creator is a HeadAdmin
    if not validate_head_admin(creator_id):
        raise HTTPException(status_code=403, detail="Only Head Admins can create new admins")
    
    created_admins = []
    for admin in bulk_admins.admins:
        # Create admin record with timestamp
        admin_data = {
            "user_id": admin.user_id,
            "full_name": admin.full_name,
            "email": admin.email,
            "role": admin.role,
            "created_by": creator_id,
            "created_at": datetime.now().isoformat()
        }
        
        # Save to JSON
        save_admin_data(admin_data)
        created_admins.append(AdminResponse(**admin_data))
    
    return {"created_admins": created_admins}


@app.get("/list_admins")
async def list_admins(creator_id: str):
    try:
        # Verify requester is an admin
        admin_status = get_admin_status(creator_id)
        if not admin_status.get("is_admin", False):
            raise HTTPException(status_code=403, detail="Only admins can list administrators")
        
        # Load all admins
        admins = load_admins()
        
        # If regular admin, filter out other admins' info
        if admin_status.get("role") != "HeadAdmin":
            # Regular admins can only see basic info
            filtered_admins = []
            for admin in admins:
                if admin.get("role") == "HeadAdmin" or admin.get("user_id") == creator_id:
                    filtered_admins.append(admin)
            admins = filtered_admins
        
        return {"admins": admins}
    except Exception as e:
        print(f"Error listing admins: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/update_admin/{admin_id}")
async def update_admin(
    admin_id: str, 
    full_name: str = Form(None),
    email: str = Form(None),
    role: str = Form(None),
    creator_id: str = Form(...)
):
    # Verify creator is a HeadAdmin
    if not validate_head_admin(creator_id):
        raise HTTPException(status_code=403, detail="Only Head Admins can update admins")
    
    # Get current admin data
    admin_status = get_admin_status(admin_id)
    if not admin_status.get("is_admin", False):
        raise HTTPException(status_code=404, detail="Admin not found")
    
    # Get existing admin data from storage
    admins = load_admins()
    for i, admin in enumerate(admins):
        if admin.get("user_id") == admin_id:
            # Update fields if provided
            if full_name is not None:
                admin["full_name"] = full_name
            if email is not None:
                admin["email"] = email
            if role is not None:
                admin["role"] = role
            
            # Save updated admin data
            admin["updated_by"] = creator_id
            admin["updated_at"] = datetime.now().isoformat()
            save_admins(admins)
            return {"message": "Admin updated successfully", "admin": admin}
    
    raise HTTPException(status_code=404, detail="Admin not found in storage")


@app.delete("/delete_admin/{admin_id}")
async def delete_admin(admin_id: str, creator_id: str = Form(...)):
    # Verify creator is a HeadAdmin
    if not validate_head_admin(creator_id):
        raise HTTPException(status_code=403, detail="Only Head Admins can delete admins")
    
    # Prevent deletion of HeadAdmin
    admin_status = get_admin_status(admin_id)
    if admin_status.get("role") == "HeadAdmin":
        raise HTTPException(status_code=403, detail="Cannot delete a HeadAdmin")
    
    # Delete the admin
    if delete_admin_data(admin_id):
        return {"message": "Admin deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Admin not found")


# --------------- Clerk Integration Endpoints ---------------- #

@app.post("/clerk_create_admin")
async def clerk_create_admin(
    clerk_user: ClerkUserInfo,
    creator_id: str = Form(...),
    role: str = Form("admin")
):
    # Verify creator is a HeadAdmin
    if not validate_head_admin(creator_id):
        raise HTTPException(status_code=403, detail="Only Head Admins can create new admins")
    
    # Create admin from Clerk user info
    admin_data = {
        "user_id": clerk_user.id,
        "full_name": clerk_user.fullName,
        "email": clerk_user.primaryEmailAddress,
        "role": role,
        "created_by": creator_id,
        "created_at": datetime.now().isoformat()
    }
    
    # Save to JSON
    save_admin_data(admin_data)
    
    return AdminResponse(**admin_data)


# Function to create the initial HeadAdmin if none exists
def initialize_head_admin():
    admins = load_admins()
    if not admins:
        try:
            # Create a default HeadAdmin
            head_admin = {
                "user_id": "default_head_admin",
                "full_name": "System Administrator",
                "email": "admin@example.com",
                "role": "HeadAdmin",
                "created_by": "system",
                "created_at": datetime.now().isoformat()
            }
            save_admin_data(head_admin)
            print("Created initial HeadAdmin account")
        except Exception as e:
            print(f"Error creating initial HeadAdmin: {e}")


if __name__ == "__main__":
    # Initialize HeadAdmin if needed
    initialize_head_admin()
    uvicorn.run(app, host="0.0.0.0", port=8000)