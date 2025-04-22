"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Lock, Fingerprint, AlertTriangle, CheckCircle } from "lucide-react"

export default function AnimatedTypography() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [scrollY, setScrollY] = useState(0)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  // Handle scroll events safely with throttling
  useEffect(() => {
    setIsMounted(true)

    const handleScroll = throttle(() => {
      setScrollY(window.scrollY)
    }, 16) // ~60fps

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Add throttle function if not already imported
  const throttle = (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments

      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Calculate parallax effect based on scroll position with smoother easing
  const calculateParallax = () => {
    if (!isMounted) return { y: 0, opacity: 0 }

    const viewportHeight = window.innerHeight
    const documentHeight = document.body.scrollHeight
    const maxScroll = documentHeight - viewportHeight

    const progress = Math.min(scrollY / maxScroll, 1)
    const section = document.getElementById("animated-typography")

    if (!section) return { y: 0, opacity: 0 }

    const rect = section.getBoundingClientRect()
    const sectionProgress = 1 - rect.top / viewportHeight

    // Apply easing for smoother animation
    const easedProgress = easeOutQuad(Math.min(Math.max(sectionProgress, 0), 1))

    const y = 50 - easedProgress * 100
    const opacity =
      sectionProgress < 0.1 ? sectionProgress * 10 : sectionProgress > 0.9 ? (1 - sectionProgress) * 10 : 1

    return { y, opacity }
  }

  // Add easing function
  const easeOutQuad = (x) => {
    return 1 - (1 - x) * (1 - x)
  }

  const { y, opacity } = calculateParallax()

  const securityPrinciples = [
    {
      title: "Zero Trust Architecture",
      description: "Never trust, always verify. Implement strict identity verification for every person and device.",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Least Privilege Access",
      description: "Limit access rights to only what is necessary for users to do their jobs.",
      icon: Lock,
      color: "from-cyan-500 to-teal-500",
    },
    {
      title: "Multi-Factor Authentication",
      description: "Require multiple verification methods to establish identity and grant access.",
      icon: Fingerprint,
      color: "from-teal-500 to-green-500",
    },
    {
      title: "Continuous Monitoring",
      description: "Constantly monitor and validate that all systems remain in their secure state.",
      icon: AlertTriangle,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Microsegmentation",
      description: "Divide security perimeters into small zones to maintain separate access for different parts.",
      icon: CheckCircle,
      color: "from-purple-500 to-violet-500",
    },
  ]

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  }

  const titleText = "Security Principles"
  const titleLetters = titleText.split("")

  return (
    <section className="py-20 relative overflow-hidden" id="animated-typography" ref={ref}>
      {/* Background Elements */}
      {isMounted && (
        <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ y, opacity }}>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={
                  letter === " "
                    ? "mr-2"
                    : "inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300"
                }
              >
                {letter}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Core security concepts implemented in the IAM hardening project
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPrinciples.map((principle, index) => {
            const isHovered = hoveredCard === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background gradient that animates on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${principle.color} opacity-0 transition-opacity duration-300 ${
                    isHovered ? "opacity-10" : ""
                  }`}
                ></div>

                {/* Icon with animation */}
                <motion.div
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-r ${principle.color}`}
                  animate={isHovered ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <principle.icon className="h-6 w-6 text-white" />
                </motion.div>

                {/* Title with animation */}
                <motion.h3
                  className="text-xl font-semibold mb-2 text-white"
                  animate={isHovered ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {principle.title}
                </motion.h3>

                {/* Description */}
                <p className="text-gray-300">{principle.description}</p>

                {/* Animated particles on hover */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white"
                        initial={{
                          x: Math.random() * 100 + "%",
                          y: Math.random() * 100 + "%",
                          opacity: 0,
                        }}
                        animate={{
                          y: [null, Math.random() * -100 - 50],
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: 1 + Math.random() * 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
