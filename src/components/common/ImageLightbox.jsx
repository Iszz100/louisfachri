import { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6'

export default function ImageLightbox({ activeIndex, items, onClose, onSelect, open, shouldReduceMotion, title }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const returnFocusRef = useRef(null)
  const activeIndexRef = useRef(activeIndex)
  const itemsRef = useRef(items)
  const onCloseRef = useRef(onClose)
  const onSelectRef = useRef(onSelect)
  const titleId = useId()

  useEffect(() => {
    activeIndexRef.current = activeIndex
    itemsRef.current = items
    onCloseRef.current = onClose
    onSelectRef.current = onSelect
  }, [activeIndex, items, onClose, onSelect])

  useEffect(() => {
    if (!open) return undefined

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    const appRoot = document.getElementById('root')
    const previousInert = appRoot?.inert ?? false
    document.body.style.overflow = 'hidden'
    if (appRoot) appRoot.inert = true
    window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    const selectRelativeImage = (offset) => {
      const imageCount = itemsRef.current.length
      if (imageCount <= 1) return
      onSelectRef.current((activeIndexRef.current + offset + imageCount) % imageCount)
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        selectRelativeImage(-1)
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        selectRelativeImage(1)
        return
      }

      if (event.key !== 'Tab') return

      const focusable = [...dialogRef.current.querySelectorAll('[data-lightbox-focusable="true"]')]
        .filter((element) => !element.disabled)
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

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (appRoot) appRoot.inert = previousInert
      window.requestAnimationFrame(() => returnFocusRef.current?.focus())
    }
  }, [open])

  const activeItem = items[activeIndex] ?? items[0]
  const hasMultipleImages = items.length > 1

  return createPortal(
    <AnimatePresence>
      {open && activeItem ? (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[94vh] w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <h2 id={titleId} className="truncate text-sm font-semibold text-slate-100">Galeri {title}</h2>
                <p className="mt-0.5 text-xs text-slate-400">Gambar {activeIndex + 1} dari {items.length}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                data-lightbox-focusable="true"
                className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-cyan-100"
                aria-label="Tutup galeri gambar"
              >
                <FaXmark size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/45 p-2 sm:p-4">
              {hasMultipleImages ? (
                <button
                  type="button"
                  onClick={() => onSelect((activeIndex - 1 + items.length) % items.length)}
                  data-lightbox-focusable="true"
                  className="focus-ring absolute left-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-600 bg-slate-950/90 text-slate-200 shadow-lg transition hover:border-cyan-300/60 hover:text-cyan-100 sm:left-5"
                  aria-label="Gambar sebelumnya"
                >
                  <FaChevronLeft size={15} aria-hidden="true" />
                </button>
              ) : null}

              <img
                key={activeItem.src}
                src={activeItem.src}
                width={activeItem.width}
                height={activeItem.height}
                alt={activeItem.alt}
                loading="eager"
                decoding="async"
                className="max-h-[72vh] max-w-full object-contain"
              />

              {hasMultipleImages ? (
                <button
                  type="button"
                  onClick={() => onSelect((activeIndex + 1) % items.length)}
                  data-lightbox-focusable="true"
                  className="focus-ring absolute right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-600 bg-slate-950/90 text-slate-200 shadow-lg transition hover:border-cyan-300/60 hover:text-cyan-100 sm:right-5"
                  aria-label="Gambar berikutnya"
                >
                  <FaChevronRight size={15} aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="border-t border-slate-800 px-4 py-3 sm:px-5" aria-live="polite">
              {activeItem.group ? (
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-300">{activeItem.group}</p>
              ) : null}
              <p className="mt-1 text-sm leading-6 text-slate-300">{activeItem.caption}</p>
              <p className="mt-1 hidden text-xs text-slate-500 sm:block">Gunakan tombol panah kiri/kanan untuk berpindah gambar.</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
