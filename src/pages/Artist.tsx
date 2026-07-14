import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/config'
import PageHero from '@/components/PageHero'
import MarbelDecor from '@/components/MarbelDecor'

const milestones = [
  { year: 'Başlangıç', title: 'Ebru ile tanışma', text: 'Su yüzeyindeki renklerin büyüsüyle ilk tanışma ve temel tekniklerin öğrenilmesi.' },
  { year: 'Ustalık', title: 'Geleneksel teknikler', text: 'Battal, şal, tarz-ı kadim, neyyş gibi klasik ebru türlerinde ustalık kazanma.' },
  { year: 'Atölye', title: 'Kendi atölyesi', text: 'Kişisel atölyenin kurularak hem üretim hem de eğitim faaliyetlerinin başlaması.' },
  { year: 'Bugün', title: 'Sanatı aktarmak', text: 'Eserlerin sergilenmesi ve ebru sanatının yeni nesillere öğretilmesi.' },
]

const techniques = [
  { name: 'Klasik Ebru', desc: 'Temel ebru tekniği, düzgün renk yayılımı.' },
  { name: 'Battal Ebru', desc: 'Geniş fırça darbeleriyle cesur kompozisyon.' },
  { name: 'Şal Ebru', desc: 'Akıcı şal deseni, ipeksi geçişler.' },
  { name: 'Tarz-ı Kadim', desc: 'Klasik Osmanlı geleneğine saygı.' },
  { name: 'Neyyş Ebru', desc: 'Spiral hareketlerin ritmik yansıması.' },
  { name: 'Gelgit', desc: 'Gel-git deseni, sisli etki.' },
]

export default function Artist() {
  return (
    <div>
      <PageHero
        title={`${siteConfig.artist.name}`}
        subtitle={`${siteConfig.artist.title}. ${siteConfig.artist.tagline}.`}
      />

      {/* Bio + portrait */}
      <section className="container-page py-20 md:py-28">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br from-water-100 via-ink-50 to-gold-50">
              <div className="absolute inset-0 bg-noise opacity-[0.06]" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="bio-g" cx="50%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#7fcabd" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1d3e3d" stopOpacity="0.04" />
                  </radialGradient>
                </defs>
                <rect width="300" height="400" fill="url(#bio-g)" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx={150 + Math.sin(i * 1.6) * 50}
                    cy={200 + Math.cos(i * 1.9) * 70}
                    rx={40 + i * 8}
                    ry={24 + i * 5}
                    fill="none"
                    stroke="#368e86"
                    strokeWidth="1.5"
                    opacity={0.1 - i * 0.01}
                    transform={`rotate(${i * 25} 150 200)`}
                  />
                ))}
              </svg>
              <span className="absolute bottom-5 left-5 text-xs uppercase tracking-widest-2 text-ink-400">
                Portre fotoğrafı eklenecek
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="eyebrow">Hakkında</span>
            <h2 className="heading-section text-balance">Sanatçının yolculuğu</h2>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-ink-600">
              {siteConfig.artist.fullBio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-ink-100 bg-white/40 py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Yolculuk</span>
            <h2 className="heading-section text-balance">Kilometre taşları</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col gap-3 border-l-2 border-water-200 pl-6"
              >
                <span className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-water-600" />
                <span className="text-xs font-semibold uppercase tracking-widest-2 text-water-700">{m.year}</span>
                <h3 className="font-serif text-xl font-medium text-ink-900">{m.title}</h3>
                <p className="text-sm leading-relaxed text-ink-500">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Uzmanlık</span>
          <h2 className="heading-section text-balance">Ebru teknikleri</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techniques.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="card p-6 hover:shadow-lg hover:shadow-ink-900/5"
            >
              <h3 className="font-serif text-xl font-medium text-ink-900">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br from-water-50 to-gold-50 px-8 py-16 md:px-16 md:py-20"
        >
          <MarbelDecor />
          <div className="relative z-10 flex flex-col items-start gap-6">
            <span className="eyebrow">Eserler</span>
            <h2 className="heading-section max-w-xl text-balance">Sanatçının eserlerini keşfedin</h2>
            <Link to="/eserler" className="btn-primary">
              Portfolyoyu Gör
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
