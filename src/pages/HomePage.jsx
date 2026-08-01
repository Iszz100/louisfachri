import DeferredSection from '../components/common/DeferredSection'
import PageMeta from '../components/common/PageMeta'
import HeroSection from '../sections/HeroSection'
import { useLocation } from 'react-router'

const loadManifestoSection = () => import('../sections/ManifestoSection')
const loadCapabilitiesSection = () => import('../sections/CapabilitiesSection')
const loadProjectsSection = () => import('../sections/ProjectsSection')
const loadExperienceSection = () => import('../sections/ExperienceSection')
const loadEducationSection = () => import('../sections/EducationSection')
const loadClosingSection = () => import('../sections/ClosingSection')

const deferredSections = [
  { id: 'manifesto', loader: loadManifestoSection, className: 'content-auto-section min-h-[280px]' },
  { id: 'capabilities', loader: loadCapabilitiesSection, className: 'content-auto-section min-h-[340px]' },
  { id: 'projects', loader: loadProjectsSection, className: 'content-auto-section min-h-[540px]' },
  { id: 'experience', loader: loadExperienceSection, className: 'content-auto-section min-h-[360px]' },
  { id: 'education', loader: loadEducationSection, className: 'content-auto-section min-h-[300px]' },
  { id: 'contact', loader: loadClosingSection, className: 'content-auto-section min-h-[340px]' },
]

const title = 'Louis Fachri | System Administrator & Cybersecurity Enthusiast'
const description =
  'Portfolio Louis Fachri, Junior System Administrator dan Cybersecurity Enthusiast dengan pengalaman di bidang Linux, networking, cybersecurity, Docker, Python, dan web development.'
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Louis Fachri Putra Jatmiko',
  url: 'https://louisfachri.my.id/',
  jobTitle: 'Junior System Administrator',
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

  const targetIndex = deferredSections.findIndex((section) => section.id === hashTarget)

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
