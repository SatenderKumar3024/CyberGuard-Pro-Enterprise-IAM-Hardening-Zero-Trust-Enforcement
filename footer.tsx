"use client"

import Link from "next/link"
import { Shield, Linkedin, Twitter, Calendar, Link2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 border-t border-blue-900/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-cyan-400" />
              <span className="font-bold text-lg">Satender Kumar</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Information Security Analyst specializing in cloud security, SIEM, and threat detection.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#certifications" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/satender-singh2430/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/SatendeK2430"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter/X
                </a>
              </li>
              <li>
                <a
                  href="https://calendly.com/satenderkumar-analyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendly
                </a>
              </li>
              <li>
                <a
                  href="https://linktr.ee/satendersingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center"
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Linktree
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#resume" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Request Resume
                </Link>
              </li>
              <li>
                <Link href="#certifications" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Certifications
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-900/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Satender Kumar. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">Secured with SSL encryption</p>
        </div>
      </div>
    </footer>
  )
}
