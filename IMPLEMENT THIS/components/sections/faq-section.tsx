"use client"

import { useState, useId } from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function FaqSection() {
  // Track the currently open FAQ item index, -1 means none are open
  const [openIndex, setOpenIndex] = useState<number>(-1)

  // Function to toggle FAQ items
  const toggleFaq = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
  }

  return (
    <section className="min-h-screen py-nav bg-black flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about our marketing and development services"
          alignment="center"
          className="mb-16 text-white"
        />

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isLast={index === faqs.length - 1}
              isOpen={openIndex === index}
              onToggle={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FaqItemProps {
  question: string
  answer: string
  isLast?: boolean
  isOpen: boolean
  onToggle: () => void
}

function FaqItem({ question, answer, isLast = false, isOpen, onToggle }: FaqItemProps) {
  const id = useId()

  return (
    <div className={cn("py-5 relative", !isLast && "mb-5")}>
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
      >
        <h3 className="heading-4 text-white">{question}</h3>
        <ChevronDown
          className={cn("h-5 w-5 transition-transform duration-200", isOpen && "transform rotate-180")}
          style={{
            color: isOpen ? "#ea580c" : "#9ca3af", // Use orange-600 when active, gray-400 when inactive
          }}
          aria-hidden="true"
        />
      </button>

      <div
        id={`faq-answer-${id}`}
        className={cn(
          "mt-2 body text-gray-300 overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <p className="pb-2">{answer}</p>
      </div>

      {/* Animated gradient line divider */}
      {!isLast && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
          <div
            className={cn(
              "w-full h-full",
              isOpen
                ? "bg-gradient-to-r from-transparent via-orange-600 to-transparent animate-shimmer"
                : "bg-gray-800",
            )}
            style={{ backgroundSize: "200% 100%" }}
          ></div>
        </div>
      )}
    </div>
  )
}

const faqs = [
  {
    question: "How long does it take to launch an MVP or product?",
    answer:
      "Most MVPs and startup-ready web apps we build launch in 4–6 weeks. More complex platforms may take 8–12 weeks depending on features, integrations, and team availability. We move fast, but we don't cut corners—our lean sprint process helps you validate quickly and scale with confidence.",
  },
  {
    question: "How much does it cost to build a SaaS MVP or web app?",
    answer:
      "Pricing depends on scope, features, and integrations. Our MVP projects typically start around $10,000 and scale up based on complexity. Custom web apps, AI integrations, or automation systems may range from $25,000 to $60,000+. We'll give you a clear estimate after a quick discovery call.",
  },
  {
    question: "Do you offer full-service support after launch?",
    answer:
      "Yes. We offer ongoing support through flexible retainers that can include maintenance, marketing, SEO, performance optimization, and growth strategy. Many of our clients continue working with us as their long-term digital partner.",
  },
  {
    question: "Do you work with AI and automation tools?",
    answer:
      "Absolutely. We specialize in integrating AI and automation into your workflows—from AI-powered lead gen tools and chatbots to content automation and backend process automation using platforms like OpenAI, Zapier, Make, and custom serverless functions.",
  },
  {
    question: "Is SEO included in your development process?",
    answer:
      "Yes—every project we deliver is built with SEO best practices in mind. This includes fast load times, mobile-first design, semantic structure, clean URLs, and technical SEO foundations. We also offer optional keyword research and content strategy for startups looking to rank fast.",
  },
  {
    question: "Can you help me choose the right tech stack?",
    answer:
      "Definitely. We guide you toward the best stack for your product—balancing performance, cost, and scalability. Most of our builds use modern tools like React, Next.js, Firebase, Supabase, Payload CMS, and serverless cloud infrastructure.",
  },
  {
    question: "Do you offer content and branding services?",
    answer:
      "Yes. We provide full-service creative support—brand identity, messaging, UX/UI design, and copywriting. Whether you're starting from scratch or refreshing your brand, we'll help you build a cohesive, conversion-focused experience from day one.",
  },
  {
    question: "What's included in your website or product maintenance plans?",
    answer:
      "Our support plans include updates, uptime monitoring, bug fixes, performance optimization, backups, security patches, and priority dev support. You can also bundle in ongoing strategy, new features, or marketing if needed.",
  },
  {
    question: "Do you only work with startups?",
    answer:
      "Startups are our sweet spot, but we also work with scale-ups, small businesses, and marketing teams looking for lean, high-impact execution. If you need fast results without the overhead of a bloated agency, we're a great fit.",
  },
]

