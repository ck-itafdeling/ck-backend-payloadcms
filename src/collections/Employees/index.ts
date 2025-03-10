import type { CollectionConfig } from 'payload/types'

import { slugField } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { formatAppURL, revalidatePage } from '../../hooks/revalidatePage'
import { admins } from '../../access/admins'
import adminsAndUser from '../Users/access/adminsAndUser'
import { hero } from '../../fields/hero'

export const Employees: CollectionConfig = {
  slug: 'employees',
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'orderId',
      type: 'number',
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          name: 'general',
          label: 'General',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'jobPosition',
              type: 'text',
              required: true,
            },
            {
              name: 'quote',
              type: 'text',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'orangeHeadline',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'whiteHeadline',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'work',
          label: 'Work',
          fields: [
            {
              name: 'bannerImg',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'contentImg',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            hero,
          ],
        },
        {
          name: 'hobby',
          label: 'Hobby',
          fields: [
            {
              name: 'bannerImg',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'contentImg',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            hero,
          ],
        },
      ],
    },
  ],
}
