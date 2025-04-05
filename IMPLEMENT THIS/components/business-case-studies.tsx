"use client"

import { useMemo, useState, useEffect } from "react"
import Image from "next/image"
import { ChevronRight, Check, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BusinessCard } from "@/components/ui/business-card"
import { useCaseStudies } from "@/lib/hooks/use-case-studies"
import { cn } from "@/lib/utils"
import { PrimaryButton } from "@/components/ui/primary-button"
import Link from "next/link"

export default function BusinessCaseStudies() {
  const { businesses, selectedBusiness, selectBusiness } = useCaseStudies()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "challenge" | "solution" | "results">("overview")

  // Simulate loading state for background image
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [selectedBusiness.id])

  // Memoize the background image to prevent unnecessary re-renders
  const backgroundImage = useMemo(
    () => selectedBusiness.backgroundImage || "/placeholder.svg",
    [selectedBusiness.backgroundImage],
  )

  return (
    <section className="relative overflow-hidden bg-black" aria-labelledby="case-studies-heading">
      {/* Section heading with white text and only "Success Stories" in gradient */}
      <div className="container mx-auto pt-16 pb-8 px-4">
        <h2 id="case-studies-heading" className="text-center text-4xl md:text-5xl font-bold mb-2 text-white">
          Client{" "}
          <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
            Success Stories
          </span>
        </h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto">
          See how we've helped leading companies transform their digital presence with our AI-powered solutions
        </p>
      </div>

      <div className="container mx-auto pb-16 px-4">
        <div className="bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Business List with Background Image */}
            <div className="w-full lg:w-1/3 relative border-r border-gray-800">
              {/* Background Image with Gradient Overlay - Only for the left column */}
              <div
                className={cn(
                  "absolute inset-0 z-0 transition-opacity duration-700 ease-in-out",
                  isLoading ? "opacity-0" : "opacity-100",
                )}
              >
                <Image
                  src={backgroundImage || "/placeholder.svg"}
                  alt=""
                  fill
                  className="object-cover"
                  priority={true}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70"></div>
              </div>

              {/* Business List - Scrollable if needed */}
              <div className="relative z-10 h-full flex flex-col p-6 overflow-auto max-h-[600px] lg:max-h-none backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Flame className="h-5 w-5 mr-2 text-amber-500" />
                  <span>Case Studies</span>
                </h3>

                <div className="space-y-3 overflow-y-auto flex-grow" role="tablist" aria-label="Client success stories">
                  {businesses.map((business) => (
                    <BusinessCard
                      key={business.id}
                      business={business}
                      isSelected={selectedBusiness.id === business.id}
                      onSelect={() => selectBusiness(business.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Business Details with White Background */}
            <div
              className="w-full lg:w-2/3 flex flex-col relative overflow-hidden bg-white"
              role="tabpanel"
              id={`panel-${selectedBusiness.id}`}
              aria-labelledby={`tab-${selectedBusiness.id}`}
            >
              {/* Content */}
              <div className="relative z-10 p-3 sm:p-4 md:p-6 h-full flex flex-col overflow-x-hidden">
                {/* Company name - perfectly centered */}
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                    {selectedBusiness.name}
                  </h2>
                  <p className="text-sm text-gray-600 text-center">
                    {selectedBusiness.industry} • AI-Powered Solutions
                  </p>
                </div>

                {/* Tab navigation - centered */}
                <div className="flex justify-center space-x-1 mb-6 overflow-x-auto pb-1">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={cn(
                      "px-3 md:px-4 py-2 text-sm font-medium transition-all relative whitespace-nowrap",
                      activeTab === "overview" ? "text-gray-900" : "text-gray-600 hover:text-gray-800",
                    )}
                  >
                    Overview
                    {activeTab === "overview" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-700 to-amber-600"></span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("challenge")}
                    className={cn(
                      "px-3 md:px-4 py-2 text-sm font-medium transition-all relative whitespace-nowrap",
                      activeTab === "challenge" ? "text-gray-900" : "text-gray-600 hover:text-gray-800",
                    )}
                  >
                    Challenge
                    {activeTab === "challenge" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-700 to-amber-600"></span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("solution")}
                    className={cn(
                      "px-3 md:px-4 py-2 text-sm font-medium transition-all relative whitespace-nowrap",
                      activeTab === "solution" ? "text-gray-900" : "text-gray-600 hover:text-gray-800",
                    )}
                  >
                    Solution
                    {activeTab === "solution" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-700 to-amber-600"></span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("results")}
                    className={cn(
                      "px-3 md:px-4 py-2 text-sm font-medium transition-all relative whitespace-nowrap",
                      activeTab === "results" ? "text-gray-900" : "text-gray-600 hover:text-gray-800",
                    )}
                  >
                    Results
                    {activeTab === "results" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-700 to-amber-600"></span>
                    )}
                  </button>
                </div>

                {/* Tab content */}
                <div className="flex-grow overflow-y-auto overflow-x-hidden">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="min-w-0">
                        <p className="text-gray-700 mb-6 break-words">{selectedBusiness.description}</p>

                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                              AI-Powered Solutions
                            </span>
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedBusiness.aiSolutions.map((solution, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 text-sm bg-gradient-to-r from-orange-700/10 to-amber-600/10 text-gray-800 rounded-md border border-orange-700/20"
                              >
                                <Flame className="h-3 w-3 mr-1 text-amber-600 flex-shrink-0" />
                                <span className="truncate">{solution}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                              Services Provided
                            </span>
                          </h3>
                          <ul className="space-y-2">
                            {selectedBusiness.services.map((service, index) => (
                              <li key={index} className="flex items-start">
                                <div className="mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-orange-700 to-amber-600 flex items-center justify-center">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-gray-700">{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col min-w-0 h-full justify-between">
                        {/* Project image - Adjusted height and margin */}
                        <div className="relative h-52 md:h-60 w-full mb-8">
                          <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt=""
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>

                        {/* Results preview - centered in the available space */}
                        <div className="flex-grow flex flex-col justify-center mb-8">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="text-center">
                              <p className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                                {selectedBusiness.results.stat1.value}
                              </p>
                              <p className="text-xs uppercase text-gray-600 mt-2 break-words font-bold">
                                {selectedBusiness.results.stat1.label}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                                {selectedBusiness.results.stat2.value}
                              </p>
                              <p className="text-xs uppercase text-gray-600 mt-2 break-words font-bold">
                                {selectedBusiness.results.stat2.label}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* CTA Buttons - at the bottom with consistent spacing */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                          <Button
                            className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 text-xs sm:text-sm font-medium border border-gray-300 transition-all duration-300 px-2 sm:px-4"
                            asChild
                          >
                            <Link href={selectedBusiness.caseStudyLink}>
                              <span>VIEW CASE STUDY</span>
                            </Link>
                          </Button>
                          <PrimaryButton className="py-2 text-xs sm:text-sm px-2 sm:px-4" asChild>
                            <Link href="/contact">
                              <span>START PROJECT</span>
                            </Link>
                          </PrimaryButton>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Challenge Tab */}
                  {activeTab === "challenge" && (
                    <div className="space-y-6">
                      <div className="p-4 md:p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                            The Challenge
                          </span>
                        </h3>
                        <p className="text-gray-700 mb-6">
                          {selectedBusiness.name} faced significant challenges with their legacy systems that were
                          unable to scale with their growing business needs. Their existing infrastructure was
                          fragmented, leading to data silos and inefficient workflows that impacted customer
                          satisfaction and operational efficiency.
                        </p>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gradient-to-r from-orange-700/5 to-amber-600/5 p-4 rounded-lg border border-orange-700/20">
                            <h4 className="font-medium text-gray-900 mb-2">Technical Limitations</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <ChevronRight className="h-4 w-4 text-amber-600 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  Outdated technology stack limiting innovation
                                </span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="h-4 w-4 text-amber-600 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  Poor system integration causing data inconsistencies
                                </span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="h-4 w-4 text-amber-600 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  Limited scalability to handle growing user demands
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div className="bg-gradient-to-r from-orange-700/5 to-amber-600/5 p-4 rounded-lg border border-orange-700/20">
                            <h4 className="font-medium text-gray-900 mb-2">Business Impact</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <ChevronRight className="h-4 w-4 text-amber-600 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">Declining customer satisfaction scores</span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="h-4 w-4 text-amber-600 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  Increasing operational costs and inefficiencies
                                </span>
                              </li>
                              <li className="flex items-start">
                                <ChevronRight className="h-4 w-4 text-amber-600 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  Competitive disadvantage in rapidly evolving market
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 text-sm font-medium border border-gray-300 transition-all duration-300 mr-4"
                          asChild
                        >
                          <Link href={selectedBusiness.caseStudyLink}>
                            <span>VIEW CASE STUDY</span>
                          </Link>
                        </Button>
                        <PrimaryButton
                          className="py-2 px-4 text-sm font-medium transition-all duration-300 border-0"
                          asChild
                        >
                          <Link href="/contact">
                            <span>START PROJECT</span>
                          </Link>
                        </PrimaryButton>
                      </div>
                    </div>
                  )}

                  {/* Solution Tab */}
                  {activeTab === "solution" && (
                    <div className="space-y-6">
                      <div className="p-4 md:p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                            Our Solution
                          </span>
                        </h3>
                        <p className="text-gray-700 mb-6">
                          Silver Spark implemented an AI-first approach to transform {selectedBusiness.name}'s digital
                          ecosystem. We developed a comprehensive solution that integrated advanced AI capabilities with
                          their existing systems, creating a seamless and intelligent platform that addressed their core
                          challenges.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          {[...Array(4)].map((_, index) => {
                            const solution = selectedBusiness.aiSolutions[index] || `AI Solution ${index + 1}`
                            return (
                              <div
                                key={index}
                                className="bg-gradient-to-r from-orange-700/5 to-amber-600/5 p-4 rounded-lg border border-orange-700/20 hover:border-amber-600/50 transition-all duration-300"
                              >
                                <h4 className="font-medium text-gray-900 mb-2">{solution}</h4>
                                <p className="text-gray-600 text-sm">
                                  Leveraging cutting-edge AI technology to deliver exceptional results and business
                                  value.
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 text-sm font-medium border border-gray-300 transition-all duration-300 mr-4"
                          asChild
                        >
                          <Link href={selectedBusiness.caseStudyLink}>
                            <span>VIEW CASE STUDY</span>
                          </Link>
                        </Button>
                        <PrimaryButton
                          className="py-2 px-4 text-sm font-medium transition-all duration-300 border-0"
                          asChild
                        >
                          <Link href="/contact">
                            <span>START PROJECT</span>
                          </Link>
                        </PrimaryButton>
                      </div>
                    </div>
                  )}

                  {/* Results Tab */}
                  {activeTab === "results" && (
                    <div className="space-y-6">
                      <div className="p-4 md:p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                            Measurable Results
                          </span>
                        </h3>
                        <p className="text-gray-700 mb-6">
                          Our solution delivered significant and measurable improvements across key performance
                          indicators, transforming {selectedBusiness.name}'s operations and customer experience.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="relative overflow-hidden group">
                            <p className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent mb-3">
                              {selectedBusiness.results.stat1.value}
                            </p>
                            <p className="text-xl text-gray-900 mb-4 font-bold">
                              {selectedBusiness.results.stat1.label}
                            </p>
                            <p className="text-gray-600 text-sm">
                              This significant improvement directly impacted customer satisfaction and loyalty, leading
                              to increased retention rates and positive brand perception.
                            </p>
                          </div>

                          <div className="relative overflow-hidden group">
                            <p className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent mb-3">
                              {selectedBusiness.results.stat2.value}
                            </p>
                            <p className="text-xl text-gray-900 mb-4 font-bold">
                              {selectedBusiness.results.stat2.label}
                            </p>
                            <p className="text-gray-600 text-sm">
                              This operational efficiency gain translated to substantial cost savings and allowed the
                              team to focus on strategic initiatives rather than routine tasks.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900 mb-1">6 Weeks</p>
                            <p className="text-xs uppercase text-gray-600 font-bold">Implementation Time</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900 mb-1">3.2x</p>
                            <p className="text-xs uppercase text-gray-600 font-bold">ROI in First Year</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900 mb-1">24/7</p>
                            <p className="text-xs uppercase text-gray-600 font-bold">Automated Support</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 text-sm font-medium border border-gray-300 transition-all duration-300 mr-4"
                          asChild
                        >
                          <Link href={selectedBusiness.caseStudyLink}>
                            <span>VIEW CASE STUDY</span>
                          </Link>
                        </Button>
                        <PrimaryButton
                          className="py-2 px-4 text-sm font-medium transition-all duration-300 border-0"
                          asChild
                        >
                          <Link href="/contact">
                            <span>START PROJECT</span>
                          </Link>
                        </PrimaryButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

