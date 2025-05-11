import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <SignIn routing="path" path="/sign-in" afterSignInUrl="/dashboard" />
      </div>
    </div>
  );
};

export default SignInPage;
