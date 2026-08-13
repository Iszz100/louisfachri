import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router'
import SectionHeading from '../components/common/SectionHeading'
import { certifications } from '../data/certifications'
import { cardInteraction, sectionReveal, staggerContainer } from '../utils/motion'

const previewCertifications = certifications.slice(0, 3)

export default function CertificationsPreviewSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-padding pt-0" aria-labelledby="certification-preview-heading">
      <div className="container-shell">
        <motion.div
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <SectionHeading
            eyebrow="Certifications"
            title="Sertifikasi & Pencapaian"
            description="Beberapa pelatihan, kompetisi, dan pencapaian yang saya peroleh selama proses belajar."
            headingId="certification-preview-heading"
          />
          <Link
            to="/sertifikasi"
            className="group focus-ring mb-8 inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:text-cyan-100 md:self-auto"
          >
            Lihat Semua Sertifikasi
            <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={13} aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {previewCertifications.map((certification) => (
            <motion.article
              key={certification.id}
              variants={sectionReveal}
              whileHover={shouldReduceMotion ? undefined : cardInteraction.hover}
              className="polish-card group/certificate overflow-hidden rounded-2xl border border-slate-700/65 bg-slate-900/45 md:last:col-span-2 md:last:w-[calc(50%-0.5rem)] md:last:justify-self-center xl:last:col-span-1 xl:last:w-auto"
            >
              <div className="media-zoom aspect-[16/10] overflow-hidden border-b border-slate-800 bg-slate-950/75 p-2.5">
                <img
                  src={certification.imageMedium}
                  srcSet={`${certification.imageSmall} 480w, ${certification.imageMedium} 640w`}
                  sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc(50vw - 3rem), 370px"
                  width={certification.imageWidth}
                  height={certification.imageHeight}
                  alt={`Sertifikat ${certification.title}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.15em]">
                  <span className="text-cyan-300">{certification.year}</span>
                  <span className="text-right text-slate-400">{certification.issuer}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold leading-6 text-slate-100">{certification.title}</h3>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
