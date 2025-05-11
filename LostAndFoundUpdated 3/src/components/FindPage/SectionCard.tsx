import React from "react";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
        <span className="inline-block bg-blue-100 text-blue-700 rounded-full p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
        {title}
      </div>
      {children}
    </div>
  );
}

export default SectionCard;