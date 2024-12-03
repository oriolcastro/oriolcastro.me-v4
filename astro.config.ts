import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import fs from 'fs'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeUnwrapImages from 'rehype-unwrap-images'

import { expressiveCodeOptions } from './src/site.config'
import { remarkReadingTime } from './src/utils/remark-reading-time'

// https://astro.build/config
export default defineConfig({
  site: 'https://oriolcastro.me',
  prefetch: true,
  markdown: {
    remarkPlugins: [remarkReadingTime],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [''],
      },
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      ],
      rehypeUnwrapImages,
    ],
  },
  integrations: [
    expressiveCode(expressiveCodeOptions),
    icon(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx({}),
  ],
  vite: {
    plugins: [rawFonts(['.ttf', '.woff'])],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
})
function rawFonts(ext: string[]) {
  return {
    name: 'vite-plugin-raw-fonts',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(_: any, id: any) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = fs.readFileSync(id)
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        }
      }
    },
  }
}
