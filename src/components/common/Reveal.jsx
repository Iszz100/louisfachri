import { createElement } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { premiumEase } from '../../utils/motion'

const motionTags = {
  article: motion.article,
  div: motion.div,
  li: motion.li,
  section: motion.section,
}

export default function Reveal({
  amount = 0.18,
  as = 'div',
  blur = 0,
  children,
  className = '',
  delay = 0,
  distance = 24,
  duration = 0.62,
  once = true,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motionTags[as] ?? motion.div
  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.16 } },
      }
    : {
        hidden: {
          opacity: 0,
          y: distance,
          filter: blur ? `blur(${blur}px)` : 'blur(0px)',
        },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { delay, duration, ease: premiumEase },
        },
      }

  return createElement(
    MotionTag,
    {
      ...props,
      className,
      initial: 'hidden',
      variants,
      viewport: { amount, once },
      whileInView: 'show',
    },
    children,
  )
}
