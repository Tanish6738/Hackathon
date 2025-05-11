function UserFriendlyResponse({ response }: { response: any, type: 'lost' | 'found' | 'live' | 'records' | 'search' }) {
  if (!response || (Array.isArray(response.records) && response.records.length === 0 && !response.matched_records && !response.matches)) {
    return null;
  }
  if (response.error || response.detail) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-800">
        <strong>Error:</strong> {response.error || response.detail}
      </div>
    );
  }
  // For responses with records, show as cards
  if (Array.isArray(response.records) && response.records.length > 0) {
    return (
      <div className="flex flex-wrap gap-4 mt-4">
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
    );
  }
  // For lost/found/live with matches
  if (response.matched_records && Array.isArray(response.matched_records) && response.matched_records.length > 0) {
    return (
      <div className="flex flex-wrap gap-4 mt-4">
        {response.matched_records.map((record: any, idx: number) => {
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
    );
  }
  // For live feed with matches
  if (response.matches && Array.isArray(response.matches) && response.matches.length > 0) {
    return (
      <div className="flex flex-wrap gap-4 mt-4">
        {response.matches.map((record: any, idx: number) => {
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
    );
  }
  // Fallback for other responses
  if (response.message) {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded text-green-900 mb-4">
        <div className="font-bold text-lg mb-1">{response.message}</div>
      </div>
    );
  }
  return null;
}

export default UserFriendlyResponse;