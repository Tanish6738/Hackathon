import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#2563eb" />
      <path d="M10 18l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check if user is an admin using our backend endpoint
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`http://localhost:8000/check_admin_status/${user.id}`);
        const data = await response.json();
        setIsAdmin(data.is_admin);
      } catch (error) {
        console.error("Error checking admin status:", error);
        // Fallback to metadata if API fails
        setIsAdmin(user?.publicMetadata?.role === 'admin');
      }
    };
    
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Contact", href: "/contact" },
    { name: "Documentation", href: "/documentation" },
    { name: "Enhancer", href: "/Enhancer" },
    { name: "Aging", href: "/Aging" }, // Added Aging route to match App.tsx
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur border-b border-gray-200 shadow">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
          <Logo className="h-8 w-8" />
          Dhruv AI
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-base font-medium px-2 py-1 rounded transition-colors duration-200 hover:text-blue-700 hover:bg-blue-50/60 ${location.pathname === item.href ? "text-blue-700 bg-blue-50/80" : "text-gray-700"}`}
            >
              {item.name}
            </Link>
          ))}
          {/* Only show dashboards when signed in */}
          <SignedIn>
            {isAdmin ? (
              <Link
                to="/admin-dashboard"
                className={`text-base font-medium px-2 py-1 rounded transition-colors duration-200 hover:text-blue-700 hover:bg-blue-50/60 ${location.pathname === "/admin-dashboard" ? "text-blue-700 bg-blue-50/80" : "text-gray-700"}`}
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className={`text-base font-medium px-2 py-1 rounded transition-colors duration-200 hover:text-blue-700 hover:bg-blue-50/60 ${location.pathname === "/dashboard" ? "text-blue-700 bg-blue-50/80" : "text-gray-700"}`}
              >
                User Dashboard
              </Link>
            )}
          </SignedIn>
        </nav>
        {/* Desktop Actions */}
        <div className="hidden md:flex gap-3 items-center">
          <SignedOut>
            <SignInButton>
              <span className="px-4 hover:cursor-pointer py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Sign In</span>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="hidden md:block">
              <UserButton />
            </div>
            <Link to="/user" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition hidden md:inline-block">User Details</Link>
          </SignedIn>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon className="h-7 w-7 text-blue-700" />
        </button>
      </div>
      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          {/* Drawer */}
          <div className="relative ml-auto w-4/5 max-w-xs h-full bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b">
              <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-700" onClick={() => setMenuOpen(false)}>
                <Logo className="h-7 w-7" />
                Dhruv AI
              </Link>
              <button className="p-2" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <CloseIcon className="h-7 w-7 text-blue-700" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-5 py-6 bg-white">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-3 rounded text-base font-medium transition-colors duration-200 hover:text-blue-700 hover:bg-blue-50/60 ${location.pathname === item.href ? "text-blue-700 bg-blue-50/80" : "text-gray-800"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Show appropriate dashboard based on user role */}
              <SignedIn>
                {isAdmin ? (
                  <Link
                    to="/admin-dashboard"
                    className={`block px-3 py-3 rounded text-base font-medium transition-colors duration-200 hover:text-blue-700 hover:bg-blue-50/60 ${location.pathname === "/admin-dashboard" ? "text-blue-700 bg-blue-50/80" : "text-gray-800"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-3 rounded text-base font-medium transition-colors duration-200 hover:text-blue-700 hover:bg-blue-50/60 ${location.pathname === "/dashboard" ? "text-blue-700 bg-blue-50/80" : "text-gray-800"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    User Dashboard
                  </Link>
                )}
              </SignedIn>
            </nav>
            <div className="mt-auto flex flex-col items-center justify-center gap-3 px-5 pb-8 bg-white">
              <SignedOut>
                <SignInButton>
                  <span className="w-full text-center py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition block">Sign In</span>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="w-full flex flex-col gap-2 items-center justify-center border-2 border-blue-600 rounded-lg p-4">
                  <UserButton/>
                </div>
                <Link to="/user" className="w-full text-center py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition block mt-2">User Details</Link>
              </SignedIn>
              {/* Remove or update these placeholder links if not needed */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
