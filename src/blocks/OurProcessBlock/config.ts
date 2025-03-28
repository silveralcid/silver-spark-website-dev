import type { Block } from 'payload'

export const OurProcessBlock: Block = {
  slug: 'ourProcess',
  interfaceName: 'OurProcessBlock',
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
      name: 'stepType',
      type: 'text',
    },
    {
      name: 'processSteps',
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
        {
          name: 'processItems',
          type: 'array',
          fields: [
            {
              name: 'processItem',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
