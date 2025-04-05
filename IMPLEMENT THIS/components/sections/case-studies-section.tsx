import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function CaseStudiesSection() {
  return (
    <section className="py-nav bg-black text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Case Studies"
          subtitle="See how we've helped businesses like yours achieve remarkable results"
          alignment="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Only show the first 2 case studies */}
          {caseStudies.slice(0, 2).map((study, index) => (
            <div
              key={index}
              className="group bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-gray-900 text-white rounded-full">
                    {study.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">{study.title}</h3>
                <p className="text-gray-400 mb-4">{study.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {study.results.map((result, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-700 rounded-md text-sm text-gray-300">
                      {result}
                    </span>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-gray-600 hover:bg-gray-700 text-white hover:text-white"
                  asChild
                >
                  <Link href={`/case-studies/${study.slug}`}>View Case Study</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-white text-black hover:bg-gray-200 mx-auto">
            <Link href="/case-studies">See More Case Studies</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const caseStudies = [
  {
    title: "E-commerce Redesign Boosts Sales by 150%",
    slug: "ecommerce-redesign",
    category: "E-commerce",
    description:
      "How we transformed an outdated online store into a conversion powerhouse for a leading fashion retailer.",
    image: "/placeholder.svg?height=400&width=600",
    results: ["150% Sales Increase", "65% Lower Bounce Rate", "3.2x Mobile Conversions"],
  },
  {
    title: "SaaS Platform UI/UX Overhaul",
    slug: "saas-platform-redesign",
    category: "SaaS",
    description:
      "A comprehensive redesign of a complex SaaS platform that improved user engagement and reduced support tickets.",
    image: "/placeholder.svg?height=400&width=600",
    results: ["42% More User Engagement", "68% Fewer Support Tickets", "4.8/5 User Satisfaction"],
  },
  {
    title: "Healthcare Provider Website Transformation",
    slug: "healthcare-website",
    category: "Healthcare",
    description: "Creating an accessible, patient-focused website that dramatically improved appointment bookings.",
    image: "/placeholder.svg?height=400&width=600",
    results: ["200% More Appointments", "90% Mobile Usage Increase", "5x Faster Load Times"],
  },
]

