# Face Recognition and Missing Person Identification API

This documentation describes the backend API for a missing person identification system that uses facial recognition to match lost individuals with found reports and live camera feeds.

## Overview

The system provides a RESTful API built with FastAPI that enables:
- Registration of lost person reports with facial recognition
- Registration of found person reports with facial recognition
- Processing of live video feeds for real-time person identification
- Automatic matching between lost and found persons
- Email notifications when potential matches are identified
- Search capabilities by user ID and face ID
- Admin management with HeadAdmin capabilities

## Technology Stack

- **FastAPI**: Web framework for building APIs
- **YOLO v11s**: Face detection model
- **DeepFace**: Face verification and emotion analysis
- **OpenCV**: Image processing
- **Gmail SMTP**: Email notifications

## Setup and Installation

### Prerequisites

- Python 3.8+
- Required dependencies can be installed via:

```bash
pip install -r requirements.txt
```

### Required Dependencies

```
fastapi
uvicorn
opencv-python-headless
numpy
ultralytics
deepface
python-multipart
secure-smtplib
email-validator
torch
torchvision
tf-keras
```

### Configuration

The system requires the following configuration:
- YOLO model file: `YOLOv11s-face.pt` in the root directory
- Email credentials in the app.py file (should be moved to environment variables in production)

### Folder Structure

The system automatically creates the following folder structure for storing data:
```
db/
├── lost/        # Lost person reports and face images
├── found/       # Found person reports and face images
├── live_feed/   # Live camera feed face detections
├── matched/     # Matched records between lost and found
└── admins/      # Admin user records and permissions
```

## API Endpoints

### 1. Upload Lost Person

**Endpoint**: `POST /upload_lost`

**Description**: Register a lost person with their face image and details

**Form Parameters**:
- `name`: Name of the lost person
- `gender`: Gender of the lost person
- `age`: Age of the lost person (integer)
- `where_lost`: Location where the person was last seen
- `your_name`: Name of the person reporting
- `relation_with_lost`: Relationship with the lost person
- `user_id`: Unique identifier for the user reporting
- `mobile_no`: Contact number
- `email_id`: Email address for notifications
- `file`: Image file containing the person's face

**Response**:
```json
{
  "message": "Lost person uploaded successfully.",
  "face_id": "<UUID>",
  "matched_found_count": 0,
  "matched_live_count": 0,
  "matched_records": []
}
```

### 2. Upload Found Person

**Endpoint**: `POST /upload_found`

**Description**: Register a found person with their face image and details

**Form Parameters**:
- `name`: Name or identifier for the found person
- `gender`: Gender of the found person
- `age`: Estimated age of the found person (integer)
- `where_found`: Location where the person was found
- `your_name`: Name of the person reporting
- `organization`: Organization of the reporter (police, NGO, etc.)
- `designation`: Designation of the reporter
- `user_id`: Unique identifier for the user reporting
- `mobile_no`: Contact number
- `email_id`: Email address for notifications
- `file`: Image file containing the person's face

**Response**:
```json
{
  "message": "Found person uploaded successfully.",
  "face_id": "<UUID>",
  "matched_lost_count": 0,
  "matched_records": []
}
```

### 3. Upload Live Feed

**Endpoint**: `POST /upload_live_feed`

**Description**: Process a camera feed image to detect faces and match with lost person records

**Form Parameters**:
- `camera_id`: Unique identifier for the camera
- `where_found`: General location of the camera
- `location`: Specific location details
- `your_name`: Name of the person operating the system
- `organization`: Organization operating the camera
- `designation`: Designation of the operator
- `user_id`: Unique identifier for the user
- `mobile_no`: Contact number
- `email_id`: Email address for notifications
- `file`: Image file from the camera feed

**Response**:
```json
{
  "message": "Live feed uploaded",
  "matches": []
}
```

### 4. Get Records by User

**Endpoint**: `GET /get_records_by_user/{user_id}`

**Description**: Retrieve all records (lost, found, live feed) associated with a specific user ID

**Path Parameters**:
- `user_id`: Unique identifier for the user

