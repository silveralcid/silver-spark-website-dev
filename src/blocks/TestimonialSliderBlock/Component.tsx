'use client'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import Image from 'next/image'
import type { TestimonialSliderBlock as TestimonialSliderBlockProps } from '@/payload-types'

export const TestimonialSliderBlock: React.FC<TestimonialSliderBlockProps> = ({
  heading,
  subheading,
  testimonialCards,
  ctaButtonText,
  ctaButtonLink,
}) => {
  return (
    <div className="testimonial-slider">
      {heading && <h2>{heading}</h2>}
      {subheading && (
        <RichText
          className="body-large opacity-80 max-w-3xl mx-auto text-primary"
          data={subheading}
          enableGutter={false}
        />
      )}
      <div className="testimonial-cards">
        {testimonialCards &&
          testimonialCards.map((card, index) => (
            <div key={index} className="testimonial-card">
              {card.image && typeof card.image === 'object' && card.image.url && (
                <Image
                  src={card.image.url}
                  alt={card.image.alt || 'Image description'}
                  width={400}
                  height={300}
                  priority
                />
              )}
              <h3>
                {card.firstName} {card.lastName}
              </h3>
              <p>
                {card.role} at {card.companyName}
              </p>
              <p>{card.testimonialText}</p>
            </div>
          ))}
      </div>
      {ctaButtonText && ctaButtonLink && (
        <Link
          href={ctaButtonLink}
          style={{
            textDecoration: 'none',
          }}
        >
          {ctaButtonText}
        </Link>
      )}
    </div>
  )
}
