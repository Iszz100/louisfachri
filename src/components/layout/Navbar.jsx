import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router'
import { navLinks } from '../../data/profile'

const CommandPalette = lazy(() => import('../signature/CommandPalette'))

export default function Navbar() {
  const location = useLocation()
  const menuButtonRef = useRef(null)
  const previousLocationRef = useRef(`${location.pathname}${location.hash}`)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [activeSection, setActiveSection] = useState(() =>
    location.pathname === '/' ? location.hash.replace('#', '') || 'hero' : '',
  )

  useEffect(() => {
    const updateNavbarSurface = () => setIsScrolled(window.scrollY > 16)
    updateNavbarSurface()
    window.addEventListener('scroll', updateNavbarSurface, { passive: true })
    return () => window.removeEventListener('scroll', updateNavbarSurface)
  }, [])

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => setShowCommandPalette(true), { timeout: 1200 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = window.setTimeout(() => setShowCommandPalette(true), 900)
    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        window.requestAnimationFrame(() => menuButtonRef.current?.focus())
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [mobileOpen])

  useEffect(() => {
    const currentLocation = `${location.pathname}${location.hash}`
    if (previousLocationRef.current === currentLocation) return undefined

    previousLocationRef.current = currentLocation
    const frameId = window.requestAnimationFrame(() => setMobileOpen(false))
    return () => window.cancelAnimationFrame(frameId)
  }, [location.hash, location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (visibleEntry) setActiveSection(visibleEntry.target.id)
      },
      { rootMargin: '-18% 0px -70% 0px', threshold: 0 },
    )

    const frameId = window.requestAnimationFrame(() => {
      const sectionIds = ['hero', ...navLinks.map((item) => item.id)]
      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section) observer.observe(section)
      })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [location.pathname])

  const toSectionPath = (id) => `/#${id}`
  const desktopLinks = navLinks.filter((item) => item.id !== 'contact')
  const showNavbarSurface = isScrolled || mobileOpen || location.pathname !== '/'

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
        showNavbarSurface
          ? 'border-slate-800/90 bg-bg-primary/92 shadow-[0_8px_28px_rgba(2,6,23,0.24)]'
          : 'border-transparent bg-bg-primary/60'
      }`}
    >
      <div className="container-shell flex h-[68px] items-center justify-between gap-3">
        <Link
          to={toSectionPath('hero')}
          onClick={() => setMobileOpen(false)}
          className="focus-ring inline-flex items-center gap-3 rounded-md"
          aria-label="Louis Fachri, kembali ke beranda"
        >
          <span className="font-mono text-base font-semibold tracking-[-0.04em] text-cyan-200">LF.</span>
          <span className="hidden border-l border-slate-700 pl-3 text-[0.62rem] uppercase leading-4 tracking-[0.16em] text-slate-400 sm:block">
            System Admin<br />&amp; Security
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {desktopLinks.map((item) => (
            <Link
              key={item.id}
              to={toSectionPath(item.id)}
              aria-current={activeSection === item.id ? 'location' : undefined}
              className={`focus-ring rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-200 ${
                activeSection === item.id ? 'bg-slate-800/70 text-cyan-100' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/sertifikasi"
            aria-current={location.pathname === '/sertifikasi' ? 'page' : undefined}
            className={`focus-ring rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-200 ${
              location.pathname === '/sertifikasi' ? 'bg-slate-800/70 text-cyan-100' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            Sertifikasi
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {showCommandPalette ? (
            <Suspense fallback={null}>
              <CommandPalette registerShortcut />
            </Suspense>
          ) : null}
          <Link
            to={location.pathname !== '/' ? '/' : toSectionPath('contact')}
            className="focus-ring inline-flex min-h-10 items-center rounded-lg border border-cyan-300/35 bg-cyan-300/[0.07] px-3.5 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
          >
            {location.pathname !== '/' ? 'Beranda' : 'Hubungi Saya'}
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200 lg:hidden"
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <FaXmark size={20} /> : <FaBars size={18} />}
        </button>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-slate-800 bg-slate-950/98 px-4 pb-5 pt-3 shadow-card backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Navigasi mobile">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                to={toSectionPath(item.id)}
                onClick={() => setMobileOpen(false)}
                aria-current={activeSection === item.id ? 'location' : undefined}
                className={`focus-ring flex min-h-11 items-center rounded-lg px-3 py-2 text-sm transition ${
                  activeSection === item.id ? 'bg-slate-800/80 text-cyan-100' : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/sertifikasi"
              aria-current={location.pathname === '/sertifikasi' ? 'page' : undefined}
              onClick={() => setMobileOpen(false)}
              className={`focus-ring flex min-h-11 items-center rounded-lg px-3 py-2 text-sm transition ${
                location.pathname === '/sertifikasi' ? 'bg-slate-800/80 text-cyan-100' : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              Sertifikasi
            </Link>
          </nav>

          <div className="mt-3 flex items-center gap-2">
            {showCommandPalette ? (
              <Suspense fallback={null}>
                <CommandPalette registerShortcut={false} />
              </Suspense>
            ) : null}
            <Link
              to={location.pathname === '/' ? toSectionPath('contact') : '/'}
              onClick={() => setMobileOpen(false)}
              className="focus-ring inline-flex min-h-11 items-center rounded-lg border border-cyan-300/40 bg-cyan-300/[0.08] px-3 py-2 text-xs font-semibold tracking-wide text-cyan-100 transition hover:border-cyan-300/65"
            >
              {location.pathname === '/' ? 'Hubungi Saya' : 'Kembali ke Beranda'}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
