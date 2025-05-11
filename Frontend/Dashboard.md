# Lost & Found Dashboard API Guide

---

## User Section

### Dashboard

**Endpoint:**
```http
GET /get_records_by_user/{user_id}
```

**Description:** Show all records for a user.

**Example Response:**
```json
{
  "message": "Records found",
  "records": [
    {
      "folder": "db/lost",
      "metadata": {
        "face_id": "458d9132-aa96-41e3-81b2-a2d69b8d3381",
        "name": "krish",
        "gender": "female",
        "age": 12,
        "where_lost": "efgbvb",
        "your_name": "fghgfg",
        "relation_with_lost": "gfdfghgfdfg",
        "user_id": "2139ebbf-3082-48ae-8969-1c6f63efacca",
        "mobile_no": "1234567898765",
        "email_id": "bhagatkrish65@gmail.com",
        "face_blob": "Base64",
        "face_path": "db/lost/458d9132-aa96-41e3-81b2-a2d69b8d3381.jpg"
      }
    }
  ]
}
```

**Display:** Show each record in card format.

---

### Report Lost

**Endpoint:**
```http
POST /upload_lost
```

**Form Fields:**
- name (str)
- gender (str)
- age (int)
- where_lost (str)
- your_name (str)
- relation_with_lost (str)
- user_id (str)
- mobile_no (str)
- email_id (str)
- file (UploadFile)

**Response:**
- If no match:
```json
{
  "message": "Lost person uploaded successfully.",
  "face_id": "593dead9-44d4-41fe-a4ad-c843ce4abb57",
  "matched_found_count": 0,
  "matched_live_count": 0,
  "matched_records": []
}
```
- If match found:
```json
{
  "message": "Lost person uploaded successfully.",
  "face_id": "ea8d7fcf-1f12-4c6e-be70-dd37934b8e63",
  "matched_found_count": 2,
  "matched_live_count": 0,
  "matched_records": [
    {
      "match_id": "5b0b86a5-dad3-4290-beaa-fd032f0774ce",
      "source": { ... },
      "matched_with": { ... },
      "face_path": "db/matched/5b0b86a5-dad3-4290-beaa-fd032f0774ce.jpg"
    }
  ]
}
```

**Display:**
- If `matched_found_count` or `matched_live_count` > 0, show each `matched_with` in a card with:
  - Image (from `face_blob`)
  - Face ID
  - Name
  - Gender
  - Age
  - Where Found
  - Founder Name (`your_name`)
  - Organization
  - Designation
  - Mobile No
  - Email ID
  - Emotion

---

### Face ID Search

**Endpoint:**
```http
GET /search_face/{face_id}
```

**Response:**
```json
{
  "message": "Face records found",
  "records": [
    {
      "folder": "db/lost",
      "metadata": {
        "face_id": "ea8d7fcf-1f12-4c6e-be70-dd37934b8e63",
        "name": "krish",
        "gender": "female",
        "age": 21,
        "where_lost": "indore",
        "your_name": "dsfg",
        "relation_with_lost": "sdfghg",
        "user_id": "waesrdtgfhjhgfd",
        "mobile_no": "asdfghhfxdfcg",
        "email_id": "bhagatkrish65@gmail.com",
        "face_blob": "Base64",
        "face_path": "db/lost/ea8d7fcf-1f12-4c6e-be70-dd37934b8e63.jpg"
      }
    }
  ]
}
```

**Display:** Show all results in card format.

---

## Admin Section

### Dashboard

**Endpoint:**
```http
GET /get_records_by_user/{user_id}
```

**Description:** Show all records for admin.

**Example Response:**
```json
{
  "message": "Records found",
  "records": [
    {
      "folder": "db/found",
      "metadata": {
        "face_id": "a6423b90-1a48-49cb-8340-93eaea13f251",
        "name": "unknown",
        "gender": "male",
        "age": 34,
        "where_found": "asdvfsfzd",
        "your_name": "szdfg",
        "organization": "zdxcfvgbh",
        "designation": "sdfghg",
        "user_id": "csxvvbnghmjhgfd",
        "mobile_no": "sadfghjhgfdsfg",
        "email_id": "kodrishsolutions@gmail.com",
        "face_blob": "Base64",
        "face_path": "db/found/a6423b90-1a48-49cb-8340-93eaea13f251.jpg"
      }
    }
  ]
}
```

**Display:** Show each record in card format.

---

### Upload Found Report

**Endpoint:**
```http
POST /upload_found
```

**Form Fields:**
- name (str)
- gender (str)
- age (int)
- where_found (str)
- your_name (str)
- organization (str)
- designation (str)
- user_id (str)
- mobile_no (str)
- email_id (str)
- file (UploadFile)

**Response:**
- If no match:
```json
{
  "message": "Found person uploaded successfully.",
  "face_id": "afa36e99-7264-4e24-a8df-33cd843c1a4c",
  "matched_lost_count": 0,
  "matched_records": []
}
```
- If match found:
```json
{
  "message": "Found person uploaded successfully.",
  "face_id": "842ee0cd-b96f-4b04-a8ef-4222491afbaf",
  "matched_lost_count": 1,
  "matched_records": [
    {
      "match_id": "298e4791-d162-4e7f-bc52-ab82c1f3c842",
      "source": { ... },
      "matched_with": { ... },
      "face_path": "db/matched/298e4791-d162-4e7f-bc52-ab82c1f3c842.jpg"
    }
  ]
}
```

**Display:**
- If `matched_lost_count` > 0, show each `matched_with` in a card with:
  - Image (from `face_blob`)
  - Face ID
  - Name
  - Gender
  - Age
  - Where Found
  - Reporter Name (`your_name`)
  - Relation with lost
  - Mobile No
  - Email ID
  - Emotion

---

### Live Feed

**Endpoint:**
```http
POST /upload_live_feed
```

**Form Fields:**
- camera_id (str)
- where_found (str)
- location (str)
- your_name (str)
- organization (str)
- designation (str)
- user_id (str)
- mobile_no (str)
- email_id (str)
- file (UploadFile)

**Instructions:**
- Store the metadata and show the image.
- Send frame every 3 seconds.

---

### Face ID Search (Admin)

**Endpoint:**
```http
GET /search_face/{face_id}
```

**Response:**
```json
{
  "message": "Face records found",
  "records": [
    {
      "folder": "db/lost",
      "metadata": {
        "face_id": "ea8d7fcf-1f12-4c6e-be70-dd37934b8e63",
        "name": "krish",
        "gender": "female",
        "age": 21,
        "where_lost": "indore",
        "your_name": "dsfg",
        "relation_with_lost": "sdfghg",
        "user_id": "waesrdtgfhjhgfd",
        "mobile_no": "asdfghhfxdfcg",
        "email_id": "bhagatkrish65@gmail.com",
        "face_blob": "Base64",
        "face_path": "db/lost/ea8d7fcf-1f12-4c6e-be70-dd37934b8e63.jpg"
      }
    }
  ]
}
```

**Display:** Show all results in card format (same as user).
