import { createEffect, createSignal, For, onCleanup, Show } from 'solid-js'

// Pagefind types
type PagefindResult = {
  id: string
  data: () => Promise<PagefindDocument>
}

type PagefindDocument = {
  url: string
  excerpt: string
  meta: {
    title: string
    image?: string
  }
  sub_results: Array<{
    title: string
    url: string
    excerpt: string
  }>
}

type PagefindSearchResults = {
  results: PagefindResult[]
}

type Pagefind = {
  search: (query: string) => Promise<PagefindSearchResults>
}

export default function SiteSearch() {
  let dialogRef: HTMLDialogElement | undefined
  let dialogFrameRef: HTMLDivElement | undefined
  let openBtnRef: HTMLButtonElement | undefined
  let searchInputRef: HTMLInputElement | undefined
  let pagefind: Pagefind | null = null

  const [searchQuery, setSearchQuery] = createSignal('')
  const [searchResults, setSearchResults] = createSignal<PagefindDocument[]>([])
  const [isSearching, setIsSearching] = createSignal(false)
  const [isPagefindReady, setIsPagefindReady] = createSignal(false)
  const [pagefindLoadError, setPagefindLoadError] = createSignal<string | null>(null)

  createEffect(() => {
    // Wait for refs to be assigned
    if (!dialogRef || !dialogFrameRef || !openBtnRef) return

    const onWindowClick = (event: MouseEvent) => {
      const target = event.target as Node
      // Check if the clicked element or any of its parents is a link
      const isLink = (event.target as HTMLElement)?.closest('a') !== null
      // make sure the click is either a link or outside of the dialog
      if (isLink || (document.body.contains(target) && !dialogFrameRef?.contains(target))) {
        closeModal()
      }
    }

    const openModal = (event?: MouseEvent) => {
      dialogRef?.showModal()
      searchInputRef?.focus()
      event?.stopPropagation()
      window.addEventListener('click', onWindowClick)
    }

    const closeModal = () => {
      if (dialogRef?.open) {
        dialogRef.close()
        window.removeEventListener('click', onWindowClick)
      }
    }

    openBtnRef.addEventListener('click', openModal)
    openBtnRef.disabled = false

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === '/' && !dialogRef?.open) {
        openModal()
        e.preventDefault()
      } else if (e.key === 'Escape' && dialogRef?.open) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    // Load Pagefind on idle.
    // - In production, this is generated into `dist/pagefind` by the `postbuild` script.
    // - In development, you can generate it into `public/pagefind` via `pnpm build:pagefind`,
    //   and `astro dev` will serve it from `/pagefind/...`.
    const onIdle = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1))
    onIdle(async () => {
      try {
        setPagefindLoadError(null)
        // Dynamic import to avoid Vite trying to resolve this at build time
        const pagefindModule = await import(
          /* @vite-ignore */ `${import.meta.env.BASE_URL}pagefind/pagefind.js`
        )
        pagefind = pagefindModule.default || pagefindModule
        setIsPagefindReady(true)
      } catch (error) {
        setIsPagefindReady(false)
        setPagefindLoadError(
          import.meta.env.DEV
            ? 'Search index not found. Run `pnpm build:pagefind` to generate Pagefind files into `public/pagefind/`.'
            : 'Failed to load search index.',
        )
        console.error('Failed to load Pagefind:', error)
      }
    })

    // Close modal and clear input on view-transition
    const handleAfterSwap = () => {
      clearSearch()
      closeModal()
    }

    document.addEventListener('astro:after-swap', handleAfterSwap)

    onCleanup(() => {
      openBtnRef?.removeEventListener('click', openModal)
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('click', onWindowClick)
      document.removeEventListener('astro:after-swap', handleAfterSwap)
    })
  })

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    if (searchInputRef) {
      searchInputRef.value = ''
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (!query || query.trim().length === 0) {
      setSearchResults([])
      return
    }

    if (!pagefind) {
      console.warn('Pagefind not loaded yet')
      return
    }

    setIsSearching(true)
    try {
      const search = await pagefind.search(query)
      const results = await Promise.all(search.results.map(r => r.data()))
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    handleSearch(target.value)
  }

  const handleCloseClick = () => {
    if (dialogRef?.open) {
      dialogRef.close()
    }
  }

  return (
    <div id="search" class="ms-auto">
      <button
        ref={el => {
          openBtnRef = el
        }}
        data-open-modal
        disabled
        class="hover:text-accent flex h-9 w-9 items-center justify-center rounded-md"
        aria-label="Search"
      >
        <svg
          aria-hidden="true"
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21l-6-6" />
        </svg>
      </button>
      <dialog
        ref={el => {
          dialogRef = el
        }}
        aria-label="search"
        class="bg-bgColor h-full max-h-full w-full max-w-full border border-zinc-400 shadow backdrop:backdrop-blur sm:mx-auto sm:mt-16 sm:mb-auto sm:h-max sm:max-h-[calc(100%-8rem)] sm:min-h-[15rem] sm:w-5/6 sm:max-w-[48rem] sm:rounded-md"
      >
        <div
          ref={el => {
            dialogFrameRef = el
          }}
          class="dialog-frame flex flex-col gap-4 p-6 pt-12 sm:pt-6"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="relative flex-1">
              <input
                ref={el => {
                  searchInputRef = el
                }}
                type="text"
                placeholder="Search..."
                class="bg-bgColor border-accent/20 text-textColor placeholder:text-textColor/50 focus:border-accent w-full rounded-md border px-4 py-2 pr-10 focus:outline-none"
                onInput={handleInput}
                aria-label="Search input"
              />
              <Show when={searchQuery()}>
                <button
                  onClick={clearSearch}
                  class="hover:text-accent absolute top-1/2 right-3 -translate-y-1/2 p-1"
                  aria-label="Clear search"
                >
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Show>
            </div>
            <button
              data-close-modal
              class="cursor-pointer rounded-md bg-zinc-200 px-4 py-2 font-semibold dark:bg-zinc-700"
              onClick={handleCloseClick}
            >
              Close
            </button>
          </div>

          <div class="search-results max-h-[60vh] overflow-y-auto">
            <Show when={!isPagefindReady() && pagefindLoadError()}>
              <div class="text-textColor/60 rounded-md border border-zinc-300 bg-zinc-100 p-4 text-sm dark:border-zinc-700 dark:bg-zinc-800/40">
                {pagefindLoadError()}
              </div>
            </Show>

            <Show when={isSearching()}>
              <div class="text-textColor/60 py-8 text-center">Searching...</div>
            </Show>

            <Show when={!isSearching() && searchQuery() && searchResults().length === 0}>
              <div class="text-textColor/60 py-8 text-center">
                No results found for "{searchQuery()}"
              </div>
            </Show>

            <Show when={!isSearching() && searchResults().length > 0}>
              <div class="space-y-4">
                <div class="text-textColor/60 mb-4 text-sm">
                  {searchResults().length} result{searchResults().length !== 1 ? 's' : ''}
                </div>
                <For each={searchResults()}>
                  {result => (
                    <article class="search-result">
                      <a href={result.url} class="group block py-3 no-underline">
                        <h3 class="text-textColor group-hover:decoration-link mb-2 text-lg font-semibold no-underline group-hover:underline group-hover:decoration-2 group-hover:underline-offset-2">
                          {result.meta.title}
                        </h3>
                        <p
                          class="text-textColor/80 text-sm leading-relaxed no-underline"
                          innerHTML={result.excerpt}
                        />
                      </a>
                      <Show when={result.sub_results && result.sub_results.length > 0}>
                        <div class="mt-3 ml-3 space-y-2 border-l-2 border-zinc-300 pl-4 dark:border-zinc-700">
                          <For each={result.sub_results}>
                            {subResult => (
                              <a
                                href={subResult.url}
                                class="text-textColor/70 group/sub block rounded-md px-3 py-2 text-sm no-underline transition-colors hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                              >
                                <div class="flex items-start justify-between gap-3">
                                  <div class="flex items-start gap-2">
                                    <svg
                                      aria-hidden="true"
                                      class="text-textColor/40 group-hover/sub:text-link mt-[0.2rem] h-4 w-4 shrink-0"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="1.5"
                                    >
                                      <path d="M6 6v5a3 3 0 0 0 3 3h10" />
                                      <path d="M17 12l2 2-2 2" />
                                    </svg>
                                    <div class="group-hover/sub:decoration-link inline-block leading-snug font-medium no-underline group-hover/sub:underline group-hover/sub:decoration-2 group-hover/sub:underline-offset-2">
                                      {subResult.title}
                                    </div>
                                  </div>
                                  <span class="text-textColor/60 dark:text-textColor/60 rounded bg-zinc-200 px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase no-underline dark:bg-zinc-800/60">
                                    Section
                                  </span>
                                </div>
                                <div
                                  class="text-textColor/60 mt-1 text-xs leading-relaxed no-underline"
                                  innerHTML={subResult.excerpt}
                                />
                              </a>
                            )}
                          </For>
                        </div>
                      </Show>
                    </article>
                  )}
                </For>
              </div>
            </Show>

            <Show when={!searchQuery()}>
              <div class="text-textColor/60 py-8 text-center text-sm">
                Start typing to search...
              </div>
            </Show>
          </div>
        </div>
      </dialog>
    </div>
  )
}
