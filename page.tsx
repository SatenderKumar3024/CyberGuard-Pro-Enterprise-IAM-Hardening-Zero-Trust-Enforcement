"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import ProblemSolution from "@/components/problem-solution"
import Research from "@/components/research"
import FinalCTA from "@/components/final-cta"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ComplianceProject from "@/components/compliance-project"
import LoadingIndicator from "@/components/loading-indicator"
import { motion } from "framer-motion"
import ScrollProgressIndicator from "@/components/scroll-progress-indicator"

// Dynamically import components with heavy client-side logic with custom loading states
const HeroEnhanced = dynamic(() => import("@/components/hero-enhanced"), {
  ssr: false,
  loading: () => (
    <div className="h-screen">
      <LoadingIndicator />
    </div>
  ),
})

const SecurityDashboard3D = dynamic(() => import("@/components/security-dashboard-3d"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center">
      <LoadingIndicator />
    </div>
  ),
})

const AnimatedTypography = dynamic(() => import("@/components/animated-typography"), {
  ssr: false,
})

const FingerprintAuth = dynamic(() => import("@/components/fingerprint-auth"), {
  ssr: false,
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [componentsLoaded, setComponentsLoaded] = useState({
    hero: false,
    dashboard: false,
    typography: false,
    fingerprint: false,
  })

  // Track which components have loaded
  const markComponentLoaded = (component) => {
    setComponentsLoaded((prev) => ({
      ...prev,
      [component]: true,
    }))
  }

  useEffect(() => {
    setMounted(true)

    // Preload components in sequence to improve performance
    const preloadComponents = async () => {
      try {
        // Preload hero first (most important)
        await import("@/components/hero-enhanced")
        markComponentLoaded("hero")

        // Then load others in parallel with proper error handling
        await Promise.all([
          import("@/components/security-dashboard-3d")
            .then(() => markComponentLoaded("dashboard"))
            .catch((err) => console.error("Failed to load dashboard:", err)),
          import("@/components/animated-typography")
            .then(() => markComponentLoaded("typography"))
            .catch((err) => console.error("Failed to load typography:", err)),
          import("@/components/fingerprint-auth")
            .then(() => markComponentLoaded("fingerprint"))
            .catch((err) => console.error("Failed to load fingerprint auth:", err)),
        ])
      } catch (error) {
        console.error("Error preloading components:", error)
      }
    }

    preloadComponents()

    // Add scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    // Clean up
    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto"
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-violet-950 text-white overflow-hidden">
      <Navbar />
      {mounted && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-blue-900/70 backdrop-blur-md border border-blue-500/30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <ScrollProgressIndicator />
        </motion.div>
      )}
      {mounted && (
        <>
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center">
                <LoadingIndicator />
              </div>
            }
          >
            <HeroEnhanced />
          </Suspense>
          <ProblemSolution />
          <Suspense
            fallback={
              <div className="h-[600px]">
                <LoadingIndicator />
              </div>
            }
          >
            <SecurityDashboard3D />
          </Suspense>
          <AnimatedTypography />
          <Research />
          <FingerprintAuth />
          <ComplianceProject />
          <FinalCTA />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  )
}
