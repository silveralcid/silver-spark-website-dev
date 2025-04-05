"use client"

import { useState, useCallback } from "react"

// Define the business data structure
export interface Business {
  id: string
  name: string
  logo: string
  backgroundImage: string
  description: string
  industry: string
  services: string[]
  aiSolutions: string[]
  results: {
    stat1: {
      value: string
      label: string
    }
    stat2: {
      value: string
      label: string
    }
  }
  caseStudyLink: string
  seoTitle: string
  seoDescription: string
}

// Sample business data with improved SEO copy and AI-driven focus
export const businesses: Business[] = [
  {
    id: "hp",
    name: "HP",
    logo: "/placeholder.svg?height=40&width=80",
    backgroundImage: "/placeholder.svg?height=800&width=600&text=HP+Background",
    description:
      "HP partnered with Silver Spark to transform their enterprise customer portal through AI-powered automation and rapid iteration. Our fast-paced development approach delivered a complete solution in just 6 weeks, integrating intelligent workflows that dramatically improved customer satisfaction and reduced support overhead.",
    industry: "Technology",
    services: ["UX Design", "Web Development", "System Integration"],
    aiSolutions: ["AI-Powered Customer Portal", "Intelligent Support Automation", "Predictive Analytics Dashboard"],
    results: {
      stat1: {
        value: "47%",
        label: "increase in customer satisfaction scores",
      },
      stat2: {
        value: "28%",
        label: "reduction in support ticket volume",
      },
    },
    caseStudyLink: "/case-studies/hp-enterprise-portal-redesign",
    seoTitle: "HP Enterprise Portal Redesign | AI-Powered Customer Experience Transformation",
    seoDescription:
      "Learn how Silver Spark's AI-driven redesign of HP's enterprise customer portal increased satisfaction by 47% and reduced support tickets by 28% in just 6 weeks.",
  },
  {
    id: "xerox",
    name: "Xerox",
    logo: "/placeholder.svg?height=40&width=80",
    backgroundImage: "/placeholder.svg?height=800&width=600&text=Xerox+Background",
    description:
      "Xerox needed a scalable digital document management system that would integrate with their hardware solutions. Our AI-powered approach delivered a custom solution in just 5 weeks, implementing intelligent workflows and automation that transformed their document processing capabilities and operational efficiency.",
    industry: "Document Management",
    services: ["Custom Software Development", "API Integration", "Workflow Automation"],
    aiSolutions: ["Intelligent Document Processing", "AI-Driven Workflow Automation", "Predictive Maintenance Alerts"],
    results: {
      stat1: {
        value: "53%",
        label: "faster document processing throughput",
      },
      stat2: {
        value: "41%",
        label: "improvement in workflow efficiency metrics",
      },
    },
    caseStudyLink: "/case-studies/xerox-document-management-system",
    seoTitle: "Xerox Document Management System | AI-Powered Digital Transformation",
    seoDescription:
      "Discover how Silver Spark's AI-first document management solution increased Xerox's processing speed by 53% and workflow efficiency by 41% through intelligent automation.",
  },
  {
    id: "doforms",
    name: "doForms",
    logo: "/placeholder.svg?height=40&width=80",
    backgroundImage: "/placeholder.svg?height=800&width=600&text=doForms+Background",
    description:
      "doForms approached Silver Spark to enhance their mobile data collection platform with advanced AI capabilities and offline functionality. Our rapid iteration process delivered a complete solution in just 4 weeks, revolutionizing their field data collection process with intelligent automation and real-time synchronization.",
    industry: "Mobile Solutions",
    services: ["Mobile App Development", "Offline Functionality", "Data Synchronization"],
    aiSolutions: ["AI-Powered Data Validation", "Intelligent Form Generation", "Automated Reporting System"],
    results: {
      stat1: {
        value: "65%",
        label: "increase in platform adoption rate",
      },
      stat2: {
        value: "39%",
        label: "reduction in data collection time",
      },
    },
    caseStudyLink: "/case-studies/doforms-mobile-data-collection-platform",
    seoTitle: "doForms Mobile Data Collection Platform | AI-Enhanced App Development",
    seoDescription:
      "See how Silver Spark's AI-powered mobile data collection solution for doForms increased user adoption by 65% and reduced collection time by 39% through intelligent automation.",
  },
  {
    id: "fieldedge",
    name: "FieldEdge",
    logo: "/placeholder.svg?height=40&width=80",
    backgroundImage: "/placeholder.svg?height=800&width=600&text=FieldEdge+Background",
    description:
      "FieldEdge sought a comprehensive field service management solution to optimize technician scheduling and service delivery. Silver Spark's AI-first approach delivered a custom platform in just 6 weeks, implementing intelligent scheduling algorithms and automation workflows that transformed their operational efficiency and directly impacted revenue growth.",
    industry: "Field Service Management",
    services: ["SaaS Development", "Scheduling Optimization", "Mobile Integration"],
    aiSolutions: ["AI-Powered Scheduling Engine", "Predictive Maintenance Alerts", "Intelligent Resource Allocation"],
    results: {
      stat1: {
        value: "58%",
        label: "improvement in scheduling efficiency",
      },
      stat2: {
        value: "34%",
        label: "increase in revenue per technician",
      },
    },
    caseStudyLink: "/case-studies/fieldedge-service-management-platform",
    seoTitle: "FieldEdge Service Management Platform | AI-Driven SaaS Development",
    seoDescription:
      "Explore how Silver Spark's AI-powered field service management solution helped FieldEdge improve scheduling efficiency by 58% and increase technician revenue by 34% through intelligent automation.",
  },
  {
    id: "mcds",
    name: "Miami Country Day School",
    logo: "/placeholder.svg?height=40&width=120",
    backgroundImage: "/placeholder.svg?height=800&width=600&text=MCDS+Background",
    description:
      "Miami Country Day School (MCDS), a premier private educational institution, partnered with Silver Spark to enhance their digital presence. Our AI-powered approach delivered a comprehensive website redesign in just 5 weeks, implementing intelligent content management, automated admissions workflows, and personalized user experiences that dramatically improved engagement metrics.",
    industry: "Education",
    services: ["Website Redesign", "SEO Optimization", "Content Strategy"],
    aiSolutions: [
      "AI-Powered Content Personalization",
      "Automated Admissions Workflow",
      "Intelligent Analytics Dashboard",
    ],
    results: {
      stat1: {
        value: "32%",
        label: "decrease in website bounce rates",
      },
      stat2: {
        value: "15%",
        label: "increase in organic search traffic",
      },
    },
    caseStudyLink: "/case-studies/miami-country-day-school-website-redesign",
    seoTitle: "Miami Country Day School Website Redesign | AI-Enhanced Education Marketing",
    seoDescription:
      "Learn how Silver Spark's AI-powered website redesign for Miami Country Day School reduced bounce rates by 32% and increased organic traffic by 15% through intelligent automation.",
  },
]

export function useCaseStudies(initialBusinessId: string = businesses[0].id) {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>(initialBusinessId)

  const selectedBusiness = businesses.find((b) => b.id === selectedBusinessId) || businesses[0]

  const selectBusiness = useCallback((businessId: string) => {
    setSelectedBusinessId(businessId)
  }, [])

  return {
    businesses,
    selectedBusiness,
    selectBusiness,
  }
}

