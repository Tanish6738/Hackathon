const API_URL = "http://localhost:8000"; // Replace with your actual API URL

export interface LostPersonData {
  name: string;
  gender: string;
  age: number;
  where_lost: string;
  your_name: string;
  relation_with_lost: string;
  user_id: string;
  mobile_no: string;
  email_id: string;
  file: File;
}

export interface FoundPersonData {
  name: string;
  gender: string;
  age: number;
  where_found: string;
  your_name: string;
  organization: string;
  designation: string;
  user_id: string;
  mobile_no: string;
  email_id: string;
  file: File;
}

export interface LiveFeedData {
  camera_id: string;
  where_found: string;
  location: string;
  your_name: string;
  organization: string;
  designation: string;
  user_id: string;
  mobile_no: string;
  email_id: string;
  file: Blob;
}

export interface MatchedRecord {
  match_id: string;
  source: any;
  matched_with: {
    face_id: string;
    name: string;
    gender: string;
    age: number;
    where_found?: string;
    where_lost?: string;
    your_name: string;
    organization?: string;
    designation?: string;
    relation_with_lost?: string;
    user_id: string;
    mobile_no: string;
    email_id: string;
    face_blob: string;
    face_path: string;
    emotion?: string;
  };
  face_path: string;
}

export interface RecordItem {
  folder: string;
  metadata: {
    face_id: string;
    name: string;
    gender: string;
    age: number;
    where_lost?: string;
    where_found?: string;
    your_name: string;
    relation_with_lost?: string;
    organization?: string;
    designation?: string;
    user_id: string;
    mobile_no: string;
    email_id: string;
    face_blob: string;
    face_path: string;
    emotion?: string;
  };
}

export interface RecordsResponse {
  message: string;
  records: RecordItem[];
}

export interface LostPersonResponse {
  message: string;
  face_id: string;
  matched_found_count: number;
  matched_live_count: number;
  matched_records: MatchedRecord[];
}

export interface FoundPersonResponse {
  message: string;
  face_id: string;
  matched_lost_count: number;
  matched_records: MatchedRecord[];
}

export interface FaceSearchResponse {
  message: string;
  records: RecordItem[];
}

export interface LiveFeedResponse {
  message: string;
  matches: MatchedRecord[];
}

export const getRecordsByUser = async (userId: string): Promise<RecordsResponse> => {
  if (!userId) {
    return { message: "No user ID provided", records: [] };
  }
  const response = await fetch(`${API_URL}/get_records_by_user/${userId}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch records");
  }
  const data = await response.json();
  console.log('getRecordsByUser response:', data);
  return data;
};

export const reportLostPerson = async (data: LostPersonData): Promise<LostPersonResponse> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  const response = await fetch(`${API_URL}/upload_lost`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit lost person report");
  }

  return response.json();
};

export const reportFoundPerson = async (data: FoundPersonData): Promise<FoundPersonResponse> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'file') {
      formData.append('file', value);
    } else {
      formData.append(key, value.toString());
    }
  });

  try {
    console.log("Submitting found person data:", Object.fromEntries(formData.entries()));
    const response = await fetch(`${API_URL}/upload_found`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to submit found person report");
    }

    const result = await response.json();
    console.log("Found person response:", result);
    return result;
  } catch (error) {
    console.error("Error in reportFoundPerson:", error);
    throw error;
  }
};

export const submitLiveFeed = async (data: LiveFeedData): Promise<LiveFeedResponse> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'file') {
      formData.append(key, value.toString());
    }
  });
  formData.append('file', data.file, 'frame.jpg');

  const response = await fetch(`${API_URL}/upload_live_feed`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit live feed frame");
  }

  return response.json();
};

export const searchFaceById = async (faceId: string): Promise<FaceSearchResponse> => {
  console.log('[api.ts] searchFaceById called with faceId:', faceId);
  const response = await fetch(`${API_URL}/search_face/${faceId}`);
  if (!response.ok) {
    // Try to parse error message from backend, fallback to generic
    let errorMsg = "Failed to search for face";
    try {
      const err = await response.json();
      errorMsg = err.detail || errorMsg;
      console.error('[api.ts] searchFaceById error response:', err);
    } catch (e) {
      console.error('[api.ts] searchFaceById error parsing error response:', e);
    }
    throw new Error(errorMsg);
  }
  const data = await response.json();
  console.log('[api.ts] searchFaceById success response:', data);
  // Defensive: always return an object with records as an array
  return {
    message: data.message || '',
    records: Array.isArray(data.records) ? data.records : [],
  };
};