**Response**:
```json
{
  "message": "Records found",
  "records": [
    {
      "folder": "db/lost",
      "metadata": {
        "face_id": "<UUID>",
        "name": "John Doe",
        "face_blob": "<base64-encoded-image>"
        // Additional metadata...
      }
    }
  ]
}
```

### 5. Search Face by ID

**Endpoint**: `GET /search_face/{face_id}`

**Description**: Search for a specific face record using its face ID

**Path Parameters**:
- `face_id`: Unique identifier for the face record

**Response**:
```json
{
  "message": "Face records found",
  "records": [
    {
      "folder": "db/lost",
      "metadata": {
        "face_id": "<UUID>",
        "name": "John Doe",
        "face_blob": "<base64-encoded-image>"
        // Additional metadata...
      }
    }
  ]
}
```

### 6. Check Admin Status

**Endpoint**: `GET /check_admin_status/{user_id}`

**Description**: Check if a user is an admin and retrieve their role (admin or HeadAdmin)

**Path Parameters**:
- `user_id`: Unique identifier for the user

**Response**:
```json
{
  "is_admin": true,
  "role": "HeadAdmin",
  "admin_details": {
    "user_id": "<user_id>",
    "full_name": "Admin Name",
    "email": "admin@example.com",
    "role": "HeadAdmin",
    "created_by": "system",
    "created_at": "2023-05-09T12:00:00"
  }
}
```

### 7. Create Admin

**Endpoint**: `POST /create_admin`

**Description**: Create a new admin user (requires HeadAdmin privileges)

**Form Parameters**:
- `user_id`: Unique identifier for the new admin
- `full_name`: Full name of the new admin
- `email`: Email address of the new admin
- `role`: Role of the new admin ("admin" or "HeadAdmin")
- `creator_id`: User ID of the HeadAdmin creating this admin

**Response**:
```json
{
  "user_id": "<user_id>",
  "full_name": "New Admin Name",
  "email": "newadmin@example.com",
  "role": "admin",
  "created_by": "<creator_id>",
  "created_at": "2023-05-09T12:00:00"
}
```

### 8. Create Admin from Clerk User

**Endpoint**: `POST /clerk_create_admin`

**Description**: Create a new admin from Clerk authentication data (requires HeadAdmin privileges)

**Form Parameters**:
- `creator_id`: User ID of the HeadAdmin creating the admin
- `role`: Role of the new admin ("admin" or "HeadAdmin")

**JSON Body Parameters**:
```json
{
  "id": "user_2wcs9sQwBg6igFMeGCO7igFPP5G",
  "firstName": "TANISHQ",
  "lastName": "CHOUHAN",
  "fullName": "TANISHQ CHOUHAN",
  "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yd2NzOW1VTjFRWERYd0xyRmVSMndlY1BDYzUifQ",
  "primaryEmailAddress": "0808cl221140.ies@ipsacademy.org",
  "primaryPhoneNumber": "+918103942742",
  "username": "tanishq40"
}
```

**Response**:
```json
{
  "message": "Admin created successfully from Clerk user data",
  "admin_id": "user_2wcs9sQwBg6igFMeGCO7igFPP5G",
  "admin_data": {
    "user_id": "user_2wcs9sQwBg6igFMeGCO7igFPP5G",
    "full_name": "TANISHQ CHOUHAN",
    "email": "0808cl221140.ies@ipsacademy.org",
    "role": "admin",
    "created_by": "<creator_id>",
    "created_at": "2025-05-09T14:30:00",
    "clerk_data": {
      "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yd2NzOW1VTjFRWERYd0xyRmVSMndlY1BDYzUifQ",
      "username": "tanishq40",
      "primaryPhoneNumber": "+918103942742"
    }
  }
}
```

### 9. Bulk Create Admins

**Endpoint**: `POST /bulk_create_admins`

**Description**: Create multiple admin users at once (requires HeadAdmin privileges)

**Form Parameters**:
- `creator_id`: User ID of the HeadAdmin creating the admins

**JSON Body Parameters**:
```json
{
  "admins": [
    {
      "user_id": "user_123",
      "full_name": "Admin One",
      "email": "admin1@example.com",
      "role": "admin"
    },
    {
      "user_id": "user_456",
      "full_name": "Admin Two",
      "email": "admin2@example.com",
      "role": "admin"
    }
  ]
}
```

