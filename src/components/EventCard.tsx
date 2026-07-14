import { motion } from 'framer-motion'
import { eventTypeLabels, type Event } from '@/types'
import { Calendar, MapPin } from 'lucide-react'

type Props = {
  event: Event
  index?: number
}

function formatDate(date: string | null): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function dateRange(event: Event): string {
  if (!event.event_date) return ''
  const start = formatDate(event.event_date)
  if (event.end_date) return `${start} — ${formatDate(event.end_date)}`
  return start
}

export default function EventCard({ event, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all duration-500 hover:shadow-xl hover:shadow-ink-900/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-water-100 via-ink-50 to-gold-50">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-noise opacity-[0.06]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id={`eg-${event.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7fcabd" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#c8852a" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <rect width="400" height="250" fill={`url(#eg-${event.id})`} />
              {Array.from({ length: 5 }).map((_, i) => (
                <circle
                  key={i}
                  cx={80 + i * 70}
                  cy={125 + Math.sin(i) * 40}
                  r={30 + (i % 3) * 10}
                  fill="none"
                  stroke="#368e86"
                  strokeWidth="1"
                  opacity="0.2"
                />
              ))}
            </svg>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-ink-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest-2 text-ink-50 backdrop-blur">
          {eventTypeLabels[event.type]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-serif text-2xl font-medium text-ink-900 transition-colors group-hover:text-water-800">
          {event.title}
        </h3>
        {event.description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-ink-500">{event.description}</p>
        )}
        <div className="mt-auto flex flex-col gap-2 border-t border-ink-100 pt-4 text-sm text-ink-600">
          {event.event_date && (
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-water-600" />
              {dateRange(event)}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-water-600" />
              {event.location}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
