import { Globe, Brain, Cpu, Code, Server, Terminal, Zap, Github, ExternalLink, X } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: <Globe className="h-4 w-4 mr-2" /> },
  { id: "methodology", label: "Methodology", icon: <Brain className="h-4 w-4 mr-2" /> },
  { id: "architecture", label: "Architecture", icon: <Cpu className="h-4 w-4 mr-2" /> },
  { id: "implementation", label: "Implementation", icon: <Code className="h-4 w-4 mr-2" /> },
  { id: "api", label: "API Reference", icon: <Server className="h-4 w-4 mr-2" /> },
  { id: "deployment", label: "Deployment", icon: <Terminal className="h-4 w-4 mr-2" /> },
  { id: "future", label: "Future Work", icon: <Zap className="h-4 w-4 mr-2" /> },
];

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: SidebarProps) {
  // Handle sidebar close on overlay click (for mobile)
  const handleOverlayClick = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile menu button (hamburger) */}
      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-700 text-white shadow-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-200 lg:hidden ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
        onClick={handleOverlayClick}
      />
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 w-72 max-w-full bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 border-r shadow-xl transition-transform duration-200 ease-in-out flex flex-col h-screen
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:block`}
        aria-label="Sidebar"
        style={{ minHeight: '100vh' }}
      >
        <div className="p-4 sm:p-6 flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <img src="/placeholder-logo.svg" alt="Logo" className="w-9 h-9 rounded-full bg-white shadow" />
              <span className="text-lg font-extrabold tracking-tight text-white">Dhruv AI</span>
            </div>
            <button
              className="p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* Branding (desktop) */}
          <div className="hidden lg:flex items-center gap-3 mb-10 select-none">
            <img src="/placeholder-logo.svg" alt="Logo" className="w-10 h-10 rounded-full bg-white shadow" />
            <span className="text-2xl font-extrabold tracking-tight text-white">Dhruv AI</span>
          </div>
          {/* Section: Documentation */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2 pl-1">Documentation</h2>
            <nav className="space-y-1" role="navigation" aria-label="Documentation sections">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-800/60
                    ${activeTab === tab.id
                      ? "bg-blue-800 text-white shadow border-l-4 border-blue-400"
                      : "text-blue-100 hover:bg-blue-800/60 hover:text-white"}
                  `}
                  tabIndex={0}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          {/* Divider */}
          <div className="border-t border-blue-800 my-4" />
          {/* Section: Resources */}
          <div className="mt-auto">
            <h2 className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2 pl-1">Resources</h2>
            <div className="space-y-3">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-100 hover:text-white transition">
                <Github className="mr-2 h-4 w-4" />
                GitHub Repository
              </a>
              <a href="#" className="flex items-center text-sm text-blue-100 hover:text-white transition">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
