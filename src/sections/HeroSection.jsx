import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaDownload, FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import cvFile from '../assets/CV Louis Fachri Putra Jatmiko.pdf'
import profilePhoto from '../assets/foto_profil.webp'
import profilePhoto360 from '../assets/foto_profil_360.webp'
import profilePhoto540 from '../assets/foto_profil_540.webp'
import profilePhoto720 from '../assets/foto_profil_720.webp'
import { profile } from '../data/profile'

const entrance = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const profileEntrance = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
  },
}

const socialLinks = [
  { label: 'GitHub', href: profile.links.github, icon: <FaGithub size={15} aria-hidden="true" /> },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: <FaLinkedinIn size={15} aria-hidden="true" /> },
  { label: 'Email', href: profile.links.email, icon: <FaEnvelope size={15} aria-hidden="true" /> },
]

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const initial = shouldReduceMotion ? false : 'hidden'

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-slate-800/70 pt-24 sm:pt-28 lg:flex lg:min-h-[820px] lg:items-center lg:pt-20"
    >
      <div aria-hidden className="hero-backdrop" />
      <div className="container-shell relative z-10 py-14 sm:py-16 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(330px,0.65fr)] lg:gap-14">
          <div className="max-w-3xl">
            <motion.div
              variants={entrance}
              custom={0.02}
              initial={initial}
              animate="show"
              className="inline-flex min-h-9 items-center gap-2.5 rounded-full border border-cyan-300/25 bg-cyan-300/[0.06] px-3.5 py-2"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-100">
                {profile.status}
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={entrance}
              custom={0.09}
              initial={initial}
              animate="show"
              className="mt-7 max-w-[13ch] text-[clamp(2.65rem,6.4vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-slate-50"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={entrance}
              custom={0.15}
              initial={initial}
              animate="show"
              className="mt-6 text-[clamp(1.15rem,2vw,1.55rem)] font-medium tracking-[-0.015em] text-cyan-200"
            >
              {profile.role}
            </motion.p>

            <motion.p
              variants={entrance}
              custom={0.21}
              initial={initial}
              animate="show"
              className="mt-5 max-w-[680px] text-[clamp(1rem,1.3vw,1.12rem)] leading-8 text-slate-300"
            >
              {profile.shortPitch}
            </motion.p>

            <motion.div
              variants={entrance}
              custom={0.27}
              initial={initial}
              animate="show"
              className="mt-8 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap"
            >
              <a
                href="#featured-project"
                className="group focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Lihat Proyek
                <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={14} aria-hidden="true" />
              </a>
              <a
                href={cvFile}
                download="CV-Louis-Fachri-Putra-Jatmiko.pdf"
                aria-label="Download CV Louis Fachri dalam format PDF"
                className="group focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-900/65 px-5 py-3 text-sm font-semibold text-slate-100 transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-800/80"
              >
                <FaDownload className="transition-transform duration-200 group-hover:translate-y-0.5" size={14} aria-hidden="true" />
                Download CV
              </a>
            </motion.div>

            <motion.div
              variants={entrance}
              custom={0.33}
              initial={initial}
              animate="show"
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2"
              aria-label="Tautan profil dan kontak"
            >
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md text-sm text-slate-400 transition duration-200 hover:-translate-y-0.5 hover:text-cyan-200"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </motion.div>

            <motion.div
              variants={entrance}
              custom={0.39}
              initial={initial}
              animate="show"
              className="mt-9 border-t border-slate-800/90 pt-5"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Fokus saat ini</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Teknologi yang sedang dipelajari">
                {profile.currentFocus.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-slate-700/80 bg-slate-900/55 px-3 py-1.5 text-xs font-medium text-slate-300 transition duration-200 hover:border-slate-600 hover:text-slate-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.aside
            variants={profileEntrance}
            initial={initial}
            animate="show"
            aria-label="Ringkasan profil Louis Fachri"
            className="mx-auto w-full max-w-[390px]"
          >
            <div className="profile-card overflow-hidden rounded-[1.35rem] border border-slate-700/80 bg-slate-950/80 shadow-card">
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-4 py-3.5 sm:px-5">
                <p className="font-mono text-xs font-semibold tracking-[0.16em] text-slate-200">{profile.card.handle}</p>
                <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.14em] text-emerald-200">
                  <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
                  Active
                </span>
              </div>

              <div className="relative m-2.5 overflow-hidden rounded-xl border border-slate-700/70 bg-slate-200">
                <img
                  src={profilePhoto}
                  srcSet={`${profilePhoto360} 360w, ${profilePhoto540} 540w, ${profilePhoto720} 720w, ${profilePhoto} 1100w`}
                  sizes="(max-width: 767px) calc(100vw - 3rem), 390px"
                  alt="Louis Fachri Putra Jatmiko"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width="585"
                  height="708"
                  className="aspect-[4/5] w-full object-cover object-[50%_18%]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent px-4 pb-4 pt-16">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Learning &amp; Building</p>
                </div>
              </div>

              <dl className="grid grid-cols-2 border-t border-slate-800">
                <div className="border-b border-r border-slate-800 px-4 py-3.5">
                  <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-slate-400">Focus</dt>
                  <dd className="mt-1.5 text-xs leading-5 text-slate-200">{profile.card.focus}</dd>
                </div>
                <div className="border-b border-slate-800 px-4 py-3.5">
                  <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-slate-400">Location</dt>
                  <dd className="mt-1.5 text-xs leading-5 text-slate-200">{profile.card.location}</dd>
                </div>
                <div className="col-span-2 px-4 py-3.5">
                  <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-slate-400">Currently</dt>
                  <dd className="mt-1.5 flex items-center gap-2 text-xs text-cyan-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
                    {profile.card.currently}
                  </dd>
                </div>
              </dl>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
