import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from '../App'
import CommandPalette from '../components/signature/CommandPalette'
import { projects } from '../data/projects'
import ProjectsSection from '../sections/ProjectsSection'

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('routing and page metadata', () => {
  it('renders the home page', async () => {
    renderApp()

    expect(await screen.findByRole('heading', { level: 1, name: /Louis Fachri Putra Jatmiko/i })).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Louis Fachri — System Administrator & Cybersecurity Portfolio'))
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://louisfachri.my.id/')
  })

  it('renders the certifications page on a direct route with unique metadata', async () => {
    renderApp('/sertifikasi')

    expect(await screen.findByRole('heading', { level: 1, name: 'Dokumentasi Sertifikat dan Pencapaian' })).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Sertifikasi | Louis Fachri'))
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://louisfachri.my.id/sertifikasi',
    )
  })

  it('renders the full project archive on its own route with unique metadata', async () => {
    renderApp('/projects')

    expect(await screen.findByRole('heading', {
      level: 1,
      name: 'Praktik nyata, bukan sekadar daftar teknologi.',
    })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(projects.length)
    await waitFor(() => expect(document.title).toBe('Projects | Louis Fachri'))
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://louisfachri.my.id/projects',
    )
  })

  it('navigates from home to certifications and updates metadata', async () => {
    const user = userEvent.setup()
    renderApp()

    const certificationLinks = await screen.findAllByRole('link', { name: 'Sertifikasi' })
    await user.click(certificationLinks[0])

    expect(await screen.findByRole('heading', { level: 1, name: 'Dokumentasi Sertifikat dan Pencapaian' })).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Sertifikasi | Louis Fachri'))
  })

  it('loads the project archive for a direct featured-project detail anchor', async () => {
    renderApp('/#project-p-2')

    await waitFor(() => expect(document.getElementById('project-p-2')).toBeInTheDocument())
  })

  it('reveals a project outside the default showcase for a direct detail anchor', async () => {
    renderApp('/#project-p-4')

    await waitFor(() => expect(document.getElementById('project-p-4')).toBeInTheDocument())
  })

  it('opens the OPNsense lab from its shareable project anchor', async () => {
    renderApp('/#project-opnsense-transparent-bridge-ids-ips')

    await waitFor(() => {
      expect(document.getElementById('project-opnsense-transparent-bridge-ids-ips')).toBeInTheDocument()
    })
    const projectCard = document.getElementById('project-opnsense-transparent-bridge-ids-ips')
    expect(within(projectCard).getByRole('heading', {
      name: 'OPNsense Transparent Bridge & IDS/IPS Security Lab',
    })).toBeInTheDocument()
  })

  it('renders a noindex 404 page for an unknown route', async () => {
    renderApp('/halaman-yang-tidak-ada')

    expect(await screen.findByRole('heading', { level: 1, name: 'Halaman tidak ditemukan' })).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Halaman Tidak Ditemukan | Louis Fachri'))
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
    expect(document.querySelector('link[rel="canonical"]')).not.toBeInTheDocument()
  })

  it('returns to home from the 404 page', async () => {
    const user = userEvent.setup()
    renderApp('/tidak-ada')

    const notFoundMain = await screen.findByRole('main')
    await user.click(within(notFoundMain).getByRole('link', { name: 'Kembali ke Beranda' }))
    expect(await screen.findByRole('heading', { level: 1, name: /Louis Fachri Putra Jatmiko/i })).toBeInTheDocument()
  })
})

