import { motion, AnimatePresence } from 'framer-motion'
import { buildCalendarGrid } from '../../utils/dateUtils'
import type { DateRange, Note } from '../../utils/types'
import DayCell from './DayCell'

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

interface Props {
  year: number
  month: number
  today: Date
  range: DateRange
  hoverDate: Date | null
  accent: string
  accentLight: string
  direction: 'next' | 'prev'
  notes: Note[]
  isDark: boolean
  isDragging: boolean
  onDayClick: (date: Date) => void
  onHover: (date: Date | null) => void
  onDragStart: (date: Date) => void
  onDragEnter: (date: Date) => void
  onDragEnd: () => void
}

const variants = {
  enter: (dir: string) => ({
    rotateY: dir === 'next' ? 15 : -15,
    opacity: 0, x: dir === 'next' ? 30 : -30,
  }),
  center: { rotateY: 0, opacity: 1, x: 0 },
  exit:  (dir: string) => ({
    rotateY: dir === 'next' ? -15 : 15,
    opacity: 0, x: dir === 'next' ? -30 : 30,
  }),
}

export default function CalendarGrid({
  year, month, today, range, hoverDate, accent, accentLight,
  direction, notes, isDark, isDragging,
  onDayClick, onHover, onDragStart, onDragEnter, onDragEnd,
}: Props) {
  const days = buildCalendarGrid(year, month)
  const key  = `${year}-${month}`

  const headerColor = isDark ? 'rgba(255,255,255,0.35)' : '#9ca3af'

  return (
    <div className="flex-1 min-w-0">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d, i) => (
          <div key={d} className="text-center py-1" style={{
            fontSize: '0.62rem',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: i >= 5 ? accent : headerColor,
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Animated grid */}
      <div className="relative overflow-hidden" style={{ perspective: 800 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={key}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-7"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {days.map((date, idx) =>
              date ? (
                <DayCell
                  key={idx}
                  date={date}
                  today={today}
                  range={range}
                  hoverDate={hoverDate}
                  accent={accent}
                  accentLight={accentLight}
                  notes={notes}
                  isDark={isDark}
                  isDragging={isDragging}
                  onDayClick={onDayClick}
                  onHover={onHover}
                  onDragStart={onDragStart}
                  onDragEnter={onDragEnter}
                  onDragEnd={onDragEnd}
                />
              ) : (
                <div key={idx} style={{ minHeight: 44 }} />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}