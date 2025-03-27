'use client'

import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/utilities/ui'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

export const FaqBlock: React.FC<FaqBlockProps> = ({ heading, subheading, faqs }) => {
  const [openIndex, setOpenIndex] = useState<number>(-1)

  const toggleFaq = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
  }

  return (
    <div className="py-16 background-primary">
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-primary heading-2">{heading}</h2>
          {subheading && (
            <RichText
              className="body-large opacity-80 max-w-3xl mx-auto text-primary"
              data={subheading}
              enableGutter={false}
            />
          )}
        </div>
        <div className="max-w-3xl mx-auto">
          {faqs && faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <div key={index} className="py-5 relative">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="heading-4 text-primary">{faq.question}</h3>
                  <ChevronLeft
                    className={cn(
                      'h-5 w-5 transition-transform duration-200',
                      openIndex === index && 'transform rotate-[-90deg]',
                    )}
                    style={{
                      color: openIndex === index ? 'var(--primary)' : 'var(--muted-foreground)',
                    }}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={cn(
                    'mt-2 body overflow-hidden transition-all duration-300',
                    openIndex === index
                      ? 'max-h-96 opacity-100 text-foreground'
                      : 'max-h-0 opacity-0 text-muted-foreground',
                  )}
                >
                  {faq.answer ? (
                    <RichText data={faq.answer} enableGutter={false} />
                  ) : (
                    <p>No answer available</p>
                  )}
                </div>

                {index !== faqs.length - 1 && (
                  <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
                    <div
                      className={cn(
                        'w-full h-full',
                        openIndex === index
                          ? 'bg-gradient-to-r from-transparent via-orange-600 to-transparent animate-shimmer'
                          : 'bg-gray-800',
                      )}
                      style={{ backgroundSize: '200% 100%' }}
                    ></div>
                  </div>
                )}
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
