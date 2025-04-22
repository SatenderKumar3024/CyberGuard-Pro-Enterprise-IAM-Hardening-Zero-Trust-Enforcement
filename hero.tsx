"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, Text, Html } from "@react-three/drei"
import { Shield, Lock, Cloud, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

function ShieldModel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={group} position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <Html transform>
          <div className="text-cyan-400">
            <Lock size={24} />
          </div>
        </Html>
      </mesh>
    </group>
  )
}

function CloudNode({ position = [0, 0, 0] }) {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.5]}>
          <Html transform>
            <div className="text-white">
              <Cloud size={16} />
            </div>
          </Html>
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <ShieldModel position={[0, 0, -2]} />

      <CloudNode position={[-3, 1, -3]} />
      <CloudNode position={[3, -1, -4]} />
      <CloudNode position={[2, 2, -5]} />
      <CloudNode position={[-2, -2, -6]} />

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
    </>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="hero">
      <div className="absolute inset-0 z-10">
        <Canvas className="w-full h-full">
          <Scene />
        </Canvas>
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

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
            Cloud Security Implementation
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            IAM policies optimized across AWS & Azure — Reduced vulnerabilities by 30% (Qualys scans), aligned with NIST
            800-53
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-3 flex items-center"
            >
              <Shield className="h-5 w-5 text-cyan-400 mr-2" />
              <span>AWS</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-3 flex items-center"
            >
              <Cloud className="h-5 w-5 text-cyan-400 mr-2" />
              <span>Azure</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-3 flex items-center"
            >
              <Lock className="h-5 w-5 text-cyan-400 mr-2" />
              <span>IAM</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-3 flex items-center"
            >
              <Database className="h-5 w-5 text-cyan-400 mr-2" />
              <span>NIST 800-53</span>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              View Live Architecture
            </Button>

            <Button variant="outline" size="lg" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30">
              Request Resume
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-gray-400 text-sm"
        >
          Scroll to explore
        </motion.div>
      </div>
    </section>
  )
}
