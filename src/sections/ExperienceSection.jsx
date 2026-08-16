import { motion, useReducedMotion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaLocationDot } from 'react-icons/fa6'
import SectionHeading from '../components/common/SectionHeading'
import { currentExperience, education, timeline } from '../data/experience'
import { profile } from '../data/profile'
import { sectionReveal, staggerContainer } from '../utils/motion'

const compactTimeline = [timeline[0], timeline[2], timeline[3]].filter(Boolean)

export default function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion()
  const currentEducation = education[0]

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
            eyebrow="About & journey"
            title="Belajar lewat sistem yang benar-benar dijalankan."
            description="Saya menggabungkan fondasi dari sekolah dengan praktik langsung di lab dan lingkungan PKL—mulai dari deployment sampai defensive security."
            headingId="experience-heading"
          />
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            variants={sectionReveal}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="flex flex-col gap-5"
          >
            <article className="rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/[0.025] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-black/15 text-cyan-200">
                  <FaBriefcase size={15} aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.045] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
                  {currentExperience.status}
                </span>
              </div>
              <p className="mt-7 technical-label">Current experience</p>
              <h3 className="mt-3 text-[clamp(1.45rem,2.8vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em] text-slate-50">
                {currentExperience.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{currentExperience.description}</p>
              <ul className="mt-6 space-y-3 border-t border-white/[0.07] pt-5">
                {currentExperience.focusAreas.slice(0, 3).map((area) => (
                  <li key={area} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </article>

            <blockquote className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-base leading-7 text-slate-300">
              “{profile.manifesto}”
              <footer className="mt-5 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-slate-400">
                <FaLocationDot size={10} aria-hidden="true" />
                {profile.location}
              </footer>
            </blockquote>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-5">
              <div>
                <p className="technical-label">Learning journey</p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-slate-100">Dari fondasi ke praktik keamanan.</h3>
              </div>
              <span className="font-mono text-[0.62rem] text-slate-400">2023—NOW</span>
            </div>

            <ol className="mt-7 space-y-0" aria-label="Perjalanan belajar Louis Fachri">
              {compactTimeline.map((item, index) => (
                <motion.li key={item.year} variants={sectionReveal} className="grid grid-cols-[76px_1fr] gap-5 sm:grid-cols-[96px_1fr]">
                  <time className="font-mono text-xs font-semibold text-cyan-200">
                    {item.year === '2026' ? 'Current' : item.year}
                  </time>
                  <div className={`relative border-l pl-5 ${index < compactTimeline.length - 1 ? 'border-white/[0.08] pb-8' : 'border-transparent'}`}>
                    <span className="absolute left-0 top-1.5 h-2 w-2 -translate-x-[3.5px] rounded-full border-2 border-[#0b1018] bg-cyan-300" aria-hidden="true" />
                    <h4 className="text-base font-semibold text-slate-100">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            {currentEducation ? (
              <motion.article variants={sectionReveal} className="mt-8 border-t border-white/[0.07] pt-6">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-black/15 text-slate-300">
                    <FaGraduationCap size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="technical-label">Education · {currentEducation.startYear}—Present</p>
                    <h3 className="mt-2 text-base font-semibold text-slate-100">{currentEducation.institution}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-400">{currentEducation.major}</p>
                  </div>
                </div>
              </motion.article>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
