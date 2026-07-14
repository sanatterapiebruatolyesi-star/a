import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Palette, Users, Clock } from 'lucide-react'
import { siteConfig } from '@/config'
import PageHero from '@/components/PageHero'

const features = [
  { icon: Palette, title: 'Tam donanımlı stüdyo', text: 'Geleneksel ebru malzemeleri, kitre, ölzer ve renklerle donatılmış çalışma alanı.' },
  { icon: Users, title: 'Küçük gruplar', text: 'Her seansda sınırlı sayıda katılımcı, birebir ilgi ve uygulamalı öğrenim.' },
  { icon: Clock, title: 'Esnek saatler', text: 'Hafta içi ve hafta sonu seans seçenekleri, tüm seviyeler için uygun.' },
]

const galleryPlaceholders = [
  { label: 'Atölye iç mekan', aspect: 'aspect-[4/3]' },
  { label: 'Çalışma tezgahı', aspect: 'aspect-[4/5]' },
  { label: 'Malzemeler', aspect: 'aspect-square' },
  { label: 'Ebru tekniği', aspect: 'aspect-[4/5]' },
  { label: 'Atölye atmosferi', aspect: 'aspect-[4/3]' },
  { label: 'Tamamlanan eser', aspect: 'aspect-square' },
]

export default function Atelier() {
  return (
    <div>
      <PageHero
        title="Atölye"
        subtitle="Ebru sanatının yaşayan mekânı. Geleneksel tekniklerin öğretildiği, eserlerin üretildiği ve sanatın kalpten kalbe aktarıldığı stüdyo."
      />

      {/* Intro */}
      <section className="container-page py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="eyebrow">Stüdyo</span>
            <h2 className="heading-section text-balance">Suyun ve rengin buluşma noktası</h2>
            <p className="text-base leading-relaxed text-ink-600">
              Atölye, ebru sanatının tüm gereçleriyle donatılmış, sıcak ve ilham verici bir çalışma ortamı sunar.
              Geleneksel kitre çözeltisi, doğal renk pigmentleri ve özenle hazırlanmış ebru teknesi,
              her katılımcının sanatın gerçek ritmini deneyimlemesini sağlar.
            </p>
            <p className="text-base leading-relaxed text-ink-600">
              İster yeni başlayan ister ileri seviye bir sanatçı olun, atölye kapıları herkese açık.
              Burada sadece teknik öğrenilmez; suyla, renkle ve sabırla kurulan o sessiz diyaloğun da temelleri atılır.
            </p>
            <div className="flex items-center gap-3 border-t border-ink-100 pt-6 text-sm text-ink-600">
              <MapPin className="h-5 w-5 text-water-600" />
              {siteConfig.artist.address}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br from-water-100 via-ink-50 to-gold-50"
          >
            <div className="absolute inset-0 bg-noise opacity-[0.06]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="atelier-g" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#7fcabd" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1d3e3d" stopOpacity="0.04" />
                </radialGradient>
              </defs>
              <rect width="400" height="500" fill="url(#atelier-g)" />
              {Array.from({ length: 6 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx={200 + Math.sin(i * 1.7) * 80}
                  cy={250 + Math.cos(i * 2) * 90}
                  rx={50 + i * 10}
                  ry={30 + i * 6}
                  fill="none"
                  stroke="#368e86"
                  strokeWidth="1.5"
                  opacity={0.1 - i * 0.01}
                  transform={`rotate(${i * 25} 200 250)`}
                />
              ))}
            </svg>
            <span className="absolute bottom-5 left-5 text-xs uppercase tracking-widest-2 text-ink-400">
              Atölye fotoğrafı eklenecek
            </span>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-ink-100 bg-white/40 py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Olanaklar</span>
            <h2 className="heading-section text-balance">Atölyede neler var?</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card p-8 hover:shadow-lg hover:shadow-ink-900/5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-water-50 text-water-700">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-medium text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery placeholders */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Galeri</span>
          <h2 className="heading-section text-balance">Atölyeden kareler</h2>
          <p className="max-w-xl text-ink-500">Fotoğraflar yakında eklenecek.</p>
        </div>
        <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
          {galleryPlaceholders.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl border border-ink-100 bg-gradient-to-br from-water-50 via-ink-50 to-gold-50 ${g.aspect} ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <div className="absolute inset-0 bg-noise opacity-[0.05]" />
              <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest-2 text-ink-400">
                {g.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="container-page pb-24">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Konum</span>
          <h2 className="heading-section text-balance">Atölyeyi ziyaret edin</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 overflow-hidden rounded-3xl border border-ink-100"
        >
          <iframe
            src={siteConfig.artist.mapEmbedUrl}
            className="h-[400px] w-full"
            loading="lazy"
            title="Atölye konumu"
          />
        </motion.div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm text-ink-600">
            <MapPin className="h-4 w-4 text-water-600" />
            {siteConfig.artist.address}
          </p>
          <a
            href={siteConfig.artist.mapLink}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Haritada Aç
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  )
}
