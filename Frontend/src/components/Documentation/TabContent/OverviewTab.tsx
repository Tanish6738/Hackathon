import { Button } from "../../ui/button"
import { ArrowRight, Brain, Zap, Cpu, Github } from "lucide-react"
import CodeBlock from "../CodeBlock"
import { Card } from "../../ui/card"


export default function OverviewTab() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-extrabold mb-4 text-blue-900">Dhruv AI: Enterprise-Grade Missing Person Platform</h1>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded">
          <p className="text-blue-800 text-lg font-medium">
            Dhruv AI is a robust, scalable solution designed to help organizations and authorities locate missing individuals and reunite them with their families using advanced face detection and recognition technologies.
          </p>
        </div>
        <p className="text-gray-700 mb-4 text-lg">
          Built for reliability and performance, Dhruv AI leverages state-of-the-art AI models to deliver accurate, real-time identification and matching. The platform is trusted by enterprises and public sector agencies for its security, extensibility, and ease of integration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </Button>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <div className="text-sm font-medium">Face Detection</div>
            <Brain className="h-4 w-4 text-blue-600" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">YOLOv5</div>
            <p className="text-xs text-gray-500">Enterprise-grade face detection in images</p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <div className="text-sm font-medium">Face Verification</div>
            <Zap className="h-4 w-4 text-blue-600" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">DeepFace</div>
            <p className="text-xs text-gray-500">Accurate matching across large-scale databases</p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <div className="text-sm font-medium">API</div>
            <Cpu className="h-4 w-4 text-blue-600" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">FastAPI</div>
            <p className="text-xs text-gray-500">Secure, high-performance API for integration</p>
          </div>
        </Card>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Key Capabilities</h2>
        <ul className="space-y-4 bg-white rounded-lg shadow-sm p-6">
          <li className="flex">
            <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">✓</span>
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-900">Automated Face Detection & Cropping</span>
              <p className="text-sm text-gray-500">Detects and crops faces from images with high precision</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">✓</span>
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-900">Comprehensive Metadata Management</span>
              <p className="text-sm text-gray-500">Associates rich metadata with every face record</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">✓</span>
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-900">Cross-Database Face Matching</span>
              <p className="text-sm text-gray-500">Matches faces between 'lost' and 'found' databases at scale</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">✓</span>
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-900">Real-Time Recognition from Live Feeds</span>
              <p className="text-sm text-gray-500">Processes live camera feeds for instant identification</p>
            </div>
          </li>
        </ul>
      </section>
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Installation</h3>
            <CodeBlock
              language="bash"
              code={`git clone https://github.com/username/dhruv-ai.git\ncd dhruv-ai\npip install -r requirements.txt`}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">2. Start the API server</h3>
            <CodeBlock language="bash" code={`uvicorn app.main:app --reload`} />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">3. Access the web interface</h3>
            <p className="text-gray-600 mb-2">Open your browser and navigate to:</p>
            <CodeBlock language="text" code={`https://krish09bha-dhruvai.hf.space`} />
          </div>
        </div>
      </section>
    </div>
  )
}
