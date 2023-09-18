import { defineCollection, z } from 'astro:content'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map(str => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

const post = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().min(50).max(160),
      publishDate: z
        .string()
        .or(z.date())
        .transform(val => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform(str => (str ? new Date(str) : undefined)),
      coverImage: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      ogImage: z.string().optional(),
    }),
})

const timeline = defineCollection({
  type: 'content',
  schema: () => z.object({ year: z.number() }),
})

const status = defineCollection({
  type: 'data',
  schema: z.object({
    company: z
      .object({
        name: z.string(),
        title: z.string(),
        url: z.string().url(),
      })
      .nullable(),
    interest: z.string(),
  }),
})

export const collections = { post, timeline, status: status }
