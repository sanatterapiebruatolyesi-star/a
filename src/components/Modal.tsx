import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  subtitle?: string
}

export default function Modal({ open, onClose, children, title, subtitle }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-ink-100 bg-ink-50 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-ink-50/80 text-ink-700 backdrop-blur transition-colors hover:bg-ink-900 hover:text-ink-50"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
            {(title || subtitle) && (
              <div className="border-t border-ink-100 px-6 py-5">
                {subtitle && <p className="eyebrow mb-1">{subtitle}</p>}
                {title && <h3 className="font-serif text-2xl text-ink-900">{title}</h3>}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
