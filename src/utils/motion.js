export const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.08,
    },
  },
}

export const cardInteraction = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
  tap: { scale: 0.985 },
}
