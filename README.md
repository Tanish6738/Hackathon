# Dhruv - AI : A Guiding Star for Uniting Lost Souls

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Contributions](https://img.shields.io/badge/contributions-welcome-orange)

---

## ✨ Overview

**Dhruv - AI** is an intelligent, real-time Lost & Found system designed to reunite missing individuals with their families at large public gatherings, disaster zones, and more. Leveraging advanced facial recognition, instant alerts, and a dynamic database, Dhruv AI bridges the gap between lost souls and their loved ones—anywhere, anytime.

---

## 🔍 Problem Statement

In large public gatherings such as fairs, festivals, or disaster-affected areas, it becomes extremely difficult and time-consuming to manually identify and reunite lost individuals—especially children and elderly people—with their families. Traditional methods rely heavily on verbal communication, public announcements, or paper records, which are inefficient, prone to human error, and often result in delays or missed reunions.

There is a critical need for an automated, intelligent system that can:
- Accurately detect and recognize faces
- Match them against a dynamic database of missing/found individuals
- Instantly notify relevant parties through a secure and fast communication channel

This project addresses the problem by developing a Lost & Found system powered by facial recognition, enabling quick identification and real-time alerts to assist authorities and families in reuniting individuals effectively.

---

## 🚀 Key Features

- **Real-time facial recognition** using advanced AI models
- **Dynamic, live-updated database** (edge + cloud)
- **Multi-platform integration:** CCTV, mobile cameras, drones, kiosks
- **Instant multichannel alerts:** SMS, WhatsApp, email
- **Community reporting** via app/web
- **Multilingual & accessible UI**
- **Open API** for NGOs, police, rescue teams, event organizers
- **Scalable architecture** for various environments (fairs, festivals, schools, etc.)
- **Image enhancement & preprocessing** for better recognition accuracy
- **Secure data handling, privacy measures, and authentication** (using Clerk)
- **User-friendly interface** for families and authorities
- **Admin dashboard** for monitoring and managing the system
- **Aging tool:** Generate projected images of lost individuals after a time gap
- **Integration with existing systems** (e.g., police databases, NGO networks)

---

## ⚖️ Comparison with Existing Solutions

| Feature / Factor         | Example (Indian Railways)                  | Dhruv AI (OUR Project)         |
|-------------------------|---------------------------------------------|--------------------------------------------------------------|
| **Deployment Area**     | Primarily at railway stations               | Scalable to fairs, festivals, disaster zones, schools, etc.  |
| **Database Handling**   | Static centralized database                 | Dynamic, live-updated database (edge + cloud)                |
| **Target Users**        | Tracking criminals/missing children         | All missing individuals, including elderly                   |
| **Facial Recognition**  | CCTV in railway premises                    | Mobile cams, drones, kiosks, and more                        |
| **Alert System**        | Internal notification to authorities        | Real-time multichannel alerts to families/officials          |
| **Community Reporting** | No                                          | Yes, via app/web                                             |
| **Language & Accessibility** | Limited                              | Multilingual & accessible UI                                 |
| **Integration Potential** | Specific to railway infrastructure        | Open API for NGOs, police, rescue teams, event organizers    |

**Key Differentiator:**

While Dhruv AI is a station-specific surveillance tool, this system is a universal, real-time, multi-platform solution focused on reuniting all missing individuals—anywhere, not just at stations.

---

## 🏗️ Project Structure

```
Backend/
  app.py
  Backend.md
  index.html
  requirements.txt
  yolov11s-face.pt
  db/
    
LostAndFoundUpdated 3/
  src/
    app/
    components/
    hooks/
    lib/
    services/
    styles/
  public/
  ...
README.md
```

---

## 🛠️ Tech Stack

- **Backend:** Python (Flask/FastAPI), YOLOv11s for facial recognition
- **Frontend:** React (TypeScript), Vite
- **Database:** JSON-based (for demo), scalable to SQL/NoSQL
- **Cloud/Edge Integration:** Ready for deployment on cloud and edge devices
- **Notification Services:** SMS, WhatsApp, Email (integrated via APIs)

---

## 🚦 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm / pnpm

### Backend Setup

1. Navigate to the `Backend` directory:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```sh
   python app.py
   ```

### Frontend Setup

1. Navigate to the `LostAndFoundUpdated 3/` directory:
   ```sh
   cd "LostAndFoundUpdated 3"
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Start the frontend:
   ```sh
   pnpm dev
   ```

> _If you encounter issues, ensure Python and Node.js are correctly installed and available in your PATH._

---

## 📦 API & Integration

The backend provides a comprehensive RESTful API for lost/found person management, live feed processing, and admin operations. Below are the main endpoints and their typical responses. For full details, see `src/app/DocumentationPage.tsx` and `Backend/Backend.md`.

### Lost & Found Endpoints

**POST /upload_lost**
- Register a lost person with their face image and details.
- **Form Parameters:** name, gender, age, where_lost, your_name, relation_with_lost, user_id, mobile_no, email_id, file
- **Response:**
```json
{
  "message": "Lost person uploaded successfully.",
  "face_id": "<UUID>",
  "matched_found_count": 0,
  "matched_live_count": 0,
  "matched_records": []
}
```

**POST /upload_found**
- Register a found person with their face image and details.
- **Form Parameters:** name, gender, age, where_found, your_name, organization, designation, user_id, mobile_no, email_id, file
- **Response:**
```json
{
  "message": "Found person uploaded successfully.",
  "face_id": "<UUID>",
  "matched_lost_count": 0,
  "matched_records": []
}
```

**POST /upload_live_feed**
- Process a camera feed image to detect faces and match with lost person records.
- **Form Parameters:** camera_id, where_found, location, your_name, organization, designation, user_id, mobile_no, email_id, file
- **Response:**
```json
{
  "message": "Live feed uploaded",
  "matches": []
}
```

**GET /get_records_by_user/{user_id}**
- Retrieve all records (lost, found, live feed) associated with a specific user ID.
- **Response:**
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
      }
    }
  ]
}
```

**GET /search_face/{face_id}**
- Search for a specific face record using its face ID.
- **Response:**
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
      }
    }
  ]
}
```

### Admin Endpoints

**GET /check_admin_status/{user_id}**
- Check if a user is an admin and retrieve their role.
- **Response:**
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

**POST /create_admin**
- Create a new admin user (requires HeadAdmin privileges).
- **Form Parameters:** user_id, full_name, email, role, creator_id
- **Response:**
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

**POST /clerk_create_admin**
- Create a new admin from Clerk authentication data (requires HeadAdmin privileges).
- **Form Parameters:** creator_id, role
- **JSON Body:** id, firstName, lastName, fullName, imageUrl, primaryEmailAddress, primaryPhoneNumber, username
- **Response:**
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
      "imageUrl": "https://img.clerk.com/...",
      "username": "tanishq40",
      "primaryPhoneNumber": "+918103942742"
    }
  }
}
```

