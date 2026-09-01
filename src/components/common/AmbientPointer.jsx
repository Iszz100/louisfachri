import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function AmbientPointer() {
  const shouldReduceMotion = useReducedMotion()
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const pointerX = useMotionValue(-520)
  const pointerY = useMotionValue(-520)
  const smoothX = useSpring(pointerX, { damping: 32, mass: 0.22, stiffness: 170 })
  const smoothY = useSpring(pointerY, { damping: 32, mass: 0.22, stiffness: 170 })

  useEffect(() => {
    const pointerMedia = window.matchMedia('(hover: hover) and (pointer: fine)')
    const syncPointerCapability = () => setHasFinePointer(pointerMedia.matches)

    syncPointerCapability()
    pointerMedia.addEventListener('change', syncPointerCapability)

    return () => pointerMedia.removeEventListener('change', syncPointerCapability)
  }, [])

  useEffect(() => {
    if (!hasFinePointer || shouldReduceMotion) return undefined

    const updatePointer = (event) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    return () => window.removeEventListener('pointermove', updatePointer)
  }, [hasFinePointer, pointerX, pointerY, shouldReduceMotion])

  if (!hasFinePointer || shouldReduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[12]"
      style={{ x: smoothX, y: smoothY }}
    >
      <div className="ambient-pointer-aura" />
      <div className="ambient-pointer-reticle" />
    </motion.div>
  )
}
