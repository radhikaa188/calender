import {useState} from 'react'
import { motion } from 'framer-motion'
import {
  isSameDay,
  toDateKey,
  dateInRange,
  dateIsRangeStart,
  dateIsRangeEnd,
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
  onDayClick: (date: Date) => void
  onHover: (date: Date | null) => void
}

export default function DayCell({
  date, today, range, hoverDate, accent, accentLight, notes,
  onDayClick, onHover,
}: Props) {
  const [showTip, setShowTip] = useState(false)

  const isToday = isSameDay(date, today)
  const holiday = getHolidayForDate(date)
  const dateStr = toDateKey(date)
  const dayNotes = notes.filter(n => n.date === dateStr)

  const previewEnd = range.start && !range.end ? hoverDate : range.end
  const pStart = range.start
  const pEnd = previewEnd

  const dayIsStart =
    dateIsRangeStart(date, pStart, pEnd) ||
    (!!pStart && !pEnd && isSameDay(date, pStart))

  const dayIsEnd = dateIsRangeEnd(date, pStart, pEnd)
  const dayInRange = dateInRange(date, pStart, pEnd)
  const daySelected = dayIsStart || dayIsEnd

  const isSun = date.getDay() === 0
  const isSat = date.getDay() === 6

  const stripBg = `${accent}14` // softer range bg

  return (
    <div
      className="relative cursor-pointer"
      style={{ minHeight: 48 }}
      onMouseEnter={() => { onHover(date); if (holiday) setShowTip(true) }}
      onMouseLeave={() => { onHover(null); setShowTip(false) }}
      onClick={() => onDayClick(date)}
    >
      {/* Range background */}
      {dayInRange && !dayIsStart && !dayIsEnd && (
        <div
          className="absolute inset-y-1 inset-x-0 rounded-md"
          style={{ background: stripBg }}
        />
      )}

      {dayIsStart && pEnd && !isSameDay(date, pEnd) && (
        <div
          className="absolute inset-y-1"
          style={{ left: '50%', right: 0, background: stripBg }}
        />
      )}

      {dayIsEnd && pStart && !isSameDay(date, pStart) && (
        <div
          className="absolute inset-y-1"
          style={{ left: 0, right: '50%', background: stripBg }}
        />
      )}

      {/* Day circle */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        className="relative z-10 mx-auto flex items-center justify-center rounded-full select-none"
        style={{
          width: 34,
          height: 34,
          marginTop: 4,
          fontSize: '0.8rem',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: daySelected || isToday ? 700 : 500,
          background: daySelected
            ? accent
            : isToday
            ? accentLight
            : 'transparent',
          color: daySelected
            ? '#fff'
            : isToday
            ? accent
            : isSun
            ? '#ef4444'
            : isSat
            ? accent
            : '#374151',
          border: isToday && !daySelected ? `1.5px solid ${accent}` : 'none',
          boxShadow: daySelected
            ? `0 4px 14px ${accent}40`
            : 'none',
          transition: 'all 0.18s ease',
        }}
      >
        {date.getDate()}
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-1 mt-1" style={{ height: 6 }}>
        {holiday && (
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#f59e0b',
            }}
          />
        )}
        {dayNotes.length > 0 && (
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: accent,
            }}
          />
        )}
      </div>

      {/* Tooltip */}
      {showTip && holiday && (
        <div
          className="absolute z-50 pointer-events-none whitespace-nowrap rounded-md shadow-xl px-2 py-1"
          style={{
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1e293b',
            color: '#f8fafc',
            fontSize: '0.65rem',
            fontFamily: 'DM Mono, monospace',
          }}
        >
          🎉 {holiday.name}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              border: '4px solid transparent',
              borderTopColor: '#1e293b',
            }}
          />
        </div>
      )}
    </div>
  )
}