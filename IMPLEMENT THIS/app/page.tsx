"use client"

import { Suspense, lazy } from "react"
import { MainLayout } from "@/components/layouts/main-layout"

// Lazy load components
const HeroSection = lazy(() =>
  import("@/components/sections/hero-section").then((mod) => ({ default: mod.HeroSection })),
)
const AboutSection = lazy(() =>
  import("@/components/sections/about-section").then((mod) => ({ default: mod.AboutSection })),
)
const BusinessCaseStudies = lazy(() => import("@/components/business-case-studies"))
const ServicesSection = lazy(() =>
  import("@/components/sections/services-section").then((mod) => ({ default: mod.ServicesSection })),
)
const WhyChooseSection = lazy(() =>
  import("@/components/sections/why-choose-section").then((mod) => ({ default: mod.WhyChooseSection })),
)
const TestimonialsSliderSection = lazy(() =>
  import("@/components/sections/testimonials-slider-section").then((mod) => ({
    default: mod.TestimonialsSliderSection,
  })),
)
const TrendsGuideSection = lazy(() =>
  import("@/components/sections/trends-guide-section").then((mod) => ({ default: mod.TrendsGuideSection })),
)
const TechStackSection = lazy(() =>
  import("@/components/sections/tech-stack-section").then((mod) => ({ default: mod.TechStackSection })),
)
const SupportedByMarqueeSection = lazy(() =>
  import("@/components/sections/supported-by-marquee-section").then((mod) => ({
    default: mod.SupportedByMarqueeSection,
  })),
)
const ProcessSection = lazy(() =>
  import("@/components/sections/process-section").then((mod) => ({ default: mod.ProcessSection })),
)
const PricingSection = lazy(() =>
  import("@/components/sections/pricing-section").then((mod) => ({ default: mod.PricingSection })),
)
const AgencyGuideSection = lazy(() =>
  import("@/components/sections/agency-guide-section").then((mod) => ({ default: mod.AgencyGuideSection })),
)
const FullServiceSection = lazy(() =>
  import("@/components/sections/full-service-section").then((mod) => ({ default: mod.FullServiceSection })),
)
const FaqSection = lazy(() => import("@/components/sections/faq-section").then((mod) => ({ default: mod.FaqSection })))
const NewsletterSignupSection = lazy(() =>
  import("@/components/sections/newsletter-signup-section").then((mod) => ({ default: mod.NewsletterSignupSection })),
)
const ContactFormSection = lazy(() =>
  import("@/components/sections/contact-form-section").then((mod) => ({ default: mod.ContactFormSection })),
)

// Import skeletons
import { HeroSkeleton } from "@/components/skeletons/hero-skeleton"
import { AboutSkeleton } from "@/components/skeletons/about-skeleton"
import { ServicesSkeleton } from "@/components/skeletons/services-skeleton"
import { WhyChooseSkeleton } from "@/components/skeletons/why-choose-skeleton"
import { TestimonialsSkeleton } from "@/components/skeletons/testimonials-skeleton"
import { TrendsGuideSkeleton } from "@/components/skeletons/trends-guide-skeleton"
import { PricingSkeleton } from "@/components/skeletons/pricing-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <MainLayout>
      {/* Hero */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Summarized USP, aka the about */}
      <Suspense fallback={<AboutSkeleton />}>
        <AboutSection />
      </Suspense>

      {/* Case studies */}
      <Suspense
        fallback={
          <div className="py-16 md:py-24 bg-black">
            <div className="container mx-auto px-4">
              <Skeleton className="h-[600px] w-full" />
            </div>
          </div>
        }
      >
        <BusinessCaseStudies />
      </Suspense>

      {/* Partial service offering + all services CTA */}
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesSection />
      </Suspense>

      {/* Magnetic lead free e-book section divider */}
      <Suspense fallback={<TrendsGuideSkeleton />}>
        <TrendsGuideSection />
      </Suspense>

      {/* Why Professionals? */}
      <Suspense fallback={<WhyChooseSkeleton />}>
        <WhyChooseSection />
      </Suspense>

      {/* Small testimonial used as section divider */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSliderSection />
      </Suspense>

      {/* Tech stack info */}
      <Suspense
        fallback={
          <div className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        }
      >
        <TechStackSection />
      </Suspense>

      {/* Our Process */}
      <Suspense
        fallback={
          <div className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <Skeleton className="h-[600px] w-full" />
            </div>
          </div>
        }
      >
        <ProcessSection />
      </Suspense>

      {/* Package pricing and with link to custom calculator */}
      <Suspense fallback={<PricingSkeleton />}>
        <PricingSection />
      </Suspense>

      {/* Email lead capture */}
      <Suspense
        fallback={
          <div className="py-16 bg-black">
            <div className="container mx-auto px-4">
              <Skeleton className="h-[100px] w-full" />
            </div>
          </div>
        }
      >
        <NewsletterSignupSection />
      </Suspense>

      {/* Blog type education: finding and working with the best agency */}
      <Suspense
        fallback={
          <div className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        }
      >
        <AgencyGuideSection />
      </Suspense>

      {/* Supported By/Collaborations Marquee*/}
      <Suspense
        fallback={
          <div className="py-12 bg-black">
            <Skeleton className="h-20 w-full" />
          </div>
        }
      >
        <SupportedByMarqueeSection />
      </Suspense>

      {/* Why go fullservice */}
      <Suspense
        fallback={
          <div className="py-16 md:py-24 bg-black">
            <div className="container mx-auto px-4">
              <Skeleton className="h-[400px] w-full text-white" />
            </div>
          </div>
        }
      >
        <FullServiceSection />
      </Suspense>

      {/* FAQ */}
      <Suspense
        fallback={
          <div className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <Skeleton className="h-[600px] w-full" />
            </div>
          </div>
        }
      >
        <FaqSection />
      </Suspense>

      {/* Client intake form */}
      <Suspense
        fallback={
          <div className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <Skeleton className="h-[600px] w-full" />
            </div>
          </div>
        }
      >
        <ContactFormSection />
      </Suspense>
    </MainLayout>
  )
}

