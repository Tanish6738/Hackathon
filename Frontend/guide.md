# Lost and Found API Guide

## 🔺 1. Upload Lost Person

**Endpoint:** `POST /upload_lost`

**Form Data:**

| Field                | Type   | Required | Description                  |
|----------------------|--------|----------|------------------------------|
| name                 | string | ✅        | Lost person's name           |
| gender               | string | ✅        | 'm' / 'f' / 'other'          |
| age                  | int    | ✅        | Age of the lost person       |
| where_lost           | string | ✅        | Location where lost          |
| your_name            | string | ✅        | Reporting person's name      |
| relation_with_lost   | string | ✅        | Relation with lost person    |
| user_id              | string | ✅        | Logged-in user ID            |
| mobile_no            | string | ✅        | Contact number               |
| email_id             | string | ✅        | Email ID                     |
| file                 | file   | ✅        | Face image (JPG/PNG)         |

**Response:**

```json
{
    "message": "Lost person uploaded successfully.",
    "face_id": "uuid",
    "matched_found_count": 1,
    "matched_live_count": 0,
    "matched_records": []
}
```

---

## 🟩 2. Upload Found Person

**Endpoint:** `POST /upload_found`

**Form Data:**

| Field         | Type   | Required | Description                  |
|---------------|--------|----------|------------------------------|
| name          | string | ✅        | Name if known or "unknown"   |
| gender        | string | ✅        | 'm' / 'f' / 'other'          |
| age           | int    | ✅        | Estimated age                |
| where_found   | string | ✅        | Location where found         |
| your_name     | string | ✅        | Reporting person's name      |
| organization  | string | ✅        | Organization name            |
| designation   | string | ✅        | Role/designation             |
| user_id       | string | ✅        | Logged-in user ID            |
| mobile_no     | string | ✅        | Contact number               |
| email_id      | string | ✅        | Email ID                     |
| file          | file   | ✅        | Image file                   |

**Response:**

```json
{
    "message": "Found person uploaded successfully.",
    "face_id": "uuid",
    "matched_lost_count": 1,
    "matched_records": []
}
```

---

## 🟦 3. Upload Live Feed Frame

**Endpoint:** `POST /upload_live_feed`

**Form Data:**

| Field         | Type   | Required | Description                  |
|---------------|--------|----------|------------------------------|
| camera_id     | string | ✅        | Unique camera identifier     |
| where_found   | string | ✅        | Location                     |
| location      | string | ✅        | Exact place/location details |
| your_name     | string | ✅        | Operator's name              |
| organization  | string | ✅        | Organization name            |
| designation   | string | ✅        | Role/designation             |
| user_id       | string | ✅        | Logged-in user ID            |
| mobile_no     | string | ✅        | Contact number               |
| email_id      | string | ✅        | Email ID                     |
| file          | file   | ✅        | Camera frame                 |

**Response:**

```json
{
    "message": "Live feed uploaded",
    "matches": [
        {
            "face_id": "...",
            "matched_with": "...",
            "...": "..."
        }
    ]
}
```

---

## 🔍 4. Get Records by User ID

**Endpoint:** `GET /get_records_by_user/{user_id}`

- **URL Param:** `user_id` — ID of the user whose submissions are needed.

**Response:**

```json
{
    "message": "Records found",
    "records": [
        {
            "folder": "db/lost",
            "metadata": {
                "name": "...",
                "face_blob": "BASE64_STRING"
                // ...
            }
        }
    ]
}
```

---

## 🔎 5. Search by Face ID

**Endpoint:** `GET /search_face/{face_id}`

- **URL Param:** `face_id` — Unique face identifier

**Response:**

```json
{
    "message": "Face records found",
    "records": [
        {
            "folder": "db/lost",
            "metadata": {
                "name": "...",
                "face_blob": "BASE64_STRING"
                // ...
            }
        }
    ]
}
```

---

## 🖼️ Image Handling on Frontend

`face_blob` fields contain base64-encoded images.

To display in React:

```jsx
<img src={`data:image/jpeg;base64,${face_blob}`} alt="face" />
```

---

## 🧠 Matching Example

```json
{
    "match_id": "a148d913-a373-46e2-b241-c8dfa9e0c9c5",
    "source": {
        "face_id": "...",
        "name": "unknown",
        "gender": "m",
        // ...
        "face_blob": "BASE64_STRING"
    },
    "matched_with": {
        "face_id": "...",
        "name": "Krish",
        "where_lost": "Dhar",
        // ...
        "face_blob": "BASE64_STRING"
    },
    "matched_image_blob": "BASE64_STRING"
}
```

You can render side-by-side faces in your UI using the `face_blob` of both `source` and `matched_with`, plus the `matched_image_blob`.
