import { motion, useReducedMotion } from 'framer-motion'
import { FaChartLine, FaNetworkWired, FaServer } from 'react-icons/fa6'
import SectionHeading from '../components/common/SectionHeading'
import { domains } from '../data/domains'
import { profile } from '../data/profile'
import { cardInteraction, sectionReveal, staggerContainer } from '../utils/motion'

const domainIcons = {
  'security-monitoring': FaChartLine,
  'network-security': FaNetworkWired,
  'system-administration': FaServer,
}

export default function CapabilitiesSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-padding border-y border-slate-800/60 bg-slate-950/25" aria-labelledby="capabilities-heading">
      <div className="container-shell">
        <motion.div
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeading
            eyebrow="Focus"
            title="Fokus Teknis"
            description="Beberapa kemampuan yang sedang saya kembangkan melalui sekolah, project, dan praktik selama PKL."
            headingId="capabilities-heading"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.14 }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {domains.map((domain) => {
            const Icon = domainIcons[domain.id] ?? FaServer

            return (
              <motion.article
                key={domain.id}
                variants={sectionReveal}
                whileHover={shouldReduceMotion ? undefined : cardInteraction.hover}
                className="polish-card group flex h-full flex-col rounded-2xl border border-slate-700/65 bg-slate-900/45 p-6 transition duration-300 hover:bg-slate-900/65 md:last:col-span-2 xl:last:col-span-1"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-200">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-slate-600">/{domain.number}</span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-100">{domain.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{domain.context}</p>

                <div className="mt-5 border-t border-slate-800 pt-5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-slate-400">Yang saya praktikkan</p>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                    {domain.coreStrengths.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={`Teknologi ${domain.title}`}>
                  {domain.stack.map((tech) => (
                    <li key={tech} className="rounded-md bg-slate-950/75 px-2.5 py-1.5 text-[0.68rem] text-slate-400 ring-1 ring-inset ring-slate-800">
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.blockquote
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-6 grid gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-5 py-4 md:grid-cols-[180px_1fr] md:items-start md:px-6"
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-cyan-300">Cara saya belajar</p>
          <p className="text-sm leading-6 text-slate-400">{profile.manifesto}</p>
        </motion.blockquote>
      </div>
    </section>
  )
}
