import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { hero } from '../../fields/hero'
import { list } from '../../blocks/List'
import { notice } from '../../blocks/Notice'
import { slugField } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { formatAppURL, revalidatePage } from '../../hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc =>
      `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/preview?url=${formatAppURL({ doc })}`,
  },
  hooks: {
    beforeChange: [populatePublishedDate],
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: admins,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            hero,
            {
              name: 'document',
              type: 'upload',
              relationTo: 'media',
              localized: true,
            },
          ],
        },
        {
          label: 'Components',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [list, notice],
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
