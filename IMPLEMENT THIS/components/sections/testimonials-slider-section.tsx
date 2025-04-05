"use client"

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  name: string
  title: string
  company: string
  logo: string
  quote: string
  highlight?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Stephen Dresner",
    title: "MARKETING DIRECTOR AT",
    company: "BENIGRO",
    logo: "/placeholder.svg?height=60&width=150",
    quote: "The Silver Spark team was great. Their overall quality of work is second to none.",
    highlight: "second to none",
  },
  {
    id: 2,
    name: "Nora Collins",
    title: "MARKETING DIRECTOR AT",
    company: "BUDDHA BRANDS",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "Working with Silver Spark transformed our digital presence completely. The attention to detail was impressive.",
    highlight: "transformed our digital presence",
  },
  {
    id: 3,
    name: "Holly Romeder",
    title: "VP OF MARKETING AT",
    company: "PROMPTCARE",
    logo: "/placeholder.svg?height=60&width=150",
    quote: "Silver Spark delivered beyond our expectations. Their creative approach to problem-solving is unmatched.",
    highlight: "beyond our expectations",
  },
  {
    id: 4,
    name: "Michael Chen",
    title: "CEO AT",
    company: "HORIZON SOLUTIONS",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "The team at Silver Spark understood our vision immediately and executed flawlessly. The results speak for themselves.",
    highlight: "executed flawlessly",
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    title: "BRAND MANAGER AT",
    company: "ELEVATE RETAIL",
    logo: "/placeholder.svg?height=60&width=150",
    quote: "Silver Spark's strategic approach to our website redesign resulted in a 200% increase in conversions.",
    highlight: "200% increase in conversions",
  },
  {
    id: 6,
    name: "David Patel",
    title: "CTO AT",
    company: "NEXUS TECHNOLOGIES",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "The technical expertise at Silver Spark is remarkable. They built a platform that scales effortlessly with our growing user base.",
    highlight: "scales effortlessly",
  },
  {
    id: 7,
    name: "Sophia Martinez",
    title: "FOUNDER & CEO AT",
    company: "BLOOM COSMETICS",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "Silver Spark captured the essence of our brand perfectly. Our e-commerce sales have increased by 150% since the redesign.",
    highlight: "increased by 150%",
  },
  {
    id: 8,
    name: "James Wilson",
    title: "DIGITAL STRATEGIST AT",
    company: "ALPINE VENTURES",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "Their strategic insights completely revolutionized our approach to digital marketing. We're seeing ROI like never before.",
    highlight: "revolutionized our approach",
  },
  {
    id: 9,
    name: "Olivia Thompson",
    title: "HEAD OF PRODUCT AT",
    company: "WAVELENGTH MEDIA",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "The user experience design from Silver Spark has dramatically reduced our bounce rate and increased session duration.",
    highlight: "dramatically reduced our bounce rate",
  },
  {
    id: 10,
    name: "Marcus Johnson",
    title: "OPERATIONS DIRECTOR AT",
    company: "VERTEX LOGISTICS",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "Silver Spark's custom dashboard solution has streamlined our operations and given us unprecedented visibility into our business.",
    highlight: "unprecedented visibility",
  },
  {
    id: 11,
    name: "Aisha Patel",
    title: "CMO AT",
    company: "LUMINA HEALTH",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "The rebrand by Silver Spark perfectly aligned with our mission and has resonated deeply with our target audience.",
    highlight: "resonated deeply",
  },
  {
    id: 12,
    name: "Robert Tanaka",
    title: "DIRECTOR OF E-COMMERCE AT",
    company: "URBAN OUTFITTERS",
    logo: "/placeholder.svg?height=60&width=150",
    quote: "Our conversion rate has doubled since implementing Silver Spark's checkout optimization recommendations.",
    highlight: "conversion rate has doubled",
  },
  {
    id: 13,
    name: "Elena Vasquez",
    title: "BRAND DIRECTOR AT",
    company: "SOLSTICE BEVERAGES",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "Silver Spark's packaging design work has made our products stand out on shelves and significantly boosted our retail performance.",
    highlight: "significantly boosted",
  },
  {
    id: 14,
    name: "Thomas Wright",
    title: "VP OF INNOVATION AT",
    company: "QUANTUM FINANCE",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "The fintech app developed by Silver Spark has been praised by users for its intuitive design and robust functionality.",
    highlight: "intuitive design and robust functionality",
  },
  {
    id: 15,
    name: "Sarah Kim",
    title: "GROWTH MANAGER AT",
    company: "EVERGREEN SOLUTIONS",
    logo: "/placeholder.svg?height=60&width=150",
    quote:
      "Working with Silver Spark has been a game-changer for our startup. Their holistic approach to digital strategy accelerated our growth.",
    highlight: "accelerated our growth",
  },
]

