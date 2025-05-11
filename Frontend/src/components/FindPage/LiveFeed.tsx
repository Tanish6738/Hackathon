import { useState, useRef, useEffect } from 'react';

interface LiveFeedProps {
  userName: string;
  userId: string;
  userEmail: string;
  userMobile: string;
  organizationOptions: string[];
  designationOptions: string[];
  setApiResponse: (data: any) => void;
  setMessage: (msg: string) => void;
  GuideResponsePanel: React.FC<{ response: any }>;
  guideLiveFeedResponse: any;
}

const LiveFeed: React.FC<LiveFeedProps> = ({
  userName,
  userId,
  userEmail,
  userMobile,
  organizationOptions,
  designationOptions,
  setApiResponse,
  setMessage,
  GuideResponsePanel,
  guideLiveFeedResponse,
}) => {
  const [liveFeed, setLiveFeed] = useState({
    camera_id: '',
    where_found: '',
    location: '',
    your_name: userName,
    organization: '',
    designation: '',
    user_id: userId,
    mobile_no: userMobile,
    email_id: userEmail,
    file: null as File | null,
  });
  const [liveFeedFilePreview, setLiveFeedFilePreview] = useState<string | null>(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isWebcamOpen) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            streamRef.current = stream;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch(err => {
            setMessage('Error accessing webcam: ' + err.message);
          });
      } else {
        setMessage('getUserMedia not supported by this browser.');
      }
    } else {
      // Stop the stream if webcam is closed
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [isWebcamOpen, setMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, files } = e.target as HTMLInputElement;
    if (id === 'file' && files && files[0]) {
      const file = files[0];
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setMessage('Only JPG and PNG files are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = ev => setLiveFeedFilePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
      setLiveFeed(prev => ({ ...prev, [id]: file }));
    } else {
      setLiveFeed(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleLiveFeedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(liveFeed).forEach(([key, value]) => {
      if (key === 'file' && value) formData.append('file', value as File);
      else if (key !== 'file') formData.append(key, value as string);
    });
    try {
      const response = await fetch('http://localhost:8000/upload_live_feed', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setApiResponse(data);
      setMessage(data.message || JSON.stringify(data));
    } catch (error: any) {
      setApiResponse({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
      setMessage(error instanceof Error ? `Error: ${error.message}` : 'An unknown error occurred.');
    }
  };

  return (
    <form onSubmit={handleLiveFeedSubmit} encType="multipart/form-data" className="space-y-6">
      <div className="flex flex-col items-center mb-4">
        <button
          type="button"
          onClick={() => setIsWebcamOpen(open => !open)}
          className={`mb-2 px-4 py-2 rounded font-semibold shadow ${isWebcamOpen ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
        >
          {isWebcamOpen ? 'Close Live Video Preview' : 'Open Live Video Preview'}
        </button>
        {isWebcamOpen && (
          <>
            <label className="text-sm font-semibold text-blue-800 mb-1">Live Webcam Feed</label>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', boxShadow: '0 2px 8px #cbd5e1' }}
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="camera_id" className="text-sm font-semibold text-blue-800">Camera ID</label>
            <input type="text" id="camera_id" required value={liveFeed.camera_id} onChange={handleChange} placeholder="Camera ID" className="input-form" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="where_found" className="text-sm font-semibold text-blue-800">Where Found</label>
            <input type="text" id="where_found" required value={liveFeed.where_found} onChange={handleChange} placeholder="Where Found" className="input-form" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="text-sm font-semibold text-blue-800">Location</label>
          <input type="text" id="location" required value={liveFeed.location} onChange={handleChange} placeholder="Location (e.g. Platform 2)" className="input-form" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="your_name" className="text-sm font-semibold text-blue-800">Your Name</label>
            <input type="text" id="your_name" required value={liveFeed.your_name} onChange={handleChange} placeholder="Your Name" className="input-form bg-gray-100" readOnly />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="organization" className="text-sm font-semibold text-blue-800">Organization</label>
            <select id="organization" required value={liveFeed.organization} onChange={handleChange} className="input-form">
              <option value="" disabled>Select Organization</option>
              {organizationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="designation" className="text-sm font-semibold text-blue-800">Designation</label>
            <select id="designation" required value={liveFeed.designation} onChange={handleChange} className="input-form">
              <option value="" disabled>Select Designation</option>
              {designationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="user_id" className="text-sm font-semibold text-blue-800">User ID</label>
            <input type="text" id="user_id" required value={liveFeed.user_id} onChange={handleChange} placeholder="User ID" className="input-form bg-gray-100" readOnly />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="mobile_no" className="text-sm font-semibold text-blue-800">Mobile No</label>
            <input type="text" id="mobile_no" required value={liveFeed.mobile_no} onChange={handleChange} placeholder="Mobile Number" className="input-form bg-gray-100" readOnly />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email_id" className="text-sm font-semibold text-blue-800">Email ID</label>
            <input type="email" id="email_id" required value={liveFeed.email_id} onChange={handleChange} placeholder="Email Address" className="input-form bg-gray-100" readOnly />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="file" className="text-sm font-semibold text-blue-800">Snapshot from Camera</label>
          <input type="file" id="file" required onChange={handleChange} className="input-form-file" accept="image/jpeg,image/png" />
          <p className="text-xs text-gray-500 mt-1">Upload a clear face photo (JPG/PNG, max 5MB).</p>
          {liveFeedFilePreview && <img src={liveFeedFilePreview} alt="Preview" className="mt-2 rounded shadow max-h-40 mx-auto border-2 border-blue-200" />}
        </div>
      </div>
      <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition text-lg tracking-wide flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        Upload Live Feed
      </button>
      <GuideResponsePanel response={guideLiveFeedResponse} />
    </form>
  );
};

export default LiveFeed;
