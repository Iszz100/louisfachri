import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { profile } from '../data/profile'
import { premiumEase } from '../utils/motion'

const footerLinks = [
  { label: 'GitHub', href: profile.links.github, icon: <FaGithub size={13} aria-hidden="true" /> },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: <FaLinkedinIn size={13} aria-hidden="true" /> },
  { label: 'Email', href: profile.links.email, icon: <FaEnvelope size={13} aria-hidden="true" /> },
]

const contactSequence = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.64,
      ease: premiumEase,
      staggerChildren: 0.09,
    },
  },
}

const contactItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: premiumEase },
  },
}

export default function ClosingSection() {
  const currentYear = new Date().getFullYear()
  const shouldReduceMotion = useReducedMotion()

  return (
    <footer className="border-t border-white/[0.07] pt-5" aria-labelledby="contact-heading">
      <div className="container-shell py-10 sm:py-14">
        <motion.section
          variants={contactSequence}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="contact-panel relative isolate overflow-hidden rounded-[1.5rem] border border-white/[0.09] px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        >
          <div className="relative z-10 grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <motion.p variants={shouldReduceMotion ? undefined : contactItem} className="technical-label text-cyan-300">Have a role or project in mind?</motion.p>
              <motion.h2 variants={shouldReduceMotion ? undefined : contactItem} id="contact-heading" className="mt-5 text-[clamp(2.25rem,5.3vw,4.8rem)] font-semibold leading-[1] tracking-[-0.05em] text-slate-50">
                Let&apos;s build something reliable.
              </motion.h2>
              <motion.p variants={shouldReduceMotion ? undefined : contactItem} className="mt-6 max-w-[62ch] text-base leading-7 text-slate-400">
                Saya terbuka untuk kesempatan di System Administration, IT Infrastructure, dan Cybersecurity—termasuk internship maupun peran junior.
              </motion.p>
            </div>

            <motion.a
              variants={shouldReduceMotion ? undefined : contactItem}
              href={profile.links.email}
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
              transition={{ duration: 0.22, ease: premiumEase }}
              className="group focus-ring inline-flex min-h-12 w-fit items-center gap-3 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061015] transition-colors hover:bg-cyan-200"
            >
              Contact Me
              <FaArrowRight className="transition-transform group-hover:translate-x-1" size={13} aria-hidden="true" />
            </motion.a>
          </div>
        </motion.section>

        <div className="mt-10 grid gap-8 border-b border-white/[0.07] pb-9 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-lg font-semibold tracking-[-0.025em] text-slate-100">Louis Fachri</p>
            <p className="mt-2 text-sm text-slate-400">Junior System Administrator &amp; Cybersecurity Enthusiast</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Tautan sosial dan kontak">
            {footerLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md text-sm text-slate-400 transition hover:text-cyan-200"
              >
                {icon}
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-2 pt-5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate-400 sm:flex-row sm:items-center">
          <p>© {currentYear} Louis Fachri.</p>
          <p>Built with clarity, curiosity, and care.</p>
        </div>
      </div>
    </footer>
  )
}
