import type { MarkdownHeading } from 'astro'

export interface TocItem extends MarkdownHeading {
  children: TocItem[]
}

interface TocOpts {
  maxHeadingLevel?: number | undefined
  minHeadingLevel?: number | undefined
}

function injectChild(items: TocItem[], item: TocItem): void {
  const lastItem = items.at(-1)
  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item)
  } else {
    // e.g., 2
    injectChild(lastItem.children, item)
    return
  }
}

export function generateToc(
  headings: readonly MarkdownHeading[],
  { maxHeadingLevel = 4, minHeadingLevel = 2 }: TocOpts = {},
) {
  // by default this ignores/filters out h1 and h5 heading(s)
  const bodyHeadings = headings.filter(
    ({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel,
  )
  const toc: TocItem[] = []

  for (const heading of bodyHeadings) injectChild(toc, { ...heading, children: [] })
  return toc
}
