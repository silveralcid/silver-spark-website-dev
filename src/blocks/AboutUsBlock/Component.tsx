import React from 'react'
import type { Block } from 'payload'
import type { AboutUsBlock as AboutUsBlockType } from './config'



const AboutUsBlock: React.FC<AboutUsBlockProps> = ({ data }) => {
  return (
    <div className="about-us-block">
      <h1>{data.heading}</h1>
      <h2>{data.subheading}</h2>
      {data.image && <img src={data.image} alt="About Us" />}
      <div className="content">{data.content}</div>
      {data.ctaButtonText && data.ctaButtonLink && (
        <a href={data.ctaButtonLink} className="cta-button">
          {data.ctaButtonText}
        </a>
      )}
      <ul className="solution-highlights">
        {data.solutionHighlights.map((highlight: { solutionHighlight: string }, index: number) => (
          <li key={index}>{highlight.solutionHighlight}</li>
        ))}
      </ul>
    </div>
  )
}

export default AboutUsBlock