**POST /bulk_create_admins**
- Create multiple admin users at once (requires HeadAdmin privileges).
- **Form Parameters:** creator_id
- **JSON Body:** admins (array of admin objects)
- **Response:**
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
    }
  ],
  "errors": []
}
```

**GET /list_admins?creator_id={creator_id}**
- List all admin users (requires admin privileges).
- **Response:**
```json
{
  "admins": [
    {
      "user_id": "<user_id>",
      "full_name": "Admin Name",
      "email": "admin@example.com",
      "role": "HeadAdmin",
      "created_at": "2023-05-09T12:00:00"
    }
  ]
}
```

**POST /update_admin/{admin_id}**
- Update an existing admin's details (requires HeadAdmin privileges).
- **Form Parameters:** user_id, full_name, email, role, creator_id
- **Response:**
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

**DELETE /delete_admin/{admin_id}**
- Delete an admin user (requires HeadAdmin privileges).
- **Form Parameters:** creator_id
- **Response:**
```json
{
  "message": "Admin deleted successfully",
  "admin_id": "<admin_id>"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

---

## 📄 License

This project is licensed under the MIT License.


## 📬 Contact & Support

For questions, support, or partnership inquiries, please contact us at the emails below:

| Name              | Email                      |
|-------------------|---------------------------|
| Krish Bhagat      |   BHAGATkrish65@gmail.com     |
| Tanishq Chouhan   |   tanishq485@gmail.com      |
| Krishna Jagtap    |   jagtapkanaha987@gmail.com |
| Grace Patel       |   gracepatel91@gmail.com    |

---

## 🏁 Conclusion

**Dhruv - AI** aspires to be more than just a Lost & Found tool—it is a step toward safer, more connected communities. By combining cutting-edge AI with real-time communication and community participation, we aim to transform how missing individuals are reunited with their loved ones. Your feedback, ideas, and contributions are vital to making this vision a reality.

---

Thank you for your interest in **Dhruv - AI**!  
We welcome your feedback and look forward to your contributions.

