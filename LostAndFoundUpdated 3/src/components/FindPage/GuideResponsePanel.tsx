function GuideResponsePanel({ response }: { response: any }) {
  if (!response || (Array.isArray(response.records) && response.records.length === 0)) {
    return null;
  }
  // If the response contains records, show them as cards
  if (Array.isArray(response.records) && response.records.length > 0) {
    return (
      <div className="mt-6">
        <div className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Example API Response
        </div>
        <div className="flex flex-wrap gap-4">
          {response.records.map((record: any, idx: number) => {
            const metadata = record.metadata || {};
            return (
              <div key={idx} className="bg-white border rounded-lg shadow p-4 w-72">
                {metadata.face_blob && (
                  <img
                    src={`data:image/jpeg;base64,${metadata.face_blob}`}
                    alt={metadata.name || 'Face'}
                    className="rounded w-full h-40 object-cover mb-2 border"
                  />
                )}
                <div className="text-sm text-gray-800">
                  <div><b>Folder:</b> {record.folder}</div>
                  {Object.entries(metadata).map(([k, v]) =>
                    k !== 'face_blob' ? (
                      <div key={k}><b>{k}:</b> {String(v)}</div>
                    ) : null
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  // Fallback for non-record responses
  return (
    <div className="mt-6">
      <div className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Example API Response
      </div>
      <div className="bg-white border rounded-lg shadow p-4 text-sm text-gray-800">
        {Object.entries(response).map(([key, value]) => (
          <div key={key}><b>{key}:</b> {String(value)}</div>
        ))}
      </div>
    </div>
  );
}

export default GuideResponsePanel;