**Response**:
```json
{
  "message": "Created 2 admins",
  "created_admins": [
    {
      "user_id": "user_123",
      "full_name": "Admin One",
      "email": "admin1@example.com",
      "role": "admin",
      "created_by": "<creator_id>",
      "created_at": "2025-05-09T14:30:00"
    },
    {
      "user_id": "user_456",
      "full_name": "Admin Two",
      "email": "admin2@example.com",
      "role": "admin",
      "created_by": "<creator_id>",
      "created_at": "2025-05-09T14:30:00"
    }
  ],
  "errors": []
}
```

### 10. List Admins

**Endpoint**: `GET /list_admins?creator_id={creator_id}`

**Description**: List all admin users (requires admin privileges)

**Query Parameters**:
- `creator_id`: User ID of the admin requesting the list

**Response**:
```json
{
  "admins": [
    {
      "user_id": "<user_id>",
      "full_name": "Admin Name",
      "email": "admin@example.com",
      "role": "HeadAdmin",
      "created_at": "2023-05-09T12:00:00"
    },
    {
      "user_id": "<user_id_2>",
      "full_name": "Regular Admin",
      "email": "regular@example.com",
      "role": "admin",
      "created_at": "2023-05-09T12:00:00"
    }
  ]
}
```

### 11. Update Admin

**Endpoint**: `POST /update_admin/{admin_id}`

**Description**: Update an existing admin's details (requires HeadAdmin privileges)

**Path Parameters**:
- `admin_id`: User ID of the admin to update

**Form Parameters**:
- `user_id`: Unique identifier (unchanged)
- `full_name`: Updated full name
- `email`: Updated email address
- `role`: Updated role
- `creator_id`: User ID of the HeadAdmin making the update

**Response**:
```json
{
  "user_id": "<admin_id>",
  "full_name": "Updated Name",
  "email": "updated@example.com",
  "role": "admin",
  "created_by": "<original_creator_id>",
  "created_at": "2023-05-09T12:00:00",
  "updated_by": "<creator_id>",
  "updated_at": "2023-05-09T13:00:00"
}
```

### 12. Delete Admin

**Endpoint**: `DELETE /delete_admin/{admin_id}`

**Description**: Delete an admin user (requires HeadAdmin privileges)

**Path Parameters**:
- `admin_id`: User ID of the admin to delete

**Form Parameters**:
- `creator_id`: User ID of the HeadAdmin performing the deletion

**Response**:
```json
{
  "message": "Admin deleted successfully",
  "admin_id": "<admin_id>"
}
```

## Helper Functions

The system includes several helper functions for face processing and notifications:

### Face Processing

- `crop_and_save_face()`: Detects and crops faces from images
- `save_metadata()`: Saves face metadata to JSON files
- `match_face_with_db()`: Matches faces against database records using DeepFace
- `get_image_blob_from_metadata()`: Retrieves base64-encoded face images

### Notification System

- `send_email_alert()`: Sends email notifications with optional image attachments
- `send_match_emails()`: Sends notifications when a lost person is found
- `send_live_alert()`: Sends alerts when a lost person is spotted in a live feed

### Admin Management

- `get_admin_status()`: Checks if a user is an admin and returns their role information
- `validate_head_admin()`: Verifies if a user has HeadAdmin privileges
- `save_admin_data()`: Saves admin user data to the database
- `initialize_head_admin()`: Creates an initial HeadAdmin if none exists in the system

## Admin System

The system includes a hierarchical admin structure:

1. **HeadAdmin**: Has full privileges including:
   - Creating new admin users
   - Updating existing admin users
   - Deleting admin users
   - Managing the entire system

2. **Regular Admin**: Has standard administrative privileges:
   - Viewing all reports
   - Uploading found person records
   - Managing live feeds
   - Performing face searches

When the application starts for the first time, it automatically creates an initial HeadAdmin user if none exists.

## Face Recognition Process

1. **Face Detection**: YOLO v11s model detects faces in uploaded images
2. **Face Verification**: DeepFace compares detected faces against database
3. **Emotion Analysis**: DeepFace analyzes emotions in matched faces
4. **Match Processing**: Matching records are saved and notifications sent

