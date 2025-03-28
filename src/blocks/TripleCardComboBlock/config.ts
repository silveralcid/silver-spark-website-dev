import type { Block } from 'payload'

export const TripleCardComboBlock: Block = {
  slug: 'tripleCardCombo',
  interfaceName: 'TripleCardComboBlock',
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
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'sectionTitle',
          type: 'text',
        },
        {
          name: 'keyPoints',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
            },
          ],
        },
        {
          name: 'bannerTitle',
          type: 'text',
        },
        {
          name: 'bannerDescription',
          type: 'richText',
        },
        {
          name: 'specialText',
          type: 'text',
        },
      ],
    },
  ],
}
