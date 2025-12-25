import fs from 'node:fs'

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import expressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import { expressiveCodeOptions } from './src/site.config'

// Rehype plugins
import rehypeExternalLinks from 'rehype-external-links'
import rehypeUnwrapImages from 'rehype-unwrap-images'
// Remark plugins
import remarkDirective from 'remark-directive'
import { remarkAdmonitions } from './src/plugins/remark-admonitions'
import { remarkGithubCard } from './src/plugins/remark-github-card'
import { remarkReadingTime } from './src/plugins/remark-reading-time'

// https://astro.build/config
export default defineConfig({
  site: 'https://oriolcastro.me',
  prefetch: true,
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkDirective, remarkGithubCard, remarkAdmonitions],
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
  integrations: [expressiveCode(expressiveCodeOptions), icon(), sitemap(), mdx({}), robotsTxt()],
  vite: {
    plugins: [tailwindcss(), rawFonts(['.ttf', '.woff'])],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
})
function rawFonts(ext: string[]) {
  return {
    name: 'vite-plugin-raw-fonts',
    // @ts-expect-error:next-line
    transform(_, id) {
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
