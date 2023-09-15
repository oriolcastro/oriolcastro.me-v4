import mdx from '@astrojs/mdx'
import prefetch from '@astrojs/prefetch'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import fs from 'fs'
import rehypeExternalLinks from 'rehype-external-links'
import remarkUnwrapImages from 'remark-unwrap-images'

// @ts-expect-error: the plugin is written in JS
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  // ! Please remember to replace the following site property with your own domain
  site: 'https://oriolcastro-me.pages.dev/',
  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [''],
      },
    },
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      ],
    ],
  },
  integrations: [
    mdx({}),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    prefetch(),
  ],
  vite: {
    plugins: [rawFonts(['.ttf'])],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
})
function rawFonts(ext: Array<string>) {
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
