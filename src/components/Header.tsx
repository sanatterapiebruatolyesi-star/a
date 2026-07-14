import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems, siteConfig } from '@/config'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-50/90 backdrop-blur-md border-b border-ink-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-page flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 transition-colors duration-300 group-hover:border-water-500">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-water-700" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3c4 2.5 6 5 6 8.5 0 3.5-2.7 5.5-6 5.5s-6-2-6-5.5C6 8 8 5.5 12 3z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="11" r="1" fill="currentColor" />
              <circle cx="13" cy="13" r="0.8" fill="currentColor" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-medium text-ink-900">{siteConfig.artist.shortName}</span>
            <span className="text-[10px] uppercase tracking-widest-2 text-water-700">Ebru Sanatı</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 link-underline ${
                    isActive ? 'text-water-700' : 'text-ink-700 hover:text-ink-950'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-800 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-ink-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
          >
            <ul className="container-page mt-4 flex flex-col gap-1 border-t border-ink-100 pt-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive ? 'bg-water-50 text-water-700' : 'text-ink-700 hover:bg-ink-100'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
