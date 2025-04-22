"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Float, Environment, Text, Html, OrbitControls } from "@react-three/drei"
import { Shield, Lock, Cloud, Database, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"

// Optimize performance by reducing complexity of 3D scene
function Scene() {
  // Use lower polygon counts for better performance
  const sphereDetail = 16 // Reduced from 32 or 64
  const particleCount = 100 // Reduced from 200

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />

      <group position={[0, 0, 0]}>
        {/* Main Shield - simplified geometry */}
        <mesh castShadow receiveShadow position={[0, 0, -2]}>
          <boxGeometry args={[1, 1.5, 0.1]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
          <Html position={[0, 0, 0.06]} transform>
            <div className="text-cyan-400">
              <Lock size={24} />
            </div>
          </Html>
        </mesh>

        {/* Earth with connections - simplified */}
        <mesh position={[-3, 2, -5]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[1, sphereDetail, sphereDetail]} />
          <meshStandardMaterial color="#1d4ed8" metalness={0.4} roughness={0.7} />
        </mesh>

        {/* Cloud Nodes - simplified */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[-3, 1, -3]}>
            <sphereGeometry args={[0.5, sphereDetail, sphereDetail]} />
            <meshStandardMaterial color="#8b5cf6" metalness={0.5} roughness={0.2} />
            <Html transform>
              <div className="text-white">
                <Cloud size={16} />
              </div>
            </Html>
          </mesh>
        </Float>

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[3, -1, -4]}>
            <sphereGeometry args={[0.5, sphereDetail, sphereDetail]} />
            <meshStandardMaterial color="#06b6d4" metalness={0.5} roughness={0.2} />
            <Html transform>
              <div className="text-white">
                <Database size={16} />
              </div>
            </Html>
          </mesh>
        </Float>

        {/* Floating Text */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <Text
            position={[0, 2, -3]}
            fontSize={0.5}
            color="#60a5fa"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter_Bold.json"
          >
            SECURE
          </Text>
        </Float>
      </group>

      {/* Controls for interactivity - with limits for better performance */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
    </>
  )
}

// Simplified Fingerprint Scanner Component
function FingerprintScanner() {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (scanning) {
        setProgress((prev) => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            setScanning(false)
            setAuthorized(true)
            return 100
          }
          return newProgress
        })
      }
    }, 30)

    return () => clearInterval(interval)
  }, [scanning])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="absolute bottom-20 right-10 md:right-20 z-20 hidden md:block"
    >
      <div className="bg-blue-950/70 backdrop-blur-md rounded-xl p-4 border border-blue-500/30 w-64">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-cyan-300 text-sm font-medium">Security Verification</h3>
          <div
            className={`h-2 w-2 rounded-full ${authorized ? "bg-green-500" : scanning ? "bg-amber-500" : "bg-red-500"}`}
          ></div>
        </div>

        <div
          className="relative h-32 bg-blue-900/50 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={() => !scanning && !authorized && setScanning(true)}
        >
          {authorized ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              <Fingerprint className="h-16 w-16 text-green-500" />
            </motion.div>
          ) : (
            <>
              <Fingerprint
                className={`h-16 w-16 ${scanning ? "text-cyan-400" : "text-gray-500"}`}
                strokeWidth={scanning ? 2.5 : 1.5}
              />
              {scanning && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"
                  initial={{ height: "0%" }}
                  animate={{ height: `${progress}%` }}
                />
              )}
            </>
          )}
        </div>

        <div className="mt-3 text-xs text-gray-300">
          {authorized
            ? "Identity verified. Access granted."
            : scanning
              ? `Scanning... ${progress}%`
              : "Verification required for full access."}
        </div>
      </div>
    </motion.div>
  )
}

export default function HeroEnhanced() {
  const [mounted, setMounted] = useState(false)
  const [canvasLoaded, setCanvasLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Add a small timeout to ensure smooth transition from loading state
    const timer = setTimeout(() => {
      setCanvasLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="hero">
      <div className="absolute inset-0 z-10">
        {mounted && canvasLoaded && (
          <Canvas
            className="w-full h-full"
            shadows={false} // Disable shadows for better performance
            dpr={[1, 2]} // Limit pixel ratio for better performance
            camera={{ position: [0, 0, 5], fov: 60 }}
            performance={{ min: 0.5 }} // Allow ThreeJS to reduce quality for performance
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <Scene />
          </Canvas>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-6 z-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-1 rounded-full text-sm font-medium">
              CASE STUDY
            </span>
          </div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              initial={{ display: "inline-block" }}
              animate={{ rotateY: [0, 360] }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              className="inline-block"
            >
              Cloud
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Security
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Implementation
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            IAM policies optimized across AWS & Azure — Reduced vulnerabilities by{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-cyan-300 font-bold"
            >
              30%
            </motion.span>{" "}
            (Qualys scans), aligned with NIST 800-53
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-3 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <Shield className="h-5 w-5 text-cyan-400 mr-2" />
              <span>AWS</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-3 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <Cloud className="h-5 w-5 text-cyan-400 mr-2" />
              <span>Azure</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-3 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <Lock className="h-5 w-5 text-cyan-400 mr-2" />
              <span>IAM</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-3 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <Database className="h-5 w-5 text-cyan-400 mr-2" />
              <span>NIST 800-53</span>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105"
                onClick={() => (window.location.href = "#security-dashboard-3d")}
              >
                View Live Architecture
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <Button variant="outline" size="lg" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30">
                Request Resume
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Fingerprint Scanner */}
      <FingerprintScanner />

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      >
        <div className="text-gray-400 text-sm">Scroll to explore</div>
      </motion.div>
    </section>
  )
}
