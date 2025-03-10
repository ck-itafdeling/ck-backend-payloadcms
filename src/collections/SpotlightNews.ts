import type { CollectionConfig } from 'payload/types'

import adminsAndUser from './Users/access/adminsAndUser'
import { admins } from '../access/admins'

const SpotlightNews: CollectionConfig = {
  slug: 'spotlight-news',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: adminsAndUser,
    create: adminsAndUser,
    update: adminsAndUser,
    delete: admins,
  },
  labels: {
    singular: {
      da: 'Fremhævet nyhed',
      en: 'Featured News',
    },
    plural: {
      da: 'Fremhævede nyheder',
      en: 'Featured News',
    },
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'Website URL',
      localized: true,
      required: true,
    },
  ],
}

export default SpotlightNews
