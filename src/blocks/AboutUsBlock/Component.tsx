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
    <section className="min-h-[calc(100vh-var(--nav-height))] bg-gray-50 flex items-center py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                {processTextWithStyledWords(heading || '')}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-gray-700">{subheading}</p>
            </div>

            <div className="space-y-6 py-4">
              {solutionHighlights &&
                solutionHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-5">
                    <div className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-xl text-gray-700">
                      {processTextWithStyledWords(highlight.solutionHighlight || '')}
                    </div>
                  </div>
                ))}
            </div>

            <div className="space-y-6">
              {content && (
                <RichText className="text-lg text-gray-700" data={content} enableGutter={false} />
              )}
            </div>

            {ctaButtonText && ctaButtonLink && (
              <div className="relative w-full mt-8">
                <div
                  className="video-banner-container relative -left-4 w-[calc(100%+1rem)] h-20"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(194,65,12,1) 0%, rgba(217,119,6,1) 100%)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 25px -5px rgba(194,65,12,0.5)',
                  }}
                >
                  <div className="video-banner-content flex items-center h-full">
                    <div className="flex items-center ml-4 h-full">
                      <div className="relative overflow-hidden rounded-md h-16 w-28 mr-4 flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <Image
                          src="/placeholder.svg?height=200&width=350"
                          alt="Video thumbnail"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div
                            ref={playButtonRef}
                            className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-500"
                          >
                            <Play className="h-5 w-5 text-gray-900 ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      <div className="text-white">
                        <div className="text-lg font-medium">{ctaButtonText}</div>
                        <div className="text-sm opacity-80">1 MINUTE</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-20"></div>
              </div>
            )}
          </div>

          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
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
    </section>
  )
}

export default AboutUsBlock
