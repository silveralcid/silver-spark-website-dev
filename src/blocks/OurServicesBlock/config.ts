import type { Block } from 'payload'

export const OurServicesBlock: Block = {
  slug: 'ourServices',
  interfaceName: 'OurServicesBlock',
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
      name: 'serviceCards',
      type: 'array',
      fields: [
        {
          name: 'serviceTitle',
          type: 'text',
        },
        {
          name: 'serviceDescription',
          type: 'richText',
        },
        {
          name: 'serviceIcon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'servicePointName',
          type: 'text',
        },
        {
          name: 'servicePoints',
          type: 'array',
          fields: [
            {
              name: 'servicePoint',
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
