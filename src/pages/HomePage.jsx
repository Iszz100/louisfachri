import PageMeta from '../components/common/PageMeta'
import { biography, achievement, personSchema } from '../data/identity'
import CapabilitiesSection from '../sections/CapabilitiesSection'
import CertificationsPreviewSection from '../sections/CertificationsPreviewSection'
import ClosingSection from '../sections/ClosingSection'
import ExperienceSection from '../sections/ExperienceSection'
import FeaturedProjectSection from '../sections/FeaturedProjectSection'
import HeroSection from '../sections/HeroSection'
import { Navigate, useLocation } from 'react-router'

const homepageSections = [
  { id: 'capabilities', content: <CapabilitiesSection />, className: 'content-auto-section min-h-[540px]' },
  { id: 'featured-project', content: <FeaturedProjectSection />, className: 'content-auto-section min-h-[1180px]' },
  { id: 'about', content: <ExperienceSection />, className: 'content-auto-section min-h-[850px]' },
  { id: 'certifications', content: <CertificationsPreviewSection />, className: 'content-auto-section min-h-[590px]' },
  { id: 'contact', content: <ClosingSection />, className: 'content-auto-section min-h-[520px]' },
]

const title = 'Louis Fachri Putra Jatmiko — System Administrator & Cybersecurity Portfolio'
const description =
  'Portfolio resmi Louis Fachri Putra Jatmiko (Louis Fachri), Junior System Administrator dan Cybersecurity Enthusiast dengan project Linux, Docker, networking, Wazuh, OPNsense, serta IDS/IPS.'


export default function HomePage() {
  const { hash } = useLocation()
  let hashTarget = ''

  try {
    hashTarget = decodeURIComponent(hash.replace('#', ''))
  } catch {
    hashTarget = ''
  }

  if (hashTarget.startsWith('project-') || hashTarget === 'projects') {
    const projectHash = hashTarget.startsWith('project-') ? `#${hashTarget}` : ''
    return <Navigate replace to={`/projects${projectHash}`} />
  }

  return (
    <>
      <PageMeta title={title} description={description} canonicalPath="/" structuredData={personSchema} />
      <main id="main-content" tabIndex="-1">
        <HeroSection />
        <section aria-labelledby="profile-summary-heading" className="container-shell py-16">
          <h2 id="profile-summary-heading" className="text-2xl font-semibold text-slate-100">Tentang Louis Fachri Putra Jatmiko</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-300">{biography}</p>
          <p className="mt-3 max-w-3xl leading-8 text-slate-300">{achievement.description}</p>
          <a href="/profil/" className="focus-ring mt-5 inline-flex min-h-11 items-center text-cyan-300 underline underline-offset-4">Profil lengkap, prestasi, dan publikasi</a>
        </section>
        {homepageSections.map(({ id, content, className }) => (
          <div key={id} id={id} className={className}>
            {content}
          </div>
        ))}
      </main>
    </>
  )
}
