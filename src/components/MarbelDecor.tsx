import { motion } from 'framer-motion'

export default function MarbelDecor({ className = '' }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="marble-g1" cx="30%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#7fcabd" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#368e86" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#1d3e3d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="marble-g2" cx="70%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#c8852a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c8852a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="400" fill="url(#marble-g1)" />
        <rect width="1200" height="400" fill="url(#marble-g2)" />
        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse
            key={`a-${i}`}
            cx={120 + i * 120 + Math.sin(i) * 30}
            cy={200 + Math.cos(i * 1.4) * 80}
            rx={60 + (i % 4) * 25}
            ry={35 + (i % 3) * 15}
            fill="none"
            stroke="#368e86"
            strokeWidth="1.5"
            opacity={0.08 + (i % 3) * 0.03}
            transform={`rotate(${i * 20} ${120 + i * 120} ${200 + Math.cos(i) * 80})`}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={`b-${i}`}
            cx={200 + i * 160}
            cy={220 + Math.sin(i * 2) * 60}
            rx={45 + i * 10}
            ry={28 + i * 6}
            fill="#c8852a"
            opacity={0.04 + (i % 3) * 0.02}
            transform={`rotate(${i * -25 + 10} ${200 + i * 160} ${220 + Math.sin(i * 2) * 60})`}
          />
        ))}
      </svg>
    </motion.div>
  )
}
