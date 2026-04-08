import { motion, AnimatePresence } from 'framer-motion'
import { useCalendar } from '../../hooks/useCalender'
import { getTheme, SEASON_GLOW } from '../../utils/themes'
import SpiralBinding from './SpringBinding'
import HeroImage from './HeroImage'
import MonthNav from './MonthNav'
import CalendarGrid from './CalenderGrid'
import RangeSummary from './RangeSummary'
import NotesPanel from './NotesPanel'
import YearStrip from './YearStrip'

export default function WallCalendar() {
  const cal        = useCalendar()
  const theme      = getTheme(cal.month)
  const monthNotes = cal.getNotesForMonth()
  const isDark     = cal.appTheme === 'dark'

  const paperBg     = isDark ? theme.gradient : 'white'
  const seasonGlow  = SEASON_GLOW[theme.season]

  return (
    <div className="w-full max-w-4xl mx-auto select-none font-body">
      {/* ── Spiral binding ── */}
      <SpiralBinding count={16} isDark={isDark} />

      {/* ── Calendar paper ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="rounded-b-2xl overflow-hidden"
        style={{
          background: paperBg,
          borderTop: `4px solid ${theme.accentColor}`,
          boxShadow: `0 24px 64px rgba(0,0,0,${isDark ? '0.5' : '0.13'}), 0 8px 24px rgba(0,0,0,0.08), ${seasonGlow}`,
          transition: 'background 0.6s ease, box-shadow 0.6s ease',
        }}
      >
        {/* Year strip */}
        <YearStrip
          currentMonth={cal.month}
          onSelect={cal.goToMonth}
          appTheme={cal.appTheme}
        />

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row">

          {/* ══ LEFT PANEL ══ */}
          <div className="flex flex-col flex-1 min-w-0">

            <HeroImage
              theme={theme}
              year={cal.year}
              direction={cal.direction}
              appTheme={cal.appTheme}
              customImage={cal.customImages[cal.month]}
              onImageUpload={dataUrl => cal.setCustomImage(cal.month, dataUrl)}
              onImageClear={() => cal.clearCustomImage(cal.month)}
            />

            <MonthNav
              onPrev={cal.goPrev}
              onNext={cal.goNext}
              onToday={cal.goToToday}
              accent={theme.accentColor}
              appTheme={cal.appTheme}
              onToggleTheme={cal.toggleTheme}
            />

            <RangeSummary
              range={cal.range}
              accent={theme.accentColor}
              accentLight={theme.accentLight}
              accentDark={theme.accentDark}
              isDark={isDark}
              onClear={cal.clearRange}
            />

            <div className="px-4 pb-6">
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
                isDark={isDark}
                isDragging={cal.isDragging}
                onDayClick={cal.handleDayClick}
                onHover={cal.setHoverDate}
                onDragStart={cal.handleDragStart}
                onDragEnter={cal.handleDragEnter}
                onDragEnd={cal.handleDragEnd}
              />
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="hidden lg:block w-px self-stretch my-5"
            style={{ background: isDark ? 'rgba(255,255,255,0.08)' : `${theme.accentColor}20` }}
          />
          <div
            className="block lg:hidden h-px mx-5"
            style={{ background: isDark ? 'rgba(255,255,255,0.08)' : `${theme.accentColor}20` }}
          />

          {/* ══ RIGHT PANEL ══ */}
          <div
            className="lg:w-72 xl:w-80 flex-shrink-0 p-5 flex flex-col"
            style={{ minHeight: 'clamp(260px, 38vw, 440px)' }}
          >
            <NotesPanel
              notes={monthNotes}
              range={cal.range}
              accent={theme.accentColor}
              accentLight={theme.accentLight}
              isDark={isDark}
              onAdd={cal.addNote}
              onUpdate={cal.updateNote}
              onDelete={cal.deleteNote}
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="px-5 py-2.5 flex items-center justify-between border-t"
          style={{
            background: isDark ? 'rgba(0,0,0,0.2)' : '#f9fafb',
            borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#f3f4f6',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: `${theme.accentColor}20`,
                color: theme.accentColor,
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
              }}
            >
              {{ winter: '❄️ Winter', spring: '🌸 Spring', summer: '☀️ Summer', autumn: '🍂 Autumn' }[theme.season]}
            </span>
            <span style={{ fontSize: '0.65rem', fontFamily: 'DM Mono', color: isDark ? 'rgba(255,255,255,0.3)' : '#9ca3af' }}>
              {theme.label} {cal.year}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.span
              key={cal.range.start?.toString()}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              style={{
                fontSize: '0.65rem', fontFamily: 'DM Mono',
                color: theme.accentColor,
              }}
            >
              {cal.range.start && cal.range.end
                ? `${Math.round((cal.range.end.getTime() - cal.range.start.getTime()) / 86400000) + 1} days selected`
                : cal.range.start
                ? 'Select end date →'
                : 'Click or drag to select'}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}