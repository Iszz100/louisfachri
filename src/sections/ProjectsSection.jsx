import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/common/SectionHeading'
import { projectCategories, projects } from '../data/projects'
import useResponsiveMotion from '../hooks/useResponsiveMotion'
import { cn } from '../utils/cn'
import { cardInteraction, sectionReveal, staggerContainer } from '../utils/motion'

function ProjectGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex] ?? images[0]

  return (
    <div className="border-b border-slate-800/80 bg-slate-950/45 p-2">
      <div className="h-56 overflow-hidden rounded-lg border border-slate-700/60 bg-slate-950/90 p-2 md:h-72">
        <img
          src={activeImage}
          alt={`Tampilan utama proyek ${title}`}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="h-full w-full rounded-md object-contain"
        />
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2" role="group" aria-label={`Pilih gambar untuk ${title}`}>
        {images.map((imageSrc, index) => (
          <button
            key={`${title}-thumb-${index + 1}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              'focus-ring overflow-hidden rounded-md border p-0.5 transition',
              activeIndex === index ? 'border-cyan-300/70' : 'border-slate-700/70 hover:border-slate-500',
            )}
            aria-label={`Lihat screenshot ${index + 1}`}
            aria-pressed={activeIndex === index}
          >
            <img
              src={imageSrc}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="h-14 w-full rounded-sm object-cover md:h-16"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const { isMobile, reduceMotion } = useResponsiveMotion()

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Semua') return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  const hasSafeExternalUrl = (value) => {
    if (!value) return false
    try {
      return new URL(value).protocol === 'https:'
    } catch {
      return false
    }
  }

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
            eyebrow="Proyek"
            title="Proyek latihan teknis yang saya kerjakan selama proses belajar SIJA."
            description="Fokus utama saya ada di System Administrator dan Cybersecurity, tapi saya juga menyiapkan kategori Lainnya untuk proyek di luar dua area tersebut."
          />
        </motion.div>

        <div className="mb-7 flex flex-wrap gap-2">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={cn(
                'focus-ring min-h-11 rounded-full border px-4 py-2 text-xs font-medium transition',
                activeCategory === category
                  ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-100'
                  : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-500',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="mb-5 text-sm text-slate-400" aria-live="polite" aria-atomic="true">
          Menampilkan {filteredProjects.length} proyek pada kategori {activeCategory}.
        </p>

        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className="grid gap-6 lg:grid-cols-2"
        >
          {filteredProjects.length ? (
            filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                variants={sectionReveal}
                initial="rest"
                whileHover={isMobile ? undefined : 'hover'}
                whileTap="tap"
                animate="rest"
                className="glass-panel interactive-card overflow-hidden rounded-2xl shadow-card"
              >
                <motion.div variants={cardInteraction}>
                  {project.images?.length ? (
                    <ProjectGallery images={project.images} title={project.title} />
                  ) : (
                    <img
                      src={project.image}
                      alt={`${project.title} placeholder visual`}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="h-48 w-full object-cover md:h-56"
                    />
                  )}

                  <div className="p-5 md:p-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-100 md:text-xl">{project.title}</h3>
                      <span className="rounded-full border border-blue-400/40 bg-blue-500/10 px-2.5 py-1 text-[11px] text-blue-200">
                        {project.category}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                      <p>
                        <span className="text-slate-100">Tujuan Belajar:</span> {project.problem}
                      </p>
                      <p>
                        <span className="text-slate-100">Apa yang Saya Lakukan:</span> {project.solution}
                      </p>
                      <p>
                        <span className="text-slate-100">Yang Saya Pelajari:</span> {project.impact}
                      </p>
                      <div className="rounded-xl border border-cyan-300/25 bg-cyan-400/8 px-3 py-2 text-cyan-100">
                        <span className="text-[11px] uppercase tracking-[0.17em] text-cyan-300">Output Terdokumentasi</span>
                        <p className="mt-1 text-sm">{project.documentedOutput}</p>
                      </div>
                      <p>
                        <span className="text-slate-100">Peran:</span> {project.role}
                      </p>
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-3">
                      <p className="text-[11px] uppercase tracking-[0.17em] text-blue-200">Catatan Proses</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.engineeringNotes}</p>
                    </div>

                    <div className="mt-4">
                      <p className="text-[11px] uppercase tracking-[0.17em] text-purple-200">Keputusan Konfigurasi</p>
                      <ul className="mt-2 space-y-2 text-sm text-slate-300">
                        {project.architecturalDecisions.map((decision) => (
                          <li key={decision} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-300" />
                            <span>{decision}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="w-full text-[11px] uppercase tracking-[0.17em] text-slate-400">Teknologi yang Digunakan</span>
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {hasSafeExternalUrl(project.repositoryUrl) ? (
                      <div className="mt-4">
                        <a
                          href={project.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.repositoryLabel ?? 'Lihat Repository'}: ${project.title}`}
                          className="focus-ring inline-flex rounded-lg border border-cyan-300/45 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200 transition hover:-translate-y-[1px] hover:border-cyan-300/70"
                        >
                          {project.repositoryLabel ?? 'Lihat Repository'}
                        </a>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </motion.article>
            ))
          ) : (
            <motion.article
              variants={sectionReveal}
              className="glass-panel rounded-2xl border border-dashed border-cyan-300/35 bg-slate-900/50 p-6 text-slate-200 lg:col-span-2"
            >
              <h3 className="text-lg font-semibold text-slate-100">Belum ada proyek pada kategori ini</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Silakan pilih kategori lain untuk melihat proyek yang tersedia.
              </p>
            </motion.article>
          )}
        </motion.div>
      </div>
    </section>
  )
}
