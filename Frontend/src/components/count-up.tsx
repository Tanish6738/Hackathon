"use client"

import { useEffect, useState } from "react"

interface CountUpProps {
  end: number
  duration?: number
  className?: string
}

export default function CountUp({ end, duration = 2000, className = "" }: CountUpProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const startAnimation = (timestamp: number) => {
      startTime = timestamp
      animate(timestamp)
    }

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(startAnimation)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [end, duration])

  return (
    <span className={`font-extrabold text-blue-700 text-3xl md:text-4xl tracking-tight drop-shadow-sm ${className}`}>{count.toLocaleString()}</span>
  )
}
