import { motion } from 'framer-motion'
import { MONTH_THEMES } from '../../utils/themes'
import type { AppTheme } from '../../utils/types'

interface Props {
  currentMonth: number
  onSelect: (month: number) => void
  appTheme: AppTheme
}

const SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function YearStrip({ currentMonth, onSelect, appTheme }: Props) {
  const isDark = appTheme === 'dark'

  return (
    <div
      className="flex gap-0.5 px-3 py-2 overflow-x-auto scrollbar-hide"
      style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {MONTH_THEMES.map((t, i) => {
        const isActive = i === currentMonth
        return (
          <motion.button
            key={i}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onSelect(i)}
            className="relative flex-shrink-0 flex flex-col items-center rounded-lg overflow-hidden transition-all"
            style={{
              width: 44,
              height: 36,
              border: isActive ? `2px solid ${t.accentColor}` : '2px solid transparent',
              boxShadow: isActive ? `0 0 12px ${t.accentColor}55` : 'none',
            }}
          >
            {/* Mini image */}
            <img
              src={t.imageUrl}
              alt={t.label}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: isActive
                  ? `${t.accentColor}66`
                  : 'rgba(0,0,0,0.38)',
              }}
            />
            {/* Label */}
            <span
              className="relative z-10 mt-auto mb-0.5 text-white font-semibold"
              style={{ fontSize: '0.55rem', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.03em' }}
            >
              {SHORT[i]}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}