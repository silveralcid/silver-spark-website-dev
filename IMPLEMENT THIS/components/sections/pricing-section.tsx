"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { Calculator, Zap, Rocket, Crown, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { PrimaryButton } from "@/components/ui/primary-button"

// Define the pricing package type
interface PricingPackage {
  id: string
  name: string
  icon: React.ElementType
  description: string
  idealFor: string
  popular?: boolean
  milestones: {
    name: string
    description: string
    price: string
    percentage: number
  }[]
  features: {
    [key: string]: boolean | string
  }
}

export function PricingSection() {
  // State for selected pricing package
  const [selectedPackage, setSelectedPackage] = useState<string>("professional")

  // State for hovered package (for animations)
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)

  // State for hovered milestone (for animations)
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null)

  // Ref for feature list container to measure height
  const featureListRef = useRef<HTMLDivElement>(null)

  // State for feature list height (for animation)
  const [featureListHeight, setFeatureListHeight] = useState<number>(0)

  // Update feature list height on window resize
  useEffect(() => {
    const updateHeight = () => {
      if (featureListRef.current) {
        setFeatureListHeight(featureListRef.current.scrollHeight)
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)

    return () => {
      window.removeEventListener("resize", updateHeight)
    }
  }, [])

  // Add a new state for tracking the current milestone in the mobile carousel
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0)

  // Add functions to navigate through milestones
  const nextMilestone = () => {
    setCurrentMilestoneIndex((prev) => (prev < 6 ? prev + 1 : prev))
  }

  const prevMilestone = () => {
    setCurrentMilestoneIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  // Define pricing packages
  const pricingPackages: PricingPackage[] = [
    {
      id: "starter",
      name: "Starter",
      icon: Zap,
      description: "Perfect for small businesses looking to establish an online presence",
      idealFor: "Small businesses & startups",
      milestones: [
        {
          name: "Initial Deposit",
          description: "Project kickoff, strategy, and planning",
          price: "$1,250",
          percentage: 50,
        },
        {
          name: "Design Approval",
          description: "After design mockups are approved",
          price: "$625",
          percentage: 25,
        },
        {
          name: "Final Delivery",
          description: "Upon project completion and handover",
          price: "$625",
          percentage: 25,
        },
      ],
      features: {
        "Custom Website Design": true,
        "Mobile Responsive": true,
        "Up to 5 Pages": true,
        "Contact Form": true,
        "Basic SEO Setup": true,
        "Social Media Integration": true,
        "Content Management System": true,
        "3 Rounds of Revisions": true,
        "Google Analytics Setup": true,
        "1 Month Support": true,
        "Performance Optimization": true,
        "Basic Security Features": true,
        "AI-Powered Features": false,
        "Custom Integrations": false,
        "Advanced Analytics": false,
        "Conversion Optimization": false,
      },
    },
    {
      id: "professional",
      name: "Professional",
      icon: Rocket,
      description: "Ideal for growing businesses that need more features and customization",
      idealFor: "Growing businesses & established brands",
      popular: true,
      milestones: [
        {
          name: "Initial Deposit",
          description: "Project kickoff, strategy, and planning",
          price: "$2,500",
          percentage: 50,
        },
        {
          name: "Design & Development",
          description: "After design approval and development begins",
          price: "$1,250",
          percentage: 25,
        },
        {
          name: "Final Delivery",
          description: "Upon project completion and handover",
          price: "$1,250",
          percentage: 25,
        },
      ],
      features: {
        "Custom Website Design": true,
        "Mobile Responsive": true,
        "Up to 10 Pages": true,
        "Contact Form": true,
        "Advanced SEO Setup": true,
        "Social Media Integration": true,
        "Content Management System": true,
        "Unlimited Revisions": true,
        "Google Analytics Setup": true,
        "3 Months Support": true,
        "Performance Optimization": true,
        "Advanced Security Features": true,
        "AI-Powered Features": true,
        "Custom Integrations": "Up to 3",
        "Advanced Analytics": true,
        "Conversion Optimization": false,
      },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: Crown,
      description: "Comprehensive solution for established businesses with complex requirements",
      idealFor: "Large businesses & complex projects",
      milestones: [
        {
          name: "Initial Deposit",
          description: "Project kickoff, strategy, and planning",
          price: "$5,000",
          percentage: 50,
        },
        {
          name: "Design & Development",
          description: "After design approval and development begins",
          price: "$2,500",
          percentage: 25,
        },
        {
          name: "Final Delivery",
          description: "Upon project completion and handover",
          price: "$2,500",
          percentage: 25,
        },
      ],
      features: {
        "Custom Website Design": true,
        "Mobile Responsive": true,
        "Unlimited Pages": true,
        "Contact Form": true,
        "Advanced SEO Setup": true,
        "Social Media Integration": true,
        "Content Management System": true,
        "Unlimited Revisions": true,
        "Google Analytics Setup": true,
        "12 Months Support": true,
        "Performance Optimization": true,
        "Enterprise Security Features": true,
        "AI-Powered Features": true,
        "Custom Integrations": "Unlimited",
        "Advanced Analytics": true,
        "Conversion Optimization": true,
      },
    },
  ]

  // Get the selected package
  const selectedPackageData = pricingPackages.find((pkg) => pkg.id === selectedPackage) || pricingPackages[1]

  // Get all unique features across all packages
  const allFeatures = Array.from(new Set(pricingPackages.flatMap((pkg) => Object.keys(pkg.features)))).sort((a, b) => {
    // Sort features so that included ones come first
    if (selectedPackageData.features[a] && !selectedPackageData.features[b]) return -1
    if (!selectedPackageData.features[a] && selectedPackageData.features[b]) return 1
    return 0
  })

  // Calculate total price for each package
  const getTotalPrice = (pkg: PricingPackage) => {
    return pkg.milestones.reduce((total, milestone) => {
      const price = Number.parseFloat(milestone.price.replace(/[^0-9.]/g, ""))
      return total + price
    }, 0)
  }

  return (
    <section className="py-nav bg-white relative overflow-hidden">
      {/* Background subtle pattern */}
      <div
        className="absolute inset-0 bg-gray-50 opacity-50 z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.05) 2%, transparent 0%)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title={
            <>
              Milestone-based{" "}
              <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                pricing
              </span>{" "}
              for clarity
            </>
          }
          subtitle="Pay as your project progresses. No surprises, no hidden fees - just transparent value at every stage."
          alignment="center"
          className="mb-12 md:mb-16 text-gray-900"
        />

        <div className="max-w-6xl mx-auto">
          {/* Package selection cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {pricingPackages.map((pkg) => {
              const IconComponent = pkg.icon
              const totalPrice = getTotalPrice(pkg)
              const isSelected = selectedPackage === pkg.id

              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  onMouseEnter={() => setHoveredPackage(pkg.id)}
                  onMouseLeave={() => setHoveredPackage(null)}
                  className={cn(
                    "border rounded-xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden",
                    isSelected
                      ? "border-transparent shadow-lg transform scale-[1.02]"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md",
                    pkg.popular && "relative",
                  )}
                >
                  {/* Background gradient for selected package */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-700/5 to-amber-600/5"></div>
                  )}

                  {/* Gradient border for selected package */}
                  {isSelected && (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-700 to-amber-600"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-700 to-amber-600"></div>
                    </>
                  )}

                  {/* Popular badge */}
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-700 to-amber-600 text-white px-4 py-1 text-sm font-medium rounded-bl-xl rounded-tr-xl">
                      POPULAR
                    </div>
                  )}

                  <div className="flex justify-between items-start relative z-10 mb-4">
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                          isSelected
                            ? "bg-gradient-to-r from-orange-700 to-amber-600 text-white"
                            : "bg-gray-100 text-gray-700",
                        )}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3
                        className={cn(
                          "text-xl font-bold transition-colors duration-300",
                          isSelected
                            ? "bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent"
                            : "text-gray-900",
                        )}
                      >
                        {pkg.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${totalPrice.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">total project</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <p className="text-sm font-medium text-gray-700 mb-6">
                    <span className="text-gray-500">Ideal for:</span> {pkg.idealFor}
                  </p>

                  <div className="mt-6 relative z-10">
                    {isSelected ? (
                      <div className="flex gap-3">
                        <Button
                          className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 text-sm py-2 h-auto"
                          asChild
                        >
                          <Link href={`/services/${pkg.id.toLowerCase()}`}>Learn More</Link>
                        </Button>
                        <PrimaryButton className="flex-1 text-sm py-2 h-auto" asChild>
                          <Link href="/contact" className="flex items-center justify-center gap-2">
                            Get Started
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </Link>
                        </PrimaryButton>
                      </div>
                    ) : (
                      <Button
                        className={cn(
                          "w-full text-sm py-2 h-auto transition-all duration-300",
                          hoveredPackage === pkg.id
                            ? "bg-gradient-to-r from-orange-700 to-amber-600 hover:from-orange-800 hover:to-amber-700 text-white border-none"
                            : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-900",
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedPackage(pkg.id)
                        }}
                      >
                        Select Package
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Milestone payment schedule - directly in the main container without the parent box */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex md:items-center items-center justify-center md:justify-start text-center md:text-left">
              <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent mr-2">
                MILESTONE
              </span>{" "}
              PAYMENT SCHEDULE
            </h3>

            {/* Replace the grid with this responsive implementation */}
            {/* Desktop Grid - Hidden on mobile */}
            <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { name: "Initial Deposit", description: "Project kickoff", percentage: 30 },
                { name: "Discovery & Strategy", description: "Research & planning", percentage: 10 },
                { name: "Planning & Architecture", description: "Blueprint creation", percentage: 10 },
                { name: "Design & UX", description: "Visual design", percentage: 15 },
                { name: "Development", description: "Building & integration", percentage: 15 },
                { name: "Testing & QA", description: "Quality assurance", percentage: 10 },
                { name: "Launch & Support", description: "Final delivery", percentage: 10 },
              ].map((milestone, index) => {
                // Calculate price based on percentage and selected package
                const totalPrice = getTotalPrice(selectedPackageData)
                const price = ((totalPrice * milestone.percentage) / 100).toLocaleString()

                // Determine if this milestone is hovered or the first one (when none is hovered)
                const isHighlighted = hoveredMilestone === index || (hoveredMilestone === null && index === 0)

                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 p-3 relative cursor-pointer transition-all duration-300 hover:shadow-md"
                    onMouseEnter={() => setHoveredMilestone(index)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                  >
                    {/* Gradient top bar - shown on hover or if it's the first milestone and none is hovered */}
                    <div
                      className={cn(
                        "absolute top-0 left-0 right-0 h-1 transition-colors duration-300",
                        isHighlighted ? "bg-gradient-to-r from-orange-700 to-amber-600" : "bg-gray-200",
                      )}
                    ></div>

                    <div className="text-center mb-1">
                      <div
                        className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center mx-auto text-sm transition-colors duration-300",
                          isHighlighted
                            ? "bg-gradient-to-r from-orange-700 to-amber-600 text-white"
                            : "bg-gray-200 text-gray-700",
                        )}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <h4 className="text-center font-semibold text-gray-900 text-sm">{milestone.name}</h4>
                    <p className="text-xs text-center text-gray-600 mb-1">{milestone.description}</p>

                    <div
                      className={cn(
                        "text-center font-bold text-base transition-colors duration-300",
                        isHighlighted
                          ? "bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent"
                          : "text-gray-700",
                      )}
                    >
                      ${price}
                    </div>

                    <div className="text-xs text-center text-gray-500">{milestone.percentage}% of total</div>
                  </div>
                )
              })}
            </div>

            {/* Mobile Carousel - Hidden on desktop */}
            <div className="md:hidden relative">
              {/* Navigation Arrows */}
              <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-2">
                <button
                  onClick={prevMilestone}
                  disabled={currentMilestoneIndex === 0}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md transition-opacity",
                    currentMilestoneIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100",
                  )}
                  aria-label="Previous milestone"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMilestone}
                  disabled={currentMilestoneIndex === 6}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md transition-opacity",
                    currentMilestoneIndex === 6 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100",
                  )}
                  aria-label="Next milestone"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentMilestoneIndex * 100}%)` }}
                >
                  {[
                    { name: "Initial Deposit", description: "Project kickoff", percentage: 30 },
                    { name: "Discovery & Strategy", description: "Research & planning", percentage: 10 },
                    { name: "Planning & Architecture", description: "Blueprint creation", percentage: 10 },
                    { name: "Design & UX", description: "Visual design", percentage: 15 },
                    { name: "Development", description: "Building & integration", percentage: 15 },
                    { name: "Testing & QA", description: "Quality assurance", percentage: 10 },
                    { name: "Launch & Support", description: "Final delivery", percentage: 10 },
                  ].map((milestone, index) => {
                    // Calculate price based on percentage and selected package
                    const totalPrice = getTotalPrice(selectedPackageData)
                    const price = ((totalPrice * milestone.percentage) / 100).toLocaleString()

                    // Always highlight the current milestone in the carousel
                    const isHighlighted = true

                    return (
                      <div key={index} className="w-full flex-shrink-0 px-2">
                        <div className="bg-white rounded-lg border border-gray-200 p-5 relative">
                          {/* Gradient top bar */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-700 to-amber-600"></div>

                          <div className="text-center mb-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto text-sm bg-gradient-to-r from-orange-700 to-amber-600 text-white">
                              {index + 1}
                            </div>
                          </div>

                          <h4 className="text-center font-semibold text-gray-900 text-base mb-1">{milestone.name}</h4>
                          <p className="text-sm text-center text-gray-600 mb-3">{milestone.description}</p>

                          <div className="text-center font-bold text-xl bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent mb-1">
                            ${price}
                          </div>

                          <div className="text-sm text-center text-gray-500">{milestone.percentage}% of total</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Pagination Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMilestoneIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentMilestoneIndex
                        ? "bg-gradient-to-r from-orange-700 to-amber-600 w-4"
                        : "bg-gray-300",
                    )}
                    aria-label={`Go to milestone ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Custom pricing CTA */}
          <div className="mt-12 bg-black text-white p-8 rounded-xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%)",
                  backgroundSize: "50px 50px",
                }}
              ></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center">
                <Calculator className="h-8 w-8 text-amber-500 mr-4 hidden sm:block" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Need a{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                      custom solution
                    </span>
                    ?
                  </h3>
                  <p className="text-gray-300 max-w-2xl">
                    Our packages are designed to fit most business needs, but we understand that every project is
                    unique. Use our custom quote calculator to get an instant estimate.
                  </p>
                </div>
              </div>
              <PrimaryButton size="lg" className="min-w-[200px]" asChild>
                <Link href="/calculator">
                  <span>Try Price Calculator</span>
                </Link>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

