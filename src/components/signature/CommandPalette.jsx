import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import { navLinks } from '../../data/profile'

export default function CommandPalette({ registerShortcut = true }) {
  const navigate = useNavigate()
  const titleId = useId()
  const listboxId = useId()
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const returnFocusRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const commands = useMemo(() => {
    const sectionCommands = navLinks.map((item) => ({
      id: item.id,
      label: `Pergi ke ${item.label}`,
      action: () => navigate(`/#${item.id}`),
    }))

    return [
      ...sectionCommands,
      {
        id: 'cert-page',
        label: 'Buka halaman Sertifikasi',
        action: () => navigate('/sertifikasi'),
      },
      {
        id: 'email',
        label: 'Buka draft email',
        action: () => {
          window.location.href = 'mailto:louisfpj@gmail.com'
        },
      },
      {
        id: 'top',
        label: 'Kembali ke atas',
        action: () => navigate('/#hero'),
      },
    ]
  }, [navigate])

  const filtered = useMemo(
    () => commands.filter((command) => command.label.toLocaleLowerCase('id-ID').includes(query.toLocaleLowerCase('id-ID').trim())),
    [commands, query],
  )

  const openPalette = () => {
    const activeElement = document.activeElement
    returnFocusRef.current = activeElement instanceof HTMLElement && activeElement !== document.body
      ? activeElement
      : null
    setOpen(true)
  }

  const closePalette = () => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
  }

  const execute = (command) => {
    command.action()
    closePalette()
  }

  useEffect(() => {
    if (!registerShortcut) return undefined

    const onKeyDown = (event) => {
      const activeElement = document.activeElement
      const isEditing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement?.tagName) || activeElement?.isContentEditable
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      const isSlash = event.key === '/' && !isEditing

      if (isShortcut || isSlash) {
        event.preventDefault()
        if (open) closePalette()
        else openPalette()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, registerShortcut])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    const appRoot = document.getElementById('root')
    const previousInert = appRoot?.inert ?? false
    document.body.style.overflow = 'hidden'
    if (appRoot) appRoot.inert = true
    window.requestAnimationFrame(() => inputRef.current?.focus())

    const onDialogKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closePalette()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = [...dialogRef.current.querySelectorAll('[data-dialog-focusable="true"]')].filter(
        (element) => !element.disabled,
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onDialogKeyDown)

    return () => {
      document.removeEventListener('keydown', onDialogKeyDown)
      document.body.style.overflow = previousOverflow
      if (appRoot) appRoot.inert = previousInert
      window.requestAnimationFrame(() => returnFocusRef.current?.focus())
    }
  }, [open])

  const handleInputKeyDown = (event) => {
    if (!filtered.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % filtered.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (current <= 0 ? filtered.length - 1 : current - 1))
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      execute(filtered[activeIndex])
    }
  }

  const activeDescendant = filtered[activeIndex] ? `${listboxId}-${filtered[activeIndex].id}` : undefined

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openPalette}
        className="focus-ring min-h-11 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-slate-300 transition hover:border-cyan-300/70 hover:text-cyan-200"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Perintah Ctrl+K
      </button>

      {createPortal(<AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-20 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closePalette()
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, y: -10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.985 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/95 shadow-card"
            >
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-4 py-3">
                <h2 id={titleId} className="text-sm font-semibold text-slate-100">Navigasi cepat</h2>
                <button
                  type="button"
                  onClick={closePalette}
                  data-dialog-focusable="true"
                  className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200"
                  aria-label="Tutup navigasi cepat"
                >
                  <FaXmark size={18} />
                </button>
              </div>

              <div className="border-b border-slate-800 px-4 py-3">
                <label className="sr-only" htmlFor={`${listboxId}-search`}>Cari perintah</label>
                <input
                  ref={inputRef}
                  id={`${listboxId}-search`}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setActiveIndex(0)
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Ketik perintah..."
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded="true"
                  aria-controls={listboxId}
                  aria-activedescendant={activeDescendant}
                  autoComplete="off"
                  data-dialog-focusable="true"
                  className="focus-ring w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div id={listboxId} role="listbox" aria-label="Daftar perintah" className="max-h-[320px] overflow-y-auto p-2">
                {filtered.map((command, index) => {
                  const isActive = index === activeIndex
                  return (
                    <button
                      id={`${listboxId}-${command.id}`}
                      key={command.id}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      tabIndex={-1}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => execute(command)}
                      className={`focus-ring flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                        isActive ? 'bg-slate-800/90 text-cyan-100' : 'text-slate-200 hover:bg-slate-800/80'
                      }`}
                    >
                      <span>{command.label}</span>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Jalankan</span>
                    </button>
                  )
                })}

                {!filtered.length ? (
                  <p className="px-3 py-4 text-sm text-slate-400" role="status">
                    Perintah tidak ditemukan untuk kata kunci saat ini.
                  </p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>, document.body)}
    </>
  )
}
