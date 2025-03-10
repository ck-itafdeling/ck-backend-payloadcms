import type { GlobalConfig } from 'payload/types'
import adminsAndUser from '../collections/Users/access/adminsAndUser'

const GlobalInfo: GlobalConfig = {
  slug: 'information',
  access: {
    read: adminsAndUser,
  },
  fields: [
    {
      name: 'globalInfo',
      type: 'array',
      label: 'Information',
      minRows: 4,
      maxRows: 10,
      labels: {
        singular: 'Info',
        plural: 'Info',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'number',
          required: true,
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

export default GlobalInfo
