import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  children?: ReactNode
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  children,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'items-start'}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="heading-section text-balance max-w-2xl">{title}</h2>
      {subtitle && (
        <p className={`max-w-2xl text-base leading-relaxed text-ink-600 ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  )
}
