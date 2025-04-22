"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Fingerprint, Lock, CheckCircle, XCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FingerprintAuth() {
  const [authState, setAuthState] = useState("idle") // idle, scanning, success, error
  const [progress, setProgress] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const canvasRef = useRef(null)

  // Fingerprint animation with optimized rendering
  useEffect(() => {
    if (authState !== "scanning" || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    let particles = []
    const particleCount = 100
    const colors = ["#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8"]
    let animationFrameId

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
      })
    }

    // Draw a fingerprint-like pattern with better detail
    const drawFingerprintPattern = () => {
      ctx.fillStyle = "#1e3a8a"
      ctx.fillRect(0, 0, width, height)

      // Draw circular patterns to simulate a fingerprint
      const centerX = width / 2
      const centerY = height / 2

      // Draw base circles
      for (let i = 0; i < 8; i++) {
        const radius = 20 + i * 15
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Add more detailed arcs for realism
      for (let i = 0; i < 40; i++) {
        const startAngle = Math.random() * Math.PI * 2
        const endAngle = startAngle + Math.random() * Math.PI + Math.PI / 2
        const radius = 20 + Math.random() * 100
        const offsetX = (Math.random() - 0.5) * 20
        const offsetY = (Math.random() - 0.5) * 20

        ctx.beginPath()
        ctx.arc(centerX + offsetX, centerY + offsetY, radius, startAngle, endAngle)
        ctx.strokeStyle = `rgba(96, 165, 250, ${Math.random() * 0.5 + 0.3})`
        ctx.lineWidth = Math.random() * 1.5 + 0.5
        ctx.stroke()
      }
    }

    const animate = () => {
      if (authState !== "scanning") return

      ctx.clearRect(0, 0, width, height)

      // Draw fingerprint pattern
      drawFingerprintPattern()

      // Draw scan line with glow effect
      const scanHeight = (progress / 100) * height
      const gradient = ctx.createLinearGradient(0, scanHeight - 10, 0, scanHeight + 10)
      gradient.addColorStop(0, "rgba(96, 165, 250, 0)")
      gradient.addColorStop(0.5, "rgba(96, 165, 250, 0.7)")
      gradient.addColorStop(1, "rgba(96, 165, 250, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, scanHeight - 10, width, 20)

      // Draw particles with improved rendering
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.6
        ctx.fill()

        // Update position with damping for smoother movement
        p.x += p.speedX * 0.8
        p.y += p.speedY * 0.8

        // Bounce off walls with slight randomization
        if (p.x < 0 || p.x > width) {
          p.speedX *= -1
          p.speedX += (Math.random() - 0.5) * 0.2
        }
        if (p.y < 0 || p.y > height) {
          p.speedY *= -1
          p.speedY += (Math.random() - 0.5) * 0.2
        }

        // Limit max speed
        const maxSpeed = 1.5
        p.speedX = Math.max(Math.min(p.speedX, maxSpeed), -maxSpeed)
        p.speedY = Math.max(Math.min(p.speedY, maxSpeed), -maxSpeed)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      particles = []
    }
  }, [authState, progress])

  // Progress simulation
  useEffect(() => {
    let interval

    if (authState === "scanning") {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            clearInterval(interval)
            // 80% chance of success, 20% chance of error
            setAuthState(Math.random() > 0.2 ? "success" : "error")
            return 100
          }
          return newProgress
        })
      }, 30)
    }

    return () => clearInterval(interval)
  }, [authState])

  const startScan = () => {
    setAuthState("scanning")
    setProgress(0)
  }

  const reset = () => {
    setAuthState("idle")
    setProgress(0)
    setShowForm(false)
  }

  return (
    <section className="py-20 relative overflow-hidden" id="fingerprint-auth">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
              Zero Trust Authentication
            </h2>
            <p className="text-xl text-gray-300">
              Experience multi-factor authentication with fingerprint verification
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="inline-block p-3 bg-blue-900/50 rounded-full mb-4">
                  <Lock className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Secure Access Control</h3>
                <p className="text-gray-300">
                  This demo showcases fingerprint authentication as part of a Zero Trust security model
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64 mb-6 bg-blue-900/30 rounded-lg overflow-hidden">
                  <canvas ref={canvasRef} width={256} height={256} className="w-full h-full" />

                  <AnimatePresence>
                    {authState === "idle" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Fingerprint className="h-24 w-24 text-gray-500" />
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors cursor-pointer"
                          onClick={startScan}
                        >
                          <span className="text-sm text-gray-300 opacity-0 hover:opacity-100 transition-opacity">
                            Click to authenticate
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {authState === "success" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-green-900/20"
                      >
                        <CheckCircle className="h-24 w-24 text-green-500 mb-4" />
                        <span className="text-green-400 font-medium">Authentication Successful</span>
                      </motion.div>
                    )}

                    {authState === "error" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/20"
                      >
                        <XCircle className="h-24 w-24 text-red-500 mb-4" />
                        <span className="text-red-400 font-medium">Authentication Failed</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {authState === "scanning" && (
                  <div className="w-full mb-6">
                    <div className="h-2 bg-blue-900/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-center mt-2 text-sm text-gray-300">Scanning... {progress}%</div>
                  </div>
                )}

                <div className="flex gap-4">
                  {authState === "idle" && (
                    <Button
                      onClick={startScan}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <Fingerprint className="mr-2 h-4 w-4" /> Authenticate
                    </Button>
                  )}

                  {authState === "success" && (
                    <>
                      <Button
                        onClick={() => setShowForm(true)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <Shield className="mr-2 h-4 w-4" /> Access Secure Area
                      </Button>
                      <Button variant="outline" onClick={reset}>
                        Reset
                      </Button>
                    </>
                  )}

                  {authState === "error" && (
                    <Button variant="outline" onClick={reset}>
                      Try Again
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <AnimatePresence>
                {showForm ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-white">Secure Document Access</h3>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-xs text-green-400">Authenticated</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-blue-900/30 p-4 rounded-lg flex items-center">
                        <div className="mr-4 text-blue-400">
                          <Shield className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">AWS IAM Policy Document</h4>
                          <p className="text-sm text-gray-300">Confidential security configuration</p>
                        </div>
                      </div>

                      <div className="bg-blue-900/30 p-4 rounded-lg flex items-center">
                        <div className="mr-4 text-blue-400">
                          <Shield className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Azure RBAC Configuration</h4>
                          <p className="text-sm text-gray-300">Role-based access control settings</p>
                        </div>
                      </div>

                      <div className="bg-blue-900/30 p-4 rounded-lg flex items-center">
                        <div className="mr-4 text-blue-400">
                          <Shield className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">NIST Compliance Report</h4>
                          <p className="text-sm text-gray-300">Security audit documentation</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <Button variant="outline" onClick={reset}>
                        Logout
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Zero Trust Security Model</h3>

                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="mr-3 mt-0.5 text-cyan-400">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <p className="text-gray-300">
                          <span className="text-white font-medium">Verify Explicitly:</span> Always authenticate and
                          authorize based on all available data points
                        </p>
                      </li>

                      <li className="flex items-start">
                        <div className="mr-3 mt-0.5 text-cyan-400">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <p className="text-gray-300">
                          <span className="text-white font-medium">Least Privilege Access:</span> Limit user access with
                          Just-In-Time and Just-Enough-Access
                        </p>
                      </li>

                      <li className="flex items-start">
                        <div className="mr-3 mt-0.5 text-cyan-400">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <p className="text-gray-300">
                          <span className="text-white font-medium">Assume Breach:</span> Minimize blast radius and
                          segment access. Verify end-to-end encryption.
                        </p>
                      </li>
                    </ul>

                    <div className="mt-6 p-4 bg-blue-900/30 rounded-lg">
                      <p className="text-sm text-gray-300">
                        Authenticate with the fingerprint scanner to access secure documents protected by Zero Trust
                        principles.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
