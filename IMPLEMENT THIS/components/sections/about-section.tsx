"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Check, Play } from "lucide-react"

export function AboutSection() {
  const playButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!playButtonRef.current) return

    // Add a subtle pulse animation to the play button
    const playButton = playButtonRef.current
    let scale = 1

    const pulseAnimation = () => {
      scale = scale === 1 ? 1.1 : 1
      playButton.style.transform = `scale(${scale})`
      playButton.style.boxShadow =
        scale === 1 ? "0 0 10px rgba(255, 255, 255, 0.3)" : "0 0 20px rgba(255, 255, 255, 0.7)"
    }

    const interval = setInterval(pulseAnimation, 1500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="min-h-[calc(100vh-var(--nav-height))] bg-gray-50 flex items-center py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Your{" "}
                <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                  {" "}
                  Complete{" "}
                </span>{" "}
                Solution for Bold Ideas
              </h1>
              <p className="text-xl md:text-2xl font-medium text-gray-700">
                Fueling Founders. Igniting Impact. Sparking Scalability.
              </p>
            </div>

            <div className="space-y-6 py-4">
              <div className="flex items-start gap-5">
                <div className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="text-xl text-gray-700">
                  Rapid MVP Development to{" "}
                  <span className="font-semibold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                    Validate Ideas Quickly
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="text-xl text-gray-700">
                  AI-Driven Automation to{" "}
                  <span className="font-semibold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                    Scale Smarter, Not Harder
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="text-xl text-gray-700">
                  Strategic Marketing Systems to{" "}
                  <span className="font-semibold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                    Drive Sustainable Growth
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                At <strong>Silver Spark</strong>, we don't just build websites or launch MVPs — we engineer
                <strong> scalable digital systems</strong> that help startups move fast, stay lean, and grow smart.
                Whether you're a <strong> business-minded founder who needs tech execution</strong> or a
                <strong> tech-savvy founder who needs growth strategy</strong>, we bridge the gap with precision and
                momentum.
              </p>

              <p className="text-lg text-gray-700">
                We're here for <strong>your entire journey</strong> — from
                <span className="font-semibold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                  {" "}
                  first spark
                </span>{" "}
                to sustained scale.
              </p>
            </div>

            {/* Video Banner with Glowing Border */}
            <div className="relative w-full mt-8">
              <div className="video-banner-container relative -left-4 w-[calc(100%+1rem)] h-20">
                {/* Inner content with gradient background */}
                <div className="video-banner-content flex items-center">
                  <div className="flex items-center ml-4 h-full">
                    <div className="relative overflow-hidden rounded-md h-16 w-28 mr-4 flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      <Image
                        src="/placeholder.svg?height=200&width=350"
                        alt="Video thumbnail"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div
                          ref={playButtonRef}
                          className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-500"
                        >
                          <Play className="h-5 w-5 text-gray-900 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="text-white">
                      <div className="text-lg font-medium">See Our Work In Action</div>
                      <div className="text-sm opacity-80">1 MINUTE</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-20"></div> {/* Spacer to match the absolute positioned banner height */}
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/placeholder.svg?height=1200&width=900"
              alt="Silver Spark team"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

