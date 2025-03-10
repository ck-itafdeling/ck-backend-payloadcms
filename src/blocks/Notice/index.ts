import type { Block } from 'payload/types'

export const notice: Block = {
  slug: 'notice',
  labels: {
    singular: 'Notice',
    plural: 'Notices',
  },
  fields: [
    {
      name: 'date',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'definiteTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
