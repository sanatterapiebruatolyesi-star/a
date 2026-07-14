import { motion } from 'framer-motion'
import type { Artwork } from '@/types'

type Props = {
  artwork: Artwork
  index?: number
  onOpen?: (artwork: Artwork) => void
}

export default function ArtworkCard({ artwork, index = 0, onOpen }: Props) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(artwork)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white text-left transition-all duration-500 hover:shadow-xl hover:shadow-ink-900/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-water-50 via-ink-50 to-gold-50">
        {artwork.image_url ? (
          <img
            src={artwork.image_url}
            alt={artwork.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-noise opacity-[0.07]" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 500" preserveAspectRatio="none">
                <defs>
                  <radialGradient id={`g-${artwork.id}`} cx="40%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#7fcabd" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#368e86" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#1d3e3d" stopOpacity="0.1" />
                  </radialGradient>
                </defs>
                <rect width="400" height="500" fill={`url(#g-${artwork.id})`} />
                {Array.from({ length: 7 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx={200 + Math.sin(i * 1.7) * 90}
                    cy={250 + Math.cos(i * 2.1) * 100}
                    rx={50 + i * 8}
                    ry={30 + i * 5}
                    fill="#c8852a"
                    opacity={0.08 + (i % 3) * 0.04}
                    transform={`rotate(${i * 25} ${200} ${250})`}
                  />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <ellipse
                    key={`b-${i}`}
                    cx={200 + Math.sin(i * 2.3 + 1) * 80}
                    cy={250 + Math.cos(i * 1.9 + 1) * 90}
                    rx={40 + i * 6}
                    ry={24 + i * 4}
                    fill="#342f25"
                    opacity={0.06 + (i % 3) * 0.03}
                    transform={`rotate(${i * -30 + 15} ${200} ${250})`}
                  />
                ))}
              </svg>
              <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest-2 text-ink-400">
                Fotoğraf eklenecek
              </span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-1 p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-widest-2 text-water-700">
            {artwork.category}
          </span>
          {artwork.year && <span className="text-xs text-ink-400">{artwork.year}</span>}
        </div>
        <h3 className="font-serif text-xl font-medium text-ink-900 transition-colors group-hover:text-water-800">
          {artwork.title}
        </h3>
        {artwork.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-ink-500">{artwork.description}</p>
        )}
      </div>
    </motion.button>
  )
}
