import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    // Optionally show a loading spinner
    return null;
  }

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" state={{ from: location }} replace />
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;