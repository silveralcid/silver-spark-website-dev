'use client'
import RichText from '@/components/RichText'
import Link from 'next/link'
import Image from 'next/image'
import type { PricingMilestoneBlock as PricingMilestoneBlockProps } from '@/payload-types'

export const PricingMilestoneBlock: React.FC<PricingMilestoneBlockProps> = ({
  heading,
  subheading,
  inactiveButtonText,
  activeButtonText1,
  activeButtonLink1,
  activeButtonText2,
  activeButtonLink2,
  packagePricing,
  milestoneSectionTitle,
  milestoneSectionDescription,
  milestones,
}) => {
  return (
    <div className="dummy-section">
      {heading && <h2 className="dummy-text-heading">{heading}</h2>}
      {subheading && (
        <RichText className="dummy-text-subheading" data={subheading} enableGutter={false} />
      )}
      <div className="dummy-container">
        {packagePricing &&
          packagePricing.map((pkg, index) => (
            <div key={index} className="dummy-container">
              {pkg.icon && typeof pkg.icon === 'object' && pkg.icon.url && (
                <Image
                  src={pkg.icon.url}
                  alt={pkg.packageName || 'Package Icon'}
                  width={100}
                  height={100}
                  priority
                />
              )}
              {pkg.packageName && <h3 className="dummy-text-subheading">{pkg.packageName}</h3>}
              {pkg.packagePrice && <p className="dummy-text-body">{pkg.packagePrice}</p>}
              {pkg.packageDescription && (
                <RichText
                  className="dummy-text-body"
                  data={pkg.packageDescription}
                  enableGutter={false}
                />
              )}
            </div>
          ))}
      </div>
      {milestoneSectionTitle && <h2 className="dummy-text-heading">{milestoneSectionTitle}</h2>}
      {milestoneSectionDescription && (
        <RichText
          className="dummy-text-body"
          data={milestoneSectionDescription}
          enableGutter={false}
        />
      )}
      {milestones &&
        milestones.map((milestone, index) => (
          <div key={index} className="dummy-container">
            {milestone.milestoneTitle && (
              <h3 className="dummy-text-subheading">{milestone.milestoneTitle}</h3>
            )}
            {milestone.milestoneDescription && (
              <RichText
                className="dummy-text-body"
                data={milestone.milestoneDescription}
                enableGutter={false}
              />
            )}
          </div>
        ))}
      <div className="dummy-button">
        {activeButtonText1 && activeButtonLink1 && (
          <Link href={activeButtonLink1} className="dummy-button">
            {activeButtonText1}
          </Link>
        )}
        {activeButtonText2 && activeButtonLink2 && (
          <Link href={activeButtonLink2} className="dummy-button">
            {activeButtonText2}
          </Link>
        )}
        {inactiveButtonText && (
          <button className="dummy-button" disabled>
            {inactiveButtonText}
          </button>
        )}
      </div>
    </div>
  )
}
