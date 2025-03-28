'use client'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import Image from 'next/image'
import { CaseStudiesBlock as CaseStudiesBlockProps } from '@/payload-types'

export const CaseStudiesBlock: React.FC<CaseStudiesBlockProps> = ({
  heading,
  subheading,
  ctaButtonText,
  ctaButtonLink,
  viewButtonText,
  caseCards,
}) => {
  return (
    <div className="dummy-section">
      {heading && <h2 className="dummy-text-heading">{heading}</h2>}
      {subheading && (
        <RichText className="dummy-text-subheading" data={subheading} enableGutter={false} />
      )}
      {caseCards && caseCards.length > 0 && (
        <div className="dummy-container">
          {caseCards.map((card, index) => (
            <div key={index} className="dummy-container">
              {card.companyLogo && typeof card.companyLogo !== 'number' && card.companyLogo.url && (
                <Image
                  src={card.companyLogo.url}
                  alt={card.companyLogo.alt || 'Company Logo'}
                  width={100}
                  height={100}
                />
              )}
              {card.companyName && <h3 className="dummy-text-subheading">{card.companyName}</h3>}
              {card.companyIndustry && <p className="dummy-text-body">{card.companyIndustry}</p>}
              {card.mainText && (
                <RichText className="dummy-text-body" data={card.mainText} enableGutter={false} />
              )}
              {card.resultNumber1 && <p className="dummy-text-body">{card.resultNumber1}</p>}
              {card.resultInfo1 && <p className="dummy-text-body">{card.resultInfo1}</p>}
              {card.resultNumber2 && <p className="dummy-text-body">{card.resultNumber2}</p>}
              {card.resultInfo2 && <p className="dummy-text-body">{card.resultInfo2}</p>}
              {card.viewButtonLink && (
                <Link href={card.viewButtonLink} className="dummy-button">
                  {viewButtonText || 'View More'}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
      {ctaButtonText && ctaButtonLink && (
        <Link href={ctaButtonLink} className="dummy-button">
          {ctaButtonText}
        </Link>
      )}
    </div>
  )
}
