"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Text, Html, Float } from "@react-three/drei"
import { Shield, AlertTriangle, CheckCircle, Eye, FileText, Wifi, Database } from "lucide-react"
import * as THREE from "three"

// Sample security metrics data
const securityData = {
  vulnerabilities: [
    { id: "critical", label: "Critical", value: 5, color: "#ef4444" },
    { id: "high", label: "High", value: 15, color: "#f97316" },
    { id: "medium", label: "Medium", value: 30, color: "#eab308" },
    { id: "low", label: "Low", value: 50, color: "#22c55e" },
  ],
  zeroTrust: {
    verifyExplicitly: 92,
    leastPrivilege: 88,
    assumeBreach: 78,
    sessionControls: 85,
  },
  networkActivity: [
    { time: "00:00", value: 12 },
    { time: "01:00", value: 8 },
    { time: "02:00", value: 10 },
    { time: "03:00", value: 6 },
    { time: "04:00", value: 5 },
    { time: "05:00", value: 7 },
    { time: "06:00", value: 15 },
    { time: "07:00", value: 24 },
    { time: "08:00", value: 45 },
    { time: "09:00", value: 65 },
    { time: "10:00", value: 72 },
    { time: "11:00", value: 78 },
    { time: "12:00", value: 74 },
  ],
  securityEvents: [
    { id: 1, type: "Authentication", status: "success", count: 245, trend: "+12%" },
    { id: 2, type: "Access Control", status: "warning", count: 18, trend: "+5%" },
    { id: 3, type: "Data Sharing", status: "critical", count: 3, trend: "-25%" },
    { id: 4, type: "Policy Enforcement", status: "success", count: 67, trend: "0%" },
  ],
  complianceScores: {
    "NIST 800-53": 94,
    GDPR: 88,
    "ISO 27001": 92,
    "SOC 2": 90,
    HIPAA: 85,
  },
}

// Animated bar chart for vulnerabilities
function VulnerabilityBars({ data, onHover, hoveredIndex }) {
  const group = useRef()
  const maxBarHeight = 5

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <group ref={group} position={[-6, 0, 0]}>
      <Text
        position={[0, maxBarHeight + 1, 0]}
        fontSize={0.6}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
      >
        Vulnerability Assessment
      </Text>
      {data.map((item, index) => {
        const isHovered = hoveredIndex === index
        const barHeight = (item.value / Math.max(...data.map((d) => d.value))) * maxBarHeight

        return (
          <group key={item.id} position={[index * 1.5 - (data.length - 1) * 0.75, 0, 0]}>
            <mesh
              position={[0, barHeight / 2, 0]}
              scale={[1, isHovered ? barHeight * 1.1 : barHeight, 1]}
              onPointerOver={() => onHover(index)}
              onPointerOut={() => onHover(null)}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={item.color}
                metalness={0.6}
                roughness={0.2}
                emissive={isHovered ? item.color : "#000000"}
                emissiveIntensity={isHovered ? 0.5 : 0}
              />
            </mesh>
            <Text
              position={[0, -0.6, 0]}
              fontSize={0.3}
              color="#fff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter_Regular.json"
            >
              {item.label}
            </Text>
            <Text
              position={[0, barHeight + 0.5, 0]}
              fontSize={0.4}
              color="#fff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter_Bold.json"
            >
              {item.value}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

// Radar chart for zero trust principles
function ZeroTrustRadar({ data }) {
  const mesh = useRef()
  const points = []
  const categories = Object.keys(data)
  const values = Object.values(data)
  const maxValue = 100 // Maximum score possible
  const radius = 3
  const segments = categories.length
  const segmentAngle = (Math.PI * 2) / segments

  // Calculate points for radar chart
  for (let i = 0; i < segments; i++) {
    const angle = i * segmentAngle - Math.PI / 2 // Start from top
    const normalizedValue = values[i] / maxValue
    const x = Math.cos(angle) * radius * normalizedValue
    const y = Math.sin(angle) * radius * normalizedValue
    points.push(new THREE.Vector3(x, y, 0))
  }

  // Create shape
  const shape = new THREE.Shape()
  points.forEach((point, i) => {
    if (i === 0) {
      shape.moveTo(point.x, point.y)
    } else {
      shape.lineTo(point.x, point.y)
    }
  })
  shape.closePath()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={mesh} position={[6, 0, 0]}>
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.6}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
        maxWidth={5}
        textAlign="center"
      >
        Zero Trust Scorecard
      </Text>

      {/* Background grid */}
      {[0.25, 0.5, 0.75, 1].map((scale, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * scale - 0.05, radius * scale, segments * 2, 1]} />
          <meshBasicMaterial color="#1d4ed8" transparent opacity={0.2} wireframe />
        </mesh>
      ))}

      {/* Category axes */}
      {Array.from({ length: segments }).map((_, i) => {
        const angle = i * segmentAngle - Math.PI / 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        // Create line using standard THREE.js approach
        const linePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, 0)]

        return (
          <line key={i} position={[0, 0, 0.01]}>
            <bufferGeometry>
              <float32BufferAttribute
                attach="attributes-position"
                array={new Float32Array(linePoints.flatMap((p) => [p.x, p.y, p.z]))}
                count={linePoints.length}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#60a5fa" />
          </line>
        )
      })}

      {/* Data shape */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color="#3b82f6"
          side={THREE.DoubleSide}
          transparent
          opacity={0.75}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Category labels and scores */}
      {categories.map((category, i) => {
        const angle = i * segmentAngle - Math.PI / 2
        const labelDistance = radius + 0.5
        const x = Math.cos(angle) * labelDistance
        const y = Math.sin(angle) * labelDistance

        // Calculate position for score
        const scoreDistance = (values[i] / maxValue) * radius
        const scoreX = Math.cos(angle) * scoreDistance
        const scoreY = Math.sin(angle) * scoreDistance

        return (
          <group key={category}>
            <Text
              position={[x, y, 0]}
              fontSize={0.35}
              color="#fff"
              anchorX={x > 0 ? "left" : x < 0 ? "right" : "center"}
              anchorY={y > 0 ? "top" : y < 0 ? "bottom" : "middle"}
              font="/fonts/Inter_Regular.json"
              maxWidth={2}
            >
              {formatCamelCase(category)}
            </Text>
            <Float speed={2} rotationIntensity={0.3} floatingRange={[0, 0.2]}>
              <Text
                position={[scoreX, scoreY, 0]}
                fontSize={0.4}
                color="#60a5fa"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter_Bold.json"
              >
                {values[i]}%
              </Text>
            </Float>
          </group>
        )
      })}
    </group>
  )
}

