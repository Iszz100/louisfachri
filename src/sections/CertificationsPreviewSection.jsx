import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import { certifications } from '../data/certifications'
import { sectionReveal, staggerContainer } from '../utils/motion'

const highlightedIds = ['cert-19', 'cert-17', 'cert-02']
const previewCertifications = highlightedIds
  .map((id) => certifications.find((certification) => certification.id === id))
  .filter(Boolean)

export default function CertificationsPreviewSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-padding border-t border-white/[0.07]" aria-labelledby="certification-preview-heading">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Credentials"
            title="Pencapaian yang menguatkan proses belajar."
            description="Beberapa kompetisi dan pelatihan yang paling relevan dengan fokus saya di cybersecurity."
            headingId="certification-preview-heading"
          />
          <Reveal distance={12} delay={0.16} className="mb-8">
            <Link
              to="/sertifikasi"
              className="group focus-ring inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-medium text-slate-300 transition hover:border-white/25 hover:text-white"
            >
              Semua Sertifikasi
              <FaArrowRight className="transition-transform group-hover:translate-x-1" size={12} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {previewCertifications.map((certification, index) => (
            <motion.article
              key={certification.id}
              variants={sectionReveal}
              className="polish-card group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] md:last:col-span-2 md:last:w-[calc(50%-0.5rem)] md:last:justify-self-center xl:last:col-span-1 xl:last:w-auto"
            >
              <div className="media-zoom relative aspect-[16/10] overflow-hidden border-b border-white/[0.07] bg-[#070b11] p-3">
                <img
                  src={certification.imageMedium}
                  srcSet={`${certification.imageSmall} 480w, ${certification.imageMedium} 640w`}
                  sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1279px) calc(33vw - 2rem), 380px"
                  width={certification.imageWidth}
                  height={certification.imageHeight}
                  alt={`Sertifikat ${certification.title}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-lg object-contain"
                />
                <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-[#080c12]/90 px-2.5 py-1 font-mono text-[0.58rem] text-slate-400 backdrop-blur">
                  0{index + 1}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 font-mono text-[0.61rem] uppercase tracking-[0.12em]">
                  <span className="text-cyan-300">{certification.year}</span>
                  <span className="truncate text-right text-slate-400 transition-transform duration-300 group-hover:scale-[1.02]">{certification.issuer}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-6 text-slate-100">{certification.title}</h3>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
