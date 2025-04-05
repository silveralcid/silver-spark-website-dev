"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSignupSection() {
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
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24">
          {/* Left side - Heading - now right-justified */}
          <div className="text-white text-right md:w-auto">
            <h2 className="heading-2">
              Sign Up To Get The
              <br />
              Latest Digital Trends
            </h2>
          </div>

          {/* Right side - Form - now left-justified */}
          <div className="w-full md:w-auto text-left">
            {isSubmitted ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <p className="text-white">Thank you for signing up! You'll receive our latest digital trends soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 h-12 sm:h-14 pr-24 sm:pr-36 rounded-md"
                  />
                  <div className="absolute right-1 top-1 h-[calc(100%-8px)]">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-full rounded-l-none px-4 sm:px-6 bg-gradient-to-r from-orange-700 to-amber-600 hover:from-orange-800 hover:to-amber-700 text-white"
                    >
                      {isSubmitting ? "SIGNING UP..." : "SIGN UP"}
                    </Button>
                  </div>
                </div>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

