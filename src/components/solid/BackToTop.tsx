import { createSignal, onCleanup, onMount } from 'solid-js'

export default function BackToTop() {
  const [show, setShow] = createSignal(false)

  onMount(() => {
    const targetHeader = document.getElementById('blog-hero')
    if (!targetHeader) return

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Show the scroll to top button when the heading is out of view
        setShow(!entry.isIntersecting)
      })
    })

    observer.observe(targetHeader)

    onCleanup(() => {
      observer.disconnect()
    })
  })

  const scrollToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      class="hover:border-link fixed end-4 bottom-8 z-90 flex h-10 w-10 translate-y-28 items-center justify-center rounded-full border-2 border-transparent bg-zinc-200 text-3xl opacity-0 transition-all duration-300 data-[show=true]:translate-y-0 data-[show=true]:opacity-100 sm:end-8 sm:h-12 sm:w-12 dark:bg-zinc-700"
      aria-label="Back to Top"
      data-show={show()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="h-6 w-6"
        tabIndex={-1}
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  )
}
