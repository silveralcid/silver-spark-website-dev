import type { Block } from 'payload'

export const PricingMilestoneBlock: Block = {
  slug: 'pricingMilestone',
  interfaceName: 'PricingMilestoneBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subheading',
      type: 'richText',
    },
    {
      name: 'packagePricing',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text',
        },
        {
          name: 'packageName',
          type: 'text',
        },
        {
          name: 'packagePrice',
          type: 'text',
        },
        {
          name: 'packageDescription',
          type: 'richText',
        },
        {
          name: 'inactiveButtonText',
          type: 'text',
        },
        {
          name: 'activeButtonText1',
          type: 'text',
        },
        {
          name: 'activeButtonLink1',
          type: 'text',
        },
        {
          name: 'activeButtonText2',
          type: 'text',
        },
        {
          name: 'activeButtonLink2',
          type: 'text',
        },
        {
          name: 'packageHighlight',
          type: 'checkbox',
        },
        {
          name: 'packageHighlightText',
          type: 'text',
        },
      ],
    },
    {
      name: 'milestoneSectionTitle',
      type: 'text',
    },
    {
      name: 'milestoneSectionDescription',
      type: 'richText',
    },
    {
      name: 'milestones',
      type: 'array',
      fields: [
        {
          name: 'milestoneTitle',
          type: 'text',
        },
        {
          name: 'milestoneDescription',
          type: 'richText',
        },
        {
          name: 'milestonePrice',
          type: 'text',
        },
        {
          name: 'milestonePercentage',
          type: 'text',
        },
      ],
    },
  ],
}
