import type { CollectionConfig } from 'payload/types'

import { slugField } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { formatAppURL, revalidatePage } from '../../hooks/revalidatePage'
import { admins } from '../../access/admins'
import adminsAndUser from '../Users/access/adminsAndUser'
import { hero } from '../../fields/hero'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
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
      name: 'featured',
      type: 'checkbox',
      label: {
        da: 'Fremhævet kundeudtalelse',
        en: 'Featured testimonial',
      },
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
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
              required: true,
            },
          ],
        },
        {
          name: 'author',
          label: 'Author',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name',
              required: true,
            },
            {
              name: 'jobPosition',
              type: 'text',
              label: 'Job Position',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'company',
          label: 'Company',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name',
              required: true,
            },
            {
              name: 'websiteUrl',
              type: 'text',
              label: 'Website URL',
              required: true,
            },
            {
              name: 'logo',
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
