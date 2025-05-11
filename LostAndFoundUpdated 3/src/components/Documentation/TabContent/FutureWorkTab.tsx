import { Card } from "../../ui/card"

export default function FutureWorkTab() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-extrabold mb-6 text-blue-900">Future Work</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Dhruv AI is committed to continuous innovation. The following roadmap highlights planned enhancements and research directions to further elevate the platform.
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Model Improvements</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Advanced face recognition models</li>
              <li>Multi-modal biometric integration</li>
              <li>Age progression and prediction</li>
            </ul>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">System Enhancements</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Real-time video analytics</li>
              <li>Mobile and edge device support</li>
              <li>Distributed processing architecture</li>
            </ul>
          </div>
        </Card>
      </section>
      <section>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Integration Opportunities</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Law enforcement system integration</li>
              <li>Social media platform connectors</li>
              <li>Public CCTV network support</li>
              <li>NGO and humanitarian collaboration</li>
            </ul>
          </div>
        </Card>
      </section>
      <section>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Research Directions</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Privacy-preserving recognition</li>
              <li>Cross-cultural face recognition</li>
              <li>Explainable AI</li>
              <li>Adversarial robustness</li>
            </ul>
          </div>
        </Card>
      </section>
    </div>
  )
}
