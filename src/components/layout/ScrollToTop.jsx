import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const previousLocationRef = useRef(`${key}:${pathname}${hash}`)

  useEffect(() => {
    const currentLocation = `${key}:${pathname}${hash}`
    const shouldMoveFocus = previousLocationRef.current !== currentLocation
    previousLocationRef.current = currentLocation

    if (hash) {
      let targetId
      try {
        targetId = decodeURIComponent(hash.replace('#', ''))
      } catch {
        return undefined
      }

      const scrollToHashTarget = () => {
        const target = document.getElementById(targetId)
        if (!target) return false

        const pendingSections = [...document.querySelectorAll('[data-deferred-section][data-loaded="false"]')]
          .some((section) => {
            if (section === target) return true
            return Boolean(section.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING)
          })

        if (pendingSections) return false

        target.scrollIntoView({ behavior: 'auto', block: 'start' })

        if (shouldMoveFocus) {
          const heading = target.querySelector('h1, h2, h3') ?? target
          heading.setAttribute('tabindex', '-1')
          heading.focus({ preventScroll: true })
        }

        return true
      }

      if (scrollToHashTarget()) return

      const start = performance.now()
      const intervalId = setInterval(() => {
        const reached = scrollToHashTarget()
        const timedOut = performance.now() - start > 3000
        if (reached || timedOut) {
          clearInterval(intervalId)
        }
      }, 90)

      return () => clearInterval(intervalId)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    if (shouldMoveFocus) {
      window.requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }))
    }
  }, [pathname, hash, key])

  return null
}
