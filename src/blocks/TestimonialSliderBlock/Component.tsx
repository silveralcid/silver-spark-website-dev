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
    <div className="dummy-section">
      {heading && <h2 className="dummy-text-heading">{heading}</h2>}
      {subheading && (
        <RichText
          className="dummy-text-body opacity-80 max-w-3xl mx-auto text-primary"
          data={subheading}
          enableGutter={false}
        />
      )}
      <div className="dummy-container">
        {testimonialCards &&
          testimonialCards.map((card, index) => (
            <div key={index} className="dummy-container">
              {card.image && typeof card.image === 'object' && card.image.url && (
                <Image
                  src={card.image.url}
                  alt={card.image.alt || 'Image description'}
                  width={400}
                  height={300}
                  priority
                />
              )}
              <h3 className="dummy-text-subheading">
                {card.firstName} {card.lastName}
              </h3>
              <p className="dummy-text-body">
                {card.role} at {card.companyName}
              </p>
              <p className="dummy-text-body">{card.testimonialText}</p>
            </div>
          ))}
      </div>
      {ctaButtonText && ctaButtonLink && (
        <Link
          href={ctaButtonLink}
          className="dummy-button"
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
