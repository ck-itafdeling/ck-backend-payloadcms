import type { CollectionConfig } from 'payload/types'

import { slugField } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { formatAppURL, revalidatePage } from '../../hooks/revalidatePage'
import { admins } from '../../access/admins'
import adminsAndUser from '../Users/access/adminsAndUser'
import { hero } from '../../fields/hero'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc =>
      `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/preview?url=${formatAppURL({ doc })}`,
  },
  access: {
    read: adminsAndUser,
    create: adminsAndUser,
    update: adminsAndUser,
    delete: admins,
  },
  hooks: {
    beforeChange: [populatePublishedDate],
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Content',
          fields: [
            hero,
            {
              name: 'quote',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'partner',
          label: 'Partner',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name',
              required: true,
            },
            {
              name: 'initials',
              type: 'text',
              label: 'Initials',
              required: true,
            },
            {
              name: 'jobPosition',
              type: 'text',
              label: 'Job Position',
              localized: true,
              required: true,
            },
            {
              name: 'email',
              type: 'text',
              label: 'Email',
              required: true,
            },
            {
              name: 'directPhone',
              type: 'text',
              label: 'Direct Phone',
            },
            {
              name: 'mobilePhone',
              type: 'text',
              label: 'Mobile Phone',
            },
            {
              name: 'socialMedia',
              type: 'text',
              label: 'LinkedIn URL',
            },
            {
              name: 'partnerImg',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
