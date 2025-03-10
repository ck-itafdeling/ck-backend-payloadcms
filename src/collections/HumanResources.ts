import type { CollectionConfig } from 'payload/types'

import adminsAndUser from './Users/access/adminsAndUser'
import { admins } from '../access/admins'

const HumanResources: CollectionConfig = {
  slug: 'human-resources',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: adminsAndUser,
    create: adminsAndUser,
    update: adminsAndUser,
    delete: admins,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'jobPosition',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'socialMedia',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default HumanResources
