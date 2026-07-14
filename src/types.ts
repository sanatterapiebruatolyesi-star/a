export type Artwork = {
  id: string
  title: string
  category: string
  description: string | null
  image_url: string | null
  year: number | null
  is_featured: boolean
  sort_order: number
  created_at: string
}

export type EventType = 'workshop' | 'course' | 'exhibition' | 'demo'

export type Event = {
  id: string
  title: string
  type: EventType
  description: string | null
  event_date: string | null
  end_date: string | null
  location: string | null
  image_url: string | null
  is_upcoming: boolean
  sort_order: number
  created_at: string
}

export const eventTypeLabels: Record<EventType, string> = {
  workshop: 'Atölye',
  course: 'Kurs',
  exhibition: 'Sergi',
  demo: 'Tanıtım',
}
