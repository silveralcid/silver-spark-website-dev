'use client'
import RichText from '@/components/RichText'
import Link from 'next/link'
import Image from 'next/image'
import type { TripleCardComboBlock as TripleCardComboBlockProps } from '@/payload-types'

export const TripleCardComboBlock: React.FC<TripleCardComboBlockProps> = ({
  heading,
  subheading,
  cards,
}) => {
  return (
    <div className="dummy-section">
      {heading && <h2 className="dummy-text-heading">{heading}</h2>}
      {subheading && (
        <RichText className="dummy-text-subheading" data={subheading} enableGutter={false} />
      )}
      <div className="dummy-container">
        {cards &&
          cards.map((card, index) => (
            <div key={index} className="dummy-container">
              {card.icon && typeof card.icon === 'object' && card.icon.url && (
                <Image
                  src={card.icon.url}
                  alt={card.icon.alt || 'Card icon'}
                  width={100}
                  height={100}
                  priority
                />
              )}
              {card.title && <h3 className="dummy-text-subheading">{card.title}</h3>}
              {card.description && (
                <RichText
                  className="dummy-text-body"
                  data={card.description}
                  enableGutter={false}
                />
              )}
              {card.sectionTitle && <h4 className="dummy-text-subheading">{card.sectionTitle}</h4>}
              {card.keyPoints &&
                card.keyPoints.map((point, pointIndex) => (
                  <p key={pointIndex} className="dummy-text-body">
                    {point.item}
                  </p>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}
