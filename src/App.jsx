import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import NotFoundPage from './pages/NotFoundPage'

const HomePage = lazy(() => import('./pages/HomePage'))
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'))

function App() {
  return (
    <div className="relative">
      <a
        href="#main-content"
        className="skip-link"
        onClick={() => window.requestAnimationFrame(() => document.getElementById('main-content')?.focus())}
      >
        Lewati ke konten utama
      </a>
      <div className="pointer-events-none fixed inset-0 -z-20 bg-tech-grid bg-[size:48px_48px] opacity-[0.08]" />
      <div className="noise-texture pointer-events-none fixed inset-0 -z-20 opacity-[0.18]" />

      <Navbar />
      <ScrollToTop />

      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-sm text-slate-300" role="status">
            Memuat halaman…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sertifikasi" element={<CertificationsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
