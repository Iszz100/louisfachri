# Portfolio Louis Fachri

Portfolio profesional Louis Fachri Putra Jatmiko, Junior System Administrator dan Cybersecurity Enthusiast. Dibangun dengan React, Vite, Tailwind CSS, Framer Motion, dan React Router untuk deployment di Netlify.

## Halaman

- `/` — hero, fokus teknis, proyek pilihan, perjalanan ringkas, sertifikasi pilihan, dan kontak.
- `/projects` — arsip seluruh project dengan filter, dokumentasi teknis, galeri, dan tautan repository.
- `/sertifikasi` — daftar sertifikasi dengan pencarian, filter tahun/penerbit, dan pengurutan.
- `*` — halaman 404 dengan status HTTP 404 dan metadata `noindex` pada deployment Netlify.

## Menjalankan project

Gunakan Node.js 22.23.2 sebagaimana tercantum di `.nvmrc`.

```bash
nvm install
nvm use
npm install
npm run dev
```

## Verifikasi

```bash
npm audit
npm run lint
npm run test
npm run build
```

## Production

- Metadata SEO dikelola per route melalui `PageMeta`; proses build juga menghasilkan HTML statis untuk `/projects`, `/sertifikasi`, dan halaman 404.
- Header keamanan dan cache policy dikonfigurasi di `netlify.toml`.
- Direct refresh `/projects` dan `/sertifikasi` dikonfigurasi di `public/_redirects`; URL lain yang tidak dikenal memakai `404.html`.
- Sitemap dan robots tersedia di folder `public`.

Perubahan tidak otomatis di-deploy. Push dan deployment dilakukan secara terpisah setelah verifikasi lokal.
