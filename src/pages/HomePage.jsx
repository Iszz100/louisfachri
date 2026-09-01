import PageMeta from '../components/common/PageMeta'
import { SITE_URL } from '../config/site'
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

const title = 'Louis Fachri — System Administrator & Cybersecurity Portfolio'
const description =
  'Portfolio Louis Fachri, Junior System Administrator dan Cybersecurity Enthusiast dengan project Linux, Docker, networking, Wazuh, OPNsense, serta IDS/IPS.'
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Louis Fachri Putra Jatmiko',
  url: `${SITE_URL}/`,
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

  return (
    <>
      <PageMeta title={title} description={description} canonicalPath="/" structuredData={structuredData} />
      <main id="main-content" tabIndex="-1">
        <HeroSection />
        {homepageSections.map(({ id, content, className }) => (
          <div key={id} id={id} className={className}>
            {content}
          </div>
        ))}
      </main>
    </>
  )
}
