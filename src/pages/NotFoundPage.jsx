import { Link } from 'react-router'
import PageMeta from '../components/common/PageMeta'

const description = 'Halaman yang Anda cari tidak tersedia atau alamatnya telah berubah.'

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Halaman Tidak Ditemukan | Louis Fachri" description={description} robots="noindex, nofollow" />
      <main id="main-content" className="flex min-h-screen items-center pb-16 pt-24" tabIndex="-1">
        <div className="container-shell">
          <section className="glass-panel mx-auto max-w-3xl rounded-2xl px-6 py-12 text-center shadow-card sm:px-10 sm:py-16">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Error 404</p>
            <h1 className="mt-4 text-[clamp(2rem,6vw,4rem)] font-semibold leading-tight text-slate-100">
              Halaman tidak ditemukan
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-body leading-relaxed text-slate-300">{description}</p>
            <Link
              to="/"
              className="btn-premium btn-glow mt-8 border-cyan-300/55 bg-cyan-400/12 text-cyan-100"
            >
              Kembali ke Beranda
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
