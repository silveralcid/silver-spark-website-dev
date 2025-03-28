import type { Block } from 'payload'

//double check the this, could be wrong

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
      name: 'ctaText',
      type: 'text',
    },
    {
      name: 'ctaLink',
      type: 'text',
    },
    {
      name: 'caseCards',
      type: 'array',
      fields: [
        {
          name: 'compName',
          type: 'text',
        },
        {
          name: 'compInd',
          type: 'text',
        },
        {
          name: 'compLogo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'viewText',
          type: 'text',
        },
        {
          name: 'viewLink',
          type: 'text',
        },
        {
          name: 'ovTitle',
          type: 'text',
        },
        {
          name: 'ovDesc',
          type: 'richText',
        },
        {
          name: 'sampImg',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ovResults',
          type: 'array',
          fields: [
            {
              name: 'ovResNum',
              type: 'text',
            },
            {
              name: 'ovResInfo',
              type: 'text',
            },
          ],
        },
        {
          name: 'ovSolText',
          type: 'text',
        },
        {
          name: 'ovSols',
          type: 'array',
          fields: [
            {
              name: 'ovSol',
              type: 'text',
            },
            {
              name: 'ovSolInfo',
              type: 'text',
            },
          ],
        },
        {
          name: 'ovPainText',
          type: 'text',
        },
        {
          name: 'ovPains',
          type: 'array',
          fields: [
            {
              name: 'ovPain',
              type: 'text',
            },
            {
              name: 'ovPainInfo',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'chalTitle',
      type: 'text',
    },
    {
      name: 'chalDesc',
      type: 'richText',
    },
    {
      name: 'chalCards',
      type: 'array',
      fields: [
        {
          name: 'chalCardTitle',
          type: 'text',
        },
        {
          name: 'chalCardPts',
          type: 'array',
          fields: [
            {
              name: 'chalCardPt',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'solTitle',
      type: 'text',
    },
    {
      name: 'solDesc',
      type: 'richText',
    },
    {
      name: 'solCards',
      type: 'array',
      fields: [
        {
          name: 'solCardTitle',
          type: 'text',
        },
        {
          name: 'solCardDesc',
          type: 'text',
        },
      ],
    },
    {
      name: 'resTitle',
      type: 'text',
    },
    {
      name: 'resDesc',
      type: 'richText',
    },
    {
      name: 'resCards',
      type: 'array',
      fields: [
        { name: 'resNum', type: 'text' },
        { name: 'resTitle', type: 'text' },
        {
          name: 'resDesc',
          type: 'richText',
        },
      ],
    },
    {
      name: 'resKeyPts',
      type: 'array',
      fields: [
        {
          name: 'resKeyPt',
          type: 'text',
        },
        {
          name: 'resKeyPtDesc',
          type: 'richText',
        },
      ],
    },
  ],
}
