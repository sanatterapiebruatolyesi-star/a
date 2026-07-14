/*
# Create artworks and events tables for the Ebru artist website

1. New Tables
- `artworks` — portfolio pieces (ebru works) shown on the Portfolio page and featured on the home page.
  - id (uuid, primary key)
  - title (text, not null) — name of the piece
  - category (text, not null) — ebru type (e.g. "Klasik Ebru", "Battal Ebru", "Şal Ebru", "Tarz-ı Kadim")
  - description (text) — short description of the piece
  - image_url (text) — URL to the artwork photo (added by owner later; nullable for template state)
  - year (int) — year the piece was made
  - is_featured (boolean, default false) — shown on the home page hero/featured section
  - sort_order (int, default 0) — manual ordering
  - created_at (timestamptz)

- `events` — workshops, courses, and exhibitions shown on the Events page and home page.
  - id (uuid, primary key)
  - title (text, not null) — name of the event
  - type (text, not null) — "workshop" | "course" | "exhibition" | "demo"
  - description (text) — details about the event
  - event_date (date) — when the event takes place
  - end_date (date) — optional end date for multi-day events/exhibitions
  - location (text) — where the event is held
  - image_url (text) — URL to event photo (added later; nullable)
  - is_upcoming (boolean, default true) — controls visibility in the "upcoming" section
  - sort_order (int, default 0) — manual ordering
  - created_at (timestamptz)

2. Security
- Both tables have RLS enabled.
- This is a single-tenant, no-auth public website. All content is intentionally public.
- Policies allow `anon` and `authenticated` full CRUD so the anon-key frontend can read data,
  and the owner can manage content via the Supabase dashboard (authenticated session).
- `USING (true)` / `WITH CHECK (true)` is correct here because all rows are intentionally shared/public.

3. Important Notes
- Image URLs are nullable so the template works before the owner uploads real photos.
- Seed data is inserted after table creation so the site looks populated immediately.
  The owner replaces seed rows with real artworks and events via the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Klasik Ebru',
  description text,
  image_url text,
  year int,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_artworks" ON artworks;
CREATE POLICY "anon_select_artworks" ON artworks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_artworks" ON artworks;
CREATE POLICY "anon_insert_artworks" ON artworks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_artworks" ON artworks;
CREATE POLICY "anon_update_artworks" ON artworks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_artworks" ON artworks;
CREATE POLICY "anon_delete_artworks" ON artworks FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL DEFAULT 'workshop',
  description text,
  event_date date,
  end_date date,
  location text,
  image_url text,
  is_upcoming boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_events" ON events;
CREATE POLICY "anon_select_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_events" ON events;
CREATE POLICY "anon_insert_events" ON events FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_events" ON events;
CREATE POLICY "anon_update_events" ON events FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_events" ON events;
CREATE POLICY "anon_delete_events" ON events FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_artworks_featured ON artworks(is_featured);
CREATE INDEX IF NOT EXISTS idx_artworks_sort ON artworks(sort_order);
CREATE INDEX IF NOT EXISTS idx_events_upcoming ON events(is_upcoming);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_sort ON events(sort_order);

-- Seed sample artworks so the portfolio looks populated before real photos are added.
INSERT INTO artworks (title, category, description, year, is_featured, sort_order) VALUES
('Suyüzü', 'Klasik Ebru', 'Geleneksel ebru tekniği ile yapılan, suyun yüzeyindeki dansin izleri.', 2024, true, 1),
('Battal', 'Battal Ebru', 'Geniş fırça darbeleriyle oluşturulan cesur ve hareketli bir kompozisyon.', 2024, true, 2),
('Tarz-ı Kadim', 'Tarz-ı Kadim', 'Klasik Osmanlı ebru geleneğine saygı, sıcak tonlarla.', 2023, true, 3),
('Şal', 'Şal Ebru', 'Akıcı şal deseni, ipeksi geçişlerle yumuşak bir uyum.', 2023, false, 4),
('Neyyş', 'Neyyş Ebru', 'Spiral hareketlerin su üzerindeki ritmik yansıması.', 2023, false, 5),
('Akardesme', 'Akardesme', 'Su akışının ebru yüzeyindeki izdüşümü.', 2022, false, 6),
('Gelgit', 'Gelgit Ebru', 'Gel-git deseni, gelgitlerin su üzerindeki sisli etkisi.', 2022, false, 7),
('Tavus Kuşu', 'Tarz-ı Kadim', 'Tavus kuşu kuyruğu deseninden ilham alan zarif bir çalışma.', 2022, false, 8),
('Bahar', 'Klasik Ebru', 'Baharın uyanışını yansıtan pastal tonlu ebru.', 2021, false, 9),
('Mavi Vaha', 'Battal Ebru', 'Mavinin tonlarında, vaha esintili geniş yüzey çalışması.', 2021, false, 10)
ON CONFLICT DO NOTHING;

-- Seed sample events.
INSERT INTO events (title, type, description, event_date, end_date, location, is_upcoming, sort_order) VALUES
('Başlangıç Ebru Kursu', 'course', 'Hafta sonu başlayan başlangıç seviyesi ebru kursu. Malzemeler dahildir.', '2026-09-15', '2026-12-15', 'Ebru Atölyesi, Beylikdüzü', true, 1),
('Ebru Günü Atölyesi', 'workshop', 'Tek günlük ebru deneyimi atölyesi. Yeni başlayanlar için ideal.', '2026-08-24', NULL, 'Ebru Atölyesi, Beylikdüzü', true, 2),
('Sergi: Suyun İzleri', 'exhibition', 'Son dönem eserlerin sergilendiği karma sergi.', '2026-10-05', '2026-10-19', 'Sanat Galerisi, İstanbul', true, 3),
('Kurumsal Ebru Etkinliği', 'demo', 'Şirketler için özel ebru tanıtım ve deneyim etkinliği.', '2026-09-10', NULL, 'Kurumsal Mekan', true, 4)
ON CONFLICT DO NOTHING;
