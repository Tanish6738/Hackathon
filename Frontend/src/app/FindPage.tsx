import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import adminEmails from './Data.json';
import LiveFeed from '../components/FindPage/LiveFeed';
import LostPersonForm from '../components/FindPage/LostPersonForm';
import FoundPersonForm from '../components/FindPage/FoundPersonForm';
import ImageCardList from '../components/FindPage/ImageCardList';
import InfoBanner from '../components/FindPage/InfoBanner';
import SectionCard from '../components/FindPage/SectionCard';
import GuideResponsePanel from '../components/FindPage/GuideResponsePanel';
import UserFriendlyResponse from '../components/FindPage/UserFriendlyResponse';

// Options for select fields
const genderOptions = ["Male", "Female", "Other"];
const relationOptions = ["Mother", "Father", "Sibling", "Relative", "Friend", "Other"];
const organizationOptions = ["Railway Police", "NGO", "Hospital", "Other"];
const designationOptions = ["Inspector", "Volunteer", "Doctor", "Other"];

// Dummy responses from guide.md
const guideLostResponse = {};
const guideFoundResponse = {};
const guideLiveFeedResponse = {};
const guideRecordsResponse = {};
const guideSearchFaceResponse = {};

const FindPage = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  const userName = user?.fullName || user?.username || 'User';
  const userMobile = user?.primaryPhoneNumber?.phoneNumber || 'Mobile Number Not Available';
  const isAdmin = userEmail && Array.isArray(adminEmails) && adminEmails.map(e => e.toLowerCase()).includes(userEmail);

  // Move all hooks to the top, before any conditional returns
  const [lost, setLost] = useState({
    name: '',
    gender: '',
    age: '',
    where_lost: '',
    your_name: '',
    relation_with_lost: '',
    user_id: '',
    mobile_no: '',
    email_id: '',
    file: null as File | null,
  });
  const [found, setFound] = useState({
    name: '',
    gender: '',
    age: '',
    where_found: '',
    your_name: '',
    organization: '',
    designation: '',
    user_id: '',
    mobile_no: '',
    email_id: '',
    file: null as File | null,
  });
  const [faceId, setFaceId] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('lost');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [recordsUserId, setRecordsUserId] = useState('');
  const [recordsResponse, setRecordsResponse] = useState<any>(null);
  const [recordsImages, setRecordsImages] = useState<any[]>([]);
  const [searchFaceImages, setSearchFaceImages] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lostFilePreview, setLostFilePreview] = useState<string | null>(null);
  const [foundFilePreview, setFoundFilePreview] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setLost(prev => ({
        ...prev,
        your_name: user.fullName || user.username || '',
        user_id: user.id || user.username || '',
        email_id: user.primaryEmailAddress?.emailAddress || '',
        mobile_no: userMobile,
      }));
      setFound(prev => ({
        ...prev,
        your_name: user.fullName || user.username || '',
        user_id: user.id || user.username || '',
        email_id: user.primaryEmailAddress?.emailAddress || '',
        mobile_no: userMobile,
      }));
    }
  }, [user, userMobile]);

  const handleGetRecordsByUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/get_records_by_user/${recordsUserId}`);
      const data = await response.json();
      setRecordsResponse(data);
      setRecordsImages(data.records || []);
    } catch (error) {
      setRecordsResponse({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
      setRecordsImages([]);
    }
  };

  const handleSearchFace = async () => {
    try {
      const response = await fetch(`http://localhost:8000/search_face/${faceId}`);
      const data = await response.json();
      setApiResponse(data);
      setSearchFaceImages(data.records || []);
      setMessage(data.message || JSON.stringify(data));
    } catch (error) {
      setApiResponse({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
      setSearchFaceImages([]);
      setMessage(error instanceof Error ? `Error: ${error.message}` : 'An unknown error occurred.');
    }
  };

  // Helper to display images from API records
  const visibleTabs = isAdmin
    ? [
        { key: 'lost', label: 'Lost Person' },
        { key: 'found', label: 'Found Person' },
        { key: 'live', label: 'Live Feed' },
        { key: 'records', label: 'Get Records by User' },
        { key: 'search', label: 'Search Face' },
      ]
    : [
        { key: 'lost', label: 'Lost Person' },
        { key: 'records', label: 'Get Records by User' },
      ];

  // Professional UI redesign starts here
  // Layout: Sidebar for tabs, main content area, info banners, code-style dummy responses
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-blue-200 flex font-sans relative">
      {/* Mobile Sidebar Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-white border border-blue-200 rounded-full p-2 shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
      </button>
      {/* Sidebar Navigation */}
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-blue-100 shadow-lg py-10 px-6 h-[calc(100vh-4rem)] fixed top-16 left-0 z-30 overflow-y-auto">
        <div className="mb-10 flex items-center gap-3">
          <img src="/vite.svg" alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-extrabold text-blue-800 tracking-wide">Lost & Found</span>
        </div>
        <nav className="flex flex-col gap-2 mt-4">
          {visibleTabs.map(tab => (
            <button
              key={tab.key}
              className={`text-left px-4 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 focus:outline-none ${
                activeTab === tab.key
                  ? 'bg-blue-100 text-blue-800 shadow border-l-4 border-blue-700'
                  : 'text-gray-700 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-10 text-xs text-gray-400">© 2025 Lost & Found</div>
      </aside>
      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          {/* Drawer */}
          <div className="relative w-4/5 max-w-xs h-full bg-white shadow-xl flex flex-col animate-slide-in-left border-r border-blue-100">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b">
              <div className="flex items-center gap-3">
                <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
                <span className="text-xl font-extrabold text-blue-800 tracking-wide">Lost & Found</span>
              </div>
              <button className="p-2" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                <svg className="h-7 w-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <nav className="flex flex-col gap-2 mt-4 px-4">
              {visibleTabs.map(tab => (
                <button
                  key={tab.key}
                  className={`text-left px-4 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 focus:outline-none ${
                    activeTab === tab.key
                      ? 'bg-blue-100 text-blue-800 shadow border-l-4 border-blue-700'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                  onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-10 text-xs text-gray-400 px-4 pb-4">© 2025 Lost & Found</div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-2 sm:px-8 py-10 md:ml-64 transition-all duration-300">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-2 tracking-wide text-center">Lost & Found Face Recognition</h1>
          {user && (
            isAdmin ? (
              <div className="w-full bg-gradient-to-r from-green-200 to-green-100 text-green-900 rounded-lg p-4 mb-6 text-center font-semibold text-lg shadow flex items-center gap-2 justify-center">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Admin Dashboard
              </div>
            ) : (
              <div className="w-full bg-gradient-to-r from-blue-200 to-blue-100 text-blue-900 rounded-lg p-4 mb-6 text-center font-semibold text-lg shadow flex items-center gap-2 justify-center">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Welcome, {userName}!
              </div>
            )
          )}
        </div>
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-10 mt-4 border border-blue-100 animate-fade-in">
          {/* Info banner for each tab */}
          {activeTab === 'lost' && (
            <InfoBanner
              title="Lost Person Upload"
              description="Report a missing person. Please fill all details and upload a clear face photo. The API will return a unique face_id and any matches found."
              endpoint="POST /upload_lost"
            />
          )}
          {isAdmin && activeTab === 'found' && (
            <InfoBanner
              title="Found Person Upload"
              description="Report a found person (unknown or known). Fill all details and upload a clear face photo. The API will return a unique face_id and any matches with lost records."
              endpoint="POST /upload_found"
            />
          )}
          {isAdmin && activeTab === 'live' && (
            <InfoBanner
              title="Live Feed Upload"
              description="Upload a camera snapshot for real-time matching. The API will return any matches found in the database."
              endpoint="POST /upload_live_feed"
            />
          )}
          {activeTab === 'records' && (
            <InfoBanner
              title="Get Records by User ID"
              description="Fetch all lost/found records submitted by a specific user. Enter the user ID to retrieve their submissions."
              endpoint="GET /get_records_by_user/{user_id}"
            />
          )}
          {isAdmin && activeTab === 'search' && (
            <InfoBanner
              title="Search by Face ID"
              description="Search for all records associated with a specific face_id. Enter the face_id to see all related records."
              endpoint="GET /search_face/{face_id}"
            />
          )}

          {/* Forms and Results */}
          {/* Lost Person Upload Form */}
          {activeTab === 'lost' && (
            <SectionCard title="Upload Lost Person">
              <LostPersonForm
                lost={lost}
                setLost={setLost}
                setApiResponse={setApiResponse}
                setMessage={setMessage}
                lostFilePreview={lostFilePreview}
                setLostFilePreview={setLostFilePreview}
                genderOptions={genderOptions}
                relationOptions={relationOptions}
                GuideResponsePanel={GuideResponsePanel}
                guideLostResponse={guideLostResponse}
              />
            </SectionCard>
          )}
          {/* Found Person Upload Form (admin only) */}
          {isAdmin && activeTab === 'found' && (
            <SectionCard title="Upload Found Person">
              <FoundPersonForm
                found={found}
                setFound={setFound}
                setApiResponse={setApiResponse}
                setMessage={setMessage}
                foundFilePreview={foundFilePreview}
                setFoundFilePreview={setFoundFilePreview}
                genderOptions={genderOptions}
                organizationOptions={organizationOptions}
                designationOptions={designationOptions}
                GuideResponsePanel={GuideResponsePanel}
                guideFoundResponse={guideFoundResponse}
              />
            </SectionCard>
          )}
          {/* Live Feed Upload Form (admin only) */}
          {isAdmin && activeTab === 'live' && (
            <SectionCard title="Upload Live Feed">
              <LiveFeed
                userName={userName}
                userId={user?.id || user?.username || ''}
                userEmail={user?.primaryEmailAddress?.emailAddress || ''}
                userMobile={userMobile}
                organizationOptions={organizationOptions}
                designationOptions={designationOptions}
                setApiResponse={setApiResponse}
                setMessage={setMessage}
                GuideResponsePanel={GuideResponsePanel}
                guideLiveFeedResponse={guideLiveFeedResponse}
              />
            </SectionCard>
          )}
          {/* Get Records by User (accessible to all users) */}
          {activeTab === 'records' && (
            <SectionCard title="Get Records by User ID">
              <div className="space-y-4">
                <input type="text" id="recordsUserId" placeholder="Enter User ID" required value={recordsUserId} onChange={e => setRecordsUserId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 bg-gray-50" />
                <button onClick={handleGetRecordsByUser} className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition">Get Records</button>
              </div>
              <div className="mt-4">
                <GuideResponsePanel response={guideRecordsResponse} />
                <ImageCardList records={recordsImages} />
              </div>
            </SectionCard>
          )}
          {/* Search Face (admin only) */}
          {isAdmin && activeTab === 'search' && (
            <SectionCard title="Search for Face">
              <div className="space-y-4">
                <input type="text" id="faceId" placeholder="Enter Face ID" required value={faceId} onChange={e => setFaceId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 bg-gray-50" />
                <button onClick={handleSearchFace} className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition">Search Face</button>
              </div>
              <div className="mt-4">
                <GuideResponsePanel response={guideSearchFaceResponse} />
                <ImageCardList records={searchFaceImages} />
              </div>
            </SectionCard>
          )}
        </div>
        {/* API Response and Images (actual) */}
        <div className="w-full max-w-2xl mt-8">
          {message && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-blue-800 mb-4 animate-fade-in">
              {message}
            </div>
          )}
          {/* Show user-friendly response for all users */}
          {activeTab === 'lost' && <UserFriendlyResponse response={apiResponse} type="lost" />}
          {activeTab === 'found' && <UserFriendlyResponse response={apiResponse} type="found" />}
          {activeTab === 'live' && <UserFriendlyResponse response={apiResponse} type="live" />}
          {activeTab === 'records' && <UserFriendlyResponse response={recordsResponse} type="records" />}
          {activeTab === 'search' && <UserFriendlyResponse response={apiResponse} type="search" />}
          <ImageCardList records={apiResponse?.matched_records || apiResponse?.matches || []} />
        </div>
      </main>
    </div>
  );
};

export default FindPage;