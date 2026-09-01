import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { premiumEase } from '../../utils/motion'

export default function RouteTransition({ children, routeKey }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={routeKey}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={shouldReduceMotion
          ? { duration: 0.14 }
          : { duration: 0.36, ease: premiumEase }}
      >
        {!shouldReduceMotion ? (
          <motion.div
            aria-hidden="true"
            className="route-scan pointer-events-none fixed inset-x-0 top-0 z-40 h-px"
            initial={{ opacity: 0, y: '-8vh' }}
            animate={{ opacity: [0, 0.95, 0.7, 0], y: '108vh' }}
            transition={{ duration: 0.82, ease: premiumEase, times: [0, 0.12, 0.72, 1] }}
          />
        ) : null}
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
