interface APIParameter {
  name: string;
  type: string;
  description: string;
  required: boolean;
}
interface APIResponse {
  status: string;
  description: string;
}
interface APIExample {
  language: string;
  code: string;
}
interface APIEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  description: string;
  parameters?: APIParameter[];
  responses?: APIResponse[];
  example?: APIExample | null;
}

const methodColors: Record<string, string> = {
  GET: "bg-green-100 text-green-800",
  POST: "bg-blue-100 text-blue-800",
  PUT: "bg-yellow-100 text-yellow-800",
  DELETE: "bg-red-100 text-red-800",
}

import CodeBlock from "./CodeBlock";

export default function APIEndpoint({ method, endpoint, description, parameters = [], responses = [], example = null }: APIEndpointProps) {
  return (
    <div className="border rounded-md mb-6">
      <div className="flex items-center p-4 border-b bg-gray-50">
        <span className={`${methodColors[method]} px-2 py-1 rounded text-xs font-bold mr-3`}>{method}</span>
        <code className="font-mono text-sm">{endpoint}</code>
      </div>
      <div className="p-4">
        <p className="mb-4 text-gray-700">{description}</p>
        {parameters.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Parameters</h4>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-4 py-2 text-sm font-mono">{param.name}</td>
                    <td className="border px-4 py-2 text-sm">{param.type}</td>
                    <td className="border px-4 py-2 text-sm">{param.description}</td>
                    <td className="border px-4 py-2 text-sm">{param.required ? "Yes" : "No"}</td>
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
                  <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-4 py-2 text-sm">{response.status}</td>
                    <td className="border px-4 py-2 text-sm">{response.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {example && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Example</h4>
            {/* Use the CodeBlock component from the same folder */}
            <div className="mt-2">
              {/* @ts-ignore */}
              <CodeBlock language={example.language} code={example.code} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
