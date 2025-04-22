"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export default function LoadingIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="relative w-24 h-24 mb-4">
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Shield className="w-24 h-24 text-cyan-400" />
        </motion.div>

        {/* Scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-cyan-400"
          initial={{ top: 0, opacity: 0.7 }}
          animate={{ top: "100%" }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "linear",
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-blue-900/50 rounded-full overflow-hidden">
        <motion.div className="h-full bg-cyan-400" style={{ width: `${progress}%` }} />
      </div>

      <p className="mt-4 text-cyan-400 text-sm">Initializing CyberGuard Pro...</p>
    </div>
  )
}
