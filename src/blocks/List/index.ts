import type { Block } from 'payload/types'

export const list: Block = {
  slug: 'list',
  labels: {
    singular: 'List',
    plural: 'Lists',
  },
  fields: [
    {
      name: 'listItems',
      type: 'array',
      label: 'List Items',
      labels: {
        singular: 'List item',
        plural: 'List items',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }) => {
            return data?.title
          },
        },
      },
    },
  ],
}
