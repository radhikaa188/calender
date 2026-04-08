import {motion} from 'framer-motion'
import { useCalendar } from '../../hooks/useCalender'
import { getTheme } from '../../utils/themes'
import SpiralBinding from './SpringBinding'
import HeroImage from './HeroImage'
import MonthNav from './MonthNav'
import CalendarGrid from './CalenderGrid'
import RangeBar from './RangeBar'
import NotesPanel from './NotesPanel'

export default function WallCalendar() {
  const cal = useCalendar()
  const theme = getTheme(cal.month)
  const monthNotes = cal.getNotesForMonth()

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* Spiral binding */}
      <SpiralBinding count={16} />

      {/* Paper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="calendar-paper bg-white rounded-b-2xl overflow-hidden"
        style={{ borderTop: `4px solid ${theme.accentColor}` }}
      >
        {/* ── DESKTOP: side-by-side │ MOBILE: stacked ── */}
        <div className="flex flex-col lg:flex-row">

          {/* LEFT PANEL — image + calendar grid */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Hero image */}
            <HeroImage theme={theme} year={cal.year} direction={cal.direction} />

            {/* Month navigation */}
            <MonthNav
              onPrev={cal.goPrev}
              onNext={cal.goNext}
              onToday={cal.goToToday}
              accent={theme.accentColor}
            />

            {/* Selected range display */}
            <RangeBar
              range={cal.range}
              accent={theme.accentColor}
              accentLight={theme.accentLight}
              onClear={cal.clearRange}
            />

            {/* Calendar grid */}
            <div className="px-4 pb-5">
              <CalendarGrid
                year={cal.year}
                month={cal.month}
                today={cal.today}
                range={cal.range}
                hoverDate={cal.hoverDate}
                accent={theme.accentColor}
                accentLight={theme.accentLight}
                direction={cal.direction}
                notes={monthNotes}
                onDayClick={cal.handleDayClick}
                onHover={cal.setHoverDate}
              />
            </div>
          </div>

          {/* Divider */}
          <div
            className="hidden lg:block w-px self-stretch my-6"
            style={{ background: `${theme.accentColor}22` }}
          />
          <div className="block lg:hidden h-px mx-6" style={{ background: `${theme.accentColor}22` }} />

          {/* RIGHT PANEL — Notes */}
          <div
            className="lg:w-72 xl:w-80 flex-shrink-0 p-5 flex flex-col"
            style={{ minHeight: 'clamp(280px, 40vw, 460px)' }}
          >
            <NotesPanel
              notes={monthNotes}
              range={cal.range}
              accent={theme.accentColor}
              accentLight={theme.accentLight}
              onAdd={cal.addNote}
              onUpdate={cal.updateNote}
              onDelete={cal.deleteNote}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3 flex items-center justify-between text-xs font-mono text-gray-300 border-t border-gray-100"
          style={{ background: '#fafafa' }}
        >
          <span>Wall Calendar · {cal.year}</span>
          <span style={{ color: theme.accentColor }}>
            {cal.range.start && cal.range.end
              ? `${Math.round((cal.range.end.getTime() - cal.range.start.getTime()) / 86400000) + 1} days selected`
              : cal.range.start
              ? 'Select end date'
              : 'Click a day to start'}
          </span>
        </div>
      </motion.div>
    </div>
  )
}