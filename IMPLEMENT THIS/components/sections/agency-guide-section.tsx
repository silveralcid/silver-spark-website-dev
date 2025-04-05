"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"

const steps = [
  {
    id: "define-needs",
    title:
      "Step 1: <span class='bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent'>Define</span> What You Actually Need to Launch",
    content: `Before reaching out to any team, get clear on what you're really building. This isn't just about a website—it's about launching a working product that solves a problem and supports real growth.

  Do you need an MVP to validate a concept? A SaaS platform for early users? A backend system for internal workflows? Map out your core goals, must-have features, and success metrics.

  Also define timeline, tech preferences, and your budget range. Putting this into a short RFP or project brief helps any serious agency respond with real solutions—not generic pitches.`,
  },
  {
    id: "start-search",
    title:
      "Step 2: Start the <span class='bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent'>Search</span>—Strategically",
    content: `Skip the bloated agencies that cater to enterprise clients and look for lean, startup-savvy teams who build fast and think like founders.

  Check platforms like Clutch, ProductHunt Services, or even LinkedIn. Look for agencies with modern portfolios, startup experience, and a deep understanding of scalable technologies like React, Next.js, Firebase, or Supabase.

  Focus on finding partners that align with your pace, budget, and product goals—not just those with flashy branding.`,
  },
  {
    id: "research-shortlist",
    title:
      "Step 3: Research and <span class='bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent'>Ask</span> the Right Questions",
    content: `Once you've got a few solid candidates, it's time to dig deeper. Review their portfolios—are they building real products or just marketing sites? Do they have experience with MVPs, SaaS apps, or custom platforms?

  Check for client testimonials that speak to communication, delivery, and adaptability. See if they've worked with startups, understand lean principles, and can scale with you.

  Create a shortlist of 2–4 teams that feel like a match—technically and culturally.`,
  },
  {
    id: "meet-agencies",
    title:
      "Step 4: Book <span class='bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent'>Discovery</span> Calls and Weigh Your Options",
    content: `This is your chance to vet the team you'd actually be working with—ask smart, founder-focused questions like:

  How do you approach MVP launches?
  What tech stack do you recommend and why?
  Do you support post-launch iterations?
  What does your handoff or long-term support look like?
  How do you measure results and success?

  These conversations aren't about a pitch deck—they're about chemistry, clarity, and whether they can build what you actually need on time and on budget.`,
  },
  {
    id: "make-decision",
    title:
      "Step 5: <span class='bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent'>Choose</span> the Partner, Not Just the Price",
    content: `Now it's time to choose. Don't default to the lowest bid—look for the team that gets your vision, communicates well, and brings real startup experience to the table.

  The right partner will be transparent, agile, and results-driven. They'll think in sprints, not months, and prioritize progress over perfection.

  Lock in a clear contract outlining the scope, timeline, pricing, and expectations—and make sure everyone's aligned before kickoff. That's how real momentum starts.`,
  },
  {
    id: "why-silver-spark",
    title:
      "Why Silver Spark Is The <span class='bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent'>Best</span> Choice For Your Project",
    content: `Whether you're validating a new idea, building your first product, or scaling an existing platform, Silver Spark is a startup-focused, full-service digital partner built to launch fast and grow smart.

What makes Silver Spark different from traditional dev shops or design agencies?`,
  },
]

