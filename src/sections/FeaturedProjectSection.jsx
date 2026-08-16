import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { Link } from 'react-router'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import { projects } from '../data/projects'
import { sectionReveal, staggerContainer } from '../utils/motion'

const featuredContent = [
  {
    id: 'opnsense-transparent-bridge-ids-ips',
    title: 'OPNsense Transparent Bridge & IDS/IPS',
    label: 'Network Security Lab',
    problem: 'Mempelajari bagaimana trafik jaringan dapat difilter dan dipantau tanpa mengubah topologi utama lab.',
    contribution: 'Menyusun bridge, firewall, routing/NAT, Suricata IPS, lalu memvalidasi rule dengan EICAR safe test.',
  },
  {
    id: 'p-2',
    title: 'Slow HTTP DDoS Defense Lab',
    label: 'Defensive Security',
    problem: 'Web service Flask menjadi tidak stabil saat menerima simulasi koneksi Slow HTTP di lingkungan lab.',
    contribution: 'Memonitor resource, beralih ke Gunicorn, menonaktifkan debug, dan menambahkan restart policy Docker.',
  },
  {
    id: 'p-5',
    title: 'Ubuntu & Docker Web Deployment',
    label: 'System Administration',
    problem: 'Menyiapkan rilis website tim agar konsisten, mudah dijalankan, dan dapat diverifikasi setelah deployment.',
    contribution: 'Menyiapkan Ubuntu Server, container Docker, serta validasi operasional pada empat area layanan.',
  },
]

const featuredProjects = featuredContent
  .map((content) => {
    const project = projects.find((item) => item.id === content.id)
    return project ? { ...project, ...content } : null
  })
  .filter(Boolean)

function hasSafeExternalUrl(value) {
  if (!value) return false
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function ProjectLinks({ project, compact = false }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${compact ? 'mt-5' : 'mt-7'}`}>
      <Link
        to={`/projects#project-${project.id}`}
        className="group focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-cyan-100 transition hover:text-cyan-200"
      >
        View Project
        <FaArrowRight className="transition-transform group-hover:translate-x-1" size={12} aria-hidden="true" />
      </Link>
      {hasSafeExternalUrl(project.repositoryUrl) ? (
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/external focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-xs font-medium text-slate-400 transition hover:text-slate-200"
          aria-label={`Buka repository ${project.title}`}
        >
          GitHub
          <FaArrowUpRightFromSquare className="transition-transform group-hover/external:translate-x-1 group-hover/external:-translate-y-1" size={10} aria-hidden="true" />
        </a>
      ) : null}
    </div>
  )
}

function TechList({ project, limit = 4 }) {
  const technologies = project.cardTechStack ?? project.techStack.slice(0, limit)
  return (
    <ul className="flex flex-wrap gap-2" aria-label={`Teknologi ${project.title}`}>
      {technologies.slice(0, limit).map((tech) => (
        <li key={tech} className="rounded-md border border-white/[0.08] bg-black/15 px-2.5 py-1.5 font-mono text-[0.62rem] text-slate-400">
          {tech}
        </li>
      ))}
    </ul>
  )
}

export default function FeaturedProjectSection() {
  const shouldReduceMotion = useReducedMotion()
  const [leadProject, ...supportingProjects] = featuredProjects

  if (!leadProject) return null

  return (
    <section className="section-padding border-y border-white/[0.07] bg-white/[0.015]" aria-labelledby="featured-project-heading">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Dibangun, diuji, lalu didokumentasikan."
            description="Tiga project yang paling mewakili cara saya bekerja: memahami masalah, mengerjakan bagian teknis, dan mencatat hasilnya dengan jelas."
            headingId="featured-project-heading"
          />
          <Link
            to="/projects"
            className="group focus-ring mb-8 inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-medium text-slate-300 transition hover:border-white/25 hover:text-white"
          >
            Semua Proyek
            <FaArrowRight className="transition-transform group-hover:translate-x-1" size={12} aria-hidden="true" />
          </Link>
        </div>

        <Reveal
          as="article"
          amount={0.14}
          className="polish-card overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[#0b1119] shadow-[0_26px_80px_rgba(0,0,0,0.3)]"
        >
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="media-zoom relative border-b border-white/[0.08] bg-[#070b11] p-3 sm:p-4 lg:border-b-0 lg:border-r">
              <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-white/[0.07] bg-[#05080d]">
                <img
                  src={leadProject.image}
                  alt={`Screenshot ${leadProject.title}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="project-media-overlay" aria-hidden="true" />
              <span className="absolute left-6 top-6 z-10 rounded-full border border-white/10 bg-[#080c12]/90 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-cyan-200 backdrop-blur sm:left-7 sm:top-7">
                Featured / 01
              </span>
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:p-9">
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-cyan-300">{leadProject.label}</p>
              <h3 className="mt-3 text-[clamp(1.65rem,3vw,2.45rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-slate-50">
                {leadProject.title}
              </h3>

              <div className="mt-7 grid gap-5 border-y border-white/[0.07] py-6 sm:grid-cols-2">
                <div>
                  <p className="technical-label">Problem</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{leadProject.problem}</p>
                </div>
                <div>
                  <p className="technical-label">My contribution</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{leadProject.contribution}</p>
                </div>
              </div>

              <div className="mt-6"><TechList project={leadProject} /></div>
              <ProjectLinks project={leadProject} />
            </div>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-5 grid gap-5 lg:grid-cols-2"
        >
          {supportingProjects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={sectionReveal}
              className="polish-card flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-white/[0.025]"
            >
              <div className="media-zoom relative aspect-[16/8.5] overflow-hidden border-b border-white/[0.07] bg-[#070b11] p-3">
                <img
                  src={project.image}
                  alt={`Screenshot ${project.title}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-lg object-contain"
                />
                <span className="project-media-overlay" aria-hidden="true" />
                <span className="absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-[#080c12]/90 px-2.5 py-1 font-mono text-[0.58rem] text-slate-400 backdrop-blur">
                  0{index + 2}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cyan-300">{project.label}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-slate-100">{project.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{project.problem}</p>
                <div className="mt-5 border-l border-cyan-300/35 pl-4">
                  <p className="technical-label">My contribution</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{project.contribution}</p>
                </div>
                <div className="mt-6"><TechList project={project} limit={3} /></div>
                <div className="mt-auto"><ProjectLinks project={project} compact /></div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
