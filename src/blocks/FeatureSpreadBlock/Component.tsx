'use client'

import React, { useRef, useState } from 'react'
import { FeatureSpreadBlock as FeatureSpreadBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import '@/app/(frontend)/globals.css'

export const FeatureSpreadBlock: React.FC<FeatureSpreadBlockProps> = ({
  heading,
  subheading,
  features,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-nav bg-white relative flex flex-col justify-center"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
            {heading}
          </h2>
          {subheading && (
            <RichText
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              data={subheading}
              enableGutter={false}
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
          {features && features.length > 0 ? (
            features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col p-4 rounded-lg border border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-sm hover:bg-gray-50/50 hover:translate-y-[-2px] group"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-start mb-2 md:mb-3">
                  <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent text-2xl md:text-3xl font-bold mr-2 group-hover:scale-105 transition-transform duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-black transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                {feature.description && (
                  <RichText
                    className="text-sm md:text-base text-gray-700 mb-4 group-hover:text-gray-800 transition-colors duration-300"
                    data={feature.description}
                    enableGutter={false}
                  />
                )}
                <div className="mt-auto relative h-px w-full">
                  {/* Base line (shorter, gray) */}
                  <div
                    className="absolute top-0 left-0 h-px bg-gray-200 transition-all duration-500 ease-out"
                    style={{ width: hoveredItem === index ? '0%' : '40%' }}
                  ></div>

                  {/* Gradient line (full width, orange gradient) */}
                  <div
                    className="absolute top-0 left-0 h-px bg-gradient-to-r from-orange-700 to-amber-600 transition-all duration-500 ease-out"
                    style={{
                      width: hoveredItem === index ? '100%' : '0%',
                      opacity: hoveredItem === index ? 1 : 0,
                    }}
                  ></div>
                </div>
                {feature.image && typeof feature.image === 'object' && (
                  <Media
                    fill
                    imgClassName="mt-4 rounded-lg object-cover"
                    priority
                    resource={feature.image}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No features available</p>
          )}
        </div>
      </div>
    </section>
  )
}
