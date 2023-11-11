import * as cheerio from 'cheerio'

type Result = {
  owner: string
  name: string | undefined
  link: string
  description: string | undefined
  image: string
  website: never[] | undefined
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
  for (const [index, item] of pinned.entries()) {
    const owner = getOwner($, item)
    const repo = getRepo($, item)
    const link = 'https://github.com/' + (owner || username) + '/' + repo
    const description = getDescription($, item)
    const image = `https://opengraph.githubassets.com/1/${owner || username}/${repo}`
    const website = await getWebsite(link)
    const language = getLanguage($, item)
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

function getOwner($: cheerio.Root, item: cheerio.Element) {
  try {
    return $(item).find('.owner').text()
  } catch (error) {
    return undefined
  }
}

function getRepo($: cheerio.Root, item: cheerio.Element) {
  try {
    return $(item).find('.repo').text()
  } catch (error) {
    return undefined
  }
}

function getDescription($: cheerio.Root, item: cheerio.Element) {
  try {
    return $(item).find('.pinned-item-desc').text().trim()
  } catch (error) {
    return undefined
  }
}

function getWebsite(repo: string) {
  return aimer(repo)
    .then($ => {
      try {
        const site = $('.BorderGrid-cell')
        if (!site || site.length === 0) return []

        let href
        site.each((index: unknown, item) => {
          if (index == 0) {
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

function getHREF($: cheerio.Root, item: cheerio.Element) {
  try {
    return $(item).find('a[href^="https"]').attr('href')?.trim()
  } catch (error) {
    return undefined
  }
}

function getStars($: cheerio.Root, item: cheerio.Element) {
  try {
    return $(item).find('a[href$="/stargazers"]').text().trim()
  } catch (error) {
    return 0
  }
}

function getForks($: cheerio.Root, item: cheerio.Element) {
  try {
    return $(item).find('a[href$="/network/members"]').text().trim()
  } catch (error) {
    return 0
  }
}

function getLanguage($: cheerio.Root, item: cheerio.Element) {
  try {
    return $(item).find('[itemprop="programmingLanguage"]').text()
  } catch (error) {
    return undefined
  }
}

function getLanguageColor($: cheerio.Root, item: cheerio.Element) {
  try {
    return $(item).find('.repo-language-color').css('background-color')
  } catch (error) {
    return undefined
  }
}
