import { getCollection } from "astro:content";

export async function getAllTimelineYears() {
	const items = await getCollection("timeline");

	return await Promise.all(
		items
			.sort((a, b) => (a.data.year > b.data.year ? -1 : 1))
			.map(async (item) => {
				const { Content } = await item.render();

				return {
					...item,
					Content,
				};
			}),
	);
}
