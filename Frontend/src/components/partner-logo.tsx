import { Card, CardContent } from "./ui/card"

interface PartnerLogoProps {
  name: string
}

export default function PartnerLogo({ name }: PartnerLogoProps) {
  return (
    <Card className="hover:shadow-xl transition-all group rounded-2xl border-0 bg-gradient-to-br from-white to-blue-50 flex items-center justify-center h-28">
      <CardContent className="flex items-center justify-center h-full w-full p-0">
        <img
          src={`/placeholder.svg?height=60&width=120&text=${name.replace(/\s+/g, "+")}`}
          alt={name}
          width={120}
          height={60}
          className="opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md"
        />
      </CardContent>
    </Card>
  )
}

