import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Youtube, Send, CheckCircle2 } from 'lucide-react'
import { siteConfig } from '@/config'
import PageHero from '@/components/PageHero'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // Mailto fallback — gerçek bir e-posta entegrasyonu eklenene kadar
    const body = encodeURIComponent(`Ad: ${form.name}\nE-posta: ${form.email}\n\n${form.message}`)
    const subject = encodeURIComponent(form.subject || 'İletişim formu')
    window.location.href = `mailto:${siteConfig.artist.email}?subject=${subject}&body=${body}`
    setTimeout(() => setStatus('sent'), 800)
  }

  return (
    <div>
      <PageHero
        title="İletişim"
        subtitle="Ebru kursları, özel etkinlikler, sergiler veya işbirlikleri için bizimle iletişime geçin. En kısa sürede dönüş yapacağız."
      />

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <span className="eyebrow">Bilgiler</span>
              <h2 className="heading-section text-balance">Bize ulaşın</h2>
            </div>

            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-water-50 text-water-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest-2 text-ink-400">Adres</span>
                  <span className="text-sm text-ink-700">{siteConfig.artist.address}</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-water-50 text-water-700">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest-2 text-ink-400">Telefon</span>
                  <a href={`tel:${siteConfig.artist.phone}`} className="text-sm text-ink-700 link-underline">
                    {siteConfig.artist.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-water-50 text-water-700">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest-2 text-ink-400">E-posta</span>
                  <a href={`mailto:${siteConfig.artist.email}`} className="text-sm text-ink-700 link-underline">
                    {siteConfig.artist.email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="flex flex-col gap-3 border-t border-ink-100 pt-6">
              <span className="text-xs uppercase tracking-widest-2 text-ink-400">Sosyal Medya</span>
              <div className="flex items-center gap-3">
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-2xl border border-ink-200 text-ink-700 transition-colors hover:border-water-500 hover:bg-water-50 hover:text-water-700" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-2xl border border-ink-200 text-ink-700 transition-colors hover:border-water-500 hover:bg-water-50 hover:text-water-700" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="surface p-8 md:p-10"
          >
            {status === 'sent' ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle2 className="h-16 w-16 text-water-600" />
                <h3 className="font-serif text-2xl text-ink-900">Mesajınız alındı</h3>
                <p className="max-w-sm text-sm text-ink-500">
                  E-posta uygulamanız açıldı. Mesajınızı göndermek için pencereyi onaylayın.
                  En kısa sürede size dönüş yapacağız.
                </p>
                <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }} className="btn-secondary mt-2">
                  Yeni mesaj
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Ad Soyad" required>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="input"
                      placeholder="Adınız"
                    />
                  </Field>
                  <Field label="E-posta" required>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="input"
                      placeholder="ornek@email.com"
                    />
                  </Field>
                </div>
                <Field label="Konu">
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="input"
                    placeholder="Kurs, etkinlik, işbirliği..."
                  />
                </Field>
                <Field label="Mesaj" required>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="input resize-none"
                    placeholder="Mesajınız..."
                  />
                </Field>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary mt-2 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="container-page pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl border border-ink-100"
        >
          <iframe
            src={siteConfig.artist.mapEmbedUrl}
            className="h-[400px] w-full"
            loading="lazy"
            title="İletişim konumu"
          />
        </motion.div>
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #d3cfc1;
          background: #f6f5f1;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #342f25;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
        }
        .input:focus {
          outline: none;
          border-color: #368e86;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(54, 142, 134, 0.12);
        }
        .input::placeholder { color: #94886a; }
      `}</style>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-widest-2 text-ink-500">
        {label} {required && <span className="text-gold-600">*</span>}
      </span>
      {children}
    </label>
  )
}
