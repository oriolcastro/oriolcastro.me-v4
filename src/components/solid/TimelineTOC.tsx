import { createSignal, onCleanup, onMount, For } from 'solid-js'

interface Props {
  years: number[]
}

export default function TimelineTOC(props: Props) {
  const [activeYear, setActiveYear] = createSignal<number | null>(null)

  onMount(() => {
    // Create IntersectionObserver to track which section is visible
    const observer = new IntersectionObserver(
      entries => {
        // Find the most visible section
        type VisibleSection = { year: number; ratio: number }
        let mostVisible: VisibleSection | null = null

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const year = Number(entry.target.id)
            if (!isNaN(year)) {
              const currentRatio = entry.intersectionRatio
              if (mostVisible === null || currentRatio > mostVisible.ratio) {
                mostVisible = { year, ratio: currentRatio }
              }
            }
          }
        }

        if (mostVisible !== null) {
          setActiveYear(mostVisible.year)
        }
      },
      {
        // Use a threshold to detect when sections enter/leave the viewport
        // rootMargin adjusts the "active" zone (e.g., trigger when section is near top)
        rootMargin: '-10% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    // Observe all year sections
    props.years.forEach(year => {
      const section = document.getElementById(String(year))
      if (section) {
        observer.observe(section)
      }
    })

    // Set initial active year based on current scroll position or first year
    const hash = window.location.hash.slice(1)
    if (hash && props.years.includes(Number(hash))) {
      setActiveYear(Number(hash))
    } else if (props.years.length > 0 && props.years[0] !== undefined) {
      setActiveYear(props.years[0])
    }

    // Handle hash changes (e.g., from browser back/forward)
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && props.years.includes(Number(hash))) {
        setActiveYear(Number(hash))
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    onCleanup(() => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
    })
  })

  const handleClick = (year: number) => (event: MouseEvent) => {
    event.preventDefault()

    const targetSection = document.getElementById(String(year))
    if (targetSection) {
      const headerOffset = 40
      const elementPosition = targetSection.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Update URL hash
      window.history.pushState(null, '', `#${year}`)
      setActiveYear(year)
    }
  }

  return (
    <aside class="sticky top-20 order-2 -me-32 hidden basis-64 lg:block">
      <nav aria-label="Timeline navigation">
        <ul class="space-y-1 text-xs">
          <For each={props.years}>
            {year => (
              <li>
                <a
                  href={`#${year}`}
                  onClick={handleClick(year)}
                  class="hover:text-accent hover:bg-accent/10 block rounded px-2 py-1 transition-colors"
                  classList={{
                    'text-accent font-bold bg-accent/10': activeYear() === year,
                  }}
                  aria-label={`Jump to ${year}`}
                  aria-current={activeYear() === year ? 'true' : undefined}
                >
                  {year}
                </a>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </aside>
  )
}
