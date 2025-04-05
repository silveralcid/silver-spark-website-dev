'use client'

import React from 'react'
import type { AboutUsBlock as AboutUsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import Image from 'next/image'
import { Check, Play } from 'lucide-react'
import { useEffect, useRef } from 'react'

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
  const playButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!playButtonRef.current) return

    // Add a subtle pulse animation to the play button
    const playButton = playButtonRef.current
    let scale = 1

    const pulseAnimation = () => {
      scale = scale === 1 ? 1.1 : 1
      playButton.style.transform = `scale(${scale})`
      playButton.style.boxShadow =
        scale === 1 ? '0 0 10px rgba(255, 255, 255, 0.3)' : '0 0 20px rgba(255, 255, 255, 0.7)'
    }

    const interval = setInterval(pulseAnimation, 1500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  // Function to process text with styled words
  const processTextWithStyledWords = (text: string) => {
    if (!text) return null
    if (!styledWords || styledWords.length === 0) return text

    let parts: Array<string | React.ReactNode> = [text]

    styledWords.forEach(({ word }) => {
      const newParts: Array<string | React.ReactNode> = []

      parts.forEach((part) => {
        if (typeof part !== 'string') {
          newParts.push(part)
          return
        }

        const splitPart = part.split(new RegExp(`(${word})`, 'i'))

        splitPart.forEach((text, i) => {
          if (i % 2 === 0) {
            // Regular text
            if (text) newParts.push(text)
          } else {
            // Word to be styled
            newParts.push(
              <span
                key={`${word}-${i}`}
                className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent font-semibold"
              >
                {text}
              </span>,
            )
          }
        })
      })

      parts = newParts
    })

    return parts
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 lg:pr-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-3">
                {processTextWithStyledWords(heading || '')}
              </h1>
              {subheading && (
                <p className="text-xl md:text-2xl font-medium text-gray-700 mt-3">{subheading}</p>
              )}
            </div>

            {solutionHighlights && solutionHighlights.length > 0 && (
              <div className="py-2 space-y-4">
                {solutionHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-7 w-7 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-lg text-gray-700">
                      {processTextWithStyledWords(highlight.solutionHighlight || '')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rich text content */}
            {content && (
              <div className="py-1">
                <RichText
                  className="text-lg text-gray-700"
                  data={content}
                  enableGutter={false}
                  textSpacing="tight"
                />
              </div>
            )}

            {/* CTA button with improved spacing and layout */}
            {ctaButtonText && ctaButtonLink && (
              <div className="pt-4 pb-2">
                <div
                  className="relative w-full rounded-lg overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(194,65,12,1) 0%, rgba(217,119,6,1) 100%)',
                    boxShadow: '0 8px 25px -5px rgba(194,65,12,0.5)',
                  }}
                >
                  <div className="flex items-center p-3">
                    <div className="relative overflow-hidden rounded-md h-14 w-24 mr-4 flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      <Image
                        src="/placeholder.svg?height=200&width=350"
                        alt="Video thumbnail"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div
                          ref={playButtonRef}
                          className="h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-500"
                        >
                          <Play className="h-4 w-4 text-gray-900 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="text-white">
                      <div className="text-base font-medium">{ctaButtonText}</div>
                      <div className="text-xs opacity-80">1 MINUTE</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 lg:mt-0">
            <div className="relative w-full h-0 pb-[75%] md:pb-[85%] lg:pb-[90%] rounded-lg overflow-hidden shadow-xl">
              {image && typeof image === 'object' && image.url && (
                <Image
                  src={image.url}
                  alt={image.alt || 'Silver Spark team'}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUsBlock
