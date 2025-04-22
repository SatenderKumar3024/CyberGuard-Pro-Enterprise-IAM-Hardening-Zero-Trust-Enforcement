"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileCheck, CheckCircle, Clock, BarChart } from "lucide-react"

export default function ComplianceProject() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section className="py-20 relative overflow-hidden" id="compliance-project">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 px-4 py-1 rounded-full text-sm font-medium">
              FEATURED PROJECT
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-green-300">
            Compliance Automation
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Developed automated compliance reporting for NIST 800-53, ISO 27001, and GDPR, reducing audit preparation
            time by 35%.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl p-1">
              <div className="bg-blue-950/80 backdrop-blur-sm rounded-xl overflow-hidden">
                <div className="aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileCheck className="h-24 w-24 text-emerald-500 opacity-50" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full p-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-6">
              <div className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Project Highlights</h3>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Automated Compliance Mapping</h4>
                      <p className="text-gray-300">
                        Created a system to automatically map controls across multiple frameworks
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <Clock className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">35% Time Reduction</h4>
                      <p className="text-gray-300">Significantly reduced audit preparation time through automation</p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <BarChart className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Real-time Compliance Dashboard</h4>
                      <p className="text-gray-300">Developed interactive dashboards for compliance status monitoring</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="bg-emerald-900/50 text-emerald-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  NIST 800-53
                </span>
                <span className="bg-emerald-900/50 text-emerald-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  ISO 27001
                </span>
                <span className="bg-emerald-900/50 text-emerald-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  GDPR
                </span>
                <span className="bg-emerald-900/50 text-emerald-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Automation
                </span>
                <span className="bg-emerald-900/50 text-emerald-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Reporting
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
