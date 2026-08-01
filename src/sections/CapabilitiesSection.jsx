import { motion } from 'framer-motion'
import SectionHeading from '../components/common/SectionHeading'
import { domains } from '../data/domains'
import useResponsiveMotion from '../hooks/useResponsiveMotion'
import { cardInteraction, sectionReveal, staggerContainer } from '../utils/motion'

export default function CapabilitiesSection() {
  const { isMobile, reduceMotion } = useResponsiveMotion()

  return (
    <section className="section-padding">
      <div className="container-shell">
        <motion.div
          variants={sectionReveal}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeading
            eyebrow="Kapabilitas"
            title="Fokus belajar teknis saya sebagai siswa SMK SIJA."
            description="Bagian ini saya sederhanakan ke dua fokus utama: System Administrator dan Cybersecurity."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 md:grid-cols-2"
        >
          {domains.map((domain) => (
            <motion.article
              key={domain.id}
              variants={sectionReveal}
              initial="rest"
              whileHover={isMobile ? undefined : 'hover'}
              whileTap="tap"
              animate="rest"
              transition={{ duration: 0.25 }}
              className="glass-panel interactive-card rounded-2xl p-6 shadow-card"
            >
              <motion.div variants={cardInteraction}>
                <h3 className="text-xl font-semibold text-slate-100">{domain.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{domain.context}</p>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Kekuatan Inti</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-200">
                    {domain.coreStrengths.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {domain.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
