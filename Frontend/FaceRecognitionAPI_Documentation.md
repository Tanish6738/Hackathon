# Frontend API Documentation

This document provides all the necessary information for frontend developers to integrate the backend API endpoints with the user interface for the Lost and Found Face Recognition System.

---
 
## General Information
- **Base URL**: `https://krish09bha-dhruvai.hf.space`
- **Content Type**: `application/json` for GET requests, `multipart/form-data` for POST requests.
- **Authentication**: Currently, no authentication headers are required.

---

## Endpoints

### 1. **Upload Lost Person**
   **Endpoint**: `/upload_lost`  
   **Method**: `POST`

   **Purpose**: Upload the details and image of a lost person to the system.

   **Parameters**:
   | Parameter               | Type     | Required | Description                                   |
   |-------------------------|----------|----------|-----------------------------------------------|
   | `name`                 | `string` | Yes      | Name of the lost person                      |
   | `gender`               | `string` | Yes      | Gender of the lost person                    |
   | `age`                  | `int`    | Yes      | Age of the lost person                       |
   | `where_lost`           | `string` | Yes      | Location where the person was lost           |
   | `your_name`            | `string` | Yes      | Name of the person filing the report         |
   | `relation_with_lost`   | `string` | Yes      | Relationship of the reporter with the lost person |
   | `user_id`              | `string` | Yes      | Unique identifier for the reporting user     |
   | `mobile_no`            | `string` | Yes      | Mobile number of the reporter                |
   | `email_id`             | `string` | Yes      | Email ID of the reporter                     |
   | `file`                 | `File`   | Yes      | Image file of the lost person                |

   **Request (Example)** (Form-Data):
   ```json
   {
      "name": "John Doe",
      "gender": "Male",
      "age": 25,
      "where_lost": "Central Park",
      "your_name": "Jane Doe",
      "relation_with_lost": "Sibling",
      "user_id": "user12345",
      "mobile_no": "+123456789",
      "email_id": "janedoe@example.com",
      "file": "<File>"
   }
   ```

   **Response** (Success):
   ```json
   {
       "message": "Lost person uploaded successfully.",
       "matched_found": [
           {
               "face_id": "abc123",
               "name": "Matched Found Person",
               "gender": "Male",
               "age": 25,
               "location_found": "Main Street",
               ...
           }
       ]
   }
   ```

   **Response** (Error):
   ```json
   {
       "detail": "No face detected in the image."
   }
   ```

---

### 2. **Upload Found Person**
   **Endpoint**: `/upload_found`  
   **Method**: `POST`

   **Purpose**: Upload the details and image of a found person.

   **Parameters**:
   | Parameter               | Type     | Required | Description                                       |
   |-------------------------|----------|----------|---------------------------------------------------|
   | `name`                 | `string` | Yes      | Name of the found person                          |
   | `gender`               | `string` | Yes      | Gender of the found person                        |
   | `age`                  | `int`    | Yes      | Age of the found person                           |
   | `where_found`          | `string` | Yes      | Location where the person was found              |
   | `your_name`            | `string` | Yes      | Name of the person filing the report             |
   | `organization`         | `string` | Yes      | Organization the reporter belongs to             |
   | `designation`          | `string` | Yes      | Designation of the reporter                      |
   | `user_id`              | `string` | Yes      | Unique identifier for the reporting user         |
   | `mobile_no`            | `string` | Yes      | Mobile number of the reporter                    |
   | `email_id`             | `string` | Yes      | Email ID of the reporter                         |
   | `file`                 | `File`   | Yes      | Image file of the found person                   |

   **Request (Example)** (Form-Data):
   ```json
   {
      "name": "Unknown Person",
      "gender": "Male",
      "age": 30,
      "where_found": "Airport",
      "your_name": "Officer Jane",
      "organization": "Police Department",
      "designation": "Inspector",
      "user_id": "officer123",
      "mobile_no": "+987654321",
      "email_id": "officerjane@example.com",
      "file": "<File>"
   }
   ```

   **Response** (Success):
   ```json
   {
       "message": "Found person uploaded successfully.",
       "matched_lost": [
           {
               "face_id": "123abc",
               "name": "Matched Lost Person",
               "gender": "Male",
               "age": 30,
               "where_lost": "Central Park",
               ...
           }
       ]
   }
   ```

   **Response** (Error):
   ```json
   {
       "detail": "No face detected in the image."
   }
   ```

---

### 3. **Upload Live Feed**
   **Endpoint**: `/upload_live_feed`  
   **Method**: `POST`

   **Purpose**: Upload image data from live security camera feeds.

   **Parameters**:
   | Parameter               | Type     | Required | Description                                  |
   |-------------------------|----------|----------|----------------------------------------------|
   | `camera_id`            | `string` | Yes      | Identifier for the live feed camera         |
   | `where_found`          | `string` | Yes      | Specific location details                   |
   | `location`             | `string` | Yes      | General location (e.g., building name)      |
   | `your_name`            | `string` | Yes      | Name of the person providing the feed       |
   | `organization`         | `string` | Yes      | Organization of the person providing the feed |
   | `designation`          | `string` | Yes      | Designation of the person                   |
   | `user_id`              | `string` | Yes      | Unique identifier for the reporting user    |
   | `mobile_no`            | `string` | Yes      | Mobile number of the person providing the feed |
   | `email_id`             | `string` | Yes      | Email ID of the person providing the feed   |
   | `file`                 | `File`   | Yes      | Image from the security feed                |

   **Response**:
   ```json
   {
       "message": "Face added to the live feed successfully.",
       "metadata": {
           "face_id": "xyz123",
           "camera_id": "camera001",
           "location": "Mall Entrance",
           "location_details": "Main Gate",
           ...
       }
   }
   ```

---

### 4. **Get Records by User**
   **Endpoint**: `/get_records_by_user/{user_id}`  
   **Method**: `GET`

   **Purpose**: Fetch all records uploaded by a specific user.

   **Parameters**:
   | Parameter    | Type     | Required | Description                   |
   |--------------|----------|----------|-------------------------------|
   | `user_id`   | `string` | Yes      | Unique identifier of the user |

   **Response**:
   ```json
   {
       "message": "Records found.",
       "records": [
           {
               "source": "lost_people",
               "data": {
                   "face_id": "abc123",
                   "name": "John Doe",
                   ...
               }
           },
           {
               "source": "found_people",
               "data": {
                   "face_id": "xyz789",
                   "name": "Unknown Person",
                   ...
               }
           }
       ]
   }
   ```

   **Response** (No Records):
   ```json
   {
       "message": "No records found.",
       "records": []
   }
   ```

---

### 5. **Search Face by ID**
   **Endpoint**: `/search_face/{face_id}`  
   **Method**: `GET`

   **Purpose**: Look for face data using a unique `face_id`.

   **Parameters**:
   | Parameter  | Type     | Required | Description                            |
   |------------|----------|----------|----------------------------------------|
   | `face_id` | `string` | Yes      | Unique identifier for the face record |

   **Response**:
   ```json
   {
       "message": "Face found in lost_people.",
       "record": {
           "face_id": "abc123",
           "name": "John Doe",
           ...
       }
   }
   ```

   **Response** (Not Found):
   ```json
   {
       "detail": "Face ID not found."
   }
   ```

---

## Additional Notes
1. **Error Messages**: All error messages follow standardized HTTP response codes.
2. **Testing Tools**: Use FastAPI's Swagger UI `/docs` or Postman for testing endpoints.
3. **Image Upload**: Ensure the images uploaded are clear and contain recognizable faces. Blurry images may cause detection issues.

Happy coding!