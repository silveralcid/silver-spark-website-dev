'use client'
import RichText from '@/components/RichText'
import Link from 'next/link'
import Image from 'next/image'
import type { OurTechBlock as OurTechBlockProps } from '@/payload-types'

export const OurTechBlock: React.FC<OurTechBlockProps> = ({
  heading,
  subheading,
  categoryType,
  categoryCards,
  ctaButtonText,
  ctaButtonLink,
}) => {
  return (
    <div className="dummy-section">
      {heading && <h2 className="dummy-text-heading">{heading}</h2>}
      {subheading && (
        <RichText className="dummy-text-subheading" data={subheading} enableGutter={false} />
      )}
      {categoryType && <h3 className="dummy-text-subheading">{categoryType}</h3>}
      {categoryCards && categoryCards.length > 0 && (
        <div className="dummy-container">
          {categoryCards.map((card, index) => (
            <div key={index} className="dummy-container">
              {card.cardTitle && <h4 className="dummy-text-subheading">{card.cardTitle}</h4>}
              {card.cardDescription && (
                <RichText
                  className="dummy-text-body"
                  data={card.cardDescription}
                  enableGutter={false}
                />
              )}
              {card.chipSectionName && (
                <h5 className="dummy-text-subheading">{card.chipSectionName}</h5>
              )}
              {card.cardChips && card.cardChips.length > 0 && (
                <div className="card-chips">
                  {card.cardChips.map((chip, chipIndex) => (
                    <span key={chipIndex} className="chip dummy-text-body">
                      {chip.cardItem}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {ctaButtonText && ctaButtonLink && (
        <Link href={ctaButtonLink} className="dummy-button" style={{ textDecoration: 'none' }}>
          {ctaButtonText}
        </Link>
      )}
    </div>
  )
}
