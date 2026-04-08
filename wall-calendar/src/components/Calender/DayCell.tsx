import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  isSameDay, toDateKey,
  dateInRange, dateIsRangeStart, dateIsRangeEnd,
} from '../../utils/dateUtils'
import type { DateRange, Note } from '../../utils/types'
import { getHolidayForDate } from '../../utils/themes'

interface Props {
  date: Date
  today: Date
  range: DateRange
  hoverDate: Date | null
  accent: string
  accentLight: string
  notes: Note[]
  isDark: boolean
  isDragging: boolean
  onDayClick: (date: Date) => void
  onHover: (date: Date | null) => void
  onDragStart: (date: Date) => void
  onDragEnter: (date: Date) => void
  onDragEnd: () => void
}

export default function DayCell({
  date, today, range, hoverDate, accent, accentLight, notes, isDark,
  isDragging, onDayClick, onHover, onDragStart, onDragEnter, onDragEnd,
}: Props) {
  const [showTip, setShowTip] = useState(false)

  const isToday  = isSameDay(date, today)
  const holiday  = getHolidayForDate(date)
  const dateStr  = toDateKey(date)
  const dayNotes = notes.filter(n => n.date === dateStr)

  const previewEnd = range.start && !range.end ? hoverDate : range.end
  const pStart     = range.start
  const pEnd       = previewEnd

  const dayIsStart  = dateIsRangeStart(date, pStart, pEnd) || (!!pStart && !pEnd && isSameDay(date, pStart))
  const dayIsEnd    = dateIsRangeEnd(date, pStart, pEnd)
  const dayInRange  = dateInRange(date, pStart, pEnd)
  const daySelected = dayIsStart || dayIsEnd

  const isSun = date.getDay() === 0
  const isSat = date.getDay() === 6

  const stripBg   = `${accent}20`
  const textColor = isDark
    ? (daySelected ? '#fff' : isToday ? accent : isSun ? '#f87171' : isSat ? accent : 'rgba(255,255,255,0.82)')
    : (daySelected ? '#fff' : isToday ? accent : isSun ? '#ef4444' : isSat ? accent : '#374151')

  return (
    <div
      className="relative cursor-pointer"
      style={{ minHeight: 44, userSelect: 'none' }}
      onMouseEnter={() => { onHover(date); setShowTip(true); if (isDragging) onDragEnter(date) }}
      onMouseLeave={() => { onHover(null); setShowTip(false) }}
      onMouseDown={() => onDragStart(date)}
      onMouseUp={() => { onDragEnd(); onDayClick(date) }}
      onTouchStart={() => onDragStart(date)}
      onTouchEnd={() => { onDragEnd() }}
    >
      {/* Range strip */}
      {dayInRange && !dayIsStart && !dayIsEnd && (
        <div className="absolute inset-y-1 inset-x-0" style={{ background: stripBg }} />
      )}
      {dayIsStart && pEnd && !isSameDay(date, pEnd) && (
        <div className="absolute inset-y-1" style={{ left: '50%', right: 0, background: stripBg }} />
      )}
      {dayIsEnd && pStart && !isSameDay(date, pStart) && (
        <div className="absolute inset-y-1" style={{ left: 0, right: '50%', background: stripBg }} />
      )}

      {/* Holiday glow */}
      {holiday && (
        <div
          className="absolute inset-1 rounded-lg pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${accent}18 0%, transparent 70%)`,
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      )}

      {/* Day circle */}
      <motion.div
        whileTap={{ scale: 0.82 }}
        className="relative z-10 mx-auto flex flex-col items-center justify-center rounded-full select-none"
        style={{
          width: 32, height: 32, marginTop: 4,
          fontSize: '0.78rem',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: daySelected || isToday ? 700 : 400,
          background: daySelected ? accent : isToday ? accentLight : 'transparent',
          color: textColor,
          boxShadow: daySelected ? `0 2px 10px ${accent}66` : undefined,
          transition: 'background 0.12s, color 0.12s',
        }}
      >
        {holiday ? (
          <span style={{ fontSize: '0.65rem', lineHeight: 1 }}>{holiday.emoji}</span>
        ) : (
          date.getDate()
        )}
      </motion.div>

      {/* Day number below emoji */}
      {holiday && (
        <div
          className="relative z-10 text-center"
          style={{ fontSize: '0.55rem', fontFamily: 'DM Sans', color: textColor, opacity: 0.7, marginTop: 1 }}
        >
          {date.getDate()}
        </div>
      )}

      {/* Note dot */}
      {dayNotes.length > 0 && (
        <div className="flex justify-center mt-0.5" style={{ height: 4 }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: accent }} />
        </div>
      )}

      {/* Holiday tooltip */}
      {showTip && holiday && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 pointer-events-none whitespace-nowrap rounded-lg shadow-xl px-2.5 py-1.5"
          style={{
            bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
            background: isDark ? '#1e293b' : '#1e293b',
            color: '#f8fafc', fontSize: '0.65rem',
            fontFamily: 'DM Sans, sans-serif',
            border: `1px solid ${accent}44`,
          }}
        >
          {holiday.emoji} {holiday.name}
          <div style={{
            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
            border: '4px solid transparent', borderTopColor: '#1e293b',
          }} />
        </motion.div>
      )}
    </div>
  )
}