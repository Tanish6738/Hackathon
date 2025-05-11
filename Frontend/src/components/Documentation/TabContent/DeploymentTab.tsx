import CodeBlock from "../CodeBlock"
import { Card } from "../../ui/card"

export default function DeploymentTab() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-extrabold mb-6 text-blue-900">Deployment Guide</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Dhruv AI can be deployed on-premises, in the cloud, or in hybrid environments. The following guide outlines best practices for enterprise deployment.
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">System Requirements</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>CPU: 4+ cores</li>
              <li>RAM: 8GB minimum</li>
              <li>Storage: 20GB+ SSD</li>
              <li>GPU: NVIDIA CUDA (recommended)</li>
            </ul>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Deployment Options</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Local deployment (development/testing)</li>
              <li>Docker containerization</li>
              <li>Cloud deployment (AWS, Azure, GCP)</li>
              <li>Edge/IoT deployment</li>
            </ul>
          </div>
        </Card>
      </section>
      <section>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Quick Start: Local Deployment</h3>
            <CodeBlock
              language="bash"
              code={`git clone https://github.com/username/dhruv-ai.git\ncd dhruv-ai\npython -m venv venv\nsource venv/bin/activate # On Windows: venv\\Scripts\\activate\npip install -r requirements.txt\nuvicorn app.main:app --reload`}
            />
          </div>
        </Card>
      </section>
      <section>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Docker Deployment</h3>
            <CodeBlock
              language="bash"
              code={`docker build -t dhruv-ai:latest .\ndocker run -d -p 8000:8000 --name dhruv-ai dhruv-ai:latest`}
            />
          </div>
        </Card>
      </section>
    </div>
  )
}
