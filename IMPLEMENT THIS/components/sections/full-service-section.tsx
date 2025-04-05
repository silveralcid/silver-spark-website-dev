import { Layers, Zap, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FullServiceSection() {
  return (
    <section className="py-nav bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">
            Why Go{" "}
            <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
              Full Service
            </span>{" "}
            Instead of Multiple Specialists?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fast-moving startups need clarity, consistency, and momentum. Our integrated model removes the friction and
            delivers results—faster.
          </p>
        </div>

        {/* Main content with 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {valuePropositions.map((prop, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between h-full group hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Gradient accent line on top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-700 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="flex flex-col">
                {/* Icon section with fixed height and centered */}
                <div className="h-24 flex items-center justify-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-700 to-amber-600 text-white">
                    <prop.icon className="h-8 w-8" />
                  </div>
                </div>

                {/* Title with fixed height */}
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-black transition-colors h-[3.5rem] flex items-center">
                  {prop.title}
                </h3>

                {/* Description with fixed height */}
                <p className="text-gray-700 mb-6 group-hover:text-gray-800 transition-colors h-[8rem] overflow-y-auto">
                  {prop.description}
                </p>
              </div>

              {/* Benefits section */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
                    Benefits
                  </span>
                  <div className="ml-3 h-px flex-grow bg-gradient-to-r from-orange-700 to-transparent"></div>
                </h4>

                <ul className="space-y-3">
                  {prop.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <div className="h-6 w-6 bg-gradient-to-r from-orange-700 to-amber-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-16 bg-black text-white p-8 rounded-lg shadow-lg relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-50"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">The Bottom Line</h3>
              <p className="text-gray-300">
                Our full-service model isn't about doing everything—it's about doing the right things, the right way,
                and at startup speed. With Silver Spark, you get one aligned team that understands your product, owns
                your roadmap, and delivers at every stage—without silos, delays, or guesswork.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gradient-to-r from-orange-700 to-amber-600 text-white relative">
                <span className="text-3xl font-bold leading-tight text-center">100x</span>
                <span className="text-xl font-bold">Your Idea</span>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-30 blur-xl"></div>
              </div>
            </div>
          </div>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const valuePropositions = [
  {
    icon: Layers,
    title: "Aligned Execution, Fewer Headaches",
    description:
      "Working with disconnected specialists creates gaps—in your brand, your codebase, and your strategy. With a full-service team, everything's built to work together, from backend systems to content to marketing.",
    benefits: [
      "One team focused on your product and roadmap",
      "Unified execution across design and dev teams",
      "No context lost between tools, people, or phases",
      "Streamlined delivery with fewer moving pieces",
    ],
  },
  {
    icon: Zap,
    title: "Faster Launches, Smarter Iterations",
    description:
      "Startups can't afford slow timelines or handoffs between siloed teams. Our lean, sprint-based process helps you ship MVPs, web apps, and automations faster—with space to pivot when the market speaks.",
    benefits: [
      "Faster time-to-market for MVPs and SaaS apps",
      "Agile sprints with cross-functional collaboration",
      "No back-and-forth between vendors or freelancers",
      "Built-in ability to iterate based on live feedback",
    ],
  },
  {
    icon: DollarSign,
    title: "Built for Growth, Not Just Delivery",
    description:
      "Hiring multiple vendors may feel cheaper upfront—but it often costs more in the long run. With Silver Spark, you get a strategic partner focused on long-term value, not just project completion.",
    benefits: [
      "Lower overhead than managing multiple teams",
      "One point of contact for product, design, and growth",
      "Automation, AI, and devops baked into delivery",
      "Clear pricing, roadmap visibility, and consistent ROI",
    ],
  },
]