// Network activity line graph
function NetworkActivity({ data }) {
  const mesh = useRef()
  const points = []

  // Normalize values for visualization
  const maxValue = Math.max(...data.map((item) => item.value))
  const timeStep = 12 / (data.length - 1)

  // Create points for the line
  data.forEach((item, i) => {
    const x = i * timeStep - 6
    const y = (item.value / maxValue) * 2.5
    points.push(new THREE.Vector3(x, y, 0))
  })

  // Create a smooth curve through the points
  const curve = new THREE.CatmullRomCurve3(points)
  const curvePoints = curve.getPoints(50)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  return (
    <group ref={mesh} position={[0, -5, 0]}>
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.6}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
      >
        Network Activity (24hr)
      </Text>

      {/* Grid lines */}
      {Array.from({ length: 6 }).map((_, i) => {
        const y = i * 0.5
        const linePoints = [new THREE.Vector3(-6, y, 0), new THREE.Vector3(6, y, 0)]

        return (
          <line key={`h-${i}`}>
            <bufferGeometry>
              <float32BufferAttribute
                attach="attributes-position"
                array={new Float32Array(linePoints.flatMap((p) => [p.x, p.y, p.z]))}
                count={linePoints.length}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#1d4ed8" opacity={0.2} transparent />
          </line>
        )
      })}

      {/* Time labels */}
      {data
        .filter((_, i) => i % 3 === 0)
        .map((item, i) => {
          const x = i * 3 * timeStep - 6
          return (
            <Text
              key={`time-${i}`}
              position={[x, -0.3, 0]}
              fontSize={0.3}
              color="#fff"
              anchorX="center"
              anchorY="top"
              font="/fonts/Inter_Regular.json"
            >
              {item.time}
            </Text>
          )
        })}

      {/* Activity line */}
      <line>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            array={new Float32Array(curvePoints.flatMap((p) => [p.x, p.y, p.z]))}
            count={curvePoints.length}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#60a5fa" />
      </line>

      {/* Data points */}
      {points.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Current activity indicator */}
      <Float speed={2} rotationIntensity={0.5} floatingRange={[0, 0.3]}>
        <mesh position={[points[points.length - 1].x, points[points.length - 1].y, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1} />
        </mesh>
      </Float>
    </group>
  )
}

