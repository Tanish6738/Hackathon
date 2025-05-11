function ImageCardList({ records }: { records: any[] }) {
  if (!records || records.length === 0) {
    return null;
  }
  return (
    <div className="image-container flex flex-wrap gap-4 justify-center mt-4">
      {records.map((record, idx) => {
        const metadata = record.metadata || record;
        const faceBlob = metadata.face_blob;
        return faceBlob ? (
          <div key={idx} className="image-card border rounded-lg p-3 bg-gray-50 w-72 shadow">
            <img src={`data:image/jpeg;base64,${faceBlob}`} alt={metadata.name || 'Face'} className="rounded w-full h-auto" />
            <div className="metadata mt-2 text-xs text-gray-700">
              {['face_id', 'name', 'age', 'gender'].map(key =>
                metadata[key] ? <div key={key}><b>{key}:</b> {metadata[key]}</div> : null
              )}
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
}

export default ImageCardList;