## Security Considerations

The current implementation has several areas for enhancement:

1. **Email Credentials**: Should be moved to environment variables
2. **Authentication**: API endpoints have basic authentication, but should be enhanced
3. **Admin Permissions**: More granular permissions system could be implemented
4. **Data Privacy**: PII (Personally Identifiable Information) should be handled securely
5. **Rate Limiting**: Should be implemented to prevent abuse

## Running the Application

To start the server:

```bash
python app.py
```

Or using uvicorn directly:

```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at http://localhost:8000/

## API Documentation

FastAPI provides automatic API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Example Usage

### Reporting a Lost Person

```bash
curl -X POST "http://localhost:8000/upload_lost" \
  -F "name=John Smith" \
  -F "gender=male" \
  -F "age=25" \
  -F "where_lost=Central Park" \
  -F "your_name=Jane Smith" \
  -F "relation_with_lost=Sister" \
  -F "user_id=user123" \
  -F "mobile_no=1234567890" \
  -F "email_id=jane@example.com" \
  -F "file=@person.jpg"
```

### Reporting a Found Person

```bash
curl -X POST "http://localhost:8000/upload_found" \
  -F "name=Unknown Person" \
  -F "gender=male" \
  -F "age=25" \
  -F "where_found=Downtown" \
  -F "your_name=Officer Johnson" \
  -F "organization=Police Department" \
  -F "designation=Officer" \
  -F "user_id=police123" \
  -F "mobile_no=9876543210" \
  -F "email_id=officer@police.gov" \
  -F "file=@found_person.jpg"
```

### Creating a New Admin

```bash
curl -X POST "http://localhost:8000/create_admin" \
  -F "user_id=new_admin_123" \
  -F "full_name=John Admin" \
  -F "email=john@admin.com" \
  -F "role=admin" \
  -F "creator_id=head_admin_id"
```

### Checking Admin Status

```bash
curl -X GET "http://localhost:8000/check_admin_status/admin_user_id"
```

## License

This project is proprietary and confidential.

## Postman Testing Guide

This section provides a comprehensive guide for testing the API endpoints using Postman.

### Setup and Configuration

1. **Install Postman**: Download and install Postman from [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

2. **Create a Collection**: 
   - Open Postman and click "Create Collection"
   - Name it "Missing Person Face Recognition API"
   - Click "Create"

3. **Set Base URL Environment Variable**:
   - Click the gear icon (⚙️) in the top right corner
   - Click "Add" to create a new environment
   - Name it "Local Development"
   - Add a variable:
     - Name: `base_url`
     - Initial value: `http://localhost:8000`
     - Current value: `http://localhost:8000`
   - Click "Save"
   - Select the "Local Development" environment from the dropdown menu in the top-right corner

### Testing Admin Functionality

#### Step 1: Get Initial HeadAdmin ID

The system creates an initial HeadAdmin when first launched. To find its ID:

1. Start the application: `python app.py`
2. Check the terminal output for: "Created initial HeadAdmin with ID: head_admin_xxxxxxxx"
3. Save this ID as you'll need it for future requests

#### Step 2: Create Admin Request

1. **Create a new request** in your collection:
   - Name: "Create Admin"
   - Method: POST
   - URL: `{{base_url}}/create_admin`

2. **Setup Form Data**:
   - Key: `user_id`, Value: `admin_123`
   - Key: `full_name`, Value: `Test Admin`
   - Key: `email`, Value: `testadmin@example.com`
   - Key: `role`, Value: `admin`
   - Key: `creator_id`, Value: `<initial HeadAdmin ID from Step 1>`

3. **Send Request**:
   - You should receive a response with status code 200 and the admin details
   - Save the created admin's `user_id` for future requests

#### Step 3: Create Admin from Clerk Data

1. **Create a new request**:
   - Name: "Create Clerk Admin"
   - Method: POST
   - URL: `{{base_url}}/clerk_create_admin`

