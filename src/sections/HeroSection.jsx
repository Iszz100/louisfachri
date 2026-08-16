import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaArrowRight, FaDownload, FaEnvelope } from 'react-icons/fa6'
import cvFile from '../assets/CV Louis Fachri Putra Jatmiko.pdf'
import profilePhoto from '../assets/foto_profil.webp'
import profilePhoto360 from '../assets/foto_profil_360.webp'
import profilePhoto540 from '../assets/foto_profil_540.webp'
import profilePhoto720 from '../assets/foto_profil_720.webp'
import { profile } from '../data/profile'
import useResponsiveMotion from '../hooks/useResponsiveMotion'
import { premiumEase } from '../utils/motion'

const entrance = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: premiumEase },
  }),
}

const nameSequence = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.12, staggerChildren: 0.08 },
  },
}

const nameWord = {
  hidden: { opacity: 0, y: 26, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.76, ease: premiumEase },
  },
}

export default function HeroSection() {
  const heroRef = useRef(null)
  const { isMobile, prefersReducedMotion: shouldReduceMotion } = useResponsiveMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -22])
  const ambientY = useTransform(scrollYProgress, [0, 1], [0, 28])
  const parallaxEnabled = !isMobile && !shouldReduceMotion
  const initial = shouldReduceMotion ? false : 'hidden'

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b border-white/[0.07] pt-[72px]"
    >
      <div className="hero-backdrop" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="hero-parallax-orb pointer-events-none absolute right-[7%] top-[18%] -z-[1] hidden h-56 w-56 rounded-full md:block"
        style={parallaxEnabled ? { y: ambientY } : undefined}
      />
      <div className="container-shell relative flex min-h-[calc(100svh-72px)] items-center py-16 sm:py-20 lg:min-h-[760px] lg:py-24">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] lg:gap-20">
          <div className="max-w-[760px]">
            <motion.div
              variants={entrance}
              custom={0.02}
              initial={initial}
              animate="show"
              className="inline-flex min-h-9 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                {profile.status}
              </span>
            </motion.div>

            <motion.p
              variants={entrance}
              custom={0.07}
              initial={initial}
              animate="show"
              className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cyan-300"
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              id="hero-heading"
              aria-label={profile.name}
              variants={shouldReduceMotion ? undefined : nameSequence}
              initial={initial}
              animate="show"
              className="mt-3 max-w-[11ch] text-[clamp(3rem,7.2vw,6.35rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-slate-50"
            >
              {profile.displayName.split(' ').map((word) => (
                <motion.span
                  key={word}
                  aria-hidden="true"
                  variants={shouldReduceMotion ? undefined : nameWord}
                  className="mr-[0.18em] inline-block last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={entrance}
              custom={0.29}
              initial={initial}
              animate="show"
              className="mt-7 max-w-[720px] text-[clamp(1.2rem,2.2vw,1.7rem)] font-medium leading-[1.3] tracking-[-0.025em] text-slate-100"
            >
              Junior System Administrator <span className="text-slate-400">&amp;</span>{' '}
              <span className="text-cyan-200">Cybersecurity Enthusiast</span>
            </motion.p>

            <motion.p
              variants={entrance}
              custom={0.41}
              initial={initial}
              animate="show"
              className="mt-5 max-w-[62ch] text-base leading-7 text-slate-400 sm:text-[1.05rem] sm:leading-8"
            >
              {profile.shortPitch}
            </motion.p>

            <motion.div
              variants={entrance}
              custom={0.51}
              initial={initial}
              animate="show"
              className="mt-9 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap"
            >
              <motion.a
                href="#featured-project"
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.015 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.22, ease: premiumEase }}
                className="group focus-ring inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061015] transition-colors duration-200 hover:bg-cyan-200"
              >
                View My Work
                <FaArrowRight className="transition-transform group-hover:translate-x-1" size={13} aria-hidden="true" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.22, ease: premiumEase }}
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-slate-100 transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                <FaEnvelope size={13} aria-hidden="true" />
                Contact Me
              </motion.a>
              <motion.a
                href={cvFile}
                download="CV-Louis-Fachri-Putra-Jatmiko.pdf"
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.22, ease: premiumEase }}
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:text-cyan-100"
                aria-label="Download CV Louis Fachri dalam format PDF"
              >
                <FaDownload size={12} aria-hidden="true" />
                Download CV
              </motion.a>
            </motion.div>

            <motion.dl
              variants={entrance}
              custom={0.61}
              initial={initial}
              animate="show"
              className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-white/[0.08] pt-5 text-xs sm:flex sm:gap-10"
            >
              <div>
                <dt className="font-mono uppercase tracking-[0.16em] text-slate-400">Based in</dt>
                <dd className="mt-1.5 text-slate-300">Sidoarjo, Indonesia</dd>
              </div>
              <div>
                <dt className="font-mono uppercase tracking-[0.16em] text-slate-400">Currently</dt>
                <dd className="mt-1.5 text-slate-300">Cybersecurity Intern</dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            style={parallaxEnabled ? { y: portraitY } : undefined}
            className="relative mx-auto w-full max-w-[430px] lg:mx-0 lg:ml-auto"
          >
            <motion.figure
              initial={initial}
              animate="show"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.985, filter: 'blur(7px)' },
                show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.76, delay: 0.2, ease: premiumEase } },
              }}
              className="relative"
            >
              <div className="absolute -inset-5 -z-10 rounded-[2.2rem] bg-cyan-300/[0.035] blur-2xl" aria-hidden="true" />
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b111a] shadow-[0_28px_80px_rgba(0,0,0,0.38)]">
                <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">Portrait / 01</span>
                  <span className="flex items-center gap-2 text-[0.65rem] font-medium text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
                    Learning by doing
                  </span>
                </div>
                <div className="relative m-2.5 overflow-hidden rounded-[1.05rem] bg-slate-100">
                  <img
                    src={profilePhoto}
                    srcSet={`${profilePhoto360} 360w, ${profilePhoto540} 540w, ${profilePhoto720} 720w, ${profilePhoto} 1100w`}
                    sizes="(max-width: 1023px) calc(100vw - 3rem), 430px"
                    alt="Louis Fachri Putra Jatmiko"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    width="585"
                    height="708"
                    className="aspect-[4/5] w-full object-cover object-[50%_18%]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#071019]/85 via-[#071019]/20 to-transparent" aria-hidden="true" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cyan-200">Primary focus</p>
                      <p className="mt-1 text-sm font-semibold text-white">Systems &amp; Defensive Security</p>
                    </div>
                    <span className="hidden rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[0.62rem] text-white/80 backdrop-blur-sm sm:block">
                      LF / 2026
                    </span>
                  </figcaption>
                </div>
              </div>
            </motion.figure>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
