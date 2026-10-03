import { mkdir, writeFile } from 'node:fs/promises'
import { SITE_URL } from '../src/config/site.js'
import { profile } from '../src/data/profile.js'
import { biography, portraitPath, publications, achievement, profilePageSchema } from '../src/data/identity.js'

const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const title = `Profil ${profile.name} — Prestasi & Cybersecurity`
const portrait = `${SITE_URL}${portraitPath}`
const links = publications.map(({ label, url }) => `<li><a href="${escape(url)}">${escape(label)}</a></li>`).join('\n')
const html = `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<meta name="description" content="${escape(biography)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${SITE_URL}/profil/">
<link rel="icon" type="image/svg+xml" href="/louis-favicon.svg">
<meta property="og:type" content="profile">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(biography)}">
<meta property="og:url" content="${SITE_URL}/profil/">
<meta property="og:image" content="${portrait}">
<meta property="og:image:width" content="1100">
<meta property="og:image:height" content="1650">
<meta property="og:image:alt" content="${escape(profile.name)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(biography)}">
<meta name="twitter:image" content="${portrait}">
<meta name="twitter:image:alt" content="${escape(profile.name)}">
<script id="portfolio-structured-data" type="application/ld+json">${JSON.stringify(profilePageSchema).replaceAll('<', '\\u003c')}</script>
<style>
:root{color-scheme:dark;font-family:system-ui,sans-serif;background:#080c12;color:#e2e8f0;line-height:1.75}*{box-sizing:border-box}body{margin:0}main,nav,footer{width:min(1050px,100% - 40px);margin:auto}nav{display:flex;gap:24px;flex-wrap:wrap;padding:28px 0;border-bottom:1px solid #ffffff20}a{color:#67e8f9;text-underline-offset:5px}a:focus-visible{outline:2px solid #67e8f9;outline-offset:6px}header{display:grid;grid-template-columns:1fr 260px;gap:48px;align-items:center;padding:64px 0}h1{font-size:clamp(2.3rem,5vw,4rem);line-height:1.1;letter-spacing:-.04em;margin:16px 0 24px}h2{font-size:1.6rem;line-height:1.3}h3{line-height:1.4}p{max-width:72ch;color:#cbd5e1}.eyebrow{color:#67e8f9;letter-spacing:.12em;text-transform:uppercase;font-size:.8rem}figure{margin:0}img{display:block;width:100%;height:auto;border-radius:20px}figcaption{font-size:.8rem;margin-top:10px;color:#94a3b8}section{padding:32px 0;border-top:1px solid #ffffff20}ul{padding-left:22px}li{margin:12px 0}footer{padding:32px 0;color:#94a3b8}a{overflow-wrap:anywhere}@media(max-width:640px){header{grid-template-columns:1fr;padding:36px 0;gap:28px}figure{max-width:260px}nav{gap:16px}}
</style>
</head>
<body>
<nav aria-label="Navigasi utama"><a href="/">Portofolio</a><a href="/projects">Proyek</a><a href="/sertifikasi">Sertifikasi</a></nav>
<main>
<header><div><p class="eyebrow">Profil • Sidoarjo, Jawa Timur</p><h1>${escape(profile.name)}</h1><p>${escape(biography)}</p><p>${escape(profile.role)}. Di portofolio ini saya membagikan proyek, pengalaman belajar, dan pencapaian saya.</p></div><figure><img src="${portraitPath}" alt="Foto Louis Fachri Putra Jatmiko" width="1100" height="1650" fetchpriority="high"><figcaption>${escape(profile.name)} — Louis Fachri</figcaption></figure></header>
<section aria-labelledby="focus"><h2 id="focus">Bidang yang saya tekuni</h2><p>Saya belajar melalui proyek sekolah, lab pribadi, dan praktik kerja lapangan. Fokus saya meliputi administrasi Linux, Docker, jaringan, monitoring Wazuh, firewall OPNsense, IDS/IPS, dan analisis log untuk Blue Team.</p><p><a href="/projects">Lihat proyek dan dokumentasi lab saya</a></p></section>
<section aria-labelledby="achievements"><h2 id="achievements">Prestasi</h2><h3>${escape(achievement.title)}</h3><p>${escape(achievement.description)}</p><p>Berita ASKOMPSI mencatat SMK Telkom Sidoarjo sebagai juara pertama kompetisi ini.</p><p><a href="${achievement.source}">Baca berita hasil JCC 2026 di ASKOMPSI</a> · <a href="/sertifikasi">Sertifikasi dan pencapaian lainnya</a></p></section>
<section aria-labelledby="profiles"><h2 id="profiles">Temukan saya</h2><ul><li><a rel="me" href="${profile.links.linkedin}">LinkedIn — ${escape(profile.name)}</a></li><li><a rel="me" href="${profile.links.github}">GitHub — Iszz100</a></li><li><a rel="me" href="${profile.links.instagram}">Instagram — @luisfahrikah</a></li></ul></section>
<section aria-labelledby="publications"><h2 id="publications">Publikasi dan aktivitas</h2><p>Tautan unggahan tentang kegiatan dan perjalanan saya.</p><ul>${links}</ul></section>
</main><footer><a href="/">Kembali ke portofolio Louis Fachri</a></footer>
</body></html>`
await mkdir('dist/profil', { recursive: true })
await writeFile('dist/profil/index.html', html)
