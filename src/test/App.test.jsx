import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from '../App'
import CommandPalette from '../components/signature/CommandPalette'
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
    await waitFor(() => expect(document.title).toBe('Louis Fachri | System Administrator & Cybersecurity Enthusiast'))
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

  it('navigates from home to certifications and updates metadata', async () => {
    const user = userEvent.setup()
    renderApp()

    const certificationLinks = await screen.findAllByRole('link', { name: 'Sertifikasi' })
    await user.click(certificationLinks[0])

    expect(await screen.findByRole('heading', { level: 1, name: 'Dokumentasi Sertifikat dan Pencapaian' })).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Sertifikasi | Louis Fachri'))
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
