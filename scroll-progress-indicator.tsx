"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative w-8 h-8 rounded-full overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e3a8a" strokeWidth="10" />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="10"
          strokeDasharray={251.2}
          strokeDashoffset={251.2 - scrollProgress * 251.2}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
        {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  )
}
