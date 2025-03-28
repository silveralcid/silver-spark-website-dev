'use client'

import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import Image from 'next/image'
import type { OurServicesBlock as OurServicesBlockProps } from '@/payload-types'

export const OurServicesBlock: React.FC<OurServicesBlockProps> = ({
  heading,
  subheading,
  serviceCards,
  ctaButtonText,
  ctaButtonLink,
}) => {
  return (
    <div className="dummy-section">
      {heading && <h2 className="dummy-text-heading mb-4">{heading}</h2>}
      {subheading && (
        <RichText
          className="dummy-text-body body-large opacity-80 max-w-3xl mx-auto text-primary"
          data={subheading}
          enableGutter={false}
        />
      )}
      <div className="dummy-container flex justify-center">
        {serviceCards &&
          serviceCards.map((card, index) => (
            <div key={index} className="dummy-container mx-4">
              {card.serviceIcon && typeof card.serviceIcon === 'object' && card.serviceIcon.url && (
                <Image
                  src={card.serviceIcon.url}
                  alt={card.serviceTitle || 'Service icon'}
                  width={100}
                  height={100}
                />
              )}
              {card.serviceTitle && (
                <h3 className="dummy-text-subheading mt-2">{card.serviceTitle}</h3>
              )}
              {card.serviceDescription && (
                <RichText
                  className="dummy-text-body body-small"
                  data={card.serviceDescription}
                  enableGutter={false}
                />
              )}
              {card.servicePoints &&
                card.servicePoints.map((point, pointIndex) => (
                  <p key={pointIndex} className="dummy-text-body">
                    {point.servicePoint}
                  </p>
                ))}
            </div>
          ))}
      </div>
      {ctaButtonText && ctaButtonLink && (
        <Link
          href={ctaButtonLink}
          className="dummy-button mt-4 inline-block"
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
