import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../components/common/SectionHeading'
import { education } from '../data/experience'
import { cardInteraction, sectionReveal, staggerContainer } from '../utils/motion'

export default function EducationSection() {
  const shouldReduceMotion = useReducedMotion()

  if (!education.length) return null

  return (
    <section className="section-padding pt-0" aria-labelledby="education-heading">
      <div className="container-shell">
        <motion.div
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <SectionHeading
            eyebrow="Education"
            title="Pendidikan"
            description="Pendidikan formal yang mendukung fokus belajar saya di bidang sistem, jaringan, dan cybersecurity."
            headingId="education-heading"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-5"
        >
          {education.map((item) => (
            <motion.article
              key={`${item.institution}-${item.startYear}`}
              variants={sectionReveal}
              whileHover={shouldReduceMotion ? undefined : cardInteraction.hover}
              className="glass-panel polish-card rounded-2xl p-6 shadow-card md:p-7"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">{item.degree}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-100">{item.institution}</h3>
                  <p className="mt-2 text-sm font-medium text-blue-200">{item.major}</p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">{item.description}</p>
                </div>
                <dl className="grid shrink-0 gap-3 text-sm sm:grid-cols-2 md:min-w-64 md:grid-cols-1">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">Periode</dt>
                    <dd className="mt-1 text-slate-200">{item.startYear}–{item.endYear}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">Lokasi</dt>
                    <dd className="mt-1 text-slate-200">{item.location}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">Status</dt>
                    <dd className="mt-1 text-slate-200">{item.status}</dd>
                  </div>
                </dl>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
