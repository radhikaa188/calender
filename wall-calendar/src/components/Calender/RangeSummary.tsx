import { motion, AnimatePresence } from 'framer-motion'
import type { DateRange } from '../../utils/types'
import { formatDisplay, isBefore } from '../../utils/dateUtils'
import { eachDayOfInterval } from 'date-fns'
import { getHolidayForDate } from '../../utils/themes'

interface Props {
  range: DateRange
  accent: string
  accentLight: string
  accentDark: string
  isDark: boolean
  onClear: () => void
}

export default function RangeSummary({ range, accent, accentLight, isDark, onClear }: Props) {
  const show = !!(range.start && range.end)

  if (!show && !range.start) return null

  let stats = { total: 0, weekdays: 0, weekends: 0, holidays: 0 }

  if (range.start && range.end) {
    const s = isBefore(range.start, range.end) ? range.start : range.end
    const e = isBefore(range.start, range.end) ? range.end   : range.start
    const days = eachDayOfInterval({ start: s, end: e })
    stats.total    = days.length
    stats.weekdays = days.filter(d => d.getDay() > 0 && d.getDay() < 6).length
    stats.weekends = days.filter(d => d.getDay() === 0 || d.getDay() === 6).length
    stats.holidays = days.filter(d => !!getHolidayForDate(d)).length
  }

  const bg     = isDark ? 'rgba(255,255,255,0.07)' : accentLight
  const border = isDark ? `1px solid ${accent}44`  : `1px solid ${accent}33`
  const sub    = isDark ? 'rgba(255,255,255,0.45)' : '#9ca3af'

  return (
    <AnimatePresence>
      {(range.start) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mx-4 mb-3 overflow-hidden"
        >
          <div className="rounded-xl px-3 py-2.5" style={{ background: bg, border }}>
            {/* Date row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-xs" style={{ color: accent, fontFamily: 'DM Sans, sans-serif' }}>
                  📅 {formatDisplay(range.start)}
                </span>
                {range.end && (
                  <>
                    <span style={{ color: sub, fontSize: '0.7rem' }}>→</span>
                    <span className="font-semibold text-xs" style={{ color: accent, fontFamily: 'DM Sans, sans-serif' }}>
                      {formatDisplay(range.end)}
                    </span>
                  </>
                )}
                {!range.end && (
                  <span className="text-xs italic" style={{ color: sub, fontFamily: 'DM Mono, monospace' }}>
                    pick end date…
                  </span>
                )}
              </div>
              <button
                onClick={onClear}
                className="w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: `${accent}22`, color: accent, fontSize: '0.8rem' }}
              >
                ×
              </button>
            </div>

            {/* Stats pills — only show when range complete */}
            {range.end && (
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: 'Total',    value: stats.total,    icon: '📆' },
                  { label: 'Weekdays', value: stats.weekdays, icon: '💼' },
                  { label: 'Weekends', value: stats.weekends, icon: '🏖️' },
                  { label: 'Holidays', value: stats.holidays, icon: '🎉' },
                ].map(s => (
                  <div
                    key={s.label}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.1)' : 'white',
                      border: `1px solid ${accent}22`,
                    }}
                  >
                    <span style={{ fontSize: '0.6rem' }}>{s.icon}</span>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'DM Mono, monospace', color: accent, fontWeight: 700 }}>
                      {s.value}
                    </span>
                    <span style={{ fontSize: '0.6rem', color: sub, fontFamily: 'DM Sans, sans-serif' }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}