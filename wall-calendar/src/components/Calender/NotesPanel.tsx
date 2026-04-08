import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Note, NoteColor, DateRange } from '../../utils/types'
import { toDateKey, formatDisplay } from '../../utils/dateUtils'
import NoteCard from './NoteCard'

const COLORS: NoteColor[] = ['yellow', 'blue', 'green', 'pink']
const COLOR_HEX: Record<NoteColor, string> = {
  yellow: '#ca8a04', blue: '#2563eb', green: '#16a34a', pink: '#a21caf',
}

interface Props {
  notes: Note[]
  range: DateRange
  accent: string
  accentLight: string
  isDark: boolean
  onAdd: (note: Omit<Note, 'id' | 'createdAt'>) => void
  onUpdate: (id: string, content: string) => void
  onDelete: (id: string) => void
}

export default function NotesPanel({
  notes, range, accent, accentLight, isDark, onAdd, onUpdate, onDelete,
}: Props) {
  const [text, setText]   = useState('')
  const [color, setColor] = useState<NoteColor>('yellow')

  const targetDate  = range.start ? toDateKey(range.start) : toDateKey(new Date())
  const displayDate = range.start ? formatDisplay(range.start) : 'Today'

  const handleAdd = () => {
    if (!text.trim()) return
    onAdd({ date: targetDate, content: text.trim(), color })
    setText('')
  }

  const LINE_COUNT = 5
  const borderColor    = isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'
  const bgColor        = isDark ? 'rgba(255,255,255,0.04)' : '#fafaf9'
  const textareaColor  = isDark ? 'rgba(255,255,255,0.85)' : '#374151'
  const labelColor     = isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af'

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: accent }}>
            <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: isDark ? 'rgba(255,255,255,0.9)' : '#374151', fontSize: '1rem' }}>
            Notes
          </h3>
        </div>
        <motion.span
          key={displayDate}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-mono px-2 py-0.5 rounded-full"
          style={{ background: isDark ? `${accent}33` : accentLight, color: accent }}
        >
          {displayDate}
        </motion.span>
      </div>

      {/* Ruled textarea */}
      <div className="relative rounded-lg mb-3 overflow-hidden flex-shrink-0"
        style={{ background: bgColor, border: `1px solid ${borderColor}` }}
      >
        <div className="absolute top-0 bottom-0" style={{ left: 28, width: 1, background: '#fca5a5', opacity: 0.6, zIndex: 1 }} />
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: LINE_COUNT }).map((_, i) => (
            <div key={i} style={{ height: 32, borderBottom: `1px solid ${borderColor}` }} />
          ))}
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAdd() }}
          placeholder="Write a note…"
          rows={LINE_COUNT}
          className="relative w-full bg-transparent py-1 pr-3 text-sm placeholder:text-gray-300"
          style={{
            border: 'none', resize: 'none', outline: 'none',
            lineHeight: '32px', paddingLeft: 36,
            fontFamily: 'DM Mono, monospace',
            color: textareaColor,
            zIndex: 2,
          }}
        />
      </div>

      {/* Color + Add */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs mr-1" style={{ fontFamily: 'DM Sans', color: labelColor }}>Color:</span>
          {COLORS.map(c => (
            <button key={c} onClick={() => setColor(c)}
              className="rounded-full transition-all duration-150"
              style={{
                width: 18, height: 18,
                background: COLOR_HEX[c],
                border: color === c ? '2.5px solid ' + (isDark ? 'white' : '#374151') : '2px solid transparent',
                transform: color === c ? 'scale(1.25)' : 'scale(1)',
              }}
              aria-label={`${c} note`}
            />
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleAdd}
          disabled={!text.trim()}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontFamily: 'DM Sans', background: accent, boxShadow: text.trim() ? `0 2px 8px ${accent}44` : 'none' }}
        >
          + Add Note
        </motion.button>
      </div>

      {/* Count */}
      {notes.length > 0 && (
        <div className="mb-2 flex-shrink-0">
          <span className="text-xs" style={{ fontFamily: 'DM Mono', color: labelColor }}>
            {notes.length} note{notes.length !== 1 ? 's' : ''} this month
          </span>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
        <AnimatePresence mode="popLayout">
          {notes.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="text-3xl mb-2">📝</div>
              <p className="text-xs italic" style={{ fontFamily: 'DM Mono', color: labelColor }}>
                No notes yet. Select a day and add one!
              </p>
            </motion.div>
          )}
          {[...notes].reverse().map(note => (
            <NoteCard key={note.id} note={note} isDark={isDark} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}