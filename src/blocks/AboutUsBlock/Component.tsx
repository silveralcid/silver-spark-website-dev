import React from 'react'
import type { Block } from 'payload'
import type { AboutUsBlock as AboutUsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import Image from 'next/image'

export const AboutUsBlock: React.FC<AboutUsBlockProps> = ({
  heading,
  subheading,
  image,
  content,
  ctaButtonText,
  ctaButtonLink,
  solutionHighlights,
}) => {
  return (
    <div className="dummy-section">
      <h1 className="dummy-text-heading">{heading}</h1>
      <h2 className="dummy-text-subheading">{subheading}</h2>
      {image && typeof image === 'object' && image.url && (
        <Image
          src={image.url}
          alt={image.alt || 'Image description'}
          width={400}
          height={300}
          priority
        />
      )}
      {content && (
        <RichText
          className="dummy-text-body opacity-80 max-w-3xl mx-auto text-primary"
          data={content}
          enableGutter={false}
        />
      )}
      {ctaButtonText && ctaButtonLink && (
        <a href={ctaButtonLink} className="dummy-button">
          {ctaButtonText}
        </a>
      )}
      <ul className="dummy-container">
        {solutionHighlights &&
          solutionHighlights.map((highlight, index) => (
            <li key={index} className="dummy-text-body">
              {highlight.solutionHighlight}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default AboutUsBlock
