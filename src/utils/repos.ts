import * as cheerio from 'cheerio'

type CheerioRoot = ReturnType<typeof cheerio.load>
type CheerioElement = Parameters<CheerioRoot>[0]

interface Result {
  owner: string
  name: string | undefined
  link: string
  description: string | undefined
  image: string
  website: string | never[] | undefined
  language: string | undefined
  languageColor: string | undefined
  stars: string | number
  forks: string | number
}

const cache = new Map<string, Result[]>()

const aimer = async (url: string) => {
  const html = await fetch(url).then(res => res.text())
  return cheerio.load(html)
}

export async function getPinnedRepos(username: string) {
  if (cache.has(username)) return cache.get(username)

  const $ = await aimer(`https://github.com/${username}`)
  const pinned = $('.pinned-item-list-item').toArray()

  if (!pinned || pinned.length === 0) return []

  const result: Result[] = []
  // TODO: A part from the language from the user profile fetch the repo page in order to extract the topics too.
  for (const [index, item] of pinned.entries()) {
    const owner = getOwner($, item)
    const repo = getRepo($, item)
    const link = `https://github.com/${owner || username}/${repo}`
    const description = getDescription($, item)
    const image = `https://opengraph.githubassets.com/1/${owner || username}/${repo}`
    const website = await getWebsite(link)
    const language = getLanguage($, item)
    // TODO: compute text color from background to have proper contrast
    const languageColor = getLanguageColor($, item)
    const stars = getStars($, item)
    const forks = getForks($, item)

    result[index] = {
      owner: owner || username,
      name: repo,
      link,
      description: description || undefined,
      image: image,
      website: website || undefined,
      language: language || undefined,
      languageColor: languageColor || undefined,
      stars: stars || 0,
      forks: forks || 0,
    }
  }
  cache.set(username, result)

  return result
}

function getOwner($: CheerioRoot, item: CheerioElement) {
  try {
    return $(item).find('.owner').text()
  } catch {
    return undefined
  }
}

function getRepo($: CheerioRoot, item: CheerioElement) {
  try {
    return $(item).find('.repo').text()
  } catch {
    return undefined
  }
}

function getDescription($: CheerioRoot, item: CheerioElement) {
  try {
    return $(item).find('.pinned-item-desc').text().trim()
  } catch {
    return undefined
  }
}

function getWebsite(repo: string) {
  return aimer(repo)
    .then($ => {
      try {
        const site = $('.BorderGrid-cell')
        if (!site || site.length === 0) return []

        let href: string | undefined
        site.each((index: unknown, item) => {
          if (index === 0) {
            href = getHREF($, item)
          }
        })
        return href
      } catch (error) {
        console.error(error)
        return undefined
      }
    })
    .catch(error => {
      console.error(error)
      return undefined
    })
}

function getHREF($: CheerioRoot, item: CheerioElement) {
  try {
    return $(item).find('a[href^="https"]').attr('href')?.trim()
  } catch {
    return undefined
  }
}

function getStars($: CheerioRoot, item: CheerioElement) {
  try {
    return $(item).find('a[href$="/stargazers"]').text().trim()
  } catch {
    return 0
  }
}

function getForks($: CheerioRoot, item: CheerioElement) {
  try {
    return $(item).find('a[href$="/network/members"]').text().trim()
  } catch {
    return 0
  }
}

function getLanguage($: CheerioRoot, item: CheerioElement) {
  try {
    return $(item).find('[itemprop="programmingLanguage"]').text()
  } catch {
    return undefined
  }
}

function getLanguageColor($: CheerioRoot, item: CheerioElement) {
  try {
    return $(item).find('.repo-language-color').css('background-color')
  } catch {
    return undefined
  }
}
