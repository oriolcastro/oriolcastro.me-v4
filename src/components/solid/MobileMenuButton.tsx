import { createSignal, onCleanup, onMount } from 'solid-js'

export default function MobileMenuButton() {
  const [isOpen, setIsOpen] = createSignal(false)

  onMount(() => {
    const headerEl = document.getElementById('main-header')
    if (!headerEl) return

    const toggleMobileMenu = () => {
      headerEl.classList.toggle('menu-open')
      setIsOpen(!isOpen())
    }

    const handleAfterSwap = () => {
      if (isOpen()) {
        toggleMobileMenu()
      }
    }

    document.addEventListener('astro:after-swap', handleAfterSwap)

    onCleanup(() => {
      document.removeEventListener('astro:after-swap', handleAfterSwap)
    })
  })

  const handleClick = () => {
    const headerEl = document.getElementById('main-header')
    if (!headerEl) return

    headerEl.classList.toggle('menu-open')
    setIsOpen(!isOpen())
  }

  return (
    <button
      id="toggle-navigation-menu"
      class="group relative ms-4 h-7 w-7 sm:invisible sm:hidden"
      type="button"
      aria-label="Open main menu"
      aria-expanded={isOpen() ? 'true' : 'false'}
      aria-haspopup="menu"
      onClick={handleClick}
    >
      <svg
        id="line-svg"
        class="absolute start-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all group-aria-expanded:scale-0 group-aria-expanded:opacity-0"
        aria-hidden="true"
        tabIndex={-1}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
      </svg>
      <svg
        id="cross-svg"
        class="text-accent absolute start-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-all group-aria-expanded:scale-100 group-aria-expanded:opacity-100"
        aria-hidden="true"
        tabIndex={-1}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}