export function AgencyGuideSection() {
  // State to track which step is open (default to first step)
  const [openStep, setOpenStep] = useState<string>("define-needs")
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only update active section for scrolling, don't auto-expand
            // This allows manual collapse/expand to work independently
          }
        })
      },
      { rootMargin: "-100px 0px -300px 0px", threshold: 0.1 },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const scrollToSection = (id: string) => {
    // First close all steps
    setOpenStep("")

    // Then open only the selected step
    setOpenStep(id)

    // Scroll to the section
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  // Toggle step open/closed
  const toggleStep = (stepId: string) => {
    setOpenStep(openStep === stepId ? "" : stepId)
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-foreground text-lg font-medium mb-2">HOW TO CHOOSE THE</h2>
          <h1 className="heading-1 text-foreground mb-16">
            Best Agency to <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">Launch Your Project</span>
          </h1>

          {/* Two-column intro */}
          <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
            <div className="flex items-center">
              <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                At Silver Spark, we've worked with hundreds of startup founders, SaaS teams, and growing brands—so we know what works, what doesn't, and what to look for.
              </p>
            </div>
            <div>
              <p className="body text-muted-foreground leading-relaxed">
                If you're building a new brand, launching a product, or simply leveling up your current website—choosing the right web design partner can make or break your growth. Not all agencies are created equal, and not every partner will get your vision, your urgency, or your market.
              </p>
              <p className="body text-muted-foreground leading-relaxed mt-4">
                Here's your step-by-step guide to finding the right web design agency—the smart way.
              </p>
            </div>
          </div>

          {/* Steps Content - Now Collapsible */}
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.id}
                id={step.id}
                ref={(el) => (sectionRefs.current[step.id] = el)}
                className={cn(
                  "mb-8 pb-8 scroll-mt-24 relative",
                  index < steps.length - 1 ? "animated-divider" : ""
                )}
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="flex items-center justify-between w-full text-left"
                  aria-expanded={openStep === step.id}
                  aria-controls={`content-${step.id}`}
                >
                  <h3 className="heading-3 text-foreground" dangerouslySetInnerHTML={{ __html: step.title }}></h3>
                  <ChevronDown
                    className={cn(
                      "h-6 w-6 transition-transform duration-200",
                      openStep === step.id ? "transform rotate-180" : ""
                    )}
                    style={{
                      color: openStep === step.id ? "#ea580c" : "currentColor" // Use orange-600 when active
                    }}
                  />
                </button>

                <div
                  id={`content-${step.id}`}
                  className={cn(
                    "mt-6 body text-muted-foreground leading-relaxed space-y-4 overflow-hidden transition-all duration-300 text-left",
                    openStep === step.id ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  {step.id === "why-silver-spark" ? (
                    <>
                  <p>
                    Whether you're validating a new idea, building your first product, or scaling an existing platform, Silver Spark is a startup-focused, full-service digital partner built to launch fast and grow smart.
                  </p>

                  <p>What makes Silver Spark different from traditional dev shops or design agencies?</p>

                  <div className="space-y-4 my-6">
                    <div className="flex items-start">
                      <div className="h-6 w-6 bg-gradient-to-r from-orange-700 to-amber-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="font-medium">End-to-end product execution:</span> From backend architecture to frontend design, AI tools to go-to-market strategy—we don't just ship code. We help you build a business. We specialize in MVPs, SaaS apps, and scalable digital platforms with lean, hands-on execution.
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="h-6 w-6 bg-gradient-to-r from-orange-700 to-amber-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="font-medium">AI-first thinking:</span> We bake automation, personalization, and intelligent workflows into the foundation of your product. From AI-driven lead gen to smart backend automation, we build systems that scale themselves—and grow with your business.
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="h-6 w-6 bg-gradient-to-r from-orange-700 to-amber-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="font-medium">Lean, transparent process:</span> We run fast and keep you in the loop every step of the way. With structured sprints, clear timelines, and straightforward pricing, we deliver on time and on budget—without the agency fluff.
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="h-6 w-6 bg-gradient-to-r from-orange-700 to-amber-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="font-medium">Outcomes over output:</span> We measure success by your growth—not just the code we ship. Whether it's launching faster, converting better, or automating operations, everything we build is tied to real business results.
                      </div>
                    </div>
                  </div>

                  <p>
                    If you're a founder looking for a technical partner that moves fast, thinks lean, and builds smart—Silver Spark was built for you.
                  </p>

                  <p>
                    Our team works across industries and tech stacks to deliver fast, scalable solutions—from MVPs and web apps to automation, content strategy, and full-stack growth systems.
                  </p>
                </>
                  ) : (
                    step.content.split("\n\n").map((paragraph, i) => (
                      <p key={i} className={paragraph.trim().startsWith("What") ? "font-medium" : ""}>
                        {paragraph}
                      </p>
                    ))
                  )}
                </div>
                
                {/* Animated gradient line divider */}
                {index < steps.length - 1 && (
                  <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
                    <div className={cn(
                      "w-full h-full",
                      openStep === step.id
                        ? "bg-gradient-to-r from-transparent via-orange-600 to-transparent animate-shimmer"
                        : "bg-border",
                      )}
                      style={{ backgroundSize: '200% 100%' }}
                    ></div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <div className="text-center mt-8 mb-16">
              <a
                href="/contact"
                className="inline-block bg-gradient-to-r from-orange-700 to-amber-600 hover:from-orange-800 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-colors duration-300 text-lg"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

