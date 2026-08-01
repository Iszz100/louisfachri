import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageMeta from '../components/common/PageMeta'
import { certifications } from '../data/certifications'
import useResponsiveMotion from '../hooks/useResponsiveMotion'
import { sectionReveal, staggerContainer } from '../utils/motion'

const title = 'Sertifikasi | Louis Fachri'
const description =
  'Daftar sertifikasi, pelatihan, dan pencapaian Louis Fachri di bidang cybersecurity, system administration, networking, dan teknologi.'
const ALL = 'all'

const years = [...new Set(certifications.map((certification) => certification.year))].sort((a, b) => b - a)
const issuers = [...new Set(certifications.map((certification) => certification.issuer))].sort((a, b) =>
  a.localeCompare(b, 'id'),
)

function hasValue(value) {
  return Boolean(value && value.trim() && value.trim() !== '-')
}

function isValidCredentialUrl(value) {
  if (!value) return false

  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export default function CertificationsPage() {
  const { reduceMotion } = useResponsiveMotion()
  const [query, setQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState(ALL)
  const [selectedIssuer, setSelectedIssuer] = useState(ALL)
  const [sortDirection, setSortDirection] = useState('desc')

  const filteredCertifications = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('id-ID')

    return certifications
      .filter((certification) => {
        const searchableText = [certification.title, certification.issuer, ...certification.skills]
          .join(' ')
          .toLocaleLowerCase('id-ID')
        const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)
        const matchesYear = selectedYear === ALL || certification.year === Number(selectedYear)
        const matchesIssuer = selectedIssuer === ALL || certification.issuer === selectedIssuer
        return matchesQuery && matchesYear && matchesIssuer
      })
      .sort((a, b) => (sortDirection === 'desc' ? b.year - a.year : a.year - b.year))
  }, [query, selectedIssuer, selectedYear, sortDirection])

  const resetFilters = () => {
    setQuery('')
    setSelectedYear(ALL)
    setSelectedIssuer(ALL)
    setSortDirection('desc')
  }

  const filtersAreActive = query || selectedYear !== ALL || selectedIssuer !== ALL || sortDirection !== 'desc'

  return (
    <>
      <PageMeta title={title} description={description} canonicalPath="/sertifikasi" />
      <main id="main-content" className="pb-12 pt-20 sm:pt-24" tabIndex="-1">
        <section className="pb-6 pt-6 sm:pt-8 md:pt-10" aria-labelledby="certifications-heading">
          <div className="container-shell">
            <motion.div
              variants={sectionReveal}
              initial={false}
              animate="show"
              className="max-w-4xl space-y-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Halaman Sertifikasi</p>
              <h1
                id="certifications-heading"
                className="text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-tight text-slate-100"
              >
                Dokumentasi Sertifikat dan Pencapaian
              </h1>
              <p className="text-body leading-relaxed text-slate-300">
                Kumpulan sertifikasi, pelatihan, dan pencapaian yang mendukung proses belajar saya di bidang cybersecurity,
                system administration, networking, dan teknologi.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-10 md:pb-12" aria-label="Daftar sertifikasi">
          <div className="container-shell">
            <div className="glass-panel mb-7 rounded-2xl p-4 sm:p-5">
              <form className="grid gap-4 lg:grid-cols-[minmax(220px,1.4fr)_0.7fr_1fr_0.8fr_auto] lg:items-end" onSubmit={(event) => event.preventDefault()}>
                <label className="grid gap-2 text-sm text-slate-200" htmlFor="certificate-search">
                  Cari judul, penerbit, atau kompetensi
                  <input
                    id="certificate-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Contoh: cybersecurity"
                    className="focus-ring min-h-11 rounded-lg border border-slate-700 bg-slate-950/75 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
                  />
                </label>

                <label className="grid gap-2 text-sm text-slate-200" htmlFor="certificate-year">
                  Tahun
                  <select
                    id="certificate-year"
                    value={selectedYear}
                    onChange={(event) => setSelectedYear(event.target.value)}
                    className="focus-ring min-h-11 rounded-lg border border-slate-700 bg-slate-950/75 px-3 py-2 text-sm text-slate-100"
                  >
                    <option value={ALL}>Semua tahun</option>
                    {years.map((year) => <option key={year} value={year}>{year}</option>)}
                  </select>
                </label>

                <label className="grid gap-2 text-sm text-slate-200" htmlFor="certificate-issuer">
                  Penerbit
                  <select
                    id="certificate-issuer"
                    value={selectedIssuer}
                    onChange={(event) => setSelectedIssuer(event.target.value)}
                    className="focus-ring min-h-11 min-w-0 rounded-lg border border-slate-700 bg-slate-950/75 px-3 py-2 text-sm text-slate-100"
                  >
                    <option value={ALL}>Semua penerbit</option>
                    {issuers.map((issuer) => <option key={issuer} value={issuer}>{issuer}</option>)}
                  </select>
                </label>

                <label className="grid gap-2 text-sm text-slate-200" htmlFor="certificate-sort">
                  Urutkan
                  <select
                    id="certificate-sort"
                    value={sortDirection}
                    onChange={(event) => setSortDirection(event.target.value)}
                    className="focus-ring min-h-11 rounded-lg border border-slate-700 bg-slate-950/75 px-3 py-2 text-sm text-slate-100"
                  >
                    <option value="desc">Tahun terbaru</option>
                    <option value="asc">Tahun terlama</option>
                  </select>
                </label>

                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!filtersAreActive}
                  className="focus-ring min-h-11 rounded-lg border border-cyan-300/45 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition enabled:hover:border-cyan-300/75 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Reset
                </button>
              </form>

              <p className="mt-4 text-sm text-slate-400" aria-live="polite" aria-atomic="true">
                Menampilkan {filteredCertifications.length} dari {certifications.length} sertifikat.
              </p>
            </div>

            {filteredCertifications.length ? (
              <motion.div
                key={`${selectedYear}-${selectedIssuer}-${sortDirection}-${query}`}
                variants={staggerContainer}
                initial={reduceMotion ? false : 'hidden'}
                animate="show"
                className="grid gap-5 sm:gap-6 md:grid-cols-2"
              >
                {filteredCertifications.map((certification, index) => {
                  const showCredentialId = hasValue(certification.credentialId)
                  const showCredentialLink = isValidCredentialUrl(certification.credentialUrl)

                  return (
                    <motion.article
                      key={certification.id}
                      variants={sectionReveal}
                      className="glass-panel interactive-card flex h-full flex-col overflow-hidden rounded-2xl"
                    >
                      <div className="relative aspect-[16/10] w-full border-b border-slate-800 bg-slate-950/70 p-2">
                        <img
                          src={certification.image}
                          srcSet={`${certification.imageSmall} 480w, ${certification.imageMedium} 640w, ${certification.image} ${certification.imageWidth}w`}
                          sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc(50vw - 3rem), 570px"
                          width={certification.imageWidth}
                          height={certification.imageHeight}
                          alt={`Sertifikat ${certification.title} yang diterbitkan oleh ${certification.issuer}`}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          fetchPriority={index === 0 ? 'high' : 'low'}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="flex flex-1 flex-col space-y-4 p-5 md:p-6">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Sertifikat</p>
                          <h2 className="mt-2 text-xl font-semibold text-slate-100">{certification.title}</h2>
                          <p className="mt-3 text-sm leading-relaxed text-slate-300">{certification.description}</p>
                        </div>

                        <dl className="grid gap-3 text-sm sm:grid-cols-2">
                          <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
                            <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Penerbit</dt>
                            <dd className="mt-1 text-slate-200">{certification.issuer}</dd>
                          </div>
                          <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
                            <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Tanggal terbit</dt>
                            <dd className="mt-1 text-slate-200">{certification.issueDate}</dd>
                          </div>
                          {showCredentialId ? (
                            <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3 sm:col-span-2">
                              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Credential ID</dt>
                              <dd className="mt-1 break-all text-slate-200">{certification.credentialId}</dd>
                            </div>
                          ) : null}
                        </dl>

                        <div className="mt-auto">
                          <p className="text-[11px] uppercase tracking-[0.16em] text-purple-200">Kompetensi terkait</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {certification.skills.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-300"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {showCredentialLink ? (
                          <a
                            href={certification.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus-ring inline-flex w-fit rounded-lg border border-cyan-300/45 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200 transition hover:border-cyan-300/75"
                          >
                            Lihat Credential
                          </a>
                        ) : null}
                      </div>
                    </motion.article>
                  )
                })}
              </motion.div>
            ) : (
              <div className="glass-panel rounded-2xl border border-dashed border-cyan-300/35 p-8 text-center">
                <h2 className="text-xl font-semibold text-slate-100">Sertifikat tidak ditemukan</h2>
                <p className="mt-3 text-sm text-slate-300">Coba ubah kata pencarian atau reset filter yang sedang aktif.</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="focus-ring mt-5 min-h-11 rounded-lg border border-cyan-300/45 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200"
                >
                  Reset filter
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
