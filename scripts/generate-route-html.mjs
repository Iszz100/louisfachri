import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const outputDirectory = resolve('dist')
const indexPath = resolve(outputDirectory, 'index.html')
const baseHtml = await readFile(indexPath, 'utf8')

const pages = [
  {
    output: 'sertifikasi.html',
    title: 'Sertifikasi | Louis Fachri',
    description:
      'Daftar sertifikasi, pelatihan, dan pencapaian Louis Fachri di bidang cybersecurity, system administration, networking, dan teknologi.',
    robots: 'index, follow',
    canonical: 'https://louisfachri.my.id/sertifikasi',
  },
  {
    output: '404.html',
    title: 'Halaman Tidak Ditemukan | Louis Fachri',
    description: 'Halaman yang Anda cari tidak tersedia atau alamatnya telah berubah.',
    robots: 'noindex, nofollow',
    canonical: null,
  },
]

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Tidak dapat menemukan ${label} di dist/index.html.`)
  }

  return html.replace(pattern, replacement)
}

function setMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta[^>]+${attribute}="${key}"[^>]*>`, 'i')
  return replaceRequired(
    html,
    pattern,
    `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`,
    `${attribute}="${key}"`,
  )
}

function removeMeta(html, attribute, key) {
  const pattern = new RegExp(`\\s*<meta[^>]+${attribute}="${key}"[^>]*>`, 'i')
  return replaceRequired(html, pattern, '', `${attribute}="${key}"`)
}

function createPageHtml(page) {
  let html = replaceRequired(
    baseHtml,
    /<title>[^<]*<\/title>/i,
    `<title>${escapeAttribute(page.title)}</title>`,
    'title',
  )

  html = setMeta(html, 'name', 'description', page.description)
  html = setMeta(html, 'name', 'robots', page.robots)
  html = setMeta(html, 'property', 'og:title', page.title)
  html = setMeta(html, 'property', 'og:description', page.description)
  html = setMeta(html, 'name', 'twitter:title', page.title)
  html = setMeta(html, 'name', 'twitter:description', page.description)

  if (page.canonical) {
    html = replaceRequired(
      html,
      /<link[^>]+rel="canonical"[^>]*>/i,
      `<link rel="canonical" href="${escapeAttribute(page.canonical)}" />`,
      'canonical',
    )
    html = setMeta(html, 'property', 'og:url', page.canonical)
  } else {
    html = replaceRequired(html, /\s*<link[^>]+rel="canonical"[^>]*>/i, '', 'canonical')
    html = removeMeta(html, 'property', 'og:url')
  }

  return html
}

await mkdir(outputDirectory, { recursive: true })
await Promise.all(
  pages.map((page) => writeFile(resolve(outputDirectory, page.output), createPageHtml(page), 'utf8')),
)
