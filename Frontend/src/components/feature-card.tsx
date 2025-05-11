import type React from "react"
import { Card, CardContent } from "./ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-md border-0 bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-white transition-all duration-300 group">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 group-hover:bg-blue-600 group-hover:text-white text-blue-700 shadow transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-2 text-blue-900 group-hover:text-blue-700 transition-colors">{title}</h3>
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
