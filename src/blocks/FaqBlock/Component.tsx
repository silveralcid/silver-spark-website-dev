'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

export const FaqBlock: React.FC<FaqBlockProps> = ({ heading, subheading, faqs }) => {
  const [openIndex, setOpenIndex] = useState<number>(-1)

  const toggleFaq = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
  }

  return (
    <section className="min-h-screen py-nav bg-black flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{heading}</h2>
          {subheading && (
            <RichText
              className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto text-gray-300"
              data={subheading}
              enableGutter={false}
            />
          )}
        </div>
        <div className="max-w-3xl mx-auto">
          {faqs && faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <div key={index} className={cn('py-5 relative', index !== faqs.length - 1 && 'mb-5')}>
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-xl md:text-2xl font-medium text-white">{faq.question}</h3>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 transition-transform duration-200',
                      openIndex === index && 'transform rotate-180',
                    )}
                    style={{
                      color: openIndex === index ? '#ea580c' : '#9ca3af',
                    }}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={cn(
                    'mt-4 text-base md:text-lg overflow-hidden transition-all duration-300',
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                  )}
                >
                  {faq.answer ? (
                    <RichText
                      data={faq.answer}
                      enableGutter={false}
                      className="text-gray-300 leading-relaxed pb-2"
                    />
                  ) : (
                    <p className="text-gray-300 leading-relaxed pb-2">No answer available</p>
                  )}
                </div>

                {/* Animated gradient line divider */}
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
            <p className="text-gray-300">No FAQs available</p>
          )}
        </div>
      </div>
    </section>
  )
}
