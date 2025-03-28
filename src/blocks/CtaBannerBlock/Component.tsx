'use client'
import RichText from '@/components/RichText'
import Link from 'next/link'
import Image from 'next/image'
import type { CtaBannerBlock as CtaBannerBlockProps } from '@/payload-types'

export const CtaBanner: React.FC<CtaBannerBlockProps> = ({
  heading,
  subheading,
  contentText,
  ctaButtonText,
  ctaButtonLink,
  icon,
  image,
  calloutText1,
  calloutText2,
}) => {
  return (
    <div className="dummy-section flex flex-col md:flex-row items-center">
      {image && typeof image === 'object' && image.url && (
        <div className="dummy-container md:w-1/2">
          <Image
            src={image.url}
            alt={image.alt || 'Image description'}
            width={400}
            height={300}
            priority
          />
        </div>
      )}
      <div className="dummy-container md:w-1/2 p-4">
        {heading && <h2 className="dummy-text-heading">{heading}</h2>}
        {subheading && (
          <RichText className="dummy-text-subheading" data={subheading} enableGutter={false} />
        )}
        {contentText && (
          <RichText className="dummy-text-body" data={contentText} enableGutter={false} />
        )}
        {calloutText1 && <p className="dummy-text-body">{calloutText1}</p>}
        {calloutText2 && <p className="dummy-text-body">{calloutText2}</p>}
        {ctaButtonText && ctaButtonLink && (
          <Link href={ctaButtonLink} className="dummy-button">
            {ctaButtonText}
          </Link>
        )}
      </div>
    </div>
  )
}
