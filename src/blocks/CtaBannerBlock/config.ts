import type { Block } from 'payload'

export const CtaBannerBlock: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CtaBannerBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subheading',
      type: 'richText',
    },
    { name: 'contentText', type: 'richText' },
    {
      name: 'ctaButtonText',
      type: 'text',
    },
    {
      name: 'ctaButtonLink',
      type: 'text',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'calloutText1', type: 'text' },
    { name: 'calloutText2', type: 'text' },
  ],
}
