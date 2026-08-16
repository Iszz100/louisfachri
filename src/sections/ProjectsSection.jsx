import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FaArrowUpRightFromSquare,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaMagnifyingGlassPlus,
} from 'react-icons/fa6'
import { useLocation } from 'react-router'
import ImageLightbox from '../components/common/ImageLightbox'
import SectionHeading from '../components/common/SectionHeading'
import { projectCategories, projects } from '../data/projects'
import { cn } from '../utils/cn'
import { cardInteraction, sectionReveal, staggerContainer } from '../utils/motion'

const DEFAULT_PROJECT_LIMIT = 4
const THUMBNAIL_WINDOW_SIZE = 5

function hasSafeExternalUrl(value) {
  if (!value) return false

  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function getProjectGallery(project) {
  if (project.gallery?.length) return project.gallery

  const images = project.images?.length ? project.images : [project.image]
  return images.map((src, index) => ({
    src,
    caption: `Screenshot ${index + 1} dari ${project.title}`,
    alt: `Screenshot ${index + 1} dari proyek ${project.title}`,
  }))
}

function ProjectGalleryControls({ activeIndex, imageId, items, onSelect, title }) {
  if (items.length <= 1) return null

  const lastWindowStart = Math.max(0, items.length - THUMBNAIL_WINDOW_SIZE)
  const windowStart = Math.min(Math.max(0, activeIndex - 2), lastWindowStart)
  const visibleItems = items.slice(windowStart, windowStart + THUMBNAIL_WINDOW_SIZE)

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Galeri proyek</p>
          <p className="mt-1 text-xs text-slate-400">{activeIndex + 1} dari {items.length} gambar</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onSelect((activeIndex - 1 + items.length) % items.length)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-cyan-300/50 hover:text-cyan-100"
            aria-label={`Gambar sebelumnya untuk ${title}`}
          >
            <FaChevronLeft size={12} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onSelect((activeIndex + 1) % items.length)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-cyan-300/50 hover:text-cyan-100"
            aria-label={`Gambar berikutnya untuk ${title}`}
          >
            <FaChevronRight size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        className="scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1"
        role="group"
        aria-label={`Pilih screenshot untuk ${title}`}
      >
        {visibleItems.map((item, offset) => {
          const index = windowStart + offset
          return (
            <button
              key={item.src}
              type="button"
              onClick={() => onSelect(index)}
              className={cn(
                'focus-ring relative h-12 w-16 shrink-0 overflow-hidden rounded-md border bg-slate-900 p-0.5 transition',
                activeIndex === index ? 'border-cyan-300/80' : 'border-slate-700 hover:border-slate-500',
              )}
              aria-label={`Tampilkan screenshot ${index + 1} dari ${items.length}: ${item.caption}`}
              aria-controls={imageId}
              aria-pressed={activeIndex === index}
              title={item.caption}
            >
              <img
                src={item.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded object-cover"
              />
              <span
                className="absolute bottom-1 right-1 rounded bg-slate-950/85 px-1 text-[0.55rem] text-slate-200"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ProjectCard({ headingLevel = 3, isWide, project, shouldReduceMotion }) {
  const galleryItems = getProjectGallery(project)
  const [activeIndex, setActiveIndex] = useState(0)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const activeItem = galleryItems[activeIndex] ?? galleryItems[0]
  const imageId = `project-image-${project.id}`
  const cardTitle = project.displayTitle ?? project.title
  const visibleTech = project.cardTechStack ?? project.techStack.slice(0, 3)
  const remainingTech = project.techStack.length - visibleTech.length

  return (
    <motion.article
      id={`project-${project.id}`}
      variants={sectionReveal}
      whileHover={shouldReduceMotion ? undefined : cardInteraction.hover}
      className={cn(
        'polish-card group/project flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-slate-700/65 bg-slate-900/45 shadow-card',
        isWide && 'lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]',
      )}
    >
      <div
        className={cn(
          'border-b border-slate-800 bg-slate-950/70 p-2.5',
          isWide && 'lg:flex lg:items-center lg:border-b-0 lg:border-r lg:p-4',
        )}
      >
        <div className="w-full">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="media-zoom focus-ring group/image relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl border border-slate-800 bg-slate-950"
            aria-haspopup="dialog"
            aria-label={`Perbesar gambar: ${activeItem.caption}`}
          >
            <img
              id={imageId}
              src={activeItem.src}
              width={activeItem.width}
              height={activeItem.height}
              alt={activeItem.alt}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="h-full w-full object-contain"
            />
            <span className="absolute right-2.5 top-2.5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600/80 bg-slate-950/85 text-slate-200 opacity-90 shadow-lg backdrop-blur transition group-hover/image:border-cyan-300/60 group-hover/image:text-cyan-100">
              <FaMagnifyingGlassPlus size={13} aria-hidden="true" />
            </span>
          </button>

          {project.gallery?.length ? (
            <div className="flex items-start justify-between gap-3 px-1 pb-1 pt-3" aria-live="polite">
              <div className="min-w-0">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-cyan-300">{activeItem.group}</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{activeItem.caption}</p>
              </div>
              <span className="shrink-0 font-mono text-[0.62rem] text-slate-400">
                {String(activeIndex + 1).padStart(2, '0')}/{String(galleryItems.length).padStart(2, '0')}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-cyan-300">{project.category}</p>
          {project.focus ? <p className="text-[0.65rem] text-slate-400">{project.focus}</p> : null}
        </div>
        {headingLevel === 2 ? (
          <h2 className="mt-3 line-clamp-2 text-xl font-semibold leading-7 tracking-[-0.015em] text-slate-100">
            {cardTitle}
          </h2>
        ) : (
          <h3 className="mt-3 line-clamp-2 text-xl font-semibold leading-7 tracking-[-0.015em] text-slate-100">
            {cardTitle}
          </h3>
        )}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
          {project.cardDescription ?? project.solution}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Teknologi pada ${project.title}`}>
          {visibleTech.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-slate-700/80 bg-slate-950/60 px-2.5 py-1.5 text-[0.68rem] text-slate-300"
            >
              {tech}
            </li>
          ))}
          {remainingTech > 0 ? (
            <li
              className="rounded-md border border-slate-700/80 px-2.5 py-1.5 text-[0.68rem] text-slate-400"
              aria-label={`${remainingTech} teknologi lainnya`}
            >
              +{remainingTech}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto pt-5">
          <details
            className="project-details group/details border-t border-slate-800 pt-3"
            onToggle={(event) => setDetailsOpen(event.currentTarget.open)}
          >
            <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center justify-between rounded-lg px-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800/60 hover:text-cyan-100">
              <span>
                <span className="group-open/details:hidden">Lihat Detail Proyek</span>
                <span className="hidden group-open/details:inline">Tutup Detail Proyek</span>
              </span>
              <FaChevronDown
                className="transition-transform duration-200 group-open/details:rotate-180"
                size={12}
                aria-hidden="true"
              />
            </summary>

            <div className="space-y-5 border-t border-slate-800/80 px-2 pb-2 pt-5 text-sm leading-6 text-slate-400">
              {detailsOpen ? (
                <ProjectGalleryControls
                  activeIndex={activeIndex}
                  imageId={imageId}
                  items={galleryItems}
                  onSelect={setActiveIndex}
                  title={project.title}
                />
              ) : null}

              {project.displayTitle ? (
                <div>
                  <p className="font-medium text-slate-200">Judul dokumentasi</p>
                  <p className="mt-1">{project.title}</p>
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-medium text-slate-200">{project.problemLabel ?? 'Tujuan belajar'}</p>
                  <p className="mt-1">{project.problem}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-200">Peran saya</p>
                  <p className="mt-1">{project.role}</p>
                </div>
              </div>

              {project.environment?.length || project.focusAreas?.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.environment?.length ? (
                    <div className="rounded-lg border border-slate-800 bg-slate-950/45 p-3.5">
                      <p className="font-medium text-slate-200">Environment</p>
                      <ul className="mt-2 flex flex-wrap gap-2" aria-label={`Environment ${project.title}`}>
                        {project.environment.map((item) => (
                          <li key={item} className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {project.focusAreas?.length ? (
                    <div className="rounded-lg border border-slate-800 bg-slate-950/45 p-3.5">
                      <p className="font-medium text-slate-200">Fokus praktik</p>
                      <ul className="mt-2 flex flex-wrap gap-2" aria-label={`Fokus praktik ${project.title}`}>
                        {project.focusAreas.map((item) => (
                          <li key={item} className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div>
                <p className="font-medium text-slate-200">Apa yang saya kerjakan</p>
                <p className="mt-1">{project.solution}</p>
              </div>
              <div>
                <p className="font-medium text-slate-200">Yang saya pelajari</p>
                {project.learningOutcomes?.length ? (
                  <ul className="mt-2 space-y-2">
                    {project.learningOutcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" aria-hidden="true" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                ) : <p className="mt-1">{project.impact}</p>}
              </div>
              <div className="border-l-2 border-cyan-300/50 pl-3">
                <p className="font-medium text-cyan-100">{project.outputLabel ?? 'Output terdokumentasi'}</p>
                <p className="mt-1">{project.documentedOutput}</p>
              </div>
              <div>
                <p className="font-medium text-slate-200">{project.engineeringNotesLabel ?? 'Catatan proses'}</p>
                <p className="mt-1">{project.engineeringNotes}</p>
              </div>
              <div>
                <p className="font-medium text-slate-200">{project.detailListLabel ?? 'Keputusan konfigurasi'}</p>
                <ul className="mt-2 space-y-2">
                  {project.architecturalDecisions.map((decision) => (
                    <li key={decision} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" aria-hidden="true" />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>

          {hasSafeExternalUrl(project.repositoryUrl) ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.repositoryLabel ?? 'Lihat Repository'}: ${project.title}`}
              className="group focus-ring mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-slate-300 transition duration-200 hover:text-cyan-100"
            >
              {project.repositoryLabel ?? 'Lihat Repository'}
              <FaArrowUpRightFromSquare
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                size={12}
                aria-hidden="true"
              />
            </a>
          ) : null}
        </div>
      </div>

      <ImageLightbox
        activeIndex={activeIndex}
        items={galleryItems}
        onClose={() => setLightboxOpen(false)}
        onSelect={setActiveIndex}
        open={lightboxOpen}
        shouldReduceMotion={shouldReduceMotion}
        title={cardTitle}
      />
    </motion.article>
  )
}

function ProjectsContent({ hash, showAllByDefault = false, showHeading = true }) {
  const shouldReduceMotion = useReducedMotion()
  let decodedHash = ''
  try {
    decodedHash = decodeURIComponent(hash)
  } catch {
    decodedHash = ''
  }
  const deepLinkedProjectId = decodedHash.startsWith('#project-') ? decodedHash.replace('#project-', '') : ''
  const deepLinkedProjectIndex = projects.findIndex((project) => project.id === deepLinkedProjectId)
  const forceShowDeepLinkedProject = deepLinkedProjectIndex >= DEFAULT_PROJECT_LIMIT
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [showAllProjects, setShowAllProjects] = useState(showAllByDefault)
  const isShowingAllProjects = showAllProjects || forceShowDeepLinkedProject

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Semua') return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  const visibleProjects = useMemo(() => {
    if (activeCategory !== 'Semua' || isShowingAllProjects) return filteredProjects
    return filteredProjects.slice(0, DEFAULT_PROJECT_LIMIT)
  }, [activeCategory, filteredProjects, isShowingAllProjects])

  const countLabel = activeCategory === 'Semua' && !isShowingAllProjects
    ? `${visibleProjects.length} dari ${filteredProjects.length} proyek ditampilkan`
    : `${filteredProjects.length} proyek ditampilkan`

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    if (category === 'Semua') setShowAllProjects(showAllByDefault)
  }

  return (
    <section
      className={showHeading ? 'section-padding border-y border-white/[0.07] bg-white/[0.015]' : 'pb-24 pt-4 md:pb-32'}
      aria-labelledby={showHeading ? 'projects-heading' : undefined}
      aria-label={showHeading ? undefined : 'Daftar semua proyek'}
    >
      <div className="container-shell">
        {showHeading ? (
          <motion.div
            variants={sectionReveal}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeading
              eyebrow="Projects"
              title="Project & Praktik Saya"
              description="Pilihan project yang saya kerjakan selama sekolah, pelatihan, kompetisi, dan proses belajar mandiri. Detail teknis dapat dibuka pada setiap project."
              headingId="projects-heading"
            />
          </motion.div>
        ) : null}

        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori proyek">
            {projectCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                aria-pressed={activeCategory === category}
                className={cn(
                  'focus-ring min-h-11 shrink-0 rounded-lg border px-4 py-2 text-xs font-medium transition',
                  activeCategory === category
                    ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100'
                    : 'border-slate-700 bg-slate-900/55 text-slate-300 hover:border-slate-500 hover:text-slate-100',
                )}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="shrink-0 text-xs text-slate-400" aria-live="polite" aria-atomic="true">
            {countLabel}
          </p>
        </div>

        <motion.div
          id="project-grid"
          key={`${activeCategory}-${isShowingAllProjects}`}
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="show"
          className="grid items-stretch gap-5 lg:grid-cols-2"
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              shouldReduceMotion={shouldReduceMotion}
              headingLevel={showHeading ? 3 : 2}
              isWide={visibleProjects.length % 2 === 1 && index === visibleProjects.length - 1}
            />
          ))}
        </motion.div>

        {activeCategory === 'Semua' && filteredProjects.length > DEFAULT_PROJECT_LIMIT && !forceShowDeepLinkedProject && !showAllByDefault ? (
          <motion.div
            variants={sectionReveal}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <button
              type="button"
              onClick={() => setShowAllProjects((current) => !current)}
              aria-controls="project-grid"
              aria-expanded={isShowingAllProjects}
              className="group focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/45 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:text-cyan-100"
            >
              {isShowingAllProjects ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua Project'}
              <FaChevronDown
                className={cn('transition-transform duration-200 group-hover:translate-y-0.5', isShowingAllProjects && 'rotate-180')}
                size={12}
                aria-hidden="true"
              />
            </button>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}

export default function ProjectsSection({ showAllByDefault = false, showHeading = true }) {
  const { hash } = useLocation()
  let decodedHash = ''
  try {
    decodedHash = decodeURIComponent(hash)
  } catch {
    decodedHash = ''
  }
  const viewKey = decodedHash.startsWith('#project-') ? decodedHash : 'project-showcase'

  return (
    <ProjectsContent
      key={`${viewKey}-${showAllByDefault}`}
      hash={decodedHash}
      showAllByDefault={showAllByDefault}
      showHeading={showHeading}
    />
  )
}
