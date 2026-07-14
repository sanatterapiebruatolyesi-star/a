import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchArtworks } from '@/lib/queries'
import type { Artwork } from '@/types'
import PageHero from '@/components/PageHero'
import ArtworkCard from '@/components/ArtworkCard'
import Modal from '@/components/Modal'

export default function Portfolio() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('Tümü')
  const [selected, setSelected] = useState<Artwork | null>(null)

  useEffect(() => {
    fetchArtworks()
      .then(setArtworks)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    const set = new Set(artworks.map((a) => a.category))
    return ['Tümü', ...Array.from(set)]
  }, [artworks])

  const filtered = useMemo(() => {
    if (filter === 'Tümü') return artworks
    return artworks.filter((a) => a.category === filter)
  }, [artworks, filter])

  return (
    <div>
      <PageHero
        title="Eserler"
        subtitle="Suyun yüzeyinde doğan, geleneksel tekniklerle life bulan ebru koleksiyonu. Her bir eser, renklerin suyla kurduğu eşsiz bir diyalogun izidir."
      />

      <section className="container-page py-16 md:py-24">
        {/* Filters */}
        <div className="mb-12 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-ink-900 text-ink-50'
                  : 'border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-ink-100" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((art, i) => (
                <ArtworkCard key={art.id} artwork={art} index={i} onOpen={setSelected} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-lg text-ink-500">Bu kategoride henüz eser yok.</p>
            <button onClick={() => setFilter('Tümü')} className="btn-secondary">
              Tüm eserleri göster
            </button>
          </div>
        )}
      </section>

      {/* Detail modal */}
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
        {selected?.year && (
          <p className="px-6 pb-5 text-xs uppercase tracking-widest-2 text-ink-400">{selected.year}</p>
        )}
      </Modal>
    </div>
  )
}
