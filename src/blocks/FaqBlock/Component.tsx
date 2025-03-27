import React from 'react'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

export const FaqBlock: React.FC<FaqBlockProps> = ({ heading, subheading, faqs }) => {
  return (
    <div className="container">
      <div className="">
        <div className="">
          {heading && <h2>{heading}</h2>}
          {subheading && <RichText className="" data={subheading} enableGutter={false} />}
        </div>
        <div className="">
          {faqs && faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq.id}>
                <h3>{faq.question}</h3>
                {faq.answer && <RichText data={faq.answer} enableGutter={false} />}
              </div>
            ))
          ) : (
            <p>No FAQs available</p>
          )}
        </div>
      </div>
    </div>
  )
}
