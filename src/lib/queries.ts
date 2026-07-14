import { supabase } from '@/lib/supabase'
import type { Artwork, Event } from '@/types'

export async function fetchArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function fetchFeaturedArtworks(limit = 6): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data ?? []
}

export async function fetchUpcomingEvents(limit = 4): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_upcoming', true)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data ?? []
}

export async function fetchAllEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}
