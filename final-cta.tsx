"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section className="py-20 relative overflow-hidden" id="final-cta">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/0 via-blue-900/10 to-violet-900/20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
            Ready to Enhance Your Cloud Security?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Let's discuss how these IAM hardening techniques can be applied to your organization's cloud infrastructure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 mx-auto mb-4 flex items-center justify-center">
                <Eye className="h-6 w-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">See Architecture Live</h3>
              <p className="text-gray-300 mb-4">
                Explore the detailed architecture and implementation details of this project.
              </p>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                View Architecture <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 mx-auto mb-4 flex items-center justify-center">
                <Download className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Download Case Study</h3>
              <p className="text-gray-300 mb-4">
                Get the complete case study with detailed implementation steps and results.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600">
                Download PDF <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-full bg-violet-500/20 mx-auto mb-4 flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-violet-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Book a Security Demo</h3>
              <p className="text-gray-300 mb-4">
                Schedule a personalized demo to see how these solutions can work for you.
              </p>
              <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600">
                Schedule Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