2. **Setup Body**:
   - Select "raw" and "JSON"
   - Enter:
   ```json
   {
     "id": "user_clerk123",
     "firstName": "John",
     "lastName": "Doe",
     "fullName": "John Doe",
     "imageUrl": "https://example.com/avatar.jpg",
     "primaryEmailAddress": "john@example.com",
     "primaryPhoneNumber": "+1234567890",
     "username": "johndoe"
   }
   ```

3. **Setup Form Data**:
   - Key: `creator_id`, Value: `<initial HeadAdmin ID from Step 1>`
   - Key: `role`, Value: `admin`

4. **Send Request**:
   - You should receive a response with the created admin details

#### Step 4: Bulk Create Admins

1. **Create a new request**:
   - Name: "Bulk Create Admins"
   - Method: POST
   - URL: `{{base_url}}/bulk_create_admins`

2. **Setup Body**:
   - Select "raw" and "JSON"
   - Enter:
   ```json
   {
     "admins": [
       {
         "user_id": "bulk_admin_1",
         "full_name": "Bulk Admin One",
         "email": "admin1@example.com",
         "role": "admin"
       },
       {
         "user_id": "bulk_admin_2",
         "full_name": "Bulk Admin Two",
         "email": "admin2@example.com",
         "role": "admin"
       }
     ]
   }
   ```

3. **Setup Form Data**:
   - Key: `creator_id`, Value: `<initial HeadAdmin ID from Step 1>`

4. **Send Request**:
   - You should receive a response with details of all created admins

#### Step 5: List Admins

1. **Create a new request**:
   - Name: "List Admins"
   - Method: GET
   - URL: `{{base_url}}/list_admins?creator_id=<initial HeadAdmin ID from Step 1>`

2. **Send Request**:
   - You should see all created admins in the response

#### Step 6: Check Admin Status

