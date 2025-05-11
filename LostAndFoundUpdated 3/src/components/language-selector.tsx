"use client"

import { useState } from "react"
import { Button } from "./ui/button"

export default function LanguageSelector() {
  const [activeLanguage, setActiveLanguage] = useState("English")

  const languages = [
    "English",
    "हिन्दी (Hindi)",
    "বাংলা (Bengali)",
    "తెలుగు (Telugu)",
    "मराठी (Marathi)",
    "தமிழ் (Tamil)",
    "ગુજરાતી (Gujarati)",
    "ਪੰਜਾਬੀ (Punjabi)",
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {languages.map((language) => (
        <Button
          key={language}
          variant={activeLanguage === language ? "default" : "outline"}
          className={`
            ${
              activeLanguage === language
                ? "bg-white text-blue-700"
                : "bg-transparent text-white border-white/30 hover:bg-white/10"
            }
          `}
          onClick={() => setActiveLanguage(language)}
        >
          {language}
        </Button>
      ))}
    </div>
  )
}
