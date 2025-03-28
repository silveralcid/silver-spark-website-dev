import type { Block } from 'payload'

export const OurTechBlock: Block = {
  slug: 'ourTech',
  interfaceName: 'OurTechBlock',
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
      name: 'categoryType',
      type: 'text',
    },
    {
      name: 'categoryCards',
      type: 'array',
      fields: [
        {
          name: 'cardTitle',
          type: 'text',
        },
        {
          name: 'cardDescription',
          type: 'richText',
        },
        {
          name: 'chipSectionName',
          type: 'text',
        },
        {
          name: 'cardChips',
          type: 'array',
          fields: [
            {
              name: 'cardItem',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'ctaButtonText',
      type: 'text',
    },
    {
      name: 'ctaButtonLink',
      type: 'text',
    },
  ],
}