// Security events panel
function SecurityEvents({ data, scrollProgress }) {
  const [hoveredEvent, setHoveredEvent] = useState(null)
  const { size } = useThree()

  // Position based on scroll
  const yOffset = -10 + scrollProgress * 5

  return (
    <group position={[-6, yOffset, 0]}>
      <Html
        transform
        sprite
        position={[0, 0, 0]}
        style={{ width: `${Math.min(size.width * 0.25, 350)}px` }}
        pointerEvents="all"
      >
        <div className="bg-blue-950/80 backdrop-blur-lg rounded-lg border border-blue-600/30 p-4 shadow-lg">
          <h3 className="text-cyan-300 font-bold text-lg mb-3">Security Events</h3>
          <div className="space-y-3">
            {data.map((event) => {
              const statusColors = {
                success: "bg-green-500",
                warning: "bg-yellow-500",
                critical: "bg-red-500",
              }

              return (
                <div
                  key={event.id}
                  className={`p-3 bg-blue-900/50 rounded-md transition-all ${
                    hoveredEvent === event.id ? "translate-x-1 shadow-md" : ""
                  }`}
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${statusColors[event.status]} mr-2`}></div>
                      <span className="font-medium">{event.type}</span>
                    </div>
                    <span className="text-sm">{event.count} events</span>
                  </div>
                  <div className="text-right text-xs mt-1 text-cyan-300">{event.trend}</div>
                </div>
              )
            })}
          </div>
        </div>
      </Html>
    </group>
  )
}

// Compliance scores
function ComplianceScores({ data, scrollProgress }) {
  const { size } = useThree()

  // Position based on scroll
  const yOffset = -10 + scrollProgress * 5

  return (
    <group position={[6, yOffset, 0]}>
      <Html
        transform
        sprite
        position={[0, 0, 0]}
        style={{ width: `${Math.min(size.width * 0.25, 350)}px` }}
        pointerEvents="all"
      >
        <div className="bg-blue-950/80 backdrop-blur-lg rounded-lg border border-blue-600/30 p-4 shadow-lg">
          <h3 className="text-cyan-300 font-bold text-lg mb-3">Compliance Scores</h3>
          <div className="space-y-3">
            {Object.entries(data).map(([standard, score]) => (
              <div key={standard} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">{standard}</span>
                  <span
                    className={`font-medium ${score >= 90 ? "text-green-400" : score >= 80 ? "text-yellow-400" : "text-red-400"}`}
                  >
                    {score}%
                  </span>
                </div>
                <div className="w-full h-2 bg-blue-900/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${score >= 90 ? "bg-green-500" : score >= 80 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Html>
    </group>
  )
}

// Floating indicators for key metrics
function FloatingMetrics({ scrollProgress }) {
  const metrics = [
    { icon: Shield, label: "Protected Endpoints", value: "124/128", color: "#22c55e" },
    { icon: AlertTriangle, label: "Active Threats", value: "2", color: "#ef4444" },
    { icon: CheckCircle, label: "Security Checks Passed", value: "1,284", color: "#3b82f6" },
    { icon: FileText, label: "Policy Violations", value: "7", color: "#eab308" },
  ]

  return (
    <group position={[0, 7 + scrollProgress * 2, 0]}>
      {metrics.map((metric, index) => {
        // Position in a semi-circle
        const theta = (Math.PI / (metrics.length - 1)) * index
        const radius = 5
        const x = Math.cos(theta) * radius
        const y = Math.sin(theta) * radius

        return (
          <Float key={index} speed={1.5} rotationIntensity={0.2} floatingRange={[0, 0.5]}>
            <Html transform position={[x, y, 0]}>
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${metric.color}30`, color: metric.color }}
                >
                  <metric.icon size={24} />
                </div>
                <div className="text-center bg-blue-950/80 backdrop-blur-md rounded-lg border border-blue-600/30 p-2 shadow-lg">
                  <div className="font-bold text-lg" style={{ color: metric.color }}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-white">{metric.label}</div>
                </div>
              </div>
            </Html>
          </Float>
        )
      })}
    </group>
  )
}

// Helper function to format camelCase to Title Case
function formatCamelCase(text) {
  return text.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
}

// Add easing function for smoother animations
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

// Main 3D Dashboard Scene
function DashboardScene({ scrollProgress }) {
  const [hoveredVulnerability, setHoveredVulnerability] = useState(null)

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Vulnerability Bars Chart */}
      <VulnerabilityBars
        data={securityData.vulnerabilities}
        onHover={setHoveredVulnerability}
        hoveredIndex={hoveredVulnerability}
      />

      {/* Zero Trust Radar Chart */}
      <ZeroTrustRadar data={securityData.zeroTrust} />

      {/* Network Activity */}
      <NetworkActivity data={securityData.networkActivity} />

      {/* Security Events Panel - Appears while scrolling */}
      <SecurityEvents data={securityData.securityEvents} scrollProgress={scrollProgress} />

      {/* Compliance Scores Panel - Appears while scrolling */}
      <ComplianceScores data={securityData.complianceScores} scrollProgress={scrollProgress} />

      {/* Floating Metrics at the top */}
      <FloatingMetrics scrollProgress={scrollProgress} />

      {/* Background elements */}
      {Array.from({ length: 30 }).map((_, i) => {
        const position = [Math.random() * 40 - 20, Math.random() * 40 - 20, Math.random() * 10 - 20]

        return (
          <mesh key={i} position={position} scale={[0.05, 0.05, 0.05]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#60a5fa" : "#93c5fd"}
              transparent
              opacity={0.2}
            />
          </mesh>
        )
      })}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  )
}

