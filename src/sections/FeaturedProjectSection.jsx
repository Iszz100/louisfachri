import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import SectionHeading from '../components/common/SectionHeading'
import { projects } from '../data/projects'
import { cardInteraction, sectionReveal } from '../utils/motion'

const featuredProject = projects.find((project) => project.id === 'p-2') ?? projects[0]
const featuredProjectTitle = 'Defense Against Slow HTTP DDoS Attack'

function hasSafeExternalUrl(value) {
  if (!value) return false

  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export default function FeaturedProjectSection() {
  const shouldReduceMotion = useReducedMotion()

  if (!featuredProject) return null

  return (
    <section className="section-padding" aria-labelledby="featured-project-heading">
      <div className="container-shell">
        <motion.div
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeading
            eyebrow="Featured Project"
            title="Proyek Pilihan"
            description="Salah satu project keamanan yang saya dokumentasikan mulai dari proses pengujian, monitoring, hingga perbaikan konfigurasi berdasarkan hasil pengujian."
            headingId="featured-project-heading"
          />
        </motion.div>

        <motion.article
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          whileHover={shouldReduceMotion ? undefined : cardInteraction.hover}
          viewport={{ once: true, amount: 0.16 }}
          className="polish-card group/featured overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/45 shadow-card"
        >
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="media-zoom relative flex items-center overflow-hidden border-b border-slate-800 bg-slate-950/80 p-3 sm:p-4 lg:border-b-0 lg:border-r">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                <img
                  src={featuredProject.image}
                  alt={`Monitoring server pada proyek ${featuredProject.title}`}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-950/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan-100 backdrop-blur sm:left-7 sm:top-7">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
                Security Testing Lab
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">DigiUp Cybersecurity Project</p>
              <h3 className="mt-3 text-[clamp(1.45rem,2.5vw,2.1rem)] font-semibold leading-tight tracking-[-0.02em] text-slate-50">
                {featuredProjectTitle}
              </h3>

              <div className="mt-5 max-w-[62ch]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-slate-400">Apa yang saya kerjakan</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{featuredProject.solution}</p>
              </div>

              <div className="mt-5 border-l-2 border-cyan-300/60 bg-cyan-300/[0.04] px-4 py-3.5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-cyan-200">Output terdokumentasi</p>
                <p className="mt-1.5 text-sm leading-6 text-slate-300">{featuredProject.documentedOutput}</p>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Teknologi featured project">
                {featuredProject.techStack.slice(0, 6).map((tech) => (
                  <li key={tech} className="rounded-md border border-slate-700 bg-slate-950/60 px-2.5 py-1.5 text-[0.68rem] text-slate-300">
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`#project-${featuredProject.id}`}
                  className="group focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-200"
                >
                  Lihat Detail Proyek
                  <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={13} aria-hidden="true" />
                </a>
                {hasSafeExternalUrl(featuredProject.repositoryUrl) ? (
                  <a
                    href={featuredProject.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-slate-400"
                  >
                    Repository
                    <FaArrowUpRightFromSquare className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={12} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