describe('certificate discovery', () => {
  it('searches certificates by title and resets the result', async () => {
    const user = userEvent.setup()
    renderApp('/sertifikasi')

    const search = await screen.findByRole('searchbox', { name: 'Cari judul, penerbit, atau kompetensi' })
    await user.type(search, 'Steven Capture The Flag')

    expect(
      screen.getByRole('heading', { level: 2, name: 'Top 18 Nasional - Steven Capture The Flag (SCTF) 2026' }),
    ).toBeInTheDocument()
    expect(screen.getByText('DCSC/SCTF/2026/155')).toBeInTheDocument()
    expect(screen.getByText('Menampilkan 1 dari 20 sertifikat.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(search).toHaveValue('')
    expect(screen.getByText('Menampilkan 20 dari 20 sertifikat.')).toBeInTheDocument()
  })

  it('filters certificates by year and supports an empty state', async () => {
    const user = userEvent.setup()
    renderApp('/sertifikasi')

    await user.selectOptions(await screen.findByRole('combobox', { name: 'Tahun' }), '2026')
    expect(screen.getByText('Menampilkan 5 dari 20 sertifikat.')).toBeInTheDocument()

    await user.type(screen.getByRole('searchbox', { name: 'Cari judul, penerbit, atau kompetensi' }), 'tidak mungkin ditemukan')
    expect(screen.getByRole('heading', { level: 2, name: 'Sertifikat tidak ditemukan' })).toBeInTheDocument()
  })
})

describe('project links', () => {
  it('renders the verified team repository and omits the invalid legacy URL', () => {
    render(
      <MemoryRouter>
        <ProjectsSection />
      </MemoryRouter>,
    )

    const projectHeading = screen.getByRole('heading', {
      name: 'School Website Redesign (JHIC) - System Administrator Operations',
    })
    const projectCard = projectHeading.closest('article')
    expect(within(projectCard).getByRole('link', {
      name: `Lihat Repository Tim: School Website Redesign (JHIC) - System Administrator Operations`,
    })).toHaveAttribute('href', 'https://github.com/Iszz100/unauthorized_no_backend')
    expect(document.querySelector('a[href="https://github.com/Unauthorized-new-site"]')).not.toBeInTheDocument()
  })
})

describe('project showcase', () => {
  it('shows four projects by default and can expand or collapse the full list', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ProjectsSection />
      </MemoryRouter>,
    )

    expect(screen.getAllByRole('article')).toHaveLength(4)
    expect(screen.getByText('4 dari 6 proyek ditampilkan')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Lihat Semua Project' }))
    expect(screen.getAllByRole('article')).toHaveLength(6)
    expect(screen.getByText('6 proyek ditampilkan')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Tampilkan Lebih Sedikit' }))
    expect(screen.getAllByRole('article')).toHaveLength(4)
  })

  it('shows every matching project when a specific filter is selected', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ProjectsSection />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'System Administrator' }))

    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(screen.getByText('3 proyek ditampilkan')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Lihat Semua Project' })).not.toBeInTheDocument()
  })

  it('shows the OPNsense lab in the Cybersecurity filter', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ProjectsSection />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Cybersecurity' }))

    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByText('2 proyek ditampilkan')).toBeInTheDocument()
    expect(screen.getByRole('heading', {
      name: 'OPNsense Transparent Bridge & IDS/IPS Security Lab',
    })).toBeInTheDocument()
  })

  it('keeps the screenshot gallery available inside project details', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ProjectsSection />
      </MemoryRouter>,
    )

    const projectHeading = screen.getByRole('heading', {
      name: 'Website Chatbot UKS & Perpustakaan (Flask) - Deployment & Operasional Service',
    })
    const projectCard = projectHeading.closest('article')
    await user.click(within(projectCard).getByText('Lihat Detail Proyek'))

    const secondScreenshot = within(projectCard).getByRole('button', { name: /^Tampilkan screenshot 2 dari 4:/ })
    await user.click(secondScreenshot)

    expect(secondScreenshot).toHaveAttribute('aria-pressed', 'true')
    expect(
      within(projectCard).getByRole('img', {
        name: /Screenshot 2 dari proyek Website Chatbot UKS & Perpustakaan/i,
      }),
    ).toBeInTheDocument()
  })

  it('navigates the OPNsense gallery and lightbox with the keyboard', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ProjectsSection />
      </MemoryRouter>,
    )

    const projectHeading = screen.getByRole('heading', {
      name: 'OPNsense Transparent Bridge & IDS/IPS Security Lab',
    })
    const projectCard = projectHeading.closest('article')
    await user.click(within(projectCard).getByText('Lihat Detail Proyek'))

    expect(within(projectCard).getAllByRole('button', { name: /^Tampilkan screenshot/ })).toHaveLength(5)
    expect(within(projectCard).getByText('1 dari 18 gambar')).toBeInTheDocument()

    const openLightbox = within(projectCard).getByRole('button', {
      name: 'Perbesar gambar: Topologi lab keamanan jaringan',
    })
    await user.click(openLightbox)

    const dialog = screen.getByRole('dialog', {
      name: 'Galeri OPNsense Transparent Bridge & IDS/IPS Security Lab',
    })
    expect(within(dialog).getByRole('img', {
      name: 'Topologi lab OPNsense Transparent Filtering Bridge dan IDS IPS',
    })).toBeInTheDocument()

    await user.keyboard('{ArrowRight}')
    expect(within(dialog).getByRole('img', {
      name: 'Tahap awal akses management dan configuration wizard OPNsense',
    })).toBeInTheDocument()
    expect(within(dialog).getByText('Tahap awal akses dan konfigurasi OPNsense')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(openLightbox).toHaveFocus())
  })

  it('uses 18 ordered WebP assets with dimensions and captions for the OPNsense lab', () => {
    const project = projects.find((item) => item.id === 'opnsense-transparent-bridge-ids-ips')

    expect(project.gallery).toHaveLength(18)
    expect(project.gallery[0].caption).toBe('Topologi lab keamanan jaringan')
    expect(project.gallery[17].caption).toBe(
      'Pengujian aman menggunakan EICAR test file untuk validasi filtering/IPS',
    )
    expect(new Set(project.gallery.map((item) => item.src)).size).toBe(18)
    project.gallery.forEach((item) => {
      expect(item.src).toMatch(/\.webp$/)
      expect(item.width).toBeGreaterThan(0)
      expect(item.height).toBeGreaterThan(0)
      expect(item.alt).not.toBe('screenshot')
      expect(item.caption).toBeTruthy()
    })
  })
})

