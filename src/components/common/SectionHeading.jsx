import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { premiumEase } from '../../utils/motion'

const headingSequence = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.02, staggerChildren: 0.09 },
  },
}

const headingItem = {
  hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.62, ease: premiumEase },
  },
}

const titleSequence = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.04, staggerChildren: 0.055 },
  },
}

const titleWord = {
  hidden: { opacity: 0, y: '105%', rotate: 2 },
  show: {
    opacity: 1,
    y: '0%',
    rotate: 0,
    transition: { duration: 0.72, ease: premiumEase },
  },
}

export default function SectionHeading({ eyebrow, title, description, headingId }) {
  const shouldReduceMotion = useReducedMotion()
  const titleWords = title.split(' ')

  return (
    <motion.div
      className="mb-10 max-w-[780px]"
      variants={shouldReduceMotion ? undefined : headingSequence}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.p variants={shouldReduceMotion ? undefined : headingItem} className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-300">
        <motion.span
          variants={shouldReduceMotion ? undefined : {
            hidden: { opacity: 0, scaleX: 0 },
            show: { opacity: 1, scaleX: 1, transition: { duration: 0.62, ease: premiumEase } },
          }}
          className="h-px w-7 origin-left bg-cyan-300/55"
          aria-hidden="true"
        />
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={shouldReduceMotion ? undefined : titleSequence}
        id={headingId}
        aria-label={title}
        className="text-[clamp(2rem,4.3vw,3.65rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-slate-50"
      >
        {shouldReduceMotion ? title : (
          <span aria-hidden="true">
            {titleWords.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span variants={titleWord} className="inline-block origin-left">
                    {word}
                  </motion.span>
                </span>
                {index < titleWords.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        )}
      </motion.h2>
      {description ? (
        <motion.p variants={shouldReduceMotion ? undefined : headingItem} className="mt-5 max-w-[66ch] text-base leading-7 text-slate-400">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
