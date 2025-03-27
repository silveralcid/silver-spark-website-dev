'use client'

import React from 'react'
import { FeatureSpreadBlock as FeatureSpreadBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import '@/app/(frontend)/globals.css'

export const FeatureSpreadBlock: React.FC<FeatureSpreadBlockProps> = ({
  heading,
  subheading,
  features,
}) => {
  return (
    <div className="py-16 secondary-background">
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-2 " style={{ color: 'var(--text-secondary)' }}>
            {heading}
          </h2>
          {subheading && (
            <RichText
              className="body-large opacity-80 max-w-3xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
              data={subheading}
              enableGutter={false}
            />
          )}
        </div>
        <div className="max-w-3xl mx-auto">
          {features && features.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 rounded-lg border border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-sm hover:bg-gray-50/50 hover:translate-y-[-2px] group"
                >
                  <div className="flex items-start mb-2 md:mb-3">
                    <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent text-2xl md:text-3xl font-bold mr-2 group-hover:scale-105 transition-transform duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="heading-4 text-lg md:text-xl lg:text-2xl font-bold"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  {feature.description && (
                    <RichText
                      data={feature.description}
                      enableGutter={false}
                      style={{ color: 'var(--text-primary)' }}
                    />
                  )}
                  {feature.image && typeof feature.image === 'object' && (
                    <Media
                      fill
                      imgClassName="-z-10 object-cover"
                      priority
                      resource={feature.image}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No features available</p>
          )}
        </div>
      </div>
    </div>
  )
}
