import { Link } from 'react-router-dom'
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { navItems, siteConfig } from '@/config'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-100 bg-ink-950 text-ink-100">
      <div className="container-page grid gap-12 py-16 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-ink-700">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-water-400" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3c4 2.5 6 5 6 8.5 0 3.5-2.7 5.5-6 5.5s-6-2-6-5.5C6 8 8 5.5 12 3z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="leading-none">
              <p className="font-serif text-lg">{siteConfig.artist.name}</p>
              <p className="text-[10px] uppercase tracking-widest-2 text-water-400">Ebru Sanatı</p>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-300">
            {siteConfig.artist.tagline}. Geleneksel Türk ebru sanatçısı ve atölyesi.
          </p>
        </div>

        <div className="space-y-4">
          <p className="eyebrow text-water-400">Menü</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-ink-300 transition-colors hover:text-ink-50 link-underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="eyebrow text-water-400">İletişim</p>
          <ul className="space-y-3 text-sm text-ink-300">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-water-400" />
              <span>{siteConfig.artist.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-water-400" />
              <a href={`tel:${siteConfig.artist.phone}`} className="link-underline">{siteConfig.artist.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-water-400" />
              <a href={`mailto:${siteConfig.artist.email}`} className="link-underline">{siteConfig.artist.email}</a>
            </li>
          </ul>
          <div className="flex items-center gap-3 pt-2">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-ink-700 text-ink-300 transition-colors hover:border-water-400 hover:text-water-400" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-ink-700 text-ink-300 transition-colors hover:border-water-400 hover:text-water-400" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.artist.name}. Tüm hakları saklıdır.</p>
          <p>Geleneksel Türk Ebru Sanatı</p>
        </div>
      </div>
    </footer>
  )
}