// Custom gradient star component
const GradientStar = ({ className }: { className?: string }) => (
  <div className={cn("relative w-4 h-4", className)}>
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="url(#starGradient)"
        stroke="url(#starGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

export function TestimonialsSliderSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Keep this breakpoint for consistency
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex])

  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  // Auto-rotate functionality
  useEffect(() => {
    const startAutoRotate = () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current)
      }

      autoRotateTimerRef.current = setTimeout(() => {
        if (!isPaused && !isAnimating) {
          handleNext()
        }
        startAutoRotate() // Restart the timer
      }, 3000) // Change every 3 seconds
    }

    // Start auto-rotation
    startAutoRotate()

    // Check if section is in viewport to pause/resume timer
    const checkVisibility = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0

      setIsPaused(!isVisible)
    }

    window.addEventListener("scroll", checkVisibility)
    checkVisibility() // Check on mount

    // Cleanup
    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current)
      }
      window.removeEventListener("scroll", checkVisibility)
    }
  }, [handleNext, isPaused, isAnimating])

  // Calculate position for each testimonial in the wheel
  const getTestimonialStyle = useCallback(
    (index: number) => {
      // Calculate the relative position (-2, -1, 0, 1, 2)
      let relativePosition = index - activeIndex

      // Handle wrapping for circular effect
      if (relativePosition > testimonials.length / 2) {
        relativePosition -= testimonials.length
      } else if (relativePosition < -testimonials.length / 2) {
        relativePosition += testimonials.length
      }

      // Only show cards that are -1, 0, or 1 positions away
      const isVisible = Math.abs(relativePosition) <= 1

      // Calculate vertical position - adjust spacing based on screen width
      // Use a smaller spacing on smaller screens
      const baseSpacing = window.innerWidth < 1024 ? 70 : 90
      const yPosition = relativePosition * baseSpacing

      // Calculate opacity and scale based on distance from active
      const distance = Math.abs(relativePosition)
      const opacity = distance === 0 ? 1 : 0.5
      const scale = distance === 0 ? 1 : 0.9
      const zIndex = 10 - distance

      return {
        transform: `translateY(${yPosition}px) scale(${scale})`,
        opacity: isVisible ? opacity : 0,
        visibility: isVisible ? "visible" : "hidden",
        zIndex,
        transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }
    },
    [activeIndex],
  )

  // Pause auto-rotation when user interacts with the slider
  const handleUserInteraction = useCallback(() => {
    setIsPaused(true)

    // Resume auto-rotation after 5 seconds of inactivity
    const resumeTimer = setTimeout(() => {
      setIsPaused(false)
    }, 5000)

    return () => clearTimeout(resumeTimer)
  }, [])

  // Mobile version of the testimonials section
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="bg-black text-white relative py-8 px-4"
        aria-labelledby="testimonials-heading-mobile"
        onTouchStart={handleUserInteraction}
      >
        <div className="container mx-auto">
          {/* Mobile testimonial card - optimized layout */}
          <div className="p-4 mb-4 relative">
            {/* Quote - optimized font size and line height */}
            <p className="text-lg font-light leading-tight mb-4 text-white">
              {activeTestimonial.quote.split(activeTestimonial.highlight || "").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <React.Fragment key={i}>
                    {part}
                    <span className="font-medium bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                      {activeTestimonial.highlight}
                    </span>
                  </React.Fragment>
                ) : (
                  part
                ),
              )}
            </p>

            {/* Client info - more compact layout */}
            <div className="flex items-center">
              <div className="w-12 h-12 relative flex-shrink-0 bg-gray-800 rounded-md flex items-center justify-center overflow-hidden border border-gray-700 mr-3">
                <Image
                  src={activeTestimonial.logo || "/placeholder.svg"}
                  alt={activeTestimonial.company}
                  width={48}
                  height={48}
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{activeTestimonial.name}</h3>
                <p className="text-xs text-gray-400">{activeTestimonial.title}</p>
                <p className="text-xs font-semibold text-gray-300">{activeTestimonial.company}</p>
              </div>
            </div>
          </div>

          {/* Navigation controls - more compact */}
          <div className="flex justify-center gap-3 mt-2">
            <button
              onClick={() => {
                handleUserInteraction()
                handlePrev()
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden group transition-transform duration-200 active:scale-95"
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-700 to-amber-600"></span>
              <span className="relative z-10">
                <ChevronLeft className="w-5 h-5 text-white" />
              </span>
            </button>

            <button
              onClick={() => {
                handleUserInteraction()
                handleNext()
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden group transition-transform duration-200 active:scale-95"
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-700 to-amber-600"></span>
              <span className="relative z-10">
                <ChevronRight className="w-5 h-5 text-white" />
              </span>
            </button>
          </div>

          {/* Testimonial counter - more compact */}
          <div className="text-center mt-2 text-gray-400 text-xs">
            {activeIndex + 1} / {testimonials.length}
          </div>
        </div>
      </section>
    )
  }

  // Desktop version (original design)
  return (
    <section
      ref={sectionRef}
      className="bg-black text-white relative min-h-[400px] flex flex-col justify-center py-8 md:py-0 md:h-[33.33vh]"
      aria-labelledby="testimonials-heading"
      onMouseEnter={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 h-full flex flex-col">
        <h2 id="testimonials-heading" className="sr-only">
          Client Testimonials
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-4 items-center flex-grow">
          {/* Left side - Client info wheel */}
          <div className="lg:col-span-5">
            <div className="relative h-[180px] md:h-[220px] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={cn(
                      "absolute w-full cursor-pointer transition-all duration-300",
                      index === activeIndex
                        ? "testimonial-card-active bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg"
                        : "bg-white/90 hover:bg-white hover:shadow-md",
                    )}
                    style={{
                      ...getTestimonialStyle(index),
                      borderRadius: "12px",
                      position: "absolute",
                      overflow: "hidden",
                      borderTop: "1px solid #e5e7eb",
                      borderRight: "1px solid #e5e7eb",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                    onClick={() => {
                      handleUserInteraction()
                      if (!isAnimating && index !== activeIndex) {
                        setIsAnimating(true)
                        setActiveIndex(index)
                        setTimeout(() => setIsAnimating(false), 500)
                      }
                    }}
                    role="button"
                    tabIndex={index === activeIndex ? 0 : -1}
                    aria-label={`View testimonial from ${testimonial.name} at ${testimonial.company}`}
                  >
                    {/* Gradient border for active card */}
                    {index === activeIndex && (
                      <>
                        <div className="absolute left-0 top-0 bottom-0 w-1 smooth-orange-gradient"></div>
                        <div className="absolute left-0 top-0 bottom-0 w-1 smooth-orange-gradient opacity-70 blur-sm -ml-0.5"></div>
                      </>
                    )}

                    <div className="p-3 md:p-4 h-full grid grid-cols-5 gap-2 md:gap-3">
                      {/* Left column - Logo */}
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="w-full h-14 md:h-16 relative">
                          <Image
                            src={testimonial.logo || "/placeholder.svg"}
                            alt={`${testimonial.company} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {/* Right column - Info */}
                      <div className="col-span-3 flex flex-col justify-center">
                        <h3 className="text-sm md:text-base font-bold text-gray-900 mb-0.5">{testimonial.name}</h3>
                        <p className="text-xs text-gray-600 mb-0.5">{testimonial.title}</p>
                        <p className="text-xs font-semibold text-gray-800">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle - Navigation arrows */}
          <div className="lg:col-span-1 flex lg:flex-col justify-center gap-3 md:gap-4">
            <button
              onClick={() => {
                handleUserInteraction()
                handlePrev()
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden group transition-transform duration-200 active:scale-95"
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <span className="absolute inset-0 bg-gray-800"></span>
              <span className="absolute inset-0 service-card-gradient opacity-30 group-hover:opacity-90 transition-opacity duration-300"></span>
              <span className="relative z-10">
                <ChevronUp className="w-5 h-5 text-white" />
              </span>
            </button>
            <button
              onClick={() => {
                handleUserInteraction()
                handleNext()
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden group transition-transform duration-200 active:scale-95"
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <span className="absolute inset-0 bg-gray-800"></span>
              <span className="absolute inset-0 service-card-gradient opacity-30 group-hover:opacity-90 transition-opacity duration-300"></span>
              <span className="relative z-10">
                <ChevronDown className="w-5 h-5 text-white" />
              </span>
            </button>
          </div>

          {/* Right side - Quote */}
          <div className="lg:col-span-6 space-y-4 md:space-y-6">
            <h2 className="text-base md:text-lg font-medium tracking-wide text-white">
              WHAT OUR CLIENTS LOVE ABOUT OUR WORK
            </h2>

            <div className="min-h-[100px] md:min-h-[120px] relative" aria-live="polite">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="absolute top-0 left-0 w-full transition-opacity duration-500"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    zIndex: index === activeIndex ? 1 : 0,
                    pointerEvents: index === activeIndex ? "auto" : "none",
                  }}
                  aria-hidden={index !== activeIndex}
                >
                  <p className="text-xl md:text-2xl font-light leading-tight md:leading-relaxed">
                    {testimonial.quote.split(testimonial.highlight || "").map((part, i, arr) =>
                      i < arr.length - 1 ? (
                        <React.Fragment key={i}>
                          {part}
                          <span className="font-medium bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text">
                            {testimonial.highlight}
                          </span>
                        </React.Fragment>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5" aria-label="Rating: 4.9 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <GradientStar key={i} className="w-3 md:w-4 h-3 md:h-4" />
                  ))}
                </div>
                <span className="font-bold text-sm md:text-base ml-1 bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text">
                  4.9
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

