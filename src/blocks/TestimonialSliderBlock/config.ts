import type { Block } from 'payload'

export const TestimonialSliderBlock: Block = {
  slug: 'testimonialSlider',
  interfaceName: 'TestimonialSliderBlock',
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
      name: 'testimonialCards',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
        {
          name: 'companyName',
          type: 'text',
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'testimonialText',
          type: 'text',
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
