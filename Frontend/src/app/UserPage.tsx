import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';

export default function UserPage() {
  const { user } = useUser();
    console.log(user);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 p-6">
      <SignedIn>
        {user && (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border border-blue-100 text-center">
            <img
              src={user.imageUrl || '/placeholder-user.jpg'}
              alt={user.fullName || user.username || 'User'}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100 object-cover"
            />
            <h1 className="text-2xl font-bold text-blue-900 mb-2">{user.fullName || user.username}</h1>
            <p className="text-gray-700 mb-1 font-medium">Username: <span className="text-blue-700">{user.username}</span></p>
            <p className="text-gray-700 mb-1">Email: <span className="text-blue-700">{user.primaryEmailAddress?.emailAddress}</span></p>
            <p className="text-gray-700 mb-1">Phone: <span className="text-blue-700">{user.primaryPhoneNumber?.phoneNumber}</span></p>
            <p className="text-gray-700 mb-1">User ID: <span className="text-blue-700 break-all">{user.id}</span></p>
            <p className="text-gray-700 mb-1">Joined: <span className="text-blue-700">{user.createdAt ? new Date(user.createdAt).toLocaleString() : ''}</span></p>
            <p className="text-gray-700 mb-1">Last Sign In: <span className="text-blue-700">{user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : ''}</span></p>
            <a href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Back to Home</a>
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border border-blue-100 text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">Not Signed In</h1>
          <p className="text-gray-700 mb-4">Please sign in to view your user details.</p>
          <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Back to Home</a>
        </div>
      </SignedOut>
    </main>
  );
}
