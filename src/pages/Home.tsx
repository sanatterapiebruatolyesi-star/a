import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { fetchFeaturedArtworks, fetchUpcomingEvents } from '@/lib/queries'
import { siteConfig } from '@/config'
import type { Artwork, Event } from '@/types'
import ArtworkCard from '@/components/ArtworkCard'
import Modal from '@/components/Modal'
import MarbelDecor from '@/components/MarbelDecor'
import { eventTypeLabels } from '@/types'

export default function Home() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [selected, setSelected] = useState<Artwork | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchFeaturedArtworks(6), fetchUpcomingEvents(3)])
      .then(([a, e]) => {
        setArtworks(a)
        setEvents(e)
      })
      .catch(() => {
        // hata durumunda boş bırak
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="marquee-paint absolute inset-0" />
        <MarbelDecor />
        <div className="absolute inset-0 bg-noise opacity-[0.05]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-50 to-transparent" />

        <div className="container-page relative z-10 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-w-3xl flex-col gap-6"
          >
            <span className="eyebrow">Geleneksel Türk Ebru Sanatı</span>
            <h1 className="heading-display text-balance">
              Suyun yüzünde dans eden <span className="italic text-water-700">renkler</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ink-600">
              {siteConfig.artist.bio}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/eserler" className="btn-primary">
                Eserleri Keşfet
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/etkinlikler" className="btn-secondary">
                Etkinlikler
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="text-[10px] uppercase tracking-widest-2 text-ink-400">Aşağı kaydır</span>
          <span className="h-12 w-px bg-ink-300" />
        </motion.div>
      </section>

      {/* Artist intro */}
      <section className="container-page py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br from-water-100 via-ink-50 to-gold-50">
              <div className="absolute inset-0 bg-noise opacity-[0.06]" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="artist-g" cx="50%" cy="40%" r="65%">
                    <stop offset="0%" stopColor="#7fcabd" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#1d3e3d" stopOpacity="0.05" />
                  </radialGradient>
                </defs>
                <rect width="400" height="500" fill="url(#artist-g)" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx={200 + Math.sin(i * 1.5) * 70}
                    cy={250 + Math.cos(i * 1.8) * 90}
                    rx={55 + i * 10}
                    ry={32 + i * 6}
                    fill="none"
                    stroke="#368e86"
                    strokeWidth="1.5"
                    opacity={0.12 - i * 0.01}
                    transform={`rotate(${i * 30} 200 250)`}
                  />
                ))}
              </svg>
              <span className="absolute bottom-5 left-5 text-xs uppercase tracking-widest-2 text-ink-400">
                Portre fotoğrafı eklenecek
              </span>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden h-28 w-28 rounded-2xl border border-ink-100 bg-ink-50 p-4 shadow-lg md:block">
              <p className="font-serif text-3xl font-medium text-water-700">20+</p>
              <p className="text-[10px] uppercase tracking-widest-2 text-ink-500">Yıllık deneyim</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="eyebrow">Sanatçı</span>
            <h2 className="heading-section text-balance">
              {siteConfig.artist.name} — {siteConfig.artist.title}
            </h2>
            <p className="text-base leading-relaxed text-ink-600">
              {siteConfig.artist.bio}
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-ink-100 pt-6">
              <div>
                <p className="font-serif text-2xl text-ink-900">Ebru</p>
                <p className="text-xs uppercase tracking-widest-2 text-ink-400">Geleneksel sanat</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-ink-900">Atölye</p>
                <p className="text-xs uppercase tracking-widest-2 text-ink-400">Kurs & çalışma</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-ink-900">Sergi</p>
                <p className="text-xs uppercase tracking-widest-2 text-ink-400">Eserler</p>
              </div>
            </div>
            <Link to="/sanatci" className="link-underline mt-2 self-start text-sm font-medium text-water-700">
              Sanatçıyı tanıyın →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured artworks */}
      <section className="border-y border-ink-100 bg-white/40 py-24 md:py-32">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">Portfolyo</span>
              <h2 className="heading-section text-balance">Öne çıkan eserler</h2>
            </div>
            <Link to="/eserler" className="link-underline self-start text-sm font-medium text-water-700 md:self-auto">
              Tüm eserleri gör →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-ink-100" />
              ))
            ) : artworks.length > 0 ? (
              artworks.map((art, i) => (
                <ArtworkCard key={art.id} artwork={art} index={i} onOpen={setSelected} />
              ))
            ) : (
              <p className="col-span-full text-ink-500">Henüz eser eklenmemiş.</p>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="container-page py-24 md:py-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Yaklaşan</span>
            <h2 className="heading-section text-balance">Etkinlikler & atölyeler</h2>
          </div>
          <Link to="/etkinlikler" className="link-underline self-start text-sm font-medium text-water-700 md:self-auto">
            Tüm etkinlikler →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-ink-100" />
            ))
          ) : events.length > 0 ? (
            events.map((event, i) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:shadow-xl hover:shadow-ink-900/5"
              >
                <span className="eyebrow mb-3">{eventTypeLabels[event.type]}</span>
                <h3 className="font-serif text-2xl font-medium text-ink-900 transition-colors group-hover:text-water-800">
                  {event.title}
                </h3>
                {event.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">{event.description}</p>
                )}
                <div className="mt-auto flex flex-col gap-2 border-t border-ink-100 pt-4 text-sm text-ink-600">
                  {event.event_date && (
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-water-600" />
                      {new Date(event.event_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                  {event.location && (
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-water-600" />
                      {event.location}
                    </span>
                  )}
                </div>
              </motion.article>
            ))
          ) : (
            <p className="col-span-full text-ink-500">Yaklaşan etkinlik yok.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-16 text-center md:px-16 md:py-24"
        >
          <div className="absolute inset-0 bg-noise opacity-[0.06]" />
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
            <span className="text-xs font-semibold uppercase tracking-widest-2 text-water-400">İletişim</span>
            <h2 className="heading-section text-balance text-ink-50">
              Ebru sanatını birlikte keşfedelim
            </h2>
            <p className="text-ink-300">
              Atölye kursları, özel etkinlikler ve sergiler hakkında bilgi almak için iletişime geçin.
            </p>
            <Link to="/iletisim" className="btn-primary bg-water-600 hover:bg-water-500">
              İletişime Geç
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Artwork modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        subtitle={selected?.category}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-water-100 via-ink-50 to-gold-50">
          {selected?.image_url ? (
            <img src={selected.image_url} alt={selected.title} className="h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-noise opacity-[0.06]" />
          )}
        </div>
        {selected?.description && (
          <p className="px-6 py-4 text-sm leading-relaxed text-ink-600">{selected.description}</p>
        )}
      </Modal>
    </div>
  )
}
