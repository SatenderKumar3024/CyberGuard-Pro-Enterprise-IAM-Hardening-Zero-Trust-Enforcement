"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, Linkedin, Twitter, Calendar, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [formType, setFormType] = useState("inquiry")

  return (
    <section className="py-20 relative overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
            Contact Me
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            I'm always open to discussing new projects, cybersecurity challenges, or opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Get In Touch</h3>
              <p className="text-gray-300 mb-6">Feel free to reach out or schedule a call.</p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <a
                    href="mailto:satenderkumar.analyst@gmail.com"
                    className="text-gray-300 hover:text-cyan-300 transition-colors"
                  >
                    satenderkumar.analyst@gmail.com
                  </a>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="text-gray-300">+1 (226) 637-****</span>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Linkedin className="h-5 w-5 text-blue-500" />
                  </div>
                  <a
                    href="https://www.linkedin.com/in/satender-singh2430/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-300 transition-colors"
                  >
                    linkedin.com/in/satender-singh2430
                  </a>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Twitter className="h-5 w-5 text-blue-500" />
                  </div>
                  <a
                    href="https://x.com/SatendeK2430"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-300 transition-colors"
                  >
                    @SatendeK2430
                  </a>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <a
                    href="https://calendly.com/satenderkumar-analyst"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-300 transition-colors"
                  >
                    calendly.com/satenderkumar-analyst
                  </a>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <LinkIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <a
                    href="https://linktr.ee/satendersingh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-300 transition-colors"
                  >
                    linktr.ee/satendersingh
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Satender Kumar</h3>
              <p className="text-gray-300 mb-4">
                Information Security Analyst specializing in cloud security, SIEM, and threat detection.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-900/50 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">AWS</span>
                <span className="bg-blue-900/50 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Azure
                </span>
                <span className="bg-blue-900/50 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">IAM</span>
                <span className="bg-blue-900/50 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  SIEM
                </span>
                <span className="bg-blue-900/50 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  NIST
                </span>
                <span className="bg-blue-900/50 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Zero Trust
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
          >
            <div className="mb-6">
              <RadioGroup defaultValue="inquiry" className="flex space-x-4" onValueChange={setFormType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inquiry" id="inquiry" />
                  <Label htmlFor="inquiry">General Inquiry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="resume" id="resume" />
                  <Label htmlFor="resume">Request Resume</Label>
                </div>
              </RadioGroup>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    className="bg-blue-900/30 border-blue-500/30 focus:border-cyan-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    className="bg-blue-900/30 border-blue-500/30 focus:border-cyan-500 text-white"
                  />
                </div>

                {formType === "inquiry" && (
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your Message"
                      className="bg-blue-900/30 border-blue-500/30 focus:border-cyan-500 text-white min-h-[120px]"
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {formType === "inquiry" ? "Send Message" : "Request Resume"}
              </Button>
            </form>

            <div className="mt-4 text-xs text-gray-400 text-center">
              <p>
                Security Notice: This form is protected by reCAPTCHA and implements strict CSP headers, input
                validation, and DOMPurify sanitization to ensure secure communication.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
