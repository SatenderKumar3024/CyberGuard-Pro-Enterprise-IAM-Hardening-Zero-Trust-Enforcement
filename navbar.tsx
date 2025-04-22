"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      const sections = ["about", "experience", "projects", "certifications", "contact", "resume"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-blue-950/80 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="font-bold text-xl">Satender Kumar</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#about"
              className={`transition-colors ${
                activeSection === "about" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              About
            </Link>
            <Link
              href="#experience"
              className={`transition-colors ${
                activeSection === "experience" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className={`transition-colors ${
                activeSection === "projects" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Projects
            </Link>
            <Link
              href="#certifications"
              className={`transition-colors ${
                activeSection === "certifications" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Certifications
            </Link>
            <Link
              href="#contact"
              className={`transition-colors ${
                activeSection === "contact" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Contact
            </Link>
            <Link
              href="#resume"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-md font-medium hover:from-cyan-600 hover:to-blue-600 transition-all"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Resume
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-blue-900/90 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="#about"
              className={`transition-colors ${
                activeSection === "about" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              } py-2`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                setIsOpen(false)
              }}
            >
              About
            </Link>
            <Link
              href="#experience"
              className={`transition-colors ${
                activeSection === "experience" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              } py-2`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
                setIsOpen(false)
              }}
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className={`transition-colors ${
                activeSection === "projects" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              } py-2`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                setIsOpen(false)
              }}
            >
              Projects
            </Link>
            <Link
              href="#certifications"
              className={`transition-colors ${
                activeSection === "certifications" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              } py-2`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" })
                setIsOpen(false)
              }}
            >
              Certifications
            </Link>
            <Link
              href="#contact"
              className={`transition-colors ${
                activeSection === "contact" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              } py-2`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                setIsOpen(false)
              }}
            >
              Contact
            </Link>
            <Link
              href="#resume"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-md font-medium hover:from-cyan-600 hover:to-blue-600 transition-all inline-block"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })
                setIsOpen(false)
              }}
            >
              Resume
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
