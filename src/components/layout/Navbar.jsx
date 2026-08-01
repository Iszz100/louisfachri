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
  const [showCommandPalette, setShowCommandPalette] = useState(false)

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

  const toSectionPath = (id) => `/#${id}`

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-800/80 bg-bg-primary/70 backdrop-blur-md">
      <div className="container-shell flex h-16 items-center justify-between gap-3">
        <Link
          to={toSectionPath('hero')}
          onClick={() => setMobileOpen(false)}
          className="focus-ring text-sm font-semibold tracking-[0.16em] text-cyan-300"
        >
          LFPJ
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigasi utama">
          {navLinks.map((item) => (
            <Link
              key={item.id}
              to={toSectionPath(item.id)}
              className="focus-ring text-sm text-slate-300 transition-colors duration-200 hover:text-cyan-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/sertifikasi"
            aria-current={location.pathname === '/sertifikasi' ? 'page' : undefined}
            className="focus-ring text-sm text-slate-300 transition-colors duration-200 hover:text-cyan-200"
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
            to={location.pathname !== '/' ? '/' : toSectionPath('projects')}
            className="btn-premium btn-glow border-cyan-300/45 bg-cyan-400/10 px-4 py-2 text-xs font-medium tracking-wide text-cyan-200"
          >
            {location.pathname !== '/' ? 'Kembali ke Beranda' : 'Lihat Proyek'}
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:border-cyan-300/70 hover:text-cyan-200 lg:hidden"
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
          className="border-t border-slate-800 bg-slate-950/95 px-4 pb-4 pt-3 backdrop-blur-md lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Navigasi mobile">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                to={toSectionPath(item.id)}
                onClick={() => setMobileOpen(false)}
                className="focus-ring flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800/80 hover:text-cyan-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/sertifikasi"
              aria-current={location.pathname === '/sertifikasi' ? 'page' : undefined}
              onClick={() => setMobileOpen(false)}
              className="focus-ring flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800/80 hover:text-cyan-200"
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
              to={location.pathname === '/' ? toSectionPath('projects') : '/'}
              onClick={() => setMobileOpen(false)}
              className="focus-ring inline-flex min-h-11 items-center rounded-lg border border-cyan-300/45 bg-cyan-400/10 px-3 py-2 text-xs font-medium tracking-wide text-cyan-200 transition hover:border-cyan-300/70"
            >
              {location.pathname === '/' ? 'Lihat Proyek' : 'Kembali ke Beranda'}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
