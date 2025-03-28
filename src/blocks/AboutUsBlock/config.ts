import type { Block } from 'payload'

export const AboutUsBlock: Block = {
  slug: 'aboutUs',
  interfaceName: 'AboutUsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'ctaButtonText',
      type: 'text',
    },
    {
      name: 'ctaButtonLink',
      type: 'text',
    },
    {
      name: 'solutionHighlights',
      type: 'array',
      fields: [
        {
          name: 'solutionHighlight',
          type: 'text',
        },
      ],
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
  ],
}