describe('mobile navigation accessibility', () => {
  it('closes with Escape and restores focus to the menu trigger', async () => {
    const user = userEvent.setup()
    renderApp()

    const trigger = await screen.findByRole('button', { name: 'Buka menu' })
    await user.click(trigger)
    expect(screen.getByRole('navigation', { name: 'Navigasi mobile' })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Navigasi mobile' })).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  })
})

describe('command palette accessibility', () => {
  it('opens as a modal dialog, closes with Escape, and restores trigger focus', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <CommandPalette />
      </MemoryRouter>,
    )

    const trigger = screen.getByRole('button', { name: 'Perintah Ctrl+K' })
    await user.click(trigger)

    expect(screen.getByRole('dialog', { name: 'Navigasi cepat' })).toBeInTheDocument()
    const input = screen.getByRole('combobox', { name: 'Cari perintah' })
    const closeButton = screen.getByRole('button', { name: 'Tutup navigasi cepat' })
    expect(input).toHaveFocus()
    expect(document.body.style.overflow).toBe('hidden')

    await user.tab()
    expect(closeButton).toHaveFocus()
    await user.tab()
    expect(input).toHaveFocus()
    await user.tab({ shift: true })
    expect(closeButton).toHaveFocus()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Navigasi cepat' })).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('supports keyboard shortcuts and active-option navigation', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <CommandPalette />
      </MemoryRouter>,
    )

    await user.keyboard('{Control>}k{/Control}')
    const input = await screen.findByRole('combobox', { name: 'Cari perintah' })
    const firstActiveId = input.getAttribute('aria-activedescendant')
    await user.keyboard('{ArrowDown}')
    expect(input.getAttribute('aria-activedescendant')).not.toBe(firstActiveId)

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Navigasi cepat' })).not.toBeInTheDocument())
  })
})
