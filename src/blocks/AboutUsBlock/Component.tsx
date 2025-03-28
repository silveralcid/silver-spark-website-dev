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
  styledWords,
}) => {
  // Function to highlight styled words in red
  const highlightStyledWords = (text: string) => {
    if (!styledWords) return text
    let highlightedText = text
    styledWords.forEach(({ word }) => {
      const regex = new RegExp(`(${word})`, 'gi')
      highlightedText = highlightedText.replace(regex, '<span style="color: red;">$1</span>')
    })
    return highlightedText
  }

  return (
    <div className="dummy-section">
      <h1
        className="dummy-text-heading"
        dangerouslySetInnerHTML={{ __html: highlightStyledWords(heading || '') }}
      />
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
