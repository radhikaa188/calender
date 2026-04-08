import React from 'react'
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
  onDayClick: (date: Date) => void
  onHover: (date: Date | null) => void
}

const variants = {
  enter: (dir: string) => ({
    opacity: 0,
    x: dir === 'next' ? 60 : -60,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (dir: string) => ({
    opacity: 0,
    x: dir === 'next' ? -60 : 60,
    scale: 0.98,
  }),
}

export default function CalendarGrid({
  year, month, today, range, hoverDate, accent, accentLight,
  direction, notes, onDayClick, onHover,
}: Props) {
  const days = buildCalendarGrid(year, month)
  const key = `${year}-${month}`

  return (
    <div className="flex-1 min-w-0">
      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className="text-center py-1"
            style={{
              fontSize: '0.65rem',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: i >= 5 ? accent : '#9ca3af',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={key}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.32,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="grid grid-cols-7 gap-y-1"
          >
            {days.map((date, idx) =>
              date ? (
                <div key={idx} className="flex justify-center">
                  <DayCell
                    date={date}
                    today={today}
                    range={range}
                    hoverDate={hoverDate}
                    accent={accent}
                    accentLight={accentLight}
                    notes={notes}
                    onDayClick={onDayClick}
                    onHover={onHover}
                  />
                </div>
              ) : (
                <div key={idx} style={{ minHeight: 48 }} />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}