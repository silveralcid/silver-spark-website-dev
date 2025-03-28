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
    <div className="about-us-block flex flex-col items-center justify-center">
      <h1>{heading}</h1>
      <h2>{subheading}</h2>
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
          className="body-large opacity-80 max-w-3xl mx-auto text-primary"
          data={content}
          enableGutter={false}
        />
      )}
      {ctaButtonText && ctaButtonLink && (
        <a href={ctaButtonLink} className="cta-button">
          {ctaButtonText}
        </a>
      )}
      <ul className="solution-highlights">
        {solutionHighlights &&
          solutionHighlights.map((highlight, index) => (
            <li key={index}>{highlight.solutionHighlight}</li>
          ))}
      </ul>
    </div>
  )
}

export default AboutUsBlock
