import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'

export async function getAllTimeline() {
  return await getCollection('timeline')
}

export function sortTimelineDescByYear(items: CollectionEntry<'timeline'>[]) {
  return items.sort((a, b) => (a.data.year > b.data.year ? -1 : 1))
}

export function sortTimelineAscByYear(items: CollectionEntry<'timeline'>[]) {
  return items.sort((a, b) => (a.data.year > b.data.year ? 1 : -1))
}
