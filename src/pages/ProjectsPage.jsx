import { motion } from 'framer-motion'
import PageMeta from '../components/common/PageMeta'
import { projects } from '../data/projects'
import ProjectsSection from '../sections/ProjectsSection'
import { sectionReveal } from '../utils/motion'

const title = 'Projects | Louis Fachri'
const description =
  'Project dan hands-on lab Louis Fachri di bidang System Administration, IT Infrastructure, dan Cybersecurity.'

export default function ProjectsPage() {
  return (
    <>
      <PageMeta title={title} description={description} canonicalPath="/projects" />
      <main id="main-content" tabIndex="-1">
        <section className="relative overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-36" aria-labelledby="projects-page-heading">
          <div className="page-hero-glow" aria-hidden="true" />
          <div className="container-shell relative">
            <motion.div variants={sectionReveal} initial={false} animate="show" className="max-w-[860px]">
              <p className="flex items-center gap-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <span className="h-px w-7 bg-cyan-300/55" aria-hidden="true" />
                Project archive
              </p>
              <h1
                id="projects-page-heading"
                className="mt-5 text-[clamp(2.7rem,6vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-50"
              >
                Praktik nyata, bukan sekadar daftar teknologi.
              </h1>
              <p className="mt-6 max-w-[66ch] text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
                Kumpulan {projects.length} project dan lab yang mendokumentasikan masalah, kontribusi saya, keputusan teknis, serta hasil pembelajaran.
              </p>
            </motion.div>
          </div>
        </section>

        <ProjectsSection showAllByDefault showHeading={false} />
      </main>
    </>
  )
}
