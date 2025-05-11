import CodeBlock from "../CodeBlock"
import { Card } from "../../ui/card"

export default function ImplementationTab() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-extrabold mb-6 text-blue-900">Implementation Details</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Dhruv AI is built with modern, open-source technologies to ensure extensibility, maintainability, and high performance. Below are key implementation highlights and code samples.
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Python (AI models, backend)</li>
              <li>FastAPI (API framework)</li>
              <li>YOLOv5 (Face detection)</li>
              <li>DeepFace (Face matching)</li>
              <li>React.js (Frontend)</li>
              <li>Docker (Deployment)</li>
            </ul>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">System Modules</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Face Detection Module</li>
              <li>Metadata Handling</li>
              <li>Face Matching Module</li>
              <li>API & Backend Module</li>
            </ul>
          </div>
        </Card>
      </section>
      <section>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Sample: Face Detection (YOLOv5)</h3>
            <CodeBlock
              language="python"
              code={`import torch\nfrom PIL import Image\n\nmodel = torch.hub.load('ultralytics/yolov5', 'yolov5s')\nimg = Image.open('input.jpg')\nresults = model(img)\nresults.save('output.jpg')`}
            />
          </div>
        </Card>
      </section>
      <section>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Sample: Face Matching (DeepFace)</h3>
            <CodeBlock
              language="python"
              code={`from deepface import DeepFace\n\nresult = DeepFace.verify(\n    img1_path = 'face1.jpg',\n    img2_path = 'face2.jpg'\n)\nprint(result)`}
            />
          </div>
        </Card>
      </section>
    </div>
  )
}
