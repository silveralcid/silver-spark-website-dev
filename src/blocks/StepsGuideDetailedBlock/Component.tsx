'use client'
import RichText from '@/components/RichText'
import Link from 'next/link'
import type { StepsGuideDetailedBlock } from '@/payload-types'

export const StepsGuideDetailed: React.FC<StepsGuideDetailedBlock> = ({
  heading,
  subheading,
  TextColumn1,
  TextColumn2,
  steps,
  ctaText,
  ctaLink,
}) => {
  return (
    <div className="dummy-section">
      {heading && <h2 className="dummy-text-heading">{heading}</h2>}
      {subheading && (
        <RichText className="dummy-text-subheading" data={subheading} enableGutter={false} />
      )}
      <div className="dummy-container">
        {TextColumn1 && <p className="dummy-text-body">{TextColumn1}</p>}
        {TextColumn2 && <p className="dummy-text-body">{TextColumn2}</p>}
      </div>
      {steps && steps.length > 0 && (
        <div className="dummy-container">
          {steps.map((step, index) => (
            <div key={index} className="dummy-container">
              {step.stepTitle && <h3 className="dummy-text-subheading">{step.stepTitle}</h3>}
              {step.stepDescription && (
                <RichText
                  className="dummy-text-body"
                  data={step.stepDescription}
                  enableGutter={false}
                />
              )}
            </div>
          ))}
        </div>
      )}
      {ctaText && ctaLink && (
        <Link href={ctaLink} className="dummy-button">
          {ctaText}
        </Link>
      )}
    </div>
  )
}
