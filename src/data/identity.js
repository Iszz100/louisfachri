import { SITE_URL } from '../config/site.js'
import { profile } from './profile.js'

export const biography = 'Louis Fachri Putra Jatmiko, dikenal sebagai Louis Fachri, adalah siswa Sistem Informasi, Jaringan dan Aplikasi (SIJA) di SMK Telkom Sidoarjo yang berfokus pada administrasi sistem Linux, jaringan, dan cybersecurity, khususnya Blue Team.'
export const portraitPath = '/images/louis-fachri-putra-jatmiko.webp'
export const publications = [
  { label: 'Publikasi Instagram tentang Louis Fachri — 1', url: 'https://www.instagram.com/p/Dd1GbFdE4-h/' },
  { label: 'Publikasi Instagram tentang Louis Fachri — 2', url: 'https://www.instagram.com/p/DdtPL4yE9JU/' },
  { label: 'Postingan LinkedIn Louis Fachri', url: 'https://lnkd.in/p/gD7Qb5RD' },
]
export const achievement = {
  title: 'Juara 1 Jatim Cybersecurity Competition (JCC) 2026',
  description: 'Saya meraih Juara 1 Jatim Cybersecurity Competition 2026 bersama tim SMK Telkom Sidoarjo.',
  source: 'https://askompsi.or.id/berita/kominfo-jatim-jcc-2026',
}
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: profile.name,
  alternateName: ['Louis Fachri', 'Louis Fachri Putra'],
  url: `${SITE_URL}/`,
  description: biography,
  image: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#portrait`,
    contentUrl: `${SITE_URL}${portraitPath}`,
    caption: profile.name,
    width: 1100,
    height: 1650,
  },
  jobTitle: profile.role,
  memberOf: { '@type': 'EducationalOrganization', name: 'SMK Telkom Sidoarjo' },
  knowsAbout: ['System Administration', 'Cybersecurity', 'Blue Team', 'Linux', 'Networking', 'Wazuh', 'OPNsense', 'Docker'],
  award: achievement.title,
  sameAs: [profile.links.linkedin, profile.links.github, profile.links.instagram],
  subjectOf: publications.map(({ url, label }) => ({ '@type': 'CreativeWork', name: label, url })),
}
export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/profil/#webpage`,
  url: `${SITE_URL}/profil/`,
  name: `Profil ${profile.name}`,
  mainEntity: personSchema,
}
