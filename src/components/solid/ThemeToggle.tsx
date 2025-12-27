import { createSignal, onCleanup, onMount } from 'solid-js'

type Theme = 'light' | 'dark'

function getCurrentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export default function ThemeToggle() {
  const [checked, setChecked] = createSignal(false)

  onMount(() => {
    const syncFromDom = () => setChecked(getCurrentTheme() === 'dark')
    syncFromDom()

    const root = document.documentElement
    const observer = new MutationObserver(syncFromDom)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })

    onCleanup(() => observer.disconnect())
  })

  const onToggle = () => {
    const nextTheme: Theme = getCurrentTheme() === 'dark' ? 'light' : 'dark'

    setChecked(nextTheme === 'dark')

    document.dispatchEvent(
      new CustomEvent('theme-change', {
        detail: { theme: nextTheme },
      }),
    )
  }

  return (
    <button
      type="button"
      class="hover:text-accent relative h-9 w-9 rounded-md p-2"
      role="switch"
      aria-checked={checked() ? 'true' : 'false'}
      onClick={onToggle}
    >
      <span class="sr-only">Dark Theme</span>
      <svg
        id="sun-svg"
        class="absolute start-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
        aria-hidden="true"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 12L23 12"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path d="M12 2V1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 23V22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M20 20L19 19"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path d="M20 4L19 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4 20L5 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4 4L5 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1 12L2 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg
        id="moon-svg"
        class="absolute start-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
        aria-hidden="true"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
        <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
        <path d="M19 11h2m-1 -1v2" />
      </svg>
    </button>
  )
}
