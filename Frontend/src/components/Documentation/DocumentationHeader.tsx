import { Button } from "../ui/button"
import { useState } from "react"

interface HeaderProps {
  onDownload?: () => void;
}

export default function DocumentationHeader({ onDownload }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode by toggling a class on the html element
  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return next
    })
  }

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b shadow-sm transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <img src="/placeholder-logo.svg" alt="Logo" className="w-8 h-8 rounded-full bg-blue-100 shadow" />
          <span className="text-xl font-extrabold tracking-tight text-blue-700 dark:text-blue-200">Dhruv AI Docs</span>
        </div>
        {/* Navigation & Search */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-3">
            <a href="/" className="text-sm text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Home</a>
            <a href="/about" className="text-sm text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">About</a>
            <a href="/contact" className="text-sm text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Contact</a>
          </nav>
          {/* Search bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search docs..."
              className="pl-9 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 shadow-sm transition"
              style={{ minWidth: 180 }}
            />
            <svg className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          {/* Dark mode toggle */}
          <button
            onClick={handleToggleDarkMode}
            className="ml-2 p-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            )}
          </button>
          {/* Download button */}
          <Button size="sm" onClick={onDownload} className="ml-2">Download</Button>
          {/* User avatar */}
          <img src="/placeholder-user.jpg" alt="User" className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm ml-2 hidden md:block" />
        </div>
      </div>
    </header>
  )
}
