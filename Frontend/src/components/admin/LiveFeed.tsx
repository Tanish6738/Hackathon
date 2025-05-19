import React, { useState } from "react";
import { Loader2, AlertCircle, Code } from "lucide-react";
import CameraFeed from "./CameraFeed";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

// API base URL
const API_URL = "https://krish09bha-dhruvai.hf.space";

interface LiveFeedProps {
  userId: string;
}

const LiveFeed: React.FC<LiveFeedProps> = ({ userId }) => {
  // Camera metadata state
  const [metadata, setMetadata] = useState({
    camera_id: "",
    where_found: "",
    location: "",
    your_name: "Officer John Doe", // Pre-filled for admin
    organization: "NYPD", // Pre-filled for admin
    designation: "Police Officer", // Pre-filled for admin
    user_id: userId, // Use the provided userId
    mobile_no: "555-123-4567", // Pre-filled for admin
    email_id: "john.doe@police.gov", // Pre-filled for admin
  });

  // Camera and processing state
  const [isCameraSetup, setIsCameraSetup] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [processingStats, setProcessingStats] = useState({
    framesProcessed: 0,
    facesDetected: 0,
    matchesFound: 0,
  });
  
  // New state to track the latest API response
  const [latestResponse, setLatestResponse] = useState<any>(null);

  // Handle input change for metadata form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadata((prev) => ({ ...prev, [name]: value }));
  };

  // Setup camera
  const setupCamera = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading

    if (!metadata.camera_id || !metadata.location || !metadata.where_found) {
      setError("Please fill in all required camera metadata fields");
      return;
    }

    setIsCameraSetup(true);
  };

  // Handle camera streaming state change
  const handleCameraStateChange = (streaming: boolean) => {
    setIsStreaming(streaming);
  };

  // Process a frame from the camera
  const processFrame = async (blob: Blob) => {
    try {
      // Create FormData with metadata and image
      const formData = new FormData();
      Object.entries(metadata).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      formData.append("file", blob, "frame.jpg");

      console.log("Sending frame to API...");

      // Send to API
      const response = await fetch(`${API_URL}/upload_live_feed`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process frame");
      }

      const data = await response.json();
      console.log("API response:", data);
      
      // Store the latest API response
      setLatestResponse(data);

      // Update stats
      setProcessingStats((prev) => ({
        framesProcessed: prev.framesProcessed + 1,
        facesDetected: prev.facesDetected + (data.matches ? data.matches.length : 0),
        matchesFound: prev.matchesFound + (data.matches ? data.matches.filter((m: any) => m.confidence > 0.7).length : 0),
      }));

      // If matches were found
      if (data.matches && data.matches.length > 0) {
        // Update matches list if high confidence matches found
        const highConfidenceMatches = data.matches.filter((m: any) => m.confidence > 0.7);
        if (highConfidenceMatches.length > 0) {
          setMatches((prev) => {
            // Keep only the last 5 high confidence matches
            const newMatches = [...highConfidenceMatches, ...prev].slice(0, 5);
            return newMatches;
          });
        }
      }
    } catch (err) {
      console.error("Error processing frame:", err);
      // Don't set error state to avoid UI disruption during streaming
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Live Camera Feed</h2>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isCameraSetup ? (
        <Card>
          <form onSubmit={setupCamera}>
            <CardHeader>
              <CardTitle>Camera Metadata</CardTitle>
              <CardDescription>Enter information about this camera before starting the feed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="camera_id">Camera ID</Label>
                  <Input
                    id="camera_id"
                    name="camera_id"
                    placeholder="Unique camera identifier"
                    value={metadata.camera_id}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Camera location (e.g., 'Main Street Station')"
                    value={metadata.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="where_found">Area Description</Label>
                  <Textarea
                    id="where_found"
                    name="where_found"
                    placeholder="Detailed description of the area being monitored"
                    value={metadata.where_found}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="your_name">Officer Name</Label>
                  <Input
                    id="your_name"
                    name="your_name"
                    value={metadata.your_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    name="organization"
                    value={metadata.organization}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    name="designation"
                    value={metadata.designation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile_no">Contact Number</Label>
                  <Input
                    id="mobile_no"
                    name="mobile_no"
                    value={metadata.mobile_no}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email_id">Email</Label>
                  <Input
                    id="email_id"
                    name="email_id"
                    type="email"
                    value={metadata.email_id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
              className="bg-black text-white hover:bg-gray-800 hover:text-white hover:cursor-pointer"
              type="submit" disabled={loading || isCameraSetup}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isCameraSetup ? "Camera Ready" : "Setup Camera"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Live Camera Feed</CardTitle>
                <CardDescription>
                  {isStreaming ? "Streaming and processing faces..." : "Camera ready - initializing stream..."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CameraFeed onFrame={processFrame} interval={1000} onStreamingChange={handleCameraStateChange} />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Camera ID: {metadata.camera_id} | Location: {metadata.location}
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Statistics</CardTitle>
                <CardDescription>Real-time face detection metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge className={isStreaming ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {isStreaming ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Frames Processed:</span>
                    <span>{processingStats.framesProcessed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Faces Detected:</span>
                    <span>{processingStats.facesDetected}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Matches Found:</span>
                    <span>{processingStats.matchesFound}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recent Matches</h3>
                  {matches.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No matches detected yet</p>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {matches.map((match, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                          {match.matched_with && match.matched_with.face_blob && (
                            <div className="relative h-10 w-10 rounded overflow-hidden">
                              <img
                                src={`data:image/jpeg;base64,${match.matched_with.face_blob}`}
                                alt="Matched person"
                                className="object-cover h-full w-full"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">
                              {match.matched_with?.name || "Unknown Person"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Match confidence: {Math.round(match.confidence * 100)}%
                            </div>
                          </div>
                          <div>
                            <Badge className="bg-red-100 text-red-800 mb-1">Match</Badge>
                            <Button size="sm" variant="outline" className="h-6 text-xs w-full">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Card to display the API response */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" /> API Response
              </CardTitle>
              <CardDescription>Latest response from the API</CardDescription>
            </CardHeader>
            <CardContent>
              {latestResponse ? (
                <div className="bg-gray-50 p-4 rounded-md border overflow-x-auto">
                  <pre className="text-xs whitespace-pre-wrap font-mono">
                    {JSON.stringify(latestResponse, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No API response received yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LiveFeed;
