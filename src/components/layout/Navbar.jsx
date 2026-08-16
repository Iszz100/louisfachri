import { useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaBars, FaXmark } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router'

const primaryLinks = [
  { label: 'Beranda', to: '/#hero', homeSections: ['hero', 'capabilities'] },
  { label: 'Proyek', to: '/projects', path: '/projects', homeSections: ['featured-project'] },
  { label: 'Sertifikasi', to: '/sertifikasi', path: '/sertifikasi', homeSections: ['certifications'] },
  { label: 'Tentang', to: '/#about', homeSections: ['about', 'contact'] },
]

const observedSections = ['hero', 'capabilities', 'featured-project', 'about', 'certifications', 'contact']

export default function Navbar() {
  const location = useLocation()
  const menuButtonRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const updateSurface = () => setIsScrolled(window.scrollY > 12)
    updateSurface()
    window.addEventListener('scroll', updateSurface, { passive: true })
    return () => window.removeEventListener('scroll', updateSurface)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setMobileOpen(false)
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileOpen])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    let pendingFrame = 0
    const syncActiveSection = () => {
      pendingFrame = 0
      const activationLine = Math.min(window.innerHeight * 0.34, 320)
      let currentSection = observedSections[0]

      observedSections.forEach((id) => {
        const element = document.getElementById(id)
        const bounds = element?.getBoundingClientRect()
        if (bounds && (id === 'hero' || bounds.height > 0) && bounds.top <= activationLine) {
          currentSection = id
        }
      })

      setActiveSection(currentSection)
    }

    const scheduleSync = () => {
      if (pendingFrame) return
      pendingFrame = window.requestAnimationFrame(syncActiveSection)
    }

    const observer = new IntersectionObserver(
      scheduleSync,
      { rootMargin: '-18% 0px -58% 0px', threshold: [0, 0.2, 0.5] },
    )

    const initialFrame = window.requestAnimationFrame(() => {
      observedSections.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.observe(element)
      })
      syncActiveSection()
    })
    window.addEventListener('scroll', scheduleSync, { passive: true })
    window.addEventListener('resize', scheduleSync)

    return () => {
      window.cancelAnimationFrame(initialFrame)
      if (pendingFrame) window.cancelAnimationFrame(pendingFrame)
      observer.disconnect()
      window.removeEventListener('scroll', scheduleSync)
      window.removeEventListener('resize', scheduleSync)
    }
  }, [location.pathname])

  const isActive = (item) => {
    if (item.path && location.pathname === item.path) return true
    if (location.pathname !== '/') return false
    return item.homeSections.includes(activeSection)
  }

  const hasSurface = isScrolled || mobileOpen || location.pathname !== '/'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
        hasSurface
          ? 'border-white/[0.07] bg-[#080c12]/90 shadow-[0_10px_35px_rgba(0,0,0,0.22)] backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className={`container-shell flex items-center justify-between gap-5 transition-[height] duration-500 ${hasSurface ? 'h-16' : 'h-[72px]'}`}>
        <Link
          to="/#hero"
          className="focus-ring group inline-flex items-center gap-3 rounded-lg"
          aria-label="LF — Louis Fachri, kembali ke beranda"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] font-mono text-sm font-semibold tracking-[-0.04em] text-cyan-200 transition group-hover:border-cyan-300/35">
            LF
          </span>
          <span className="hidden text-sm font-semibold tracking-[-0.02em] text-slate-100 sm:block">
            Louis Fachri
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {primaryLinks.map((item) => {
            const active = isActive(item)
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? (location.pathname === item.path ? 'page' : 'location') : undefined}
                className={`group/nav focus-ring relative rounded-lg px-3.5 py-2 text-[0.82rem] font-medium transition-colors ${
                  active ? 'text-slate-50' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3.5 bottom-1 h-px origin-left bg-cyan-300 transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        <Link
          to="/#contact"
          className="group focus-ring hidden min-h-10 items-center gap-2 rounded-lg border border-cyan-300/35 bg-cyan-300/[0.06] px-4 text-xs font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-300/[0.1] lg:inline-flex"
        >
          Hubungi Saya
          <FaArrowRight className="transition-transform group-hover:translate-x-1" size={11} aria-hidden="true" />
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100 lg:hidden"
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <FaXmark size={19} aria-hidden="true" /> : <FaBars size={17} aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-nav" className="border-t border-white/[0.07] bg-[#080c12]/98 px-4 pb-6 pt-3 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-[1220px] flex-col gap-1" aria-label="Navigasi mobile">
            {primaryLinks.map((item) => {
              const active = isActive(item)
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? (location.pathname === item.path ? 'page' : 'location') : undefined}
                  className={`focus-ring flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-medium transition ${
                    active ? 'bg-white/[0.055] text-cyan-100' : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition ${active ? 'bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.7)]' : 'bg-slate-700'}`}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
            <Link
              to="/#contact"
              onClick={() => setMobileOpen(false)}
              className="focus-ring mt-3 inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 text-sm font-semibold text-slate-950"
            >
              Hubungi Saya
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
