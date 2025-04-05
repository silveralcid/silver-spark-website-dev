"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { PrimaryButton } from "@/components/ui/primary-button"

export function TrendsGuideSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      // In a real implementation, you would send the email to your API/backend
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-16 md:py-20 flex items-center overflow-hidden">
      {/* Monochrome background */}
      <div className="absolute inset-0 z-0 bg-black" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Text and Form */}
          <div className="text-white space-y-6 md:pr-6">
            <h2 className="heading-2 mb-2">
              The{" "}
              <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">2025</span>{" "}
              Brand Identity{" "}
              <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                Playbook
              </span>
            </h2>

            <p className="body-large">
              <span className="text-white font-medium">Download the founder-focused strategy</span> for mastering the
              power of branding.
            </p>

            {isSubmitted ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mt-6">
                <h3 className="heading-4 mb-2">Thank You!</h3>
                <p>Your digital trends guide is on its way to your inbox. Check your email to download the guide.</p>
              </div>
            ) : (
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="max-w-md">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 h-12 sm:h-14 pr-24 sm:pr-36 rounded-md"
                    />
                    <div className="absolute right-1 top-1 h-[calc(100%-8px)]">
                      <PrimaryButton
                        type="submit"
                        disabled={isSubmitting}
                        className="h-full rounded-l-none px-4 sm:px-6 bg-gradient-to-r from-orange-700 to-amber-600 hover:from-orange-800 hover:to-amber-700"
                      >
                        {isSubmitting ? "SENDING..." : "DOWNLOAD"}
                      </PrimaryButton>
                    </div>
                  </div>
                  {error && <p className="text-red-300 mt-2 text-sm">{error}</p>}
                  <p className="text-xs text-white/60 mt-3">
                    By submitting this form, you agree to receive the requested guide and occasional marketing emails.
                    You can unsubscribe at any time.
                  </p>
                </form>
              </div>
            )}
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center items-center lg:justify-end">
            <div className="relative w-full max-w-sm h-[250px] md:h-[300px] p-4">
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10 lg:hidden"></div>
              <Image
                src="/placeholder.svg?height=400&width=300&text=2025+Digital+Trends+Guide"
                alt="2025 Digital Trends Guide Preview"
                fill
                className="object-contain transform rotate-6 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

