import { defineCollection, z } from 'astro:content'
import { file, glob } from 'astro/loaders'

function removeDupsAndLowerCase(array: string[]) {
  return [...new Set(array.map(str => str.toLowerCase()))]
}

const baseSchema = z.object({
  title: z.string().max(90),
})

const post = defineCollection({
  loader: glob({ base: './src/content/post', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    baseSchema.extend({
      description: z.string(),
      coverImage: z
        .object({
          alt: z.string(),
          src: image(),
        })
        .optional(),
      draft: z.boolean().default(false),
      pinned: z.boolean().default(false).optional(),
      ogImage: z.string().optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      publishDate: z.string().transform(val => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform(str => (str ? new Date(str) : undefined)),
    }),
})

const note = defineCollection({
  loader: glob({ base: './src/content/note', pattern: '**/*.{md,mdx}' }),
  schema: baseSchema.extend({
    description: z.string().optional(),
    publishDate: z.string().transform(val => new Date(val)),
  }),
})

const work = defineCollection({
  loader: file('./src/content/work.json', { parser: text => JSON.parse(text) }),
  schema: z.object({
    id: z.string(),
    company: z.object({
      title: z.string(),
      name: z.string(),
      url: z.string().url(),
    }),
    interest: z.string(),
  }),
})

const timeline = defineCollection({
  loader: glob({ base: './src/content/timeline', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    year: z.number(),
  }),
})

export const collections = { post, note, work, timeline }
