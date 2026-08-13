import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowTrendUp, FaBriefcase } from 'react-icons/fa6'
import SectionHeading from '../components/common/SectionHeading'
import { currentExperience, roadmap, timeline } from '../data/experience'
import { cardInteraction, sectionReveal, staggerContainer } from '../utils/motion'

export default function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-padding" aria-labelledby="experience-heading">
      <div className="container-shell">
        <motion.div
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeading
            eyebrow="Experience"
            title="Pengalaman PKL di Bidang Cybersecurity"
            description="Saat ini saya menjalani PKL dengan fokus pada praktik Blue Team, security monitoring, network security, dan troubleshooting."
            headingId="experience-heading"
          />
        </motion.div>

        <motion.article
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          whileHover={shouldReduceMotion ? undefined : cardInteraction.hover}
          viewport={{ once: true, amount: 0.16 }}
          className="polish-card relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-900/55"
        >
          <div aria-hidden className="absolute inset-y-0 left-0 w-1 bg-cyan-300/80" />
          <div className="grid gap-7 p-6 sm:p-7 lg:grid-cols-[0.88fr_1.12fr] lg:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                  <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
                  {currentExperience.status}
                </span>
                <time className="text-xs text-slate-500">{currentExperience.period}</time>
              </div>

              <div className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-950/70 text-cyan-200">
                <FaBriefcase size={17} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[clamp(1.5rem,2.5vw,2.15rem)] font-semibold tracking-[-0.02em] text-slate-50">
                {currentExperience.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-cyan-200">{currentExperience.organization}</p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">{currentExperience.description}</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/45 p-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Fokus praktik saat ini</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {currentExperience.focusAreas.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-900/55 p-3 text-sm leading-5 text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>

        <motion.div
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-5 mt-10 flex items-end justify-between gap-4"
        >
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cyan-300">Journey</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-100">Perjalanan Belajar Saya</h3>
          </div>
        </motion.div>

        <motion.ol
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          aria-label="Perjalanan belajar 2023 hingga 2026"
          className="grid gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 md:grid-cols-2 xl:grid-cols-4"
        >
          {timeline.map((item, index) => (
            <motion.li
              key={item.year}
              variants={sectionReveal}
              className="relative bg-slate-950/90 p-5 sm:p-6"
            >
              <div className="flex items-center" aria-hidden="true">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/[0.07] font-mono text-[0.65rem] font-semibold text-cyan-200">
                  0{index + 1}
                </span>
                {index < timeline.length - 1 ? (
                  <span
                    className={`ml-3 h-px flex-1 bg-gradient-to-r from-cyan-300/45 to-slate-700/60 ${
                      index % 2 === 1 ? 'md:hidden xl:block' : ''
                    }`}
                  />
                ) : null}
              </div>
              <time className="mt-5 block font-mono text-2xl font-semibold tracking-[-0.03em] text-cyan-100">{item.year}</time>
              <h4 className="mt-3 text-base font-semibold leading-6 text-slate-100">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
            </motion.li>
          ))}
        </motion.ol>

        {roadmap.map((item) => (
          <motion.aside
            key={item.year}
            variants={sectionReveal}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="show"
            whileHover={shouldReduceMotion ? undefined : cardInteraction.hover}
            viewport={{ once: true, amount: 0.3 }}
            className="polish-card mt-4 flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/35 p-5 sm:flex-row sm:items-center"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
              <FaArrowTrendUp size={15} aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-slate-400">Target Berikutnya · {item.year}</p>
              <h3 className="mt-1.5 text-base font-semibold text-slate-100">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-400">{item.description}</p>
            </div>
          </motion.aside>
        ))}
      </div>
    </section>
  )
}
