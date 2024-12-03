// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

export function remarkReadingTime() {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (tree: unknown, { data }: any) => {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)
    data.astro.frontmatter.minutesRead = readingTime.text
  }
}
