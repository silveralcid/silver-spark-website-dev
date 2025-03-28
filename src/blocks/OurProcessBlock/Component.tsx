'use client'
import RichText from '@/components/RichText'
import Link from 'next/link'
import Image from 'next/image'
import type { OurProcessBlock as OurProcessBlockProps } from '@/payload-types'
export const OurProcessBlock: React.FC<OurProcessBlockProps> = ({
  heading,
  subheading,
  stepType,
  processSteps,
}) => {
  return (
    <div className="dummy-section">
      {heading && <h2 className="dummy-text-heading">{heading}</h2>}
      {subheading && (
        <RichText className="dummy-text-body" data={subheading} enableGutter={false} />
      )}
      {processSteps &&
        processSteps.map((step, index) => (
          <div key={index} className="dummy-container">
            <h3 className="dummy-text-subheading">{step.stepTitle}</h3>
            <RichText
              className="dummy-text-body"
              data={step.stepDescription}
              enableGutter={false}
            />

            {step.processItems &&
              step.processItems.map((item, itemIndex) => (
                <p key={itemIndex} className="dummy-text-body">
                  {item.processItem}
                </p>
              ))}
          </div>
        ))}
    </div>
  )
}
