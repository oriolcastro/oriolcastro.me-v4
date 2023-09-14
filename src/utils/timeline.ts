import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export async function getAllTimeline() {
	return await getCollection("timeline");
}

export function sortTimelineDescByYear(items: Array<CollectionEntry<"timeline">>) {
	return items.sort((a, b) => (a.data.year > b.data.year ? -1 : 1));
}

export function sortTimelineAscByYear(items: Array<CollectionEntry<"timeline">>) {
	return items.sort((a, b) => (a.data.year > b.data.year ? 1 : -1));
}
