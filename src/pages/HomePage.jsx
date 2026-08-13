import DeferredSection from '../components/common/DeferredSection'
import PageMeta from '../components/common/PageMeta'
import HeroSection from '../sections/HeroSection'
import { useLocation } from 'react-router'

const loadFeaturedProjectSection = () => import('../sections/FeaturedProjectSection')
const loadCapabilitiesSection = () => import('../sections/CapabilitiesSection')
const loadExperienceSection = () => import('../sections/ExperienceSection')
const loadProjectsSection = () => import('../sections/ProjectsSection')
const loadEducationSection = () => import('../sections/EducationSection')
const loadCertificationsPreviewSection = () => import('../sections/CertificationsPreviewSection')
const loadClosingSection = () => import('../sections/ClosingSection')

const deferredSections = [
  { id: 'featured-project', loader: loadFeaturedProjectSection, className: 'content-auto-section min-h-[620px]' },
  { id: 'capabilities', loader: loadCapabilitiesSection, className: 'content-auto-section min-h-[640px]' },
  { id: 'experience', loader: loadExperienceSection, className: 'content-auto-section min-h-[880px]' },
  { id: 'projects', loader: loadProjectsSection, className: 'content-auto-section min-h-[900px]' },
  { id: 'education', loader: loadEducationSection, className: 'content-auto-section min-h-[300px]' },
  { id: 'certifications', loader: loadCertificationsPreviewSection, className: 'content-auto-section min-h-[520px]' },
  { id: 'contact', loader: loadClosingSection, className: 'content-auto-section min-h-[340px]' },
]

const title = 'Louis Fachri — System Administrator & Cybersecurity Portfolio'
const description =
  'Portfolio Louis Fachri Putra Jatmiko, siswa SMK SIJA dan intern cybersecurity yang berlatih dengan Wazuh, OPNsense, Linux, Docker, networking, SIEM, serta IDS/IPS.'
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Louis Fachri Putra Jatmiko',
  url: 'https://louisfachri.my.id/',
  jobTitle: 'Cybersecurity Intern and SMK SIJA Student',
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

  const deferredTarget = hashTarget.startsWith('project-') ? 'projects' : hashTarget
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
