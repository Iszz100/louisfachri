import { useCallback, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'

export default function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const scrollProgress = useMotionValue(0)
  const smoothProgress = useSpring(scrollProgress, {
    damping: 28,
    mass: 0.18,
    stiffness: 150,
  })

  const updateProgress = useCallback((currentScroll = window.scrollY) => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.set(scrollableHeight > 0 ? Math.min(Math.max(currentScroll / scrollableHeight, 0), 1) : 0)
  }, [scrollProgress])

  useMotionValueEvent(scrollY, 'change', updateProgress)

  useEffect(() => {
    const handleResize = () => updateProgress()
    const resizeObserver = new ResizeObserver(handleResize)

    handleResize()
    resizeObserver.observe(document.documentElement)
    window.addEventListener('resize', handleResize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [updateProgress])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 shadow-[0_0_14px_rgba(34,211,238,0.42)]"
      style={{ scaleX: shouldReduceMotion ? scrollProgress : smoothProgress }}
    />
  )
}
