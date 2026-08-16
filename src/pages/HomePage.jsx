import DeferredSection from '../components/common/DeferredSection'
import PageMeta from '../components/common/PageMeta'
import HeroSection from '../sections/HeroSection'
import { Navigate, useLocation } from 'react-router'

const loadCapabilitiesSection = () => import('../sections/CapabilitiesSection')
const loadFeaturedProjectSection = () => import('../sections/FeaturedProjectSection')
const loadExperienceSection = () => import('../sections/ExperienceSection')
const loadCertificationsPreviewSection = () => import('../sections/CertificationsPreviewSection')
const loadClosingSection = () => import('../sections/ClosingSection')

const deferredSections = [
  { id: 'capabilities', loader: loadCapabilitiesSection, className: 'content-auto-section min-h-[540px]' },
  { id: 'featured-project', loader: loadFeaturedProjectSection, className: 'content-auto-section min-h-[1180px]' },
  { id: 'about', loader: loadExperienceSection, className: 'content-auto-section min-h-[850px]' },
  { id: 'certifications', loader: loadCertificationsPreviewSection, className: 'content-auto-section min-h-[590px]' },
  { id: 'contact', loader: loadClosingSection, className: 'content-auto-section min-h-[520px]' },
]

const title = 'Louis Fachri — System Administrator & Cybersecurity Portfolio'
const description =
  'Portfolio Louis Fachri, Junior System Administrator dan Cybersecurity Enthusiast dengan project Linux, Docker, networking, Wazuh, OPNsense, serta IDS/IPS.'
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Louis Fachri Putra Jatmiko',
  url: 'https://louisfachri.my.id/',
  jobTitle: 'Junior System Administrator and Cybersecurity Enthusiast',
  knowsAbout: ['System Administration', 'Cybersecurity', 'Wazuh', 'OPNsense', 'Linux', 'Docker', 'Networking'],
  sameAs: [
    'https://github.com/Iszz100',
    'https://www.linkedin.com/in/louis-fachri-putra-jatmiko-878889291/',
    'https://www.instagram.com/luisfahrikah/',
  ],
}

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

  const deferredTarget = hashTarget
  const targetIndex = deferredSections.findIndex((section) => section.id === deferredTarget)

  return (
    <>
      <PageMeta title={title} description={description} canonicalPath="/" structuredData={structuredData} />
      <main id="main-content" tabIndex="-1">
        <HeroSection />
        {deferredSections.map((section, index) => (
          <DeferredSection
            key={section.id}
            {...section}
            forceLoad={targetIndex >= index}
          />
        ))}
      </main>
    </>
  )
}
