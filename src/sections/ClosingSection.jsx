import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaEnvelope, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { profile } from '../data/profile'
import { sectionReveal } from '../utils/motion'

const secondaryLinks = [
  { label: 'GitHub', href: profile.links.github, icon: <FaGithub size={14} aria-hidden="true" /> },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: <FaLinkedinIn size={14} aria-hidden="true" /> },
  { label: 'Instagram', href: profile.links.instagram, icon: <FaInstagram size={14} aria-hidden="true" /> },
]

export default function ClosingSection() {
  const currentYear = new Date().getFullYear()
  const shouldReduceMotion = useReducedMotion()

  return (
    <footer className="border-t border-slate-800/70 pb-8 pt-16 md:pt-16" aria-labelledby="contact-heading">
      <div className="container-shell">
        <motion.div
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/55 px-6 py-10 sm:px-8 md:px-12 md:py-12"
        >
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.19em] text-cyan-300">Contact</p>
              <h2 id="contact-heading" className="mt-4 text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-50">
                Mari Terhubung
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Saya terbuka untuk berdiskusi tentang teknologi, cybersecurity, kesempatan internship, atau project junior yang berkaitan dengan System Administration dan Cybersecurity.
              </p>
            </div>

            <a
              href={profile.links.email}
              className="group focus-ring inline-flex min-h-12 w-fit items-center gap-3 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              <FaEnvelope size={15} aria-hidden="true" />
              Kirim Email
              <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={13} aria-hidden="true" />
            </a>
          </div>

          <div className="relative mt-8 flex flex-col justify-between gap-5 border-t border-slate-800 pt-6 sm:flex-row sm:items-center">
            <a href={profile.links.email} className="focus-ring w-fit rounded-md text-sm text-slate-400 transition hover:text-cyan-200">
              louisfpj@gmail.com
            </a>
            <div className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Media sosial">
              {secondaryLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md text-sm text-slate-400 transition hover:text-cyan-200"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {currentYear} Louis Fachri Putra Jatmiko.</p>
          <p>Dibuat untuk mendokumentasikan proses belajar saya.</p>
        </div>
      </div>
    </footer>
  )
}
