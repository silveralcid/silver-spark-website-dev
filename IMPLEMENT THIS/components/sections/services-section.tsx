"use client"

import { useState, useRef, useEffect } from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { services } from "@/lib/data/services-data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { PrimaryButton } from "@/components/ui/primary-button"

export function ServicesSection() {
  const [activeService, setActiveService] = useState(services[0])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const [contentHeight, setContentHeight] = useState<number>(0)

  // Calculate the appropriate height for the content area
  useEffect(() => {
    const updateHeight = () => {
      const heights = serviceRefs.current.filter(Boolean).map((el) => el?.scrollHeight || 0)
      const maxHeight = Math.max(...heights, 300)
      setContentHeight(maxHeight)
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)

    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return (
    <section className="min-h-[calc(100vh-var(--nav-height))] bg-gray-50 py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-30 z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.05) 2%, transparent 0%)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title={
            <>
              From{" "}
              <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                First Spark
              </span>{" "}
              to Full Scale
            </>
          }
          subtitle="We deliver lean, end-to-end solutions to execute your vision"
          alignment="center"
          className="mb-16"
        />

        <div className="max-w-7xl mx-auto">
          {/* Services Navigation - Horizontal Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {services.map((service, index) => {
              // Get the icon component dynamically
              const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] || LucideIcons.Layers

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "relative px-6 py-4 rounded-lg transition-all duration-300 flex items-center gap-3",
                    activeService.id === service.id
                      ? "bg-gradient-to-r from-orange-700 to-amber-600 text-white shadow-lg transform -translate-y-1"
                      : "bg-white/50 backdrop-blur-sm text-gray-800 hover:bg-white/80 border-b-2 border-transparent hover:border-amber-500",
                  )}
                >
                  <IconComponent
                    className={cn("h-5 w-5", activeService.id === service.id ? "text-white" : "text-orange-700")}
                  />
                  <span className="font-semibold text-lg">{service.title}</span>

                  {/* Gradient line that appears on hover */}
                  {activeService.id !== service.id && (
                    <div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-700 to-amber-600 transition-all duration-300"
                      style={{
                        width: hoveredIndex === index ? "100%" : "0%",
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                    ></div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Service Content Display - Full width, minimal containers */}
          <div className="relative" style={{ minHeight: `${contentHeight}px` }}>
            {services.map((service) => {
              // Get the icon component dynamically
              const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] || LucideIcons.Layers

              // Combine benefits and features for a more cohesive presentation
              const benefits = getServiceBenefits(service.id)
              const features = getServiceFeatures(service.id)

              return (
                <div
                  key={service.id}
                  ref={(el) => (serviceRefs.current[service.id - 1] = el)}
                  className={cn(
                    "absolute top-0 left-0 w-full transition-all duration-500",
                    activeService.id === service.id
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8 pointer-events-none",
                  )}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left column - Service info - now vertically centered */}
                    <div className="lg:col-span-5 flex flex-col space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-700 to-amber-600 flex items-center justify-center text-white shadow-lg">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{service.title}</h3>
                      </div>

                      <p className="text-xl text-gray-700">{service.description}</p>

                      <div className="pt-4">
                        <PrimaryButton className="text-lg px-8 py-6" asChild showArrow>
                          <Link href={`/services/${service.id}`}>Learn More</Link>
                        </PrimaryButton>
                      </div>
                    </div>

                    {/* Right column - Redesigned capabilities section */}
                    <div className="lg:col-span-7">
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
                        <h4 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
                          <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent mr-2">
                            Capabilities
                          </span>
                          & Outcomes
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          {/* Combined list of capabilities */}
                          {[...benefits, ...features].slice(0, 8).map((item, index) => (
                            <div
                              key={index}
                              className={cn(
                                "flex items-center gap-4 group p-3 rounded-lg transition-all",
                                "hover:bg-white hover:shadow-md",
                              )}
                            >
                              <div
                                className={cn(
                                  "w-1.5 h-12 rounded-full flex-shrink-0 transition-all",
                                  "bg-gradient-to-b from-orange-700 to-amber-600 group-hover:w-2",
                                )}
                              />
                              <span className="text-gray-800 text-lg font-medium group-hover:text-gray-900">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper function to get consistent benefits for each service
function getServiceBenefits(serviceId: number): string[] {
  // Map of predefined benefits for each service
  const benefitsMap: Record<number, string[]> = {
    1: [
      "Distinctive visual identity system",
      "Consistent brand messaging",
      "Comprehensive brand guidelines",
      "Cross-platform brand consistency",
    ],
    2: [
      "Conversion-focused responsive designs",
      "SEO-optimized site architecture",
      "Improved user engagement and retention",
      "Performance-optimized for all devices",
    ],
    3: [
      "Rapid MVP development in 4-6 weeks",
      "Scalable architecture for future growth",
      "User-centric design focused on conversion",
      "Ongoing support and iterative improvements",
    ],
    4: [
      "Streamlined lead capture and qualification",
      "Personalized customer journeys at scale",
      "Reduced manual tasks and operational costs",
      "Data-driven insights for optimization",
    ],
    5: [
      "End-to-end funnel optimization",
      "Integrated analytics and tracking",
      "Multi-channel campaign coordination",
      "Continuous testing and improvement",
    ],
    6: [
      "Technical SEO optimization",
      "Content strategy and implementation",
      "Local and global search visibility",
      "Regular performance reporting",
    ],
    7: [
      "High-converting lead magnet creation",
      "Automated email nurture sequences",
      "Landing page optimization",
      "Lead scoring and qualification",
    ],
    8: [
      "Ongoing technical maintenance",
      "Regular performance optimization",
      "Data-driven growth recommendations",
      "Dedicated support and quick response times",
    ],
  }

  // Return the benefits for the given service ID, or fallback to generic benefits
  return (
    benefitsMap[serviceId] || [
      "Faster time-to-market for your products",
      "Reduced operational costs and overhead",
      "Improved user experience and engagement",
      "Scalable solutions that grow with your business",
    ]
  )
}

// Helper function to get features for each service
function getServiceFeatures(serviceId: number): string[] {
  // Map of predefined features for each service
  const featuresMap: Record<number, string[]> = {
    1: ["Brand identity development", "Style guide creation", "Visual asset production", "Brand voice definition"],
    2: ["Mobile-first design", "Performance optimization", "Accessibility compliance", "Interactive prototyping"],
    3: [
      "Custom web application development",
      "Responsive UI/UX design",
      "API integration & development",
      "Database architecture",
    ],
    4: ["Workflow automation", "CRM integration", "Customer journey mapping", "Analytics dashboard"],
    5: ["Conversion rate optimization", "A/B testing framework", "User behavior analytics", "Funnel visualization"],
    6: ["Keyword research & strategy", "On-page optimization", "Link building campaigns", "Rank tracking & reporting"],
    7: ["Email marketing automation", "Lead scoring implementation", "Segmentation strategy", "Conversion tracking"],
    8: ["Proactive monitoring", "Security updates & patches", "Performance optimization", "Backup & recovery systems"],
  }

  // Return the features for the given service ID, or fallback to generic features
  return (
    featuresMap[serviceId] || [
      "Customized implementation",
      "Ongoing support",
      "Performance monitoring",
      "Regular updates & improvements",
    ]
  )
}

// Helper function to get process steps for each service - kept for reference but not used anymore
function getServiceProcess(serviceId: number): string[] {
  // Common process steps that work for most services
  return ["Discovery", "Strategy", "Implementation", "Launch"]
}

