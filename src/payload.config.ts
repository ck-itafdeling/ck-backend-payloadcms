import { payloadCloud } from '@payloadcms/plugin-cloud'
// import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import path from 'path'
import { buildConfig } from 'payload/config'

import Categories from './collections/Categories'
import SpotlightNews from './collections/SpotlightNews'
import Newsletter from './collections/Newsletter'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Testimonials } from './collections/Testimonials'
import Users from './collections/Users'
import BeforeDashboard from './components/BeforeDashboard'
import GlobalInfo from './globals/GlobalInfo'
import { Partners } from './collections/Partners'
import HumanResources from './collections/HumanResources'
import { Employees } from './collections/Employees'

const generateTitle: GenerateTitle = () => {
  return 'Troede du virkelig det var så nemt?'
}

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      // The BeforeDashboard component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import BeforeDashboard statement on line 15.
      beforeDashboard: [BeforeDashboard],
    },
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          express: mockModulePath,
        },
      },
    }),
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  collections: [
    Users,
    HumanResources,
    Categories,
    Pages,
    Posts,
    Partners,
    Testimonials,
    Employees,
    SpotlightNews,
    Media,
    Newsletter,
  ],
  globals: [GlobalInfo],
  localization: {
    locales: ['da', 'en'],
    defaultLocale: 'da',
    fallback: true,
  },
  // upload: {
  //   limits: {
  //     fileSize: 256_000, // 250kb, written in bytes
  //   },
  // },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  ...(process.env.PAYLOAD_PUBLIC_SITE_URL
    ? {
        cors: [process.env.PAYLOAD_PUBLIC_SITE_URL].filter(Boolean),
        csrf: [process.env.PAYLOAD_PUBLIC_SITE_URL].filter(Boolean),
      }
    : {}),
  plugins: [
    // nestedDocs({
    //   collections: ['pages', 'posts'],
    // }),
    redirects({
      collections: ['pages', 'posts'],
    }),
    seo({
      collections: ['pages', 'posts', 'testimonials', 'partners', 'employees'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    payloadCloud(),
  ],
})