export default function SecurityDashboard3D() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Handle scroll events
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (!ref.current) return

      const element = ref.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how far we've scrolled within the element
      const start = rect.top - windowHeight
      const end = rect.bottom
      const total = end - start

      // Get scroll progress from 0 to 1 with smoother easing
      const rawProgress = Math.min(Math.max((window.scrollY - start) / total, 0), 1)
      // Apply easing function for smoother animation
      const progress = easeInOutCubic(rawProgress)
      setScrollProgress(progress)
    }

    // Add easing function for smoother animations
    const easeInOutCubic = (x) => {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [mounted])

  return (
    <section className="py-20 relative overflow-hidden h-[150vh]" id="security-dashboard-3d" ref={ref}>
      {/* Fixed position canvas that stays on screen while scrolling through section */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        {/* Dashboard header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-20 px-6 relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
            CyberGuard Pro Dashboard
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time security metrics and Zero Trust implementation monitoring
          </p>
        </motion.div>

        <div className="h-[calc(100vh-120px)] w-full">
          {mounted && (
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }} shadows={false} dpr={[1, 2]}>
              <DashboardScene scrollProgress={scrollProgress} />
            </Canvas>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-cyan-300 text-sm flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollProgress < 0.8 ? [0.4, 1, 0.4] : 0 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <span>Scroll to reveal more data</span>
          <svg width="20" height="10" viewBox="0 0 20 10" className="mt-2">
            <path d="M10 10L0 0h20L10 10z" fill="currentColor" />
          </svg>
        </motion.div>
      </div>

      {/* Controls panel that reveals when scrolled to bottom */}
      <motion.div
        className="mx-auto px-4 py-10 max-w-4xl"
        style={{
          opacity: scrollProgress > 0.8 ? (scrollProgress - 0.8) * 5 : 0,
          transform: `translateY(${100 - scrollProgress * 100}px)`,
        }}
      >
        <div className="bg-blue-950/70 backdrop-blur-lg rounded-xl border border-blue-600/30 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Dashboard Controls</h3>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-400">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Eye className="h-5 w-5 text-cyan-400" />
                <h4 className="font-medium text-white">Monitoring Options</h4>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-300">Real-time Updates</label>
                  <div className="w-12 h-6 rounded-full bg-cyan-400/30 relative p-1 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-cyan-400 absolute right-1 top-1"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-300">Alert Notifications</label>
                  <div className="w-12 h-6 rounded-full bg-cyan-400/30 relative p-1 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-cyan-400 absolute right-1 top-1"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-300">Threat Intelligence</label>
                  <div className="w-12 h-6 rounded-full bg-blue-900/50 relative p-1 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-gray-400 absolute left-1 top-1"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Wifi className="h-5 w-5 text-cyan-400" />
                <h4 className="font-medium text-white">Network Analysis</h4>
              </div>

              <div className="flex items-center space-x-4">
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-sm text-white">
                  Run Scan
                </button>
                <button className="px-3 py-1 border border-blue-500 hover:bg-blue-900/50 transition-colors rounded-md text-sm text-cyan-300">
                  Export Report
                </button>
                <button className="px-3 py-1 border border-blue-500 hover:bg-blue-900/50 transition-colors rounded-md text-sm text-cyan-300">
                  Share
                </button>
              </div>

              <div className="h-1 bg-blue-900/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 text-right">Last scan: 5 minutes ago</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="h-5 w-5 text-cyan-400" />
              <h4 className="font-medium text-white">Resource Monitoring</h4>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["S3 Buckets", "EC2 Instances", "Azure VMs", "Containers"].map((resource) => (
                <div key={resource} className="bg-blue-900/30 p-3 rounded-lg">
                  <div className="text-sm text-gray-300">{resource}</div>
                  <div className="text-xl font-semibold text-white">
                    {Math.floor(Math.random() * 30) + 10}/{Math.floor(Math.random() * 10) + 40}
                  </div>
                  <div className="text-xs text-green-400">Secured</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
