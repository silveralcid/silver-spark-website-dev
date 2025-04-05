"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Linkedin, User, Building2, Mail, Phone, MessageSquare } from "lucide-react"
import Link from "next/link"
import { PrimaryButton } from "@/components/ui/primary-button"

export function ContactFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [errors],
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      // Reset form data on successful submission
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      setErrors({ form: "There was an error submitting the form. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className="min-h-screen py-nav flex items-center relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-white" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text and Social */}
          <div className="text-gray-900">
            {/* Removed "TAKE THE SILK ROAD TO" */}

            <h2 id="contact-heading" className="heading-1 mb-12">
              Let's Make{" "}
              <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                Your Vision
              </span>{" "}
              Unstoppable
            </h2>

            <div className="mt-auto pt-12">
              <div className="flex items-center">
                <span className="text-gray-500 mr-4">Follow Us</span>
                <div className="flex space-x-4">
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram size={18} />
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-colors"
                    aria-label="Connect with us on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="text-gray-900">
            <h3 className="heading-3 mb-8">
              Talk to the Team That{" "}
              <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                Builds Big
              </span>{" "}
              Ideas
            </h3>

            {isSubmitted ? (
              <div className="bg-gray-100 backdrop-blur-sm rounded-lg p-8 border border-gray-200" role="alert">
                <h4 className="heading-4 mb-4">Thank You!</h4>
                <p className="body text-gray-700">
                  We've received your message and will get back to you shortly. Our team is excited to learn more about
                  your project.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-6">
                  <div>
                    <div className="relative">
                      <User className="absolute left-0 top-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name*"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-t-0 border-x-0 border-b border-gray-300 rounded-none pl-8 pb-2 bg-transparent focus:border-gray-900 focus:ring-0 placeholder:text-gray-400 font-body text-gray-900"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                    </div>
                    {errors.name && (
                      <p className="caption text-red-600 mt-1" id="name-error" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Building2 className="absolute left-0 top-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                      <Input
                        type="text"
                        name="company"
                        id="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        className="border-t-0 border-x-0 border-b border-gray-300 rounded-none pl-8 pb-2 bg-transparent focus:border-gray-900 focus:ring-0 placeholder:text-gray-400 font-body text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Mail className="absolute left-0 top-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-t-0 border-x-0 border-b border-gray-300 rounded-none pl-8 pb-2 bg-transparent focus:border-gray-900 focus:ring-0 placeholder:text-gray-400 font-body text-gray-900"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p className="caption text-red-600 mt-1" id="email-error" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Phone className="absolute left-0 top-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                      <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-t-0 border-x-0 border-b border-gray-300 rounded-none pl-8 pb-2 bg-transparent focus:border-gray-900 focus:ring-0 placeholder:text-gray-400 font-body text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <MessageSquare className="absolute left-0 top-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                      <Textarea
                        name="message"
                        id="message"
                        placeholder="Your Message*"
                        value={formData.message}
                        onChange={handleChange}
                        className="border-t-0 border-x-0 border-b border-gray-300 rounded-none pl-8 pb-2 bg-transparent focus:border-gray-900 focus:ring-0 placeholder:text-gray-400 min-h-[100px] resize-none font-body text-gray-900"
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                    </div>
                    {errors.message && (
                      <p className="caption text-red-600 mt-1" id="message-error" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <PrimaryButton type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-8 py-2 h-auto">
                      {isSubmitting ? "SENDING..." : "SUBMIT"}
                    </PrimaryButton>
                  </div>
                </div>

                {errors.form && (
                  <p className="body-small text-red-600 mt-4" role="alert">
                    {errors.form}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

