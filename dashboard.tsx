"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const vulnerabilityData = [
  { name: "Critical", value: 5, color: "#ef4444" },
  { name: "High", value: 15, color: "#f97316" },
  { name: "Medium", value: 30, color: "#eab308" },
  { name: "Low", value: 50, color: "#22c55e" },
]

const complianceData = [
  { name: "NIST 800-53", status: "Compliant", icon: CheckCircle },
  { name: "GDPR", status: "Compliant", icon: CheckCircle },
  { name: "ISO 27001", status: "Compliant", icon: CheckCircle },
]

export default function Dashboard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section className="py-20 relative overflow-hidden" id="dashboard">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
            Interactive Dashboard
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time metrics showing the impact of IAM hardening across cloud environments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Vulnerability Reduction</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vulnerabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {vulnerabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-full text-white font-medium">
                30% Overall Vulnerability Reduction
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">IAM Role Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-800">
                    <th className="py-3 px-4 text-left text-cyan-300">Role</th>
                    <th className="py-3 px-4 text-left text-cyan-300">Resources</th>
                    <th className="py-3 px-4 text-left text-cyan-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-blue-800/50">
                    <td className="py-3 px-4">Admin</td>
                    <td className="py-3 px-4">Limited to critical infrastructure</td>
                    <td className="py-3 px-4 text-green-400">Optimized</td>
                  </tr>
                  <tr className="border-b border-blue-800/50">
                    <td className="py-3 px-4">Developer</td>
                    <td className="py-3 px-4">Dev/Test environments only</td>
                    <td className="py-3 px-4 text-green-400">Optimized</td>
                  </tr>
                  <tr className="border-b border-blue-800/50">
                    <td className="py-3 px-4">Security</td>
                    <td className="py-3 px-4">Read-only across all resources</td>
                    <td className="py-3 px-4 text-green-400">Optimized</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Service Account</td>
                    <td className="py-3 px-4">Function-specific access</td>
                    <td className="py-3 px-4 text-green-400">Optimized</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30">
                View Full Matrix
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {complianceData.map((item, index) => (
            <div
              key={index}
              className="bg-blue-950/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 flex items-center"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                <item.icon className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium text-white">{item.name}</h4>
                <p className="text-green-400">{item.status}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
