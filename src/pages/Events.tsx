import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { fetchAllEvents } from '@/lib/queries'
import { type Event, type EventType } from '@/types'
import PageHero from '@/components/PageHero'
import EventCard from '@/components/EventCard'

const typeFilters: { value: string; label: string }[] = [
  { value: 'Tümü', label: 'Tümü' },
  { value: 'workshop', label: 'Atölye' },
  { value: 'course', label: 'Kurs' },
  { value: 'exhibition', label: 'Sergi' },
  { value: 'demo', label: 'Tanıtım' },
]

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('Tümü')

  useEffect(() => {
    fetchAllEvents()
      .then(setEvents)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'Tümü') return events
    return events.filter((e) => e.type === (filter as EventType))
  }, [events, filter])

  const upcoming = filtered.filter((e) => e.is_upcoming)
  const past = filtered.filter((e) => !e.is_upcoming)

  return (
    <div>
      <PageHero
        title="Etkinlikler"
        subtitle="Atölye kursları, workshop'lar, sergiler ve tanıtım etkinlikleri. Ebru sanatını yakından tanımak için sizi de aramızda görmekten mutluluk duyarız."
      />

      <section className="container-page py-16 md:py-24">
        {/* Filters */}
        <div className="mb-12 flex flex-wrap items-center gap-2">
          {typeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                filter === f.value
                  ? 'bg-ink-900 text-ink-50'
                  : 'border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-ink-100" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-20">
            {/* Upcoming */}
            {upcoming.length > 0 && (
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-water-600" />
                  <h2 className="font-serif text-2xl font-medium text-ink-900">Yaklaşan Etkinlikler</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Past */}
            {past.length > 0 && (
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-ink-300" />
                  <h2 className="font-serif text-2xl font-medium text-ink-500">Geçmiş Etkinlikler</h2>
                </div>
                <div className="grid gap-6 opacity-70 md:grid-cols-2 lg:grid-cols-3">
                  {past.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center gap-4 py-20 text-center">
                <p className="text-lg text-ink-500">Bu kategoride henüz etkinlik yok.</p>
                <button onClick={() => setFilter('Tümü')} className="btn-secondary">
                  Tüm etkinlikleri göster
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-ink-100 bg-ink-950 px-8 py-16 text-center md:px-16 md:py-20">
          <div className="absolute inset-0 bg-noise opacity-[0.06]" />
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
            <span className="text-xs font-semibold uppercase tracking-widest-2 text-water-400">Özel Etkinlik</span>
            <h2 className="heading-section text-balance text-ink-50">
              Özel atölye etkinlikleri düzenleyebiliriz
            </h2>
            <p className="text-ink-300">
              Kurumsal etkinlikler, doğum günü atölyeleri ve grup çalışmalarına özel düzenlemeler yapılabilir.
            </p>
            <Link to="/iletisim" className="btn-primary bg-water-600 hover:bg-water-500">
              İletişime Geç
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
