"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Users, Key, CheckCircle } from "lucide-react"

const cards = [
  {
    title: "IAM Audit & Role Review",
    description:
      "Comprehensive analysis of existing IAM roles and permissions across AWS and Azure environments to identify over-permissive access.",
    icon: Shield,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Policy Creation & RBAC Implementation",
    description:
      "Development of role-based access control policies following least-privilege principles for all cloud resources.",
    icon: Users,
    color: "from-cyan-500 to-teal-500",
  },
  {
    title: "MFA & Zero Trust Enforcement",
    description:
      "Implementation of multi-factor authentication and zero trust architecture principles for all privileged access.",
    icon: Key,
    color: "from-teal-500 to-green-500",
  },
  {
    title: "Compliance Check with NIST",
    description:
      "Validation of IAM controls against NIST AC-2, AC-6, AC-17 requirements to ensure regulatory compliance.",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-500",
  },
]

export default function ProblemSolution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section className="py-20 relative overflow-hidden" id="problem-solution">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>

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
              Problem → Solution Flow
            </h2>

            <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-2 text-cyan-300">Challenge:</h3>
              <p className="text-gray-300 mb-4">
                Over-permissive roles across 50+ cloud resources (S3, VMs) creating significant security vulnerabilities
                and compliance gaps.
              </p>

              <h3 className="text-xl font-semibold mb-2 text-cyan-300">Goal:</h3>
              <p className="text-gray-300">
                Implement least-privilege IAM model and enforce Zero Trust architecture while maintaining operational
                efficiency.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-r ${card.color}`}
                >
                  <card.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-white">{card.title}</h3>
                <p className="text-gray-300">{card.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
              <div className="bg-blue-950 px-4 py-2 rounded-full">
                <span className="text-cyan-300 font-medium">Implementation Timeline: 6 Weeks</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
