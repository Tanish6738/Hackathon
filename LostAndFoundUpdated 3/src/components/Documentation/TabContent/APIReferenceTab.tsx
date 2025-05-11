import APIEndpoint from "../APIEndpoint"
import { CardHeader, CardTitle, CardDescription, CardContent, Card } from "../../ui/card"
import CodeBlock from "../CodeBlock"

export default function APIReferenceTab() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-extrabold mb-6 text-blue-900">API Reference</h1>
        <p className="text-gray-700 mb-6 text-lg">
          The Dhruv AI API is designed for seamless integration, security, and performance. Below are the primary endpoints and their usage.
        </p>
      </section>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">API Overview</h2>
        <p className="text-gray-600 mb-4">
          The Dhruv AI API is built using FastAPI and provides endpoints for uploading lost and found person
          information, processing images, and retrieving match results. All endpoints return JSON responses.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-blue-700">
            <strong>Base URL:</strong> https://api.dhruv-ai.example.com/v1
          </p>
        </div>
      </div>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold mb-4">Endpoints</h2>
        <APIEndpoint
          method="POST"
          endpoint="/upload_lost"
          description="Upload a lost person's information along with their image."
          parameters={[
            { name: "name", type: "string", description: "Name of the lost person", required: true },
            { name: "gender", type: "string", description: "Gender of the lost person", required: true },
            { name: "age", type: "integer", description: "Age of the lost person", required: true },
            {
              name: "where_lost",
              type: "string",
              description: "Location where the person was lost",
              required: true,
            },
            {
              name: "file",
              type: "file",
              description: "Image of the lost person (must contain a clear face)",
              required: true,
            },
          ]}
          responses={[
            { status: "200 OK", description: "Successfully uploaded lost person information" },
            { status: "400 Bad Request", description: "No face detected in the image or invalid parameters" },
            { status: "500 Internal Server Error", description: "Server error processing the request" },
          ]}
          example={{
            language: "python",
            code: `import requests\n\n# API endpoint\nurl = "https://api.dhruv-ai.example.com/v1/upload_lost"\n\n# Form data\ndata = {\n    "name": "John Doe",\n    "gender": "Male",\n    "age": 35,\n    "where_lost": "Central Park, New York"\n}\n\n# Image file\nfiles = {\n    "file": open("john_doe.jpg", "rb")\n}\n\n# Send POST request\nresponse = requests.post(url, data=data, files=files)\n\n# Print response\nprint(response.json())\n\n# Example response:\n# {\n#   "message": "Lost person information uploaded successfully",\n#   "face_id": "550e8400-e29b-41d4-a716-446655440000",\n#   "match_found": false,\n#   "match_id": null\n# }`,
          }}
        />
        <APIEndpoint
          method="POST"
          endpoint="/upload_found"
          description="Upload a found person's information along with their image."
          parameters={[
            {
              name: "name",
              type: "string",
              description: "Name or identifier of the found person",
              required: false,
            },
            { name: "gender", type: "string", description: "Gender of the found person", required: false },
            { name: "age", type: "integer", description: "Estimated age of the found person", required: false },
            {
              name: "where_found",
              type: "string",
              description: "Location where the person was found",
              required: true,
            },
            {
              name: "file",
              type: "file",
              description: "Image of the found person (must contain a clear face)",
              required: true,
            },
          ]}
          responses={[
            { status: "200 OK", description: "Successfully uploaded found person information" },
            { status: "400 Bad Request", description: "No face detected in the image or invalid parameters" },
            { status: "500 Internal Server Error", description: "Server error processing the request" },
          ]}
          example={{
            language: "python",
            code: `import requests\n\n# API endpoint\nurl = "https://api.dhruv-ai.example.com/v1/upload_found"\n\n# Form data\ndata = {\n    "name": "Unknown",\n    "gender": "Male",\n    "age": 30,\n    "where_found": "Times Square, New York"\n}\n\n# Image file\nfiles = {\n    "file": open("found_person.jpg", "rb")\n}\n\n# Send POST request\nresponse = requests.post(url, data=data, files=files)\n\n# Print response\nprint(response.json())\n\n# Example response:\n# {\n#   "message": "Found person information uploaded successfully",\n#   "face_id": "7b6d17c0-8dc3-4f31-b82d-c5a960e9a9c9",\n#   "match_found": true,\n#   "match_id": "550e8400-e29b-41d4-a716-446655440000_7b6d17c0-8dc3-4f31-b82d-c5a960e9a9c9",\n#   "match_details": {\n#     "lost_person": {\n#       "name": "John Doe",\n#       "gender": "Male",\n#       "age": 35,\n#       "where_lost": "Central Park, New York"\n#     },\n#     "similarity": 0.92\n#   }\n# }`,
          }}
        />
        <APIEndpoint
          method="POST"
          endpoint="/upload_live_feed"
          description="Upload live feed from a camera to detect faces."
          parameters={[
            { name: "camera_id", type: "string", description: "Camera ID", required: true },
            { name: "location", type: "string", description: "Location of the camera", required: true },
            { name: "file", type: "file", description: "Image from the camera feed", required: true },
          ]}
          responses={[
            { status: "200 OK", description: "Successfully processed live feed image" },
            { status: "400 Bad Request", description: "No face detected in the image or invalid parameters" },
            { status: "500 Internal Server Error", description: "Server error processing the request" },
          ]}
        />
        <APIEndpoint
          method="GET"
          endpoint="/search_face/{face_id}"
          description="Search for a person by face_id in the system."
          parameters={[
            {
              name: "face_id",
              type: "string",
              description: "The unique face ID generated for the person",
              required: true,
            },
          ]}
          responses={[
            { status: "200 OK", description: "Successfully retrieved face information" },
            { status: "404 Not Found", description: "Face ID not found in the system" },
            { status: "500 Internal Server Error", description: "Server error processing the request" },
          ]}
          example={{
            language: "python",
            code: `import requests\n\n# API endpoint\nface_id = "550e8400-e29b-41d4-a716-446655440000"\nurl = f"https://api.dhruv-ai.example.com/v1/search_face/{face_id}"\n\n# Send GET request\nresponse = requests.get(url)\n\n# Print response\nprint(response.json())\n\n# Example response:\n# {\n#   "face_id": "550e8400-e29b-41d4-a716-446655440000",\n#   "name": "John Doe",\n#   "gender": "Male",\n#   "age": 35,\n#   "where_lost": "Central Park, New York",\n#   "timestamp": "2023-05-15T14:30:45.123456",\n#   "matches": [\n#     {\n#       "match_id": "550e8400-e29b-41d4-a716-446655440000_7b6d17c0-8dc3-4f31-b82d-c5a960e9a9c9",\n#       "found_face_id": "7b6d17c0-8dc3-4f31-b82d-c5a960e9a9c9",\n#       "similarity": 0.92,\n#       "where_found": "Times Square, New York",\n#       "found_timestamp": "2023-05-16T10:15:30.654321"\n#     }\n#   ]\n# }`,
          }}
        />
        <APIEndpoint
          method="GET"
          endpoint="/matches"
          description="Get a list of all matches between lost and found persons."
          parameters={[
            {
              name: "limit",
              type: "integer",
              description: "Maximum number of matches to return",
              required: false,
            },
            { name: "offset", type: "integer", description: "Number of matches to skip", required: false },
          ]}
          responses={[
            { status: "200 OK", description: "Successfully retrieved matches" },
            { status: "500 Internal Server Error", description: "Server error processing the request" },
          ]}
        />
        <APIEndpoint
          method="GET"
          endpoint="/statistics"
          description="Get statistics about the system usage and matches."
          responses={[
            { status: "200 OK", description: "Successfully retrieved statistics" },
            { status: "500 Internal Server Error", description: "Server error processing the request" },
          ]}
          example={{
            language: "python",
            code: `import requests\n\n# API endpoint\nurl = "https://api.dhruv-ai.example.com/v1/statistics"\n\n# Send GET request\nresponse = requests.get(url)\n\n# Print response\nprint(response.json())\n\n# Example response:\n# {\n#   "total_lost": 156,\n#   "total_found": 89,\n#   "total_matches": 42,\n#   "match_rate": 26.92,\n#   "average_similarity": 0.87,\n#   "processing_time_avg_ms": 245,\n#   "last_24h": {\n#     "new_lost": 12,\n#     "new_found": 8,\n#     "new_matches": 5\n#   }\n# }`,
          }}
        />
      </div>
      {/* Authentication and Rate Limiting Cards */}
      {/* You may want to import Card, CardHeader, CardTitle, CardDescription, CardContent, and CodeBlock if not already imported */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Securing API requests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            The Dhruv AI API uses API keys for authentication. To authenticate your requests, include your API
            key in the
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">X-API-Key</code> header.
          </p>
          <CodeBlock
            language="python"
            code={`import requests\n\n# API endpoint\nurl = "https://api.dhruv-ai.example.com/v1/statistics"\n\n# Headers with API key\nheaders = {\n    "X-API-Key": "your_api_key_here"\n}\n\n# Send GET request with authentication\nresponse = requests.get(url, headers=headers)\n\n# Print response\nprint(response.json())`}
          />
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="text-yellow-700">
              <strong>Note:</strong> Keep your API key secure and do not expose it in client-side code.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Rate Limiting</CardTitle>
          <CardDescription>API usage limits</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            The API implements rate limiting to ensure fair usage and system stability. The current limits are:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-600">
            <li>Free tier: 100 requests per day, max 10 requests per minute</li>
            <li>Standard tier: 1,000 requests per day, max 60 requests per minute</li>
            <li>Premium tier: 10,000 requests per day, max 300 requests per minute</li>
          </ul>
          <p className="mt-4 text-gray-600">
            If you exceed these limits, the API will return a{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">429 Too Many Requests</code>{" "}
            response. The response will include{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">X-RateLimit-Remaining</code> and
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">X-RateLimit-Reset</code> headers
            to help you manage your usage.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
