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
    <div className="our-tech-block">
      {heading && <h2>{heading}</h2>}
      {subheading && <RichText className="subheading" data={subheading} enableGutter={false} />}
      {categoryType && <h3>{categoryType}</h3>}
      {categoryCards && categoryCards.length > 0 && (
        <div className="category-cards">
          {categoryCards.map((card, index) => (
            <div key={index} className="category-card">
              {card.cardTitle && <h4>{card.cardTitle}</h4>}
              {card.cardDescription && (
                <RichText
                  className="card-description"
                  data={card.cardDescription}
                  enableGutter={false}
                />
              )}
              {card.chipSectionName && <h5>{card.chipSectionName}</h5>}
              {card.cardChips && card.cardChips.length > 0 && (
                <div className="card-chips">
                  {card.cardChips.map((chip, chipIndex) => (
                    <span key={chipIndex} className="chip">
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
        <Link href={ctaButtonLink} style={{ textDecoration: 'none' }}>
          {ctaButtonText}
        </Link>
      )}
    </div>
  )
}
