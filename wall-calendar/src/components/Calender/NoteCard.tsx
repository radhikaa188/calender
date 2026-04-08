import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { Note, NoteColor } from '../../utils/types'

const COLOR_MAP: Record<NoteColor, { bg: string; border: string; dot: string; text: string }> = {
  yellow: { bg: '#fefce8', border: '#fde047', dot: '#ca8a04', text: '#713f12' },
  blue:   { bg: '#eff6ff', border: '#93c5fd', dot: '#2563eb', text: '#1e3a8a' },
  green:  { bg: '#f0fdf4', border: '#86efac', dot: '#16a34a', text: '#14532d' },
  pink:   { bg: '#fdf2f8', border: '#f0abfc', dot: '#a21caf', text: '#4a044e' },
}

interface Props {
  note: Note
  onUpdate: (id: string, content: string) => void
  onDelete: (id: string) => void
}

export default function NoteCard({ note, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(note.content)
  const c = COLOR_MAP[note.color]

  const save = () => {
    onUpdate(note.id, draft.trim())
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) save()
    if (e.key === 'Escape') {
      setDraft(note.content)
      setEditing(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg p-3 relative group cursor-pointer"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
      onClick={() => !editing && setEditing(true)}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.dot }} />
          <span className="text-xs font-mono" style={{ color: c.dot }}>
            {note.date}
          </span>
        </div>
        <button
          onClick={e => {
            e.stopPropagation()
            onDelete(note.id)
          }}
          className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all text-base leading-none"
          aria-label="Delete note"
        >
          ×
        </button>
      </div>

      {/* Content */}
      {editing ? (
        <div onClick={e => e.stopPropagation()}>
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={handleKeyDown}
            autoFocus
            rows={3}
            className="w-full text-xs font-mono bg-transparent leading-relaxed"
            style={{
              border: 'none',
              outline: 'none',
              resize: 'none',
              color: c.text,
              padding: 0,
            }}
          />
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-300">⌘↵ to save</span>
            <button
              onMouseDown={e => { e.preventDefault(); save() }}
              className="text-xs px-2 py-0.5 rounded font-semibold text-white"
              style={{ background: c.dot }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p
          className="text-xs font-mono whitespace-pre-wrap leading-relaxed"
          style={{ color: c.text }}
        >
          {note.content || (
            <span className="text-gray-300 italic">Click to edit…</span>
          )}
        </p>
      )}
    </motion.div>
  )
}