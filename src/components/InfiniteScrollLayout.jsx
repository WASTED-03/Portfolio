import React, { useEffect, useLayoutEffect, useRef } from 'react'

// Vertically loops sections infinitely using a scroll container with snap points.
// Renders [lastClone, ...children, firstClone] and teleports scroll when reaching ends.

const InfiniteScrollLayout = ({ children }) => {
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  const isTeleportingRef = useRef(false)
  const cycleSizeRef = useRef(0)
  const repeatsRef = useRef(7) // odd number so we can center

  const childArray = React.Children.toArray(children).filter(Boolean)
  const total = childArray.length

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container || total === 0) return
    const sectionHeight = container.clientHeight
    const cycle = sectionHeight * total
    cycleSizeRef.current = cycle
    const centerCycleIndex = Math.floor(repeatsRef.current / 2)
    const base = cycle * centerCycleIndex
    // Always land at the top of the first logical section within the centered cycle
    container.scrollTop = base
  }, [total])

  useEffect(() => {
    const container = containerRef.current
    if (!container || total === 0) return

    let lastKnownScrollTop = 0
    const onResize = () => {
      // Recompute cycle size and recentre to equivalent position
      const sectionHeight = container.clientHeight
      const cycle = sectionHeight * total
      const scrollTop = container.scrollTop
      const centerCycleIndex = Math.floor(repeatsRef.current / 2)
      const mod = scrollTop % (cycle || 1)
      cycleSizeRef.current = cycle
      isTeleportingRef.current = true
      container.scrollTo({ top: centerCycleIndex * cycle + mod, behavior: 'auto' })
      setTimeout(() => { isTeleportingRef.current = false }, 0)
    }

    const onScroll = () => {
      if (isTeleportingRef.current) return
      lastKnownScrollTop = container.scrollTop
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null
          const scrollTop = lastKnownScrollTop
          const sectionHeight = container.clientHeight
          const cycle = cycleSizeRef.current || sectionHeight * total
          if (cycle <= 0) return
          const totalHeight = cycle * repeatsRef.current
          const lowerGuard = cycle * 1.5
          const upperGuard = totalHeight - cycle * 1.5

          if (scrollTop < lowerGuard || scrollTop > upperGuard) {
            const centerCycleIndex = Math.floor(repeatsRef.current / 2)
            const mod = scrollTop % cycle
            isTeleportingRef.current = true
            container.scrollTo({ top: centerCycleIndex * cycle + mod, behavior: 'auto' })
            setTimeout(() => { isTeleportingRef.current = false }, 0)
          }
        })
      }
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      container.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [total])

  if (total === 0) return null

  const repeats = repeatsRef.current
  const clones = Array.from({ length: repeats }).flatMap((_, i) => childArray)

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory"
      style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
    >
      {clones.map((node, idx) => (
        <section key={idx} className="min-h-screen snap-start">
          {node}
        </section>
      ))}
    </div>
  )
}

export default InfiniteScrollLayout


