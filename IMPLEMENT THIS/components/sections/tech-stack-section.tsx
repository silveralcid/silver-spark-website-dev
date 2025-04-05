"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"

export function TechStackSection() {
  const [activeTab, setActiveTab] = useState("frontend")
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)

  // Tech content data
  const techContent = {
    frontend: {
      title: "Frontend Development That Converts",
      paragraphs: [
        "We design sleek, high-performing user interfaces using the latest frontend tech, React & Next.js. While we're fluent in multiple frontend frameworks, we intentionally build most projects using React and Next.js—and here's why: Fast Iteration, Smooth Scalability. React's component-based architecture lets us move fast without breaking things. It's perfect for rapid MVPs, iterative design, and building scalable UI systems that grow as your product evolves.",
      ],
    },
    backend: {
      title: "Backends Built to Scale",
      paragraphs: [
        "We build backend systems that are fast, flexible, and built to scale—without the bloat. While we tailor every backend to your product's unique needs, we often use serverless functions powered by AWS Lambda, Supabase, Firebase, and MongoDB for one simple reason: they let us prototype quickly and scale confidently.This serverless-first approach means less infrastructure to manage, faster launch timelines, and lower overhead—perfect for startups that need to move fast without compromising on long-term stability.",
      ],
    },
    cms: {
      title: "Modern CMS for Modern Products",
      paragraphs: [
        "Effective content management is essential for scaling fast and staying flexible. We often recommend Payload CMS for its seamless integration with Next.js, giving you full control and performance out of the box. It's a powerful headless option that fits perfectly with modern web app builds. That said, we're tech-agnostic—we also work with platforms like WordPress, Sanity, and Strapi, depending on your needs. Whether it's complex workflows, localization, or custom content structures, we'll set up a CMS that's easy to manage, developer-friendly, and built to grow with your business.",
      ],
    },
    ecommerce: {
      title: "Frictionless Shopping, Engineered to Win",
      paragraphs: [
        "We love building with Shopify for its flexibility, speed, and seamless checkout—but we work with whatever gets the job done. From WooCommerce and Magento to fully custom storefronts, we tailor the tech to your business model and growth goals.Our e-commerce builds are designed for conversion, from mobile-optimized UX to fast-loading pages and integrated payments, shipping, and tax tools. Whether you're launching a DTC brand or scaling a complex catalog, we create buying experiences that drive revenue and build trust.",
      ],
    },
    integrations: {
      title: "Integrations That Supercharge Your Stack",
      paragraphs: [
        "We connect your platform to the best tools in the game—CRM, marketing, payments, automation, and AI. From Stripe and HubSpot to Zapier and OpenAI, we build seamless systems that save time, reduce friction, and scale with you. We love cloud-native, serverless infrastructure and integrate with platforms like AWS, Vercel, Firebase, and Supabase to keep things fast, flexible, and future-proof. Whether it's syncing data, automating workflows, or adding AI functionality, we build digital ecosystems that power serious growth.",
      ],
    },
  }

  // Tab labels with display names
  const tabLabels = {
    frontend: "Frontend",
    backend: "Backend",
    cms: "CMS",
    ecommerce: "E-commerce",
    integrations: "Integrations",
  }

  const getTechBadges = (key: string) => {
    switch (key) {
      case "frontend":
        return ["React", "Next.js", "Tailwind CSS", "TypeScript"]
      case "backend":
        return ["Node.js", "Express", "Serverless", "AWS Lambda"]
      case "cms":
        return ["Payload CMS", "WordPress", "Sanity", "Strapi"]
      case "ecommerce":
        return ["Shopify", "WooCommerce", "Magento", "Stripe"]
      case "integrations":
        return ["Stripe", "HubSpot", "Zapier", "OpenAI"]
      default:
        return []
    }
  }

  return (
    <section className="bg-white py-nav relative overflow-hidden">
      {/* Background subtle pattern */}
      <div
        className="absolute inset-0 bg-gray-50 opacity-50 z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.05) 2%, transparent 0%)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 h-full flex flex-col relative z-10">
        <SectionHeading
          title={
            <>
              Our{" "}
              <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                Startup-Ready
              </span>{" "}
              Tech Stack
            </>
          }
          subtitle="We use battle-tested tools and future-ready platforms—combining serverless tech, AI, and powerful integrations to help you launch faster and scale smarter"
          alignment="center"
          className="mb-8 md:mb-12 text-gray-900"
        />

        {/* Responsive layout with content on left, tabs on right */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 max-w-5xl mx-auto flex-grow">
          {/* Content area - takes more space on desktop, first on desktop */}
          <div className="w-full lg:w-3/4 order-2 lg:order-1 flex flex-col mt-6 lg:mt-0">
            {Object.entries(techContent).map(([key, content]) => (
              <div
                key={key}
                className={cn(
                  "relative bg-white rounded-xl border border-gray-100 shadow-lg transition-all duration-500",
                  activeTab === key ? "block" : "hidden",
                )}
              >
                {/* Gradient accent lines on left and bottom */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-700 to-amber-600"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-700 to-amber-600"></div>

                <div className="p-4 md:p-6 lg:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">
                    {key === "frontend" && (
                      <>
                        Frontend Development That{" "}
                        <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                          Converts
                        </span>
                      </>
                    )}
                    {key === "backend" && (
                      <>
                        Backends Built to{" "}
                        <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                          Scale
                        </span>
                      </>
                    )}
                    {key === "cms" && (
                      <>
                        Modern CMS for{" "}
                        <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                          Modern
                        </span>{" "}
                        Products
                      </>
                    )}
                    {key === "ecommerce" && (
                      <>
                        <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                          Frictionless
                        </span>{" "}
                        Shopping,{" "}
                        <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                          Engineered
                        </span>{" "}
                        to Win
                      </>
                    )}
                    {key === "integrations" && (
                      <>
                        Integrations That{" "}
                        <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                          Supercharge
                        </span>{" "}
                        Your Stack
                      </>
                    )}
                  </h3>

                  <div className="space-y-4 md:space-y-6">
                    {content.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-sm md:text-base text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Tech icons or badges could go here */}
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100">
                    <h4 className="text-xs md:text-sm uppercase tracking-wider text-gray-500 mb-3 md:mb-4">
                      Popular Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {getTechBadges(key).map((badge, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 md:px-3 md:py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs navigation - top on mobile, right side on desktop */}
          <div ref={rightColumnRef} className="w-full lg:w-1/4 order-1 lg:order-2 flex flex-col gap-4 md:gap-6">
            {/* Menu container */}
            <div
              ref={tabsRef}
              className="bg-white rounded-xl border border-gray-100 shadow-lg p-3 md:p-4 sticky top-20 md:top-24 overflow-hidden"
            >
              <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-gray-900 pb-2 border-b border-gray-100 text-center">
                Technology Areas
              </h4>

              <div className="flex flex-row lg:flex-col flex-wrap justify-center gap-2 md:gap-3">
                {Object.keys(techContent).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    onMouseEnter={() => setHoveredTab(key)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className={cn(
                      "relative text-center px-2 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-300 flex items-center justify-center",
                      "flex-grow lg:flex-grow-0 min-w-[80px] md:min-w-0",
                      activeTab === key
                        ? "bg-gradient-to-r from-orange-700 to-amber-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    {/* Centered text */}
                    <span className="text-sm md:text-base">{tabLabels[key as keyof typeof tabLabels]}</span>

                    {/* Gradient line that appears on hover */}
                    {activeTab !== key && (
                      <div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-700 to-amber-600 transition-all duration-300"
                        style={{
                          width: hoveredTab === key ? "100%" : "0%",
                          opacity: hoveredTab === key ? 1 : 0,
                        }}
                      ></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Button with enhanced shadow and glow - no container */}
            <Button
              asChild
              className="py-2 md:py-3 px-3 md:px-4 bg-gradient-to-r from-orange-700 to-amber-600 hover:from-orange-800 hover:to-amber-700 text-white border-none rounded-lg transition-all duration-300 relative"
              style={{
                boxShadow: "0 10px 25px -5px rgba(234, 88, 12, 0.5), 0 8px 10px -6px rgba(234, 88, 12, 0.3)",
              }}
            >
              <Link href="/contact" className="relative z-10 flex items-center justify-center">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                Schedule a Tech Consult
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

