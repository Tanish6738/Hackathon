import { useState } from "react"
import { Quote } from "lucide-react"
import { Card, CardContent } from "./ui/card"

interface TestimonialCardProps {
  name: string
  image: string
  quote: string
}

export default function TestimonialCard({ name, image, quote }: TestimonialCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="h-72 perspective-1000 cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      tabIndex={0}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      aria-label={`Testimonial from ${name}`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? "rotate-y-180" : ""}`}
      >
        {/* Front */}
        <Card className="absolute w-full h-full backface-hidden rounded-2xl shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-8 flex flex-col h-full justify-between items-center text-center">
            <div>
              <Quote className="h-8 w-8 text-blue-500 mb-4" />
              <p className="text-gray-700 text-lg italic">“{quote}”</p>
            </div>
            <div className="flex flex-col items-center mt-6">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-200 shadow mb-2">
                <img src={image || "/placeholder.svg"} alt={name} width={56} height={56} className="object-cover w-full h-full" />
              </div>
              <p className="font-semibold text-blue-900 text-base">{name}</p>
            </div>
          </CardContent>
        </Card>

        {/* Back */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-lg border-0 bg-gradient-to-br from-blue-700 to-blue-400 flex items-center justify-center">
          <CardContent className="p-0 h-full flex flex-col items-center justify-end relative">
            <img src={image || "/placeholder.svg"} alt={name} className="object-cover rounded-2xl w-full h-full opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
              <p className="text-white font-bold text-lg mb-1">{name}</p>
              <p className="text-white/80 text-sm">Reunited at Kumbh Mela</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
