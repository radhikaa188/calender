import { motion } from 'framer-motion'
import type { AppTheme } from '../../utils/types'

interface Props {
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  accent: string
  appTheme: AppTheme
  onToggleTheme: () => void
}

export default function MonthNav({ onPrev, onNext, onToday, accent, appTheme, onToggleTheme }: Props) {
  const isDark = appTheme === 'dark'
  const btnStyle = {
    color: isDark ? 'rgba(255,255,255,0.6)' : '#6b7280',
    background: isDark ? 'rgba(255,255,255,0.07)' : 'transparent',
  }

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-1">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onPrev}
          className="w-9 h-9 rounded-full flex items-center justify-center text-2xl font-light transition-colors hover:bg-black/5"
          style={btnStyle}
          aria-label="Previous month"
        >
          ‹
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onNext}
          className="w-9 h-9 rounded-full flex items-center justify-center text-2xl font-light transition-colors hover:bg-black/5"
          style={btnStyle}
          aria-label="Next month"
        >
          ›
        </motion.button>
      </div>

      <div className="flex items-center gap-2">
        {/* Today button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onToday}
          className="text-xs font-semibold px-3 py-1 rounded-full border transition-all hover:shadow-sm"
          style={{
            borderColor: accent, color: accent,
            fontFamily: 'DM Sans, sans-serif',
            background: isDark ? `${accent}18` : 'transparent',
          }}
        >
          Today
        </motion.button>

        {/* Dark mode toggle */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onToggleTheme}
          className="w-8 h-8 rounded-full flex items-center justify-center text-base transition-all"
          style={{
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
            border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.08)',
          }}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </motion.button>
      </div>
    </div>
  )
}