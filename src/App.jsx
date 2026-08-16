import { Suspense, lazy } from 'react'
import { MotionConfig } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router'
import RouteTransition from './components/common/RouteTransition'
import ScrollProgress from './components/common/ScrollProgress'
import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import NotFoundPage from './pages/NotFoundPage'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'))

function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <a
          href="#main-content"
          className="skip-link"
          onClick={() => window.requestAnimationFrame(() => document.getElementById('main-content')?.focus())}
        >
          Lewati ke konten utama
        </a>
        <div className="site-ambient pointer-events-none fixed inset-0 -z-20" aria-hidden="true" />

        <ScrollProgress />
        <Navbar />
        <ScrollToTop />

        <RouteTransition routeKey={location.pathname}>
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center text-sm text-slate-300" role="status">
                Memuat halaman…
              </div>
            }
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/sertifikasi" element={<CertificationsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </RouteTransition>
      </div>
    </MotionConfig>
  )
}

export default App
