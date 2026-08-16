import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { premiumEase } from '../../utils/motion'

export default function RouteTransition({ children, routeKey }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={routeKey}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion
          ? { duration: 0.14 }
          : { duration: 0.36, ease: premiumEase }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
