import { Card } from "../../ui/card"

export default function MethodologyTab() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-extrabold mb-6 text-blue-900">Methodology</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Dhruv AI employs a rigorous, multi-stage process to ensure accurate identification and matching of missing persons. Our methodology is designed for reliability, scalability, and compliance with enterprise and public sector standards.
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Face Detection</h3>
            <p className="text-gray-600">
              Leveraging YOLOv5, Dhruv AI detects faces in images and video frames with industry-leading accuracy. The model is optimized for diverse environments and lighting conditions, ensuring robust performance in real-world scenarios.
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Face Matching</h3>
            <p className="text-gray-600">
              Using DeepFace, the platform compares detected faces against extensive databases, verifying identities with advanced facial recognition algorithms. This enables high-confidence matches even across varying image qualities and timeframes.
            </p>
          </div>
        </Card>
      </section>
      <section>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">End-to-End Workflow</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><strong>Image Upload:</strong> Securely upload images or video frames via the web interface or API.</li>
              <li><strong>Face Detection:</strong> YOLOv5 processes each image to identify and crop faces.</li>
              <li><strong>Metadata Association:</strong> Each face is linked with comprehensive metadata for traceability.</li>
              <li><strong>Database Storage:</strong> Faces and metadata are stored in dedicated, secure databases.</li>
              <li><strong>Face Matching:</strong> DeepFace compares new entries against existing records for potential matches.</li>
              <li><strong>Result Notification:</strong> Matches are logged and notifications are sent to authorized users.</li>
            </ol>
          </div>
        </Card>
      </section>
    </div>
  )
}
