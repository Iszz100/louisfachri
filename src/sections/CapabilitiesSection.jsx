import { motion, useReducedMotion } from 'framer-motion'
import { FaNetworkWired, FaServer, FaShieldHalved } from 'react-icons/fa6'
import SectionHeading from '../components/common/SectionHeading'
import { domains } from '../data/domains'
import { sectionReveal, staggerContainer } from '../utils/motion'

const domainIcons = {
  'system-administration': FaServer,
  cybersecurity: FaShieldHalved,
  'it-infrastructure': FaNetworkWired,
}

export default function CapabilitiesSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-padding" aria-labelledby="capabilities-heading">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Core expertise"
          title="Tiga area yang saya bangun dengan serius."
          description="Fondasi teknis yang saya kembangkan lewat project sekolah, lab mandiri, dan pengalaman PKL."
          headingId="capabilities-heading"
        />

        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.14 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {domains.map((domain) => {
            const Icon = domainIcons[domain.id] ?? FaServer

            return (
              <motion.article
                key={domain.id}
                variants={sectionReveal}
                className="expertise-card polish-card group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7 md:last:col-span-2 md:last:w-[calc(50%-0.5rem)] md:last:justify-self-center lg:last:col-span-1 lg:last:w-auto"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.055] text-cyan-200 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[3deg] group-hover:scale-105">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[0.65rem] tracking-[0.16em] text-slate-400">/{domain.number}</span>
                </div>

                <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em] text-slate-100">{domain.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{domain.context}</p>

                <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[0.07] pt-5" aria-label={`Teknologi ${domain.title}`}>
                  {domain.stack.map((tech) => (
                    <li key={tech} className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-slate-400">
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
