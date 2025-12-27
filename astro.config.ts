import fs from 'node:fs'

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import solid from '@astrojs/solid-js'
import expressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import { defineConfig, envField } from 'astro/config'
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
  trailingSlash: 'never',
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
  integrations: [
    expressiveCode(expressiveCodeOptions),
    icon(),
    sitemap(),
    mdx({}),
    robotsTxt(),
    solid(),
  ],
  env: {
    schema: {
      SITE_URL: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://oriolcastro.me',
      }),
    },
  },
  experimental: {
    // Enable Content Security Policy for enhanced security
    csp: {
      algorithm: 'SHA-256',
      directives: ["default-src 'self'", "img-src 'self' data: https:"],
    },
  },
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
