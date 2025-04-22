"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

const complianceChecklist = [
  { control: "AC-2: Account Management", description: "Implemented automated account lifecycle management" },
  { control: "AC-6: Least Privilege", description: "Enforced minimum necessary permissions for all roles" },
  { control: "AC-17: Remote Access", description: "Secured all remote access with MFA and conditional policies" },
]

export default function Research() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section className="py-20 relative overflow-hidden" id="research">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            ref={ref}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
              Research & CISO Insight
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex-shrink-0 flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Why IAM Misconfigurations Are a Top Cloud Risk
                </h3>
                <p className="text-gray-300 mb-4">
                  Identity and Access Management (IAM) misconfigurations represent one of the most significant security
                  risks in cloud environments today. According to recent research:
                </p>
                <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 mb-4">
                  <p className="text-cyan-300 font-medium">
                    "80% of cloud breaches tied to access mismanagement" – Gartner
                  </p>
                </div>
                <p className="text-gray-300">
                  Overly permissive IAM policies create attack vectors that can be exploited to gain unauthorized access
                  to sensitive data and critical infrastructure. Implementing least-privilege access controls is
                  essential for reducing the attack surface.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Compliance Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {complianceChecklist.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-950/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 flex items-start"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">{item.control}</h4>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
          >
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center mr-4">
                <Info className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">CISO Quote</h3>
                <blockquote className="text-gray-300 italic border-l-4 border-blue-500 pl-4 py-2">
                  "This project demonstrates scalable access control at enterprise level with real business impact. The
                  implementation of least-privilege principles across our multi-cloud environment has significantly
                  reduced our attack surface while maintaining operational efficiency."
                </blockquote>
                <p className="text-right text-gray-400 mt-2">— Enterprise CISO</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
