import type { Block } from 'payload'

export const CaseStudiesBlock: Block = {
  slug: 'caseStudiesBlock',
  interfaceName: 'CaseStudiesBlock',
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
      name: 'ctaButtonText',
      type: 'text',
    },
    {
      name: 'ctaButtonLink',
      type: 'text',
    },
    {
      name: 'viewButtonText',
      type: 'text',
    },
    {
      name: 'caseCards',
      type: 'array',
      fields: [
        {
          name: 'companyName',
          type: 'text',
        },
        {
          name: 'companyIndustry',
          type: 'text',
        },
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'viewButtonLink',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'resultNumber1',
          type: 'text',
        },
        {
          name: 'resultInfo1',
          type: 'text',
        },
        {
          name: 'resultNumber2',
          type: 'text',
        },
        {
          name: 'resultInfo2',
          type: 'text',
        },
        {
          name: 'itemListATitle',
          type: 'text',
        },
        {
          name: 'itemListA',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'itemListBTitle',
          type: 'text',
        },
        {
          name: 'itemListB',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
