import type { Block } from 'payload'

export const StepsGuideDetailedBlock: Block = {
  slug: 'stepsGuideDetailed',
  interfaceName: 'StepsGuideDetailedBlock',
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
      name: 'TextColumn1',
      type: 'text',
    },
    {
      name: 'TextColumn2',
      type: 'text',
    },
    {
      name: 'styledWords',
      type: 'array',
      fields: [
        {
          name: 'word',
          type: 'text',
        },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'stepTitle',
          type: 'text',
        },
        {
          name: 'stepDescription',
          type: 'richText',
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
    },
    {
      name: 'ctaLink',
      type: 'text',
    },
  ],
}
