import type { CollectionConfig } from 'payload/types'
import adminsAndUser from './Users/access/adminsAndUser'
import { admins } from '../access/admins'

const Newsletter: CollectionConfig = {
  slug: 'newsletter',
  admin: {
    useAsTitle: 'title',
    group: 'Forms',
  },
  access: {
    read: adminsAndUser,
    create: adminsAndUser,
    update: adminsAndUser,
    delete: admins,
  },
  labels: {
    singular: {
      en: 'Newsletter',
    },
    plural: {
      en: 'Newsletter',
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      unique: true,
      required: true,
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export default Newsletter
