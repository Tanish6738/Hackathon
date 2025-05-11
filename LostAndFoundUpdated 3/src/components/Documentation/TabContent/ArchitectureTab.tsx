import { Card } from "../../ui/card"

export default function ArchitectureTab() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-extrabold mb-6 text-blue-900">System Architecture</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Dhruv AI is architected for reliability, scalability, and security. The platform leverages modular components, microservices, and modern cloud-native patterns to deliver enterprise-grade performance and maintainability.
        </p>
      </section>
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Architecture Overview</h2>
        <img
          src="/placeholder.svg?height=400&width=800&text=Dhruv+AI+Architecture+Diagram"
          alt="Dhruv AI Architecture Diagram"
          className="w-full h-auto rounded-lg mb-4"
        />
        <p className="text-gray-600">
          The system is composed of independent modules for face detection, face matching, data storage, and API management. This separation of concerns enables rapid development, easy scaling, and robust security controls.
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Face Detection Module</h3>
            <p className="text-gray-600">
              Utilizes YOLOv5 for high-accuracy face detection, optimized for real-time and batch processing.
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Face Matching Module</h3>
            <p className="text-gray-600">
              Employs DeepFace for advanced face verification and matching across large datasets.
            </p>
          </div>
        </Card>
      </section>
      <section>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Directory Structure</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm font-mono border mt-2">
{`dhruv-ai/
├── app/
│   ├── main.py              # FastAPI application
│   ├── models/              # Data models
│   ├── routers/             # API endpoints
│   ├── services/            # Business logic
│   └── utils/               # Utility functions
├── data/                    # Data storage
├── models/                  # Model files
├── static/                  # Static files
├── templates/               # HTML templates
├── tests/                   # Tests
├── requirements.txt         # Dependencies
└── README.md                # Documentation`}
            </pre>
          </div>
        </Card>
      </section>
    </div>
  )
}
