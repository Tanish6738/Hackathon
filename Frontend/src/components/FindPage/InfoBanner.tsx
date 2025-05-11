
function InfoBanner({ title, description, endpoint }: { title: string; description: string; endpoint: string }) {
  return (
    <div className="mb-6 flex items-center gap-4 bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-blue-500 rounded p-4 animate-fade-in">
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
      <div>
        <div className="font-bold text-blue-800 text-lg">{title}</div>
        <div className="text-blue-700 text-sm">{description}</div>
        <div className="text-xs text-blue-500 mt-1 font-mono">{endpoint}</div>
      </div>
    </div>
  );
}

export default InfoBanner;