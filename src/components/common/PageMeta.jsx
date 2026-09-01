import { useEffect } from 'react'
import { SITE_URL, SOCIAL_IMAGE } from '../../config/site'

const SOCIAL_IMAGE_ALT = 'Portfolio Louis Fachri — System Administrator dan Cybersecurity'

function upsertMeta(attribute, key, content) {
  let element = [...document.head.querySelectorAll('meta')].find((meta) => meta.getAttribute(attribute) === key)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function updateCanonical(href) {
  let canonical = document.head.querySelector('link[rel="canonical"]')

  if (!href) {
    canonical?.remove()
    return
  }

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }

  canonical.setAttribute('href', href)
}

export default function PageMeta({
  title,
  description,
  canonicalPath,
  robots = 'index, follow',
  type = 'website',
  structuredData,
}) {
  useEffect(() => {
    const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : null
    const pageUrl = canonical ?? window.location.href.split(/[?#]/)[0]

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
    updateCanonical(canonical)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', 'Portfolio Louis Fachri')
    upsertMeta('property', 'og:locale', 'id_ID')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', pageUrl)
    upsertMeta('property', 'og:image', SOCIAL_IMAGE)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:image:alt', SOCIAL_IMAGE_ALT)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', SOCIAL_IMAGE)
    upsertMeta('name', 'twitter:image:alt', SOCIAL_IMAGE_ALT)

    const existingSchema = document.getElementById('portfolio-structured-data')
    if (!structuredData) {
      existingSchema?.remove()
      return
    }

    const schema = existingSchema ?? document.createElement('script')
    schema.id = 'portfolio-structured-data'
    schema.type = 'application/ld+json'
    schema.textContent = JSON.stringify(structuredData)
    if (!existingSchema) document.head.appendChild(schema)
  }, [canonicalPath, description, robots, structuredData, title, type])

  return null
}
