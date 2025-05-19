import { useState, ReactNode, ButtonHTMLAttributes } from "react";
import {
  ArrowRight,
  Brain,
  Cpu,
  Zap,
  Github,
} from "lucide-react";
import image from "../../public/image.png";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import Sidebar from "../components/Documentation/Sidebar";

// Utility function for class names
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Button Component
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: ReactNode;
};
function Button({ className = "", variant = "default", size = "default", children, ...props }: ButtonProps) {
  const buttonVariants: Record<string, string> = {
    default:
      "inline-flex items-center justify-center rounded-md bg-blue-600 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    outline:
      "inline-flex items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    secondary:
      "inline-flex items-center justify-center rounded-md bg-secondary text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    ghost:
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    link: "inline-flex items-center justify-center text-sm font-medium text-blue-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  };

  const buttonSizes: Record<string, string> = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };

  return (
    <button className={cn(buttonVariants[variant], buttonSizes[size], className)} {...props}>
      {children}
    </button>
  );
}

// Code Block Component
function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0 bg-gray-200 text-xs px-2 py-1 rounded-bl font-mono">{language}</div>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm font-mono border mt-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// API Endpoint Component
type APIParam = { name: string; type: string; description: string; required?: boolean };
type APIResponse = { status: string; description: string };
type APIExample = { language: string; code: string };
function APIEndpoint({ method, endpoint, description, parameters = [], responses = [], example = null }: {
  method: string;
  endpoint: string;
  description: string;
  parameters?: APIParam[];
  responses?: APIResponse[];
  example?: APIExample | null;
}) {
  const methodColors: Record<string, string> = {
    GET: "bg-green-100 text-green-800",
    POST: "bg-blue-100 text-blue-800",
    PUT: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
  };

  return (
    <div className="border rounded-md mb-6">
      <div className="flex items-center p-4 border-b bg-gray-50">
        <span className={`${methodColors[method]} px-2 py-1 rounded text-xs font-bold mr-3`}>{method}</span>
        <code className="font-mono text-sm">{endpoint}</code>
      </div>
      <div className="p-4">
        <p className="mb-4">{description}</p>
        {parameters.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Parameters</h4>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-2 py-1 text-left text-xs font-bold">Name</th>
                  <th className="px-2 py-1 text-left text-xs font-bold">Type</th>
                  <th className="px-2 py-1 text-left text-xs font-bold">Description</th>
                  <th className="px-2 py-1 text-left text-xs font-bold">Required</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1 font-mono text-xs">{param.name}</td>
                    <td className="px-2 py-1 text-xs">{param.type}</td>
                    <td className="px-2 py-1 text-xs">{param.description}</td>
                    <td className="px-2 py-1 text-xs">{param.required ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {responses.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Responses</h4>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-2 py-1 text-left text-xs font-bold">Status</th>
                  <th className="px-2 py-1 text-left text-xs font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1 font-mono text-xs">{response.status}</td>
                    <td className="px-2 py-1 text-xs">{response.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {example && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Example</h4>
            <CodeBlock language={example.language} code={example.code} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex mt-16">
      {/* Sidebar always as first child for overlay/sticky behavior */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Main content */}
      <div className="flex-1 flex flex-col relative z-10">
        <main className="max-w-5xl w-full mx-auto px-2 sm:px-6 py-6 sm:py-10 flex-1">
          <div className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-blue-100 p-4 sm:p-8 min-h-[80vh]">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-10">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-blue-900 drop-shadow">Dhruv AI: A Guiding Star to Bring the Lost Back Home</h1>
                  <div className="bg-blue-50/80 border-l-4 border-blue-500 p-4 sm:p-6 rounded-xl mb-6 shadow-sm">
                    <p className="text-blue-700 text-base sm:text-lg font-medium">
                      An innovative solution designed to help locate lost individuals and reunite them with their loved ones using advanced face detection and recognition technologies.
                    </p>
                  </div>
                  <p className="text-gray-700 mb-4 text-base sm:text-lg">
                    Dhruv AI is a comprehensive system that leverages artificial intelligence to address the critical issue of missing persons. By combining state-of-the-art face detection and recognition technologies, Dhruv AI provides a reliable platform for identifying and locating missing individuals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg text-lg font-semibold px-6 py-3">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button variant="outline" className="border-blue-600 text-blue-700 font-semibold px-6 py-3">
                      <Github className="mr-2 h-5 w-5" />
                      View on GitHub
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="rounded-xl shadow-md bg-white/90 border border-blue-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-semibold">Face Detection</CardTitle>
                      <Brain className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">YOLOv5</div>
                      <p className="text-xs text-gray-500">Detects faces in images with high accuracy</p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-xl shadow-md bg-white/90 border border-blue-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-semibold">Face Verification</CardTitle>
                      <Zap className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">DeepFace</div>
                      <p className="text-xs text-gray-500">Matches faces between lost and found databases</p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-xl shadow-md bg-white/90 border border-blue-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-semibold">API</CardTitle>
                      <Cpu className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">FastAPI</div>
                      <p className="text-xs text-gray-500">High-performance API for handling requests</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-blue-900">Core Features</h2>
                  <div className="bg-white/90 rounded-xl shadow p-6 border border-blue-100">
                    <ul className="space-y-4">
                      <li className="flex">
                        <div className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-900">Face detection and cropping</p>
                          <p className="text-sm text-gray-500">Automatically detects and crops faces from uploaded images</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-900">Storing metadata with face images</p>
                          <p className="text-sm text-gray-500">Maintains detailed information about each person</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-900">Matching faces from 'lost' and 'found' databases</p>
                          <p className="text-sm text-gray-500">Compares faces to identify potential matches</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-900">Real-time face recognition and matching from live feed</p>
                          <p className="text-sm text-gray-500">Processes camera feeds to identify missing persons</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/90 rounded-xl shadow p-6 border border-blue-100">
                  <h2 className="text-2xl font-bold mb-4 text-blue-900">Quick Start</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. Installation</h3>
                      <CodeBlock
                        language="bash"
                        code={`git clone https://github.com/username/dhruv-ai.git\ncd dhruv-ai\npip install -r requirements.txt`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. Start the API server</h3>
                      <CodeBlock language="bash" code={`uvicorn app.main:app --reload`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Access the web interface</h3>
                      <p className="text-gray-700 mb-2">Open your browser and navigate to:</p>
                      <CodeBlock language="text" code={`https://krish09bha-dhruvai.hf.space`} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Methodology Tab */}
            {activeTab === "methodology" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-6">Methodology</h1>
                  <p className="text-gray-600 mb-6">
                    The methodology involves capturing images or video frames, detecting faces using YOLO, and saving
                    those faces in dedicated folders for 'lost', 'found', and 'live feed' categories. Once faces are
                    captured, they are compared using DeepFace's face verification model.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Face Detection</CardTitle>
                      <CardDescription>Identifying faces in images</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-600">
                        YOLOv5 model is used for face detection in images. The model is trained to identify human faces
                        with high accuracy, even in complex backgrounds and varying lighting conditions.
                      </p>
                      <p className="text-gray-600">
                        Once a face is detected, the system crops the face from the image and saves it locally for further
                        processing and matching.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Face Matching</CardTitle>
                      <CardDescription>Comparing faces for identification</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-600">
                        DeepFace is used to compare images and verify whether a face from the 'found' list matches any
                        face from the 'lost' list.
                      </p>
                      <p className="text-gray-600">
                        The system uses advanced facial recognition algorithms to compare facial features and determine if
                        two faces belong to the same person, even if the images were taken under different conditions or
                        at different times.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>End-to-end Flow</CardTitle>
                    <CardDescription>Complete process from upload to matching</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute left-3 inset-y-0 w-0.5 bg-gray-200"></div>
                      <ol className="space-y-6 relative">
                        <li className="ml-10 relative">
                          <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                            1
                          </div>
                          <h4 className="text-lg font-medium">Image Upload</h4>
                          <p className="text-gray-600 mt-1">
                            Users upload images for lost and found individuals through the web interface or API.
                          </p>
                        </li>
                        <li className="ml-10 relative">
                          <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                            2
                          </div>
                          <h4 className="text-lg font-medium">Face Detection</h4>
                          <p className="text-gray-600 mt-1">
                            The system processes the uploaded images using YOLOv5 to detect faces.
                          </p>
                        </li>
                        <li className="ml-10 relative">
                          <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                            3
                          </div>
                          <h4 className="text-lg font-medium">Face Cropping & Storage</h4>
                          <p className="text-gray-600 mt-1">
                            Detected faces are cropped and stored in the appropriate database ('lost' or 'found') along
                            with metadata.
                          </p>
                        </li>
                        <li className="ml-10 relative">
                          <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                            4
                          </div>
                          <h4 className="text-lg font-medium">Face Matching</h4>
                          <p className="text-gray-600 mt-1">
                            The system matches faces between the 'lost' and 'found' images using DeepFace.
                          </p>
                        </li>
                        <li className="ml-10 relative">
                          <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                            5
                          </div>
                          <h4 className="text-lg font-medium">Result Processing</h4>
                          <p className="text-gray-600 mt-1">
                            If a match is found, a record is saved in the 'matched' folder and returned to the user.
                          </p>
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Architecture Tab */}
            {activeTab === "architecture" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-6">System Architecture</h1>
                  <p className="text-gray-600 mb-6">
                    The Dhruv AI system is built using FastAPI for creating the API and handling requests. The
                    architecture consists of several core modules working together to provide a complete solution.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Architecture Overview</h2>
                  <img
                    src={image}
                    alt="Dhruv AI Architecture Diagram"
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <p className="text-gray-600">
                    The architecture follows a modular design with clear separation of concerns between face detection,
                    face matching, data storage, and API interfaces. This allows for easy maintenance and future
                    enhancements.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Face Detection Module</CardTitle>
                      <CardDescription>YOLOv5 for face detection</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-600">
                        The face detection module uses YOLOv5, a state-of-the-art object detection model, to detect faces
                        in images. The model is trained to identify human faces with high accuracy, even in complex
                        backgrounds and varying lighting conditions.
                      </p>
                      <p className="text-gray-600">
                        Once a face is detected, the system crops the face from the image and saves it locally for further
                        processing and matching.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Face Matching Module</CardTitle>
                      <CardDescription>DeepFace for face verification</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-600">
                        The face matching module uses DeepFace to compare images and verify whether a face from the
                        'found' list matches any face from the 'lost' list.
                      </p>
                      <p className="text-gray-600">
                        The system uses advanced facial recognition algorithms to compare facial features and determine if
                        two faces belong to the same person, even if the images were taken under different conditions or
                        at different times.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Flow</CardTitle>
                    <CardDescription>How data moves through the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">The data flow in Dhruv AI follows these key steps:</p>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                        <li>
                          <span className="font-medium">Data Ingestion:</span> Images are uploaded through the API
                          endpoints and stored temporarily.
                        </li>
                        <li>
                          <span className="font-medium">Face Detection:</span> The YOLOv5 model processes the images to
                          detect and crop faces.
                        </li>
                        <li>
                          <span className="font-medium">Metadata Association:</span> User-provided information is
                          associated with the detected faces.
                        </li>
                        <li>
                          <span className="font-medium">Database Storage:</span> Faces and metadata are stored in the
                          appropriate database ('lost' or 'found').
                        </li>
                        <li>
                          <span className="font-medium">Face Matching:</span> When new faces are added, they are compared
                          against the existing database.
                        </li>
                        <li>
                          <span className="font-medium">Result Processing:</span> Matches are recorded and notifications
                          are sent to relevant parties.
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Directory Structure</CardTitle>
                    <CardDescription>Organization of project files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="text"
                      code={`dhruv-ai/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── models/              # Data models
│   ├── routers/             # API endpoints
│   ├── services/            # Business logic
│   │   ├── face_detection.py
│   │   ├── face_matching.py
│   │   └── storage.py
│   └── utils/               # Utility functions
├── data/
│   ├── lost/                # Lost persons database
│   ├── found/               # Found persons database
│   └── matched/             # Matched records
├── models/
│   ├── yolov5/              # YOLOv5 model files
│   └── deepface/            # DeepFace model files
├── static/                  # Static files for web interface
├── templates/               # HTML templates
├── tests/                   # Unit and integration tests
├── .env                     # Environment variables
├── requirements.txt         # Python dependencies
└── README.md                # Project documentation`}
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Implementation Tab */}
            {activeTab === "implementation" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-6">Implementation Details</h1>
                  <p className="text-gray-600 mb-6">
                    Technical implementation of the Dhruv AI system, including languages, frameworks, and code samples.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Technologies Used</CardTitle>
                      <CardDescription>Languages and frameworks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Languages</h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-600">
                            <li>Python - AI models, backend processing, data management</li>
                            <li>JavaScript - Frontend development</li>
                            <li>HTML & CSS - Web interface structure and styling</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold">Frameworks & Libraries</h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-600">
                            <li>FastAPI - High-performance API backend</li>
                            <li>YOLOv5 - Object detection for face recognition</li>
                            <li>DeepFace - Face verification and matching</li>
                            <li>OpenCV - Computer vision and image processing</li>
                            <li>React.js - Interactive UI development</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold">Development Tools</h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-600">
                            <li>Google Colab - Model training with GPU acceleration</li>
                            <li>Docker - Containerization for deployment</li>
                            <li>Git - Version control</li>
                            <li>VS Code - Development environment</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Modules</CardTitle>
                      <CardDescription>Key components of the application</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Face Detection Module</h4>
                          <p className="text-sm text-gray-600">
                            Utilizes YOLOv5 for real-time face detection. Processes images to identify and crop faces for
                            further analysis.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Metadata Handling</h4>
                          <p className="text-sm text-gray-600">
                            Stores and manages metadata related to lost and found persons in JSON files. Links metadata
                            with corresponding face images.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Face Matching Module</h4>
                          <p className="text-sm text-gray-600">
                            Uses DeepFace to compare faces between 'lost' and 'found' databases. Identifies potential
                            matches based on facial features.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">API & Backend Module</h4>
                          <p className="text-sm text-gray-600">
                            Developed using FastAPI for efficient communication. Manages model predictions, metadata
                            handling, and database storage.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Face Detection Implementation</CardTitle>
                    <CardDescription>Using YOLOv5 for face detection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="python"
                      code={`import torch
from PIL import Image
import numpy as np
import cv2

class FaceDetector:
    def __init__(self, model_path="models/yolov5/yolov5s.pt"):
        """
        Initialize the face detector with a YOLOv5 model
        
        Args:
            model_path: Path to the YOLOv5 model weights
        """
        self.model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_path)
        self.model.conf = 0.5  # Confidence threshold
        self.model.classes = [0]  # Only detect faces (class 0)
        
    def detect_faces(self, image_path):
        """
        Detect faces in an image
        
        Args:
            image_path: Path to the input image
            
        Returns:
            List of detected faces as cropped images
        """
        # Load image
        img = Image.open(image_path)
        
        # Run inference
        results = self.model(img)
        
        # Process results
        faces = []
        for i, (x1, y1, x2, y2, conf, cls) in enumerate(results.xyxy[0].cpu().numpy()):
            if conf > self.model.conf:
                # Convert to integers
                x1, y1, x2, y2 = map(int, [x1, y1, x2, y2])
                
                # Convert PIL image to numpy array
                img_np = np.array(img)
                
                # Crop face
                face = img_np[y1:y2, x1:x2]
                
                # Convert back to PIL image
                face_pil = Image.fromarray(face)
                faces.append(face_pil)
                
        return faces
        
    def save_faces(self, image_path, output_dir):
        """
        Detect faces in an image and save them to disk
        
        Args:
            image_path: Path to the input image
            output_dir: Directory to save the cropped faces
            
        Returns:
            List of paths to the saved face images
        """
        faces = self.detect_faces(image_path)
        
        face_paths = []
        for i, face in enumerate(faces):
            # Generate output path
            output_path = f"{output_dir}/face_{i}.jpg"
            
            # Save face
            face.save(output_path)
            face_paths.append(output_path)
            
        return face_paths`}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Face Matching Implementation</CardTitle>
                    <CardDescription>Using DeepFace for face verification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="python"
                      code={`from deepface import DeepFace
import os
import json
from datetime import datetime

class FaceMatcher:
    def __init__(self, lost_dir="data/lost", found_dir="data/found", matched_dir="data/matched"):
        """
        Initialize the face matcher
        
        Args:
            lost_dir: Directory containing lost person faces
            found_dir: Directory containing found person faces
            matched_dir: Directory to save matched faces
        """
        self.lost_dir = lost_dir
        self.found_dir = found_dir
        self.matched_dir = matched_dir
        
        # Ensure directories exist
        os.makedirs(lost_dir, exist_ok=True)
        os.makedirs(found_dir, exist_ok=True)
        os.makedirs(matched_dir, exist_ok=True)
        
    def match_face(self, face_path, target_dir):
        """
        Match a face against all faces in a target directory
        
        Args:
            face_path: Path to the face image to match
            target_dir: Directory containing faces to match against
            
        Returns:
            Dictionary with match information or None if no match found
        """
        best_match = None
        highest_similarity = 0
        
        # Iterate through all face images in the target directory
        for filename in os.listdir(target_dir):
            if filename.endswith(".jpg") or filename.endswith(".png"):
                target_path = os.path.join(target_dir, filename)
                
                try:
                    # Verify faces
                    result = DeepFace.verify(
                        img1_path=face_path,
                        img2_path=target_path,
                        model_name="VGG-Face",
                        distance_metric="cosine"
                    )
                    
                    # Check if faces match
                    if result["verified"]:
                        similarity = 1 - result["distance"]
                        
                        # Update best match if this is better
                        if similarity > highest_similarity:
                            highest_similarity = similarity
                            
                            # Get the face ID from the filename
                            face_id = os.path.splitext(filename)[0]
                            
                            # Load metadata if available
                            metadata_path = os.path.join(target_dir, f"{face_id}.json")
                            metadata = None
                            if os.path.exists(metadata_path):
                                with open(metadata_path, "r") as f:
                                    metadata = json.load(f)
                            
                            best_match = {
                                "face_id": face_id,
                                "similarity": similarity,
                                "metadata": metadata,
                                "face_path": target_path
                            }
                            
                except Exception as e:
                    print(f"Error comparing faces: {e}")
                    continue
        
        return best_match
    
    def find_matches(self, lost_face_path, lost_metadata=None):
        """
        Find matches for a lost person in the found database
        
        Args:
            lost_face_path: Path to the lost person's face image
            lost_metadata: Metadata for the lost person
            
        Returns:
            Dictionary with match information or None if no match found
        """
        # Match the lost face against the found database
        match = self.match_face(lost_face_path, self.found_dir)
        
        if match:
            # Generate a unique match ID
            lost_face_id = os.path.splitext(os.path.basename(lost_face_path))[0]
            found_face_id = match["face_id"]
            match_id = f"{lost_face_id}_{found_face_id}"
            
            # Save match information
            match_info = {
                "match_id": match_id,
                "lost_face_id": lost_face_id,
                "found_face_id": found_face_id,
                "similarity": match["similarity"],
                "lost_metadata": lost_metadata,
                "found_metadata": match["metadata"],
                "timestamp": datetime.now().isoformat()
            }
            
            # Save match information to file
            match_path = os.path.join(self.matched_dir, f"{match_id}.json")
            with open(match_path, "w") as f:
                json.dump(match_info, f, indent=2)
            
            return match_info
        
        return None`}
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* API Reference Tab */}
            {activeTab === "api" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-6">API Reference</h1>
                  <p className="text-gray-600 mb-6">
                    Comprehensive documentation of the Dhruv AI API endpoints, request/response formats, and example
                    usage.
                  </p>
                </div>

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
                      code: `import requests

# API endpoint
url = "https://api.dhruv-ai.example.com/v1/upload_lost"

# Form data
data = {
    "name": "John Doe",
    "gender": "Male",
    "age": 35,
    "where_lost": "Central Park, New York"
}

# Image file
files = {
    "file": open("john_doe.jpg", "rb")
}

# Send POST request
response = requests.post(url, data=data, files=files)

# Print response
print(response.json())

# Example response:
# {
#   "message": "Lost person information uploaded successfully",
#   "face_id": "550e8400-e29b-41d4-a716-446655440000",
#   "match_found": false,
#   "match_id": null
# }`,
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
                      code: `import requests

# API endpoint
url = "https://api.dhruv-ai.example.com/v1/upload_found"

# Form data
data = {
    "name": "Unknown",
    "gender": "Male",
    "age": 30,
    "where_found": "Times Square, New York"
}

# Image file
files = {
    "file": open("found_person.jpg", "rb")
}

# Send POST request
response = requests.post(url, data=data, files=files)

# Print response
print(response.json())

# Example response:
# {
#   "message": "Found person information uploaded successfully",
#   "face_id": "7b6d17c0-8dc3-4f31-b82d-c5a960e9a9c9",
#   "match_found": true,
#   "match_id": "550e8400-e29b-41d4-a716-446655440000_7b6d17c0-8dc3-4f31-b82d-c5a960e9a9c9",
#   "match_details": {
#     "lost_person": {
#       "name": "John Doe",
#       "gender": "Male",
#       "age": 35,
#       "where_lost": "Central Park, New York"
#     },
#     "similarity": 0.92
#   }
# }`,
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
                      code: `import requests

# API endpoint
face_id = "550e8400-e29b-41d4-a716-446655440000"
url = f"https://api.dhruv-ai.example.com/v1/search_face/{face_id}"

# Send GET request
response = requests.get(url)

# Print response
print(response.json())

# Example response:
# {
#   "face_id": "550e8400-e29b-41d4-a716-446655440000",
#   "name": "John Doe",
#   "gender": "Male",
#   "age": 35,
#   "where_lost": "Central Park, New York",
#   "timestamp": "2023-05-15T14:30:45.123456",
#   "matches": [
#     {
#       "match_id": "550e8400-e29b-41d4-a716-446655440000_7b6d17c0-8dc3-4f31-b82d-c5a960e9a9c9",
#       "found_face_id": "7b6d17c0-8dc3-4f31-b82d-c5a960e9a9c9",
#       "similarity": 0.92,
#       "where_found": "Times Square, New York",
#       "found_timestamp": "2023-05-16T10:15:30.654321"
#     }
#   ]
# }`,
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
                      code: `import requests

# API endpoint
url = "https://api.dhruv-ai.example.com/v1/statistics"

# Send GET request
response = requests.get(url)

# Print response
print(response.json())

# Example response:
# {
#   "total_lost": 156,
#   "total_found": 89,
#   "total_matches": 42,
#   "match_rate": 26.92,
#   "average_similarity": 0.87,
#   "processing_time_avg_ms": 245,
#   "last_24h": {
#     "new_lost": 12,
#     "new_found": 8,
#     "new_matches": 5
#   }
# }`,
                    }}
                  />
                </div>

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
                      code={`import requests

# API endpoint
url = "https://api.dhruv-ai.example.com/v1/statistics"

# Headers with API key
headers = {
    "X-API-Key": "your_api_key_here"
}

# Send GET request with authentication
response = requests.get(url, headers=headers)

# Print response
print(response.json())`}
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
            )}

            {/* Deployment Tab */}
            {activeTab === "deployment" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-6">Deployment Guide</h1>
                  <p className="text-gray-600 mb-6">
                    Instructions for deploying the Dhruv AI system in various environments, from development to
                    production.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Requirements</CardTitle>
                      <CardDescription>Minimum specifications for running Dhruv AI</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Hardware Requirements</h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-600">
                            <li>CPU: 4+ cores, 2.5GHz+</li>
                            <li>RAM: 8GB minimum, 16GB recommended</li>
                            <li>Storage: 20GB+ SSD</li>
                            <li>GPU: NVIDIA GPU with CUDA support (for optimal performance)</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold">Software Requirements</h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-600">
                            <li>Operating System: Ubuntu 20.04+ / Windows 10+ / macOS 11+</li>
                            <li>Python: 3.8+</li>
                            <li>CUDA: 11.0+ (if using GPU)</li>
                            <li>Docker: 20.10+ (for containerized deployment)</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Deployment Options</CardTitle>
                      <CardDescription>Different ways to deploy the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Local Deployment</h4>
                          <p className="text-sm text-gray-600">
                            Suitable for development and testing. Run the application directly on your local machine.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Docker Deployment</h4>
                          <p className="text-sm text-gray-600">
                            Containerized deployment for consistent environments. Ideal for both development and
                            production.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Cloud Deployment</h4>
                          <p className="text-sm text-gray-600">
                            Deploy to cloud providers like AWS, Azure, or GCP for scalability and high availability.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Edge Deployment</h4>
                          <p className="text-sm text-gray-600">
                            Deploy to edge devices for real-time processing with limited internet connectivity.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Local Deployment</CardTitle>
                    <CardDescription>Setting up the system on your local machine</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">1. Clone the Repository</h4>
                      <CodeBlock
                        language="bash"
                        code={`git clone https://github.com/username/dhruv-ai.git
cd dhruv-ai`}
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">2. Set Up Python Environment</h4>
                      <CodeBlock
                        language="bash"
                        code={`python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt`}
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">3. Download Model Weights</h4>
                      <CodeBlock language="bash" code={`python scripts/download_models.py`} />
                      <p className="text-sm text-gray-600 mt-2">
                        This script will download the necessary YOLOv5 and DeepFace model weights.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">4. Start the Application</h4>
                      <CodeBlock language="bash" code={`uvicorn app.main:app --reload`} />
                      <p className="text-sm text-gray-600 mt-2">
                        The application will be available at https://krish09bha-dhruvai.hf.space
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Docker Deployment</CardTitle>
                    <CardDescription>Containerized deployment with Docker</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">1. Build the Docker Image</h4>
                      <CodeBlock language="bash" code={`docker build -t dhruv-ai:latest .`} />
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">2. Run the Docker Container</h4>
                      <CodeBlock language="bash" code={`docker run -d -p 8000:8000 --name dhruv-ai dhruv-ai:latest`} />
                      <p className="text-sm text-gray-600 mt-2">
                        The application will be available at https://krish09bha-dhruvai.hf.space
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Docker Compose (Optional)</h4>
                      <CodeBlock
                        language="yaml"
                        code={`version: '3'
services:
  dhruv-ai:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
    environment:
      - ENVIRONMENT=production
      - LOG_LEVEL=info`}
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Run with:{" "}
                        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">docker-compose up -d</code>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cloud Deployment</CardTitle>
                    <CardDescription>Deploying to cloud platforms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">AWS Deployment</h4>
                      <p className="text-sm text-gray-600">
                        Deploy using AWS Elastic Beanstalk or ECS for container orchestration. Use S3 for storing images
                        and metadata, and RDS for database if needed.
                      </p>
                      <div className="mt-2">
                        <h5 className="text-sm font-medium">Key AWS Services:</h5>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                          <li>EC2 or Fargate for compute</li>
                          <li>S3 for image storage</li>
                          <li>CloudFront for content delivery</li>
                          <li>API Gateway for API management</li>
                          <li>Lambda for serverless functions</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Azure Deployment</h4>
                      <p className="text-sm text-gray-600">
                        Deploy using Azure App Service or Azure Kubernetes Service (AKS). Use Azure Blob Storage for
                        images and Azure Cognitive Services for enhanced AI capabilities.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Google Cloud Platform</h4>
                      <p className="text-sm text-gray-600">
                        Deploy using Google Cloud Run or GKE. Use Cloud Storage for images and Cloud Vision API for
                        additional image processing capabilities.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Production Considerations</CardTitle>
                    <CardDescription>Best practices for production deployment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Security</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                          <li>Use HTTPS for all communications</li>
                          <li>Implement proper authentication and authorization</li>
                          <li>Regularly update dependencies</li>
                          <li>Use environment variables for sensitive information</li>
                          <li>Implement rate limiting to prevent abuse</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Scalability</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                          <li>Use load balancers to distribute traffic</li>
                          <li>Implement horizontal scaling for handling increased load</li>
                          <li>Use caching for frequently accessed data</li>
                          <li>Consider using a CDN for static assets</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Monitoring</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                          <li>Set up logging for debugging and auditing</li>
                          <li>Implement health checks for system components</li>

                          <li>Use monitoring tools to track system performance</li>
                          <li>Set up alerts for critical issues</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Future Work Tab */}
            {activeTab === "future" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-6">Future Work</h1>
                  <p className="text-gray-600 mb-6">
                    Planned enhancements and future directions for the Dhruv AI system.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Model Improvements</CardTitle>
                      <CardDescription>Enhancing AI capabilities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Advanced Face Recognition</h4>
                          <p className="text-sm text-gray-600">
                            Implement more advanced face recognition models with higher accuracy and better performance in
                            challenging conditions such as poor lighting, partial occlusion, and aging effects.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Multi-modal Recognition</h4>
                          <p className="text-sm text-gray-600">
                            Incorporate additional biometric identifiers such as gait analysis, voice recognition, and
                            body structure analysis to improve identification accuracy.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Age Progression</h4>
                          <p className="text-sm text-gray-600">
                            Develop age progression capabilities to predict how a person's appearance might change over
                            time, especially useful for long-term missing persons cases.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Enhancements</CardTitle>
                      <CardDescription>Improving the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Real-time Processing</h4>
                          <p className="text-sm text-gray-600">
                            Optimize the system for real-time processing of video streams from multiple sources
                            simultaneously, enabling wider surveillance coverage.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Mobile Applications</h4>
                          <p className="text-sm text-gray-600">
                            Develop dedicated mobile applications for both Android and iOS platforms to enable on-the-go
                            reporting and identification.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Distributed Processing</h4>
                          <p className="text-sm text-gray-600">
                            Implement a distributed processing architecture to handle large-scale deployments across
                            multiple locations and organizations.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Integration Opportunities</CardTitle>
                    <CardDescription>Connecting with other systems</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Law Enforcement Systems</h4>
                      <p className="text-gray-600">
                        Integrate with law enforcement databases and systems to provide a seamless flow of information
                        between Dhruv AI and official missing persons records.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Social Media Platforms</h4>
                      <p className="text-gray-600">
                        Develop integrations with social media platforms to expand the search capabilities and reach a
                        wider audience for identifying missing persons.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Public CCTV Networks</h4>
                      <p className="text-gray-600">
                        Connect with public CCTV networks to automatically scan for missing persons in public spaces, with
                        appropriate privacy safeguards.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">NGO Collaboration</h4>
                      <p className="text-gray-600">
                        Create a collaborative platform for NGOs working in the field of missing persons to share data and
                        resources securely.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Research Directions</CardTitle>
                    <CardDescription>Areas for further research</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Privacy-Preserving Recognition</h4>
                        <p className="text-gray-600">
                          Research into methods for face recognition that preserve privacy and comply with regulations
                          like GDPR while maintaining high accuracy.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Cross-Cultural Face Recognition</h4>
                        <p className="text-gray-600">
                          Improve face recognition accuracy across different ethnicities and cultural backgrounds to
                          ensure the system works equally well for all populations.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Explainable AI</h4>
                        <p className="text-gray-600">
                          Develop methods to make the AI decision-making process more transparent and explainable,
                          especially important in sensitive applications like missing persons identification.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Adversarial Robustness</h4>
                        <p className="text-gray-600">
                          Research into making the face recognition models more robust against adversarial attacks and
                          deliberate attempts to evade detection.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded-md">
                  <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-3 sm:mb-4">Get Involved</h2>
                  <p className="text-blue-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Dhruv AI is an open-source project, and we welcome contributions from the community. Whether you're a
                    developer, data scientist, designer, or domain expert, there are many ways to get involved and help
                    improve the system.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                      <Github className="mr-2 h-4 w-4" />
                      Contribute on GitHub
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">Join Our Community</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
