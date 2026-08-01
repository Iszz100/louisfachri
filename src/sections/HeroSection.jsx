import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import useResponsiveMotion from '../hooks/useResponsiveMotion'
import cvFile from '../assets/CV Louis Fachri Putra Jatmiko.pdf'
import profilePhoto from '../assets/foto_profil.webp'
import profilePhoto360 from '../assets/foto_profil_360.webp'
import profilePhoto540 from '../assets/foto_profil_540.webp'
import profilePhoto720 from '../assets/foto_profil_720.webp'

export default function HeroSection() {
  const { reduceMotion, isMobile, prefersReducedMotion } = useResponsiveMotion()
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const shouldReduceAllMotion = prefersReducedMotion
  const useLiteMotion = isMobile && !prefersReducedMotion
  const cinematicEase = [0.22, 1, 0.36, 1]
  const headingDistance = useLiteMotion ? 20 : 40
  const profileDistance = useLiteMotion ? 32 : 60

  const descriptionChunks = useMemo(() => {
    return profile.shortPitch
      .split('. ')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part, index, array) => {
        const hasFinalPunctuation = /[.!?]$/.test(part)
        if (hasFinalPunctuation) return part
        return `${part}${index === array.length - 1 ? '.' : '. '}`
      })
  }, [])

  const headingMotion = shouldReduceAllMotion
    ? {}
    : {
        initial: { y: headingDistance },
        animate: { y: 0 },
        transition: { duration: 0.8, ease: cinematicEase, delay: 0.2 },
      }

  const subtitleMotion = shouldReduceAllMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: [0, 1, useLiteMotion ? 0.68 : 0.6, 1], y: [8, 0, 0, 0] },
        transition: {
          duration: useLiteMotion ? 5.4 : 7.2,
          times: [0, 0.16, 0.58, 1],
          ease: 'easeInOut',
          delay: 0.4,
          repeat: useLiteMotion ? 0 : Infinity,
          repeatDelay: 1.9,
        },
      }

  const descriptionContainer = shouldReduceAllMotion
    ? {}
    : {
        initial: 'hidden',
        animate: 'show',
        variants: {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              delayChildren: 0.6,
              staggerChildren: useLiteMotion ? 0.08 : 0.13,
            },
          },
        },
      }

  const descriptionItem = {
    hidden: { opacity: 0, y: useLiteMotion ? 8 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: useLiteMotion ? 0.35 : 0.45, ease: cinematicEase } },
  }

  const buttonContainer = shouldReduceAllMotion
    ? {}
    : {
        initial: 'hidden',
        animate: 'show',
        variants: {
          hidden: { opacity: 0, y: 12 },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              delayChildren: 0.74,
              staggerChildren: 0.08,
            },
          },
        },
      }

  const buttonItem = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.42, ease: cinematicEase } },
  }

  const profileCardMotion = shouldReduceAllMotion
    ? {}
    : {
        initial: { opacity: 0, x: profileDistance },
        animate: {
          opacity: 1,
          x: 0,
          y: useLiteMotion ? [0, -4, 0] : [0, -8, 0],
        },
        transition: {
          opacity: { duration: 0.8, ease: cinematicEase, delay: 0.3 },
          x: { duration: 0.8, ease: cinematicEase, delay: 0.3 },
          y: {
            duration: useLiteMotion ? 8.5 : 6.5,
            ease: 'easeInOut',
            repeat: useLiteMotion ? 0 : Infinity,
            repeatType: 'loop',
            delay: 1.25,
          },
        },
      }

  const profileTiltStyle = reduceMotion
    ? undefined
    : {
        transform: `perspective(920px) rotateX(${(-pointer.y * 0.28).toFixed(2)}deg) rotateY(${(pointer.x * 0.35).toFixed(2)}deg)`,
      }

  const copyMotionStyle = reduceMotion
    ? undefined
    : {
        transform: `translate3d(${(pointer.x * 0.3).toFixed(2)}px, ${(pointer.y * 0.18).toFixed(2)}px, 0)`,
      }

  const onMouseMove = (event) => {
    if (reduceMotion) return
    const { clientX, clientY } = event
    const intensity = isMobile ? 9 : 20
    const x = (clientX / window.innerWidth - 0.5) * intensity
    const y = (clientY / window.innerHeight - 0.5) * intensity
    setPointer({ x, y })
  }

  return (
    <section
      id="hero"
      onMouseMove={onMouseMove}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-20 md:pt-24"
    >
      <motion.div
        aria-hidden
        className="hero-cinematic-gradient"
        initial={shouldReduceAllMotion ? false : { opacity: 0.72 }}
        animate={
          shouldReduceAllMotion
            ? { opacity: 0.86 }
            : { opacity: [0.72, 0.92, 0.78] }
        }
        transition={{
          duration: useLiteMotion ? 14 : 18,
          ease: 'easeInOut',
          repeat: shouldReduceAllMotion || useLiteMotion ? 0 : Infinity,
        }}
      />
      <div aria-hidden className="hero-ambient-glow" />
      <div aria-hidden className="hero-ambient-lines" />

      <motion.div
        aria-hidden
        className="hero-floating-orb hero-floating-orb-a"
        animate={
          shouldReduceAllMotion ? { x: 0, y: 0, scale: 1 } : { x: [0, 18, 0], y: [0, -14, 0], scale: [1, 1.06, 1] }
        }
        transition={{
          duration: useLiteMotion ? 12 : 16,
          ease: 'easeInOut',
          repeat: shouldReduceAllMotion || useLiteMotion ? 0 : Infinity,
        }}
      />
      <motion.div
        aria-hidden
        className="hero-floating-orb hero-floating-orb-b"
        animate={
          shouldReduceAllMotion
            ? { x: 0, y: 0, scale: 1 }
            : { x: [0, -16, 0], y: [0, 12, 0], scale: [1, 0.94, 1] }
        }
        transition={{
          duration: useLiteMotion ? 10 : 14,
          ease: 'easeInOut',
          repeat: shouldReduceAllMotion || useLiteMotion ? 0 : Infinity,
          delay: 0.8,
        }}
      />

      <div className="container-shell relative z-10 py-6 md:py-10">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="hero-copy-block lg:col-span-8" style={copyMotionStyle}>
            <motion.div
              className="hero-intro-chip mb-6 inline-flex items-center gap-3 rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-2"
              initial={shouldReduceAllMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceAllMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceAllMotion ? undefined : { duration: 0.55, ease: cinematicEase, delay: 0.05 }}
            >
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.85)]" />
              <span className="text-[11px] uppercase tracking-[0.19em] text-slate-300">LFPJ • SISWA SMK SIJA</span>
            </motion.div>

            <motion.p
              className="hero-eyebrow mb-4 text-xs uppercase tracking-[0.2em] text-cyan-300"
              initial={shouldReduceAllMotion ? false : { opacity: 0, y: 12 }}
              animate={shouldReduceAllMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceAllMotion ? undefined : { duration: 0.5, ease: cinematicEase, delay: 0.12 }}
            >
              Portofolio Siswa SIJA • {profile.location}
            </motion.p>

            <motion.h1 className="hero-title max-w-5xl text-hero font-semibold leading-[1.03]" {...headingMotion}>
              <span className="hero-name-glow block text-gradient">{profile.name}</span>
              <motion.span
                className="hero-roleline mt-2 block text-[clamp(0.95rem,1.3vw,1.2rem)] font-medium uppercase tracking-[0.22em] text-slate-400"
                {...subtitleMotion}
              >
                SYSTEM ADMINISTRATOR • CYBERSECURITY
              </motion.span>
            </motion.h1>

            <motion.div
              className="hero-role-badge mt-5 inline-flex max-w-full whitespace-normal rounded-full border border-blue-400/35 bg-blue-400/10 px-3 py-2 text-center text-xs text-blue-200 sm:px-4 sm:text-sm"
              initial={shouldReduceAllMotion ? false : { opacity: 0, filter: 'blur(7px)' }}
              animate={shouldReduceAllMotion ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }}
              transition={shouldReduceAllMotion ? undefined : { duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
              {profile.roles[0]}
            </motion.div>

            <motion.p className="hero-pitch mt-7 max-w-2xl text-body leading-relaxed text-slate-300" {...descriptionContainer}>
              {descriptionChunks.map((chunk, index) => (
                <motion.span key={`${chunk}-${index}`} className="inline" variants={descriptionItem}>
                  {index > 0 ? ' ' : ''}
                  {chunk}
                </motion.span>
              ))}
            </motion.p>

            <div className="hero-signal-strip mt-6" aria-hidden>
              <span />
              <span />
              <span />
            </div>

            <motion.div className="hero-cta-group mt-10 flex flex-wrap gap-4 max-[767px]:flex-col" {...buttonContainer}>
              <motion.a
                href="#projects"
                className="btn-premium hero-cta-btn btn-glow border-cyan-300/55 bg-cyan-400/12 text-cyan-200"
                variants={buttonItem}
                whileHover={shouldReduceAllMotion ? undefined : { y: -3, scale: 1.01 }}
                whileTap={shouldReduceAllMotion ? undefined : { scale: 0.985 }}
              >
                Lihat Proyek
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-premium hero-cta-btn border-slate-600 bg-slate-900/70 text-slate-100 hover:border-slate-500"
                variants={buttonItem}
                whileHover={shouldReduceAllMotion ? undefined : { y: -3, scale: 1.01 }}
                whileTap={shouldReduceAllMotion ? undefined : { scale: 0.985 }}
              >
                Kontak
              </motion.a>
              <motion.a
                href={cvFile}
                download="CV-Louis-Fachri-Putra-Jatmiko.pdf"
                type="application/pdf"
                aria-label="Download CV (PDF) Louis Fachri"
                className="btn-premium hero-cta-btn border-blue-300/50 bg-blue-400/10 text-blue-100"
                variants={buttonItem}
                whileHover={shouldReduceAllMotion ? undefined : { y: -3, scale: 1.01 }}
                whileTap={shouldReduceAllMotion ? undefined : { scale: 0.985 }}
              >
                Download CV (PDF)
              </motion.a>
            </motion.div>
          </div>

          <div className="mx-auto w-full max-w-[300px] lg:col-span-4 lg:max-w-[350px]">
            <motion.div className="profile-showcase" {...profileCardMotion} whileHover={shouldReduceAllMotion ? undefined : { scale: 1.01 }}>
              <div aria-hidden className="profile-aura" />
              <div aria-hidden className="profile-orbit" />

              <div className="profile-shell profile-shell-tilt" style={profileTiltStyle}>
                <div className="profile-headline">
                  <span className="profile-signal" />
                  <span>Profile Preview</span>
                </div>

                <div className="profile-image-wrap">
                  <img
                    src={profilePhoto}
                    srcSet={`${profilePhoto360} 360w, ${profilePhoto540} 540w, ${profilePhoto720} 720w, ${profilePhoto} 1100w`}
                    sizes="(max-width: 767px) 72vw, (max-width: 1024px) 42vw, 350px"
                    alt="Foto profil Louis"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    width="585"
                    height="708"
                    className="profile-image aspect-[3/4] w-full object-cover object-[50%_20%]"
                  />
                  <div aria-hidden className="profile-glint" />
                  <div aria-hidden className="profile-scanline" />
                </div>

                <div className="profile-tags">
                  <motion.span
                    className="profile-tag profile-tag-cyan profile-tag-interactive"
                    whileHover={shouldReduceAllMotion ? undefined : { scale: 1.05, y: -1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    System Administrator
                  </motion.span>
                  <motion.span
                    className="profile-tag profile-tag-purple profile-tag-interactive"
                    whileHover={shouldReduceAllMotion ? undefined : { scale: 1.05, y: -1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    Cybersecurity
                  </motion.span>
                </div>

                <p className="px-2 pb-1 pt-3 text-center text-xs uppercase tracking-[0.16em] text-slate-400">Foto profil</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        style={{
          transform: reduceMotion ? 'translate3d(0, 0, 0)' : `translate3d(${pointer.x}px, ${pointer.y}px, 0)`,
        }}
        className="pointer-events-none absolute right-[8%] top-[20%] h-52 w-52 rounded-full bg-cyan-400/18 blur-3xl transition-transform duration-300 ease-out"
      />
      <div
        aria-hidden
        style={{
          transform:
            reduceMotion ? 'translate3d(0, 0, 0)' : `translate3d(${pointer.x * -0.55}px, ${pointer.y * -0.55}px, 0)`,
        }}
        className="pointer-events-none absolute left-[15%] top-[14%] h-44 w-44 rounded-full bg-blue-500/14 blur-3xl transition-transform duration-300 ease-out"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-6rem] left-[10%] h-64 w-64 animate-pulseGlow rounded-full bg-purple-500/18 blur-3xl"
      />
    </section>
  )
}
