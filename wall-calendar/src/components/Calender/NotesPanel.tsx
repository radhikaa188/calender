import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Note, NoteColor, DateRange } from '../../utils/types'
import { toDateKey, formatDisplay } from '../../utils/dateUtils'
import NoteCard from './NoteCard'

const COLORS: NoteColor[] = ['yellow', 'blue', 'green', 'pink']
const COLOR_HEX: Record<NoteColor, string> = {
  yellow: '#ca8a04',
  blue:   '#2563eb',
  green:  '#16a34a',
  pink:   '#a21caf',
}

interface Props {
  notes: Note[]
  range: DateRange
  accent: string
  accentLight: string
  onAdd: (note: Omit<Note, 'id' | 'createdAt'>) => void
  onUpdate: (id: string, content: string) => void
  onDelete: (id: string) => void
}

export default function NotesPanel({
  notes, range, accent, accentLight, onAdd, onUpdate, onDelete,
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAdd()
  }

  const LINE_COUNT = 5

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: accent }}>
            <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 600,
            color: '#374151',
            fontSize: '1rem'
          }}>
            Notes
          </h3>
        </div>

        <span
          className="text-xs font-mono px-2 py-0.5 rounded-full"
          style={{
            background: accentLight,
            color: accent,
            boxShadow: `0 1px 4px ${accent}22`
          }}
        >
          {displayDate}
        </span>
      </div>

      {/* Textarea */}
      <div
        className="relative rounded-xl mb-3 overflow-hidden flex-shrink-0"
        style={{
          background: '#fafaf9',
          border: '1px solid #e5e7eb',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
        }}
      >
        {/* Red margin */}
        <div
          className="absolute top-0 bottom-0"
          style={{ left: 28, width: 1, background: '#fca5a5', opacity: 0.6 }}
        />

        {/* Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: LINE_COUNT }).map((_, i) => (
            <div key={i} style={{ height: 32, borderBottom: '1px solid #e5e7eb' }} />
          ))}
        </div>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Write a note for ${displayDate}…`}
          rows={LINE_COUNT}
          className="relative w-full bg-transparent py-1 pr-3 text-sm text-gray-700 placeholder:text-gray-300"
          style={{
            border: 'none',
            resize: 'none',
            outline: 'none',
            lineHeight: '32px',
            paddingLeft: 36,
            fontFamily: 'DM Mono, monospace',
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        {/* Colors */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 mr-1">Color:</span>

          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="rounded-full transition-all duration-200"
              style={{
                width: 18,
                height: 18,
                background: COLOR_HEX[c],
                border: color === c ? '2.5px solid #374151' : '2px solid transparent',
                transform: color === c ? 'scale(1.25)' : 'scale(1)',
                boxShadow: color === c ? `0 0 0 3px ${COLOR_HEX[c]}22` : 'none',
              }}
            />
          ))}
        </div>

        {/* Add Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: text.trim() ? 1.05 : 1 }}
          onClick={handleAdd}
          disabled={!text.trim()}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: accent,
            boxShadow: text.trim() ? `0 4px 12px ${accent}44` : 'none',
          }}
        >
          + Add Note
        </motion.button>
      </div>

      {/* Count */}
      {notes.length > 0 && (
        <div className="mb-2 flex-shrink-0">
          <span className="text-xs text-gray-400">
            {notes.length} note{notes.length !== 1 ? 's' : ''} this month
          </span>
        </div>
      )}

      {/* Notes */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
        <AnimatePresence mode="popLayout">
          {notes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="text-4xl mb-2">📝</div>
              <p className="text-sm text-gray-400 italic">
                No notes for this day
              </p>
              <p className="text-xs text-gray-300 italic">
                Try adding one above 👆
              </p>
            </motion.div>
          )}

          {[...notes].reverse().map(note => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <NoteCard
                note={note}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}