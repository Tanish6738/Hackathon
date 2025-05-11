
interface CodeBlockProps {
  language: string;
  code: string;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  return (
    <div className="relative my-4">
      <div className="absolute top-0 right-0 bg-gray-200 text-xs px-2 py-1 rounded-bl font-mono uppercase tracking-wide text-gray-700">
        {language}
      </div>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm font-mono border mt-6">
        <code>{code}</code>
      </pre>
    </div>
  )
}
