import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  title: string
  subtitle?: string
  children?: ReactNode
}

export default function PageHero({ title, subtitle, children }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-ink-100 pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="marquee-paint absolute inset-0" />
      <div className="absolute inset-0 bg-noise opacity-[0.04]" />
      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-3xl flex-col gap-5"
        >
          <span className="eyebrow">Ebru Sanatı</span>
          <h1 className="heading-display text-balance">{title}</h1>
          {subtitle && (
            <p className="max-w-2xl text-lg leading-relaxed text-ink-600">{subtitle}</p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  )
}
