import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import '@/app/(frontend)/globals.css'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FaqBlock } from '@/blocks/FaqBlock/Component'
import { FeatureSpreadBlock } from '@/blocks/FeatureSpreadBlock/Component'
import { AboutUsBlock } from '@/blocks/AboutUsBlock/Component'
import { OurServicesBlock } from '@/blocks/OurServicesBlock/Component'
import { TestimonialSliderBlock } from '@/blocks/TestimonialSliderBlock/Component'
import { OurTechBlock } from '@/blocks/OurTechBlock/Component'
import { OurProcessBlock } from '@/blocks/OurProcessBlock/Component'
import { PricingMilestoneBlock } from './PricingMilestoneBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  faq: FaqBlock,
  featureSpread: FeatureSpreadBlock,
  aboutUs: AboutUsBlock,
  ourServices: OurServicesBlock,
  testimonialSlider: TestimonialSliderBlock,
  ourTech: OurTechBlock,
  ourProcess: OurProcessBlock,
  pricingMilestone: PricingMilestoneBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
