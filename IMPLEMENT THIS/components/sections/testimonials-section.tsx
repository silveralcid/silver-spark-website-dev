"use client"

import { useEffect, useRef } from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { QuoteIcon } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  return (
    <section className="py-10 md:py-12 bg-black text-white overflow-hidden" style={{ maxHeight: "50vh" }}>
      <div className="container mx-auto px-4 h-full flex flex-col">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Don't just take our word for it - hear from some of our satisfied clients about their experience with Silver Spark"
          alignment="center"
          className="mb-8 text-white"
        />

        <TestimonialMarquee />
      </div>
    </section>
  )
}

function TestimonialMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = containerRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPos = 0
    const scrollWidth = scrollContainer.scrollWidth

    const scroll = () => {
      scrollPos += 0.5

      // Reset scroll position when we've scrolled through all items
      if (scrollPos >= scrollWidth / 2) {
        scrollPos = 0
      }

      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollPos
      }

      animationId = requestAnimationFrame(scroll)
    }

    // Start the animation
    animationId = requestAnimationFrame(scroll)

    const handleMouseEnter = () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = 0
      }
    }

    const handleMouseLeave = () => {
      if (!animationId) {
        animationId = requestAnimationFrame(scroll)
      }
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Duplicate testimonials to create a seamless loop
  const allTestimonials = [...testimonials, ...testimonials]

  return (
    <div ref={containerRef} className="flex overflow-x-hidden gap-6 pb-4 -mx-4 px-4 flex-grow">
      {allTestimonials.map((testimonial, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-full md:w-[450px] lg:w-[600px] bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800"
        >
          <div className="flex items-start gap-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-800">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <QuoteIcon className="h-8 w-8 text-white mb-4" />
              <p className="body-large text-gray-300 mb-6 italic">"{testimonial.quote}"</p>

              <div>
                <h4 className="heading-4 text-white">{testimonial.name}</h4>
                <p className="body-small text-gray-400">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const testimonials = [
  {
    quote:
      "Working with this team was a game-changer for our business. They completely transformed our online presence and helped us achieve a 200% increase in leads within just three months.",
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechNova Inc.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The attention to detail and strategic approach to our website redesign was impressive. They didn't just make our site look better - they made it perform better in every measurable way.",
    name: "Michael Chen",
    title: "CEO",
    company: "Horizon Solutions",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "I was blown away by how well they understood our brand and translated it into a stunning website. The entire process was smooth, and the results exceeded our expectations.",
    name: "Emily Rodriguez",
    title: "Brand Manager",
    company: "Elevate Retail",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Their team's expertise in e-commerce design completely revolutionized our online store. We've seen a significant increase in conversion rates and average order value.",
    name: "David Thompson",
    title: "E-commerce Director",
    company: "Urban Outfitters",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Not only did they deliver an exceptional website, but their ongoing support has been invaluable. They're truly invested in our success and it shows in everything they do.",
    name: "Jessica Williams",
    title: "Operations Manager",
    company: "Pinnacle Services",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The SEO strategies they implemented have dramatically improved our search rankings. We're now on the first page for all our key terms, which has transformed our business.",
    name: "Robert Kim",
    title: "Digital Marketing Lead",
    company: "Summit Enterprises",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