1. **Create a new request**:
   - Name: "Check Admin Status"
   - Method: GET
   - URL: `{{base_url}}/check_admin_status/<admin_id>` (replace `<admin_id>` with a created admin's ID)

2. **Send Request**:
   - You should receive details about the admin's role and privileges

#### Step 7: Update Admin

1. **Create a new request**:
   - Name: "Update Admin"
   - Method: POST
   - URL: `{{base_url}}/update_admin/<admin_id>` (replace `<admin_id>` with a created admin's ID)

2. **Setup Form Data**:
   - Key: `user_id`, Value: `<same admin_id>`
   - Key: `full_name`, Value: `Updated Admin Name`
   - Key: `email`, Value: `updated@example.com`
   - Key: `role`, Value: `admin`
   - Key: `creator_id`, Value: `<initial HeadAdmin ID from Step 1>`

3. **Send Request**:
   - You should receive the updated admin details

#### Step 8: Delete Admin

1. **Create a new request**:
   - Name: "Delete Admin"
   - Method: DELETE
   - URL: `{{base_url}}/delete_admin/<admin_id>` (replace `<admin_id>` with a created admin's ID)

2. **Setup Form Data**:
   - Key: `creator_id`, Value: `<initial HeadAdmin ID from Step 1>`

3. **Send Request**:
   - You should receive confirmation of the deletion

### Testing Face Recognition Functionality

#### Upload Lost Person

1. **Create a new request**:
   - Name: "Upload Lost Person"
   - Method: POST
   - URL: `{{base_url}}/upload_lost`

2. **Setup Form Data**:
   - Key: `name`, Value: `John Smith`
   - Key: `gender`, Value: `male`
   - Key: `age`, Value: `25`
   - Key: `where_lost`, Value: `Central Park`
   - Key: `your_name`, Value: `Jane Smith`
   - Key: `relation_with_lost`, Value: `Sister`
   - Key: `user_id`, Value: `user123`
   - Key: `mobile_no`, Value: `1234567890`
   - Key: `email_id`, Value: `test@example.com`
   - Key: `file`, Type: File, Value: Select a clear image with a face

3. **Send Request**:
   - You should receive a response with the face ID
   - Save this face ID for later tests

#### Upload Found Person

1. **Create a new request**:
   - Name: "Upload Found Person"
   - Method: POST
   - URL: `{{base_url}}/upload_found`

2. **Setup Form Data**:
   - Key: `name`, Value: `Unknown Person`
   - Key: `gender`, Value: `male`
   - Key: `age`, Value: `25`
   - Key: `where_found`, Value: `Downtown`
   - Key: `your_name`, Value: `Officer Johnson`
   - Key: `organization`, Value: `Police Department`
   - Key: `designation`, Value: `Officer`
   - Key: `user_id`, Value: `police123`
   - Key: `mobile_no`, Value: `9876543210`
   - Key: `email_id`, Value: `officer@example.com`
   - Key: `file`, Type: File, Value: Select a clear image with a face

3. **Send Request**:
   - You should receive a response with the face ID
   - Save this face ID for later tests

#### Upload Live Feed

1. **Create a new request**:
   - Name: "Upload Live Feed"
   - Method: POST
   - URL: `{{base_url}}/upload_live_feed`

2. **Setup Form Data**:
   - Key: `camera_id`, Value: `cam_123`
   - Key: `where_found`, Value: `Mall`
   - Key: `location`, Value: `Main Entrance`
   - Key: `your_name`, Value: `Security Officer`
   - Key: `organization`, Value: `Mall Security`
   - Key: `designation`, Value: `Guard`
   - Key: `user_id`, Value: `security123`
   - Key: `mobile_no`, Value: `5554443333`
   - Key: `email_id`, Value: `security@example.com`
   - Key: `file`, Type: File, Value: Select an image with faces

3. **Send Request**:
   - You should receive a response with any potential matches

#### Get Records by User

1. **Create a new request**:
   - Name: "Get Records by User"
   - Method: GET
   - URL: `{{base_url}}/get_records_by_user/user123`

2. **Send Request**:
   - You should receive all records associated with user123

#### Search Face by ID

1. **Create a new request**:
   - Name: "Search Face by ID"
   - Method: GET
   - URL: `{{base_url}}/search_face/<face_id>` (replace with a face ID from previous tests)

2. **Send Request**:
   - You should receive detailed information about the face record

### Test Cases and Expected Results

| Test Case | Steps | Expected Result |
|-----------|-------|-----------------|
| Create HeadAdmin | 1. Start application<br>2. Check terminal output | HeadAdmin created with ID displayed |
| Create Regular Admin | 1. Use HeadAdmin ID<br>2. Submit create_admin request | Status 200, admin details returned |
| Create Clerk Admin | 1. Use HeadAdmin ID<br>2. Submit clerk_create_admin with valid data | Status 200, admin created with clerk data |
| Create Admin with Non-HeadAdmin | 1. Use regular admin ID<br>2. Submit create_admin request | Status 403, error message |
| List Admins | 1. Submit list_admins with HeadAdmin ID | Status 200, list of all admins |
| Update Admin | 1. Submit update_admin with valid data<br>2. Use HeadAdmin ID | Status 200, updated admin details |
| Delete Admin | 1. Submit delete_admin with valid admin ID<br>2. Use HeadAdmin ID | Status 200, deletion confirmation |
| Upload Lost Face | 1. Submit upload_lost with image<br>2. Provide all required fields | Status 200, face_id returned |
| Upload Found Face | 1. Submit upload_found with image<br>2. Provide all required fields | Status 200, face_id returned |
| Upload Similar Faces | 1. Upload lost person<br>2. Upload same face as found | Status 200, matched_records contains a match |

### Troubleshooting Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| 500 Server Error | Missing YOLOv11s-face.pt model | Ensure model file is in the correct location |
| No face detected | Poor image quality | Use clear frontal face images with good lighting |
| Permission denied | Not using HeadAdmin ID | Verify you're using a valid HeadAdmin ID |
| Matching not working | Different faces or angles | Use very similar images for testing matching |
| Database errors | Missing folders | Ensure db/ folder and subfolders exist |

### Notes on Test Data

When testing the face recognition functionality:

1. For accurate face matching tests, use multiple images of the same person from different angles
2. To test false positives, use images of different people with similar features
3. To test the emotion analysis, use images with clear facial expressions

Remember that the face recognition system performs best with:
- Clear, well-lit frontal face images
- Minimal face obstructions (glasses, masks, etc.)
- Consistent image quality between the lost and found images