export interface ServiceData {
  id: number
  title: string
  description: string
  icon: string // Lucide icon name
}

export const services: ServiceData[] = [
  {
    id: 1,
    title: "Brand Strategy",
    description:
      "We craft distinctive visual identities, messaging, and brand systems that clarify your positioning and build lasting impact.",
    icon: "PenTool",
  },
  {
    id: 2,
    title: "Web Design",
    description:
      "Modern, responsive websites built to convert. Designed for clarity, speed, and high-performance user experience.",
    icon: "Globe",
  },
  {
    id: 3,
    title: "Web Development",
    description:
      "We rapidly prototype and build scalable MVPs, SaaS platforms, and web apps—so you can validate fast and launch with confidence.",
    icon: "Code",
  },
  {
    id: 4,
    title: "AI Automation",
    description:
      "Streamline operations and scale smarter with AI-powered workflows for lead capture, onboarding, nurturing, and beyond.",
    icon: "Zap",
  },
  {
    id: 5,
    title: "Marketing Funnels",
    description:
      "We create full-funnel marketing systems that attract, engage, and convert—with content, ads, and automation working together.",
    icon: "BarChart",
  },
  {
    id: 6,
    title: "SEO Optimization",
    description:
      "From site speed to structured data and keyword strategy, we optimize for performance, visibility, and organic growth.",
    icon: "Search",
  },
  {
    id: 7,
    title: "Lead Generation",
    description:
      "We build high-converting lead magnets, landing pages, and automated email sequences to grow your list and nurture leads at scale.",
    icon: "Smartphone",
  },
  {
    id: 8,
    title: "Growth Support",
    description:
      "Stay ahead with continuous optimization, data-driven iteration, and a dedicated partner that evolves with your business.",
    icon: "TrendingUp",
  },
]

