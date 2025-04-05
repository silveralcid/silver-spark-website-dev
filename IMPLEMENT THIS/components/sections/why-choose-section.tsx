"use client"

import { useRef, useState } from "react"

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  return (
    <section ref={sectionRef} className="min-h-screen py-nav bg-white relative flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
            Why Go It Alone? Build{" "}
            <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
              {" "}
              Smarter
            </span>{" "}
            with Experts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stop wasting time on trial and error. Work with pros who deliver real, measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex flex-col p-4 rounded-lg border border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-sm hover:bg-gray-50/50 hover:translate-y-[-2px] group"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex items-start mb-2 md:mb-3">
                <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent text-2xl md:text-3xl font-bold mr-2 group-hover:scale-105 transition-transform duration-300">
                  {reason.id}
                </span>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-black transition-colors duration-300">
                  {reason.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-700 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                {reason.description}
              </p>
              <div className="mt-auto relative h-px w-full">
                {/* Base line (shorter, gray) */}
                <div
                  className="absolute top-0 left-0 h-px bg-gray-200 transition-all duration-500 ease-out"
                  style={{ width: hoveredItem === index ? "0%" : "40%" }}
                ></div>

                {/* Gradient line (full width, orange gradient) */}
                <div
                  className="absolute top-0 left-0 h-px bg-gradient-to-r from-orange-700 to-amber-600 transition-all duration-500 ease-out"
                  style={{
                    width: hoveredItem === index ? "100%" : "0%",
                    opacity: hoveredItem === index ? 1 : 0,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const reasons = [
  {
    id: "01",
    title: "Strategy First, Always",
    description:
      "We don't dive in blind. Every project starts with a clear, tailored strategy based on your goals, audience, and market so every move has purpose.",
  },
  {
    id: "02",
    title: "Launch-Ready MVPs in Weeks, Not Months",
    description:
      "We rapidly prototype and launch polished MVPs in 4–6 weeks, helping you validate ideas faster and start generating traction.",
  },
  {
    id: "03",
    title: "Built-In Automation from Day One",
    description:
      "From AI workflows to lead generation systems, we design tools that work for you and free up your time to focus on growth.",
  },
  {
    id: "04",
    title: "Design That Converts, Not Just Looks Good",
    description:
      "Our user-centric design approach is built to drive action. That means lower bounce rates, higher engagement, and better results.",
  },
  {
    id: "05",
    title: "Full-Stack Execution Under One Roof",
    description:
      "We handle everything from strategy and branding to development and marketing so your entire digital presence works together seamlessly.",
  },
  {
    id: "06",
    title: "SEO and Growth Infrastructure Baked In",
    description:
      "We build with long-term visibility in mind, using proven strategies to improve rankings and increase organic traffic over time.",
  },
  {
    id: "07",
    title: "Fast Load Times and Flawless Performance",
    description:
      "We optimize every build for speed and stability across all devices to ensure users stay engaged and conversions stay high.",
  },
  {
    id: "08",
    title: "Marketing That Doesn't Feel Like Guesswork",
    description:
      "We create smart, data-backed marketing systems that attract the right audience, nurture leads, and turn interest into sales.",
  },
  {
    id: "09",
    title: "Partners, Not Vendors",
    description:
      "Our long-term retainer model gives you a reliable, strategic partner who evolves with your business and understands your goals.",
  },
  {
    id: "10",
    title: "Founder-Focused, Startup-Smart",
    description:
      "We understand the pace and pressure of early-stage growth and bring a lean, hands-on approach tailored to ambitious founders.",
  },
]

