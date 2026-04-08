import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Note, NoteColor } from '../../utils/types'

const LIGHT: Record<NoteColor, { bg: string; border: string; dot: string; text: string }> = {
  yellow: { bg: '#fefce8', border: '#fde047', dot: '#ca8a04', text: '#713f12' },
  blue:   { bg: '#eff6ff', border: '#93c5fd', dot: '#2563eb', text: '#1e3a8a' },
  green:  { bg: '#f0fdf4', border: '#86efac', dot: '#16a34a', text: '#14532d' },
  pink:   { bg: '#fdf2f8', border: '#f0abfc', dot: '#a21caf', text: '#4a044e' },
}
const DARK: Record<NoteColor, { bg: string; border: string; dot: string; text: string }> = {
  yellow: { bg: 'rgba(202,138,4,0.12)',  border: 'rgba(202,138,4,0.35)',  dot: '#fbbf24', text: '#fef3c7' },
  blue:   { bg: 'rgba(37,99,235,0.12)',  border: 'rgba(37,99,235,0.35)',  dot: '#60a5fa', text: '#dbeafe' },
  green:  { bg: 'rgba(22,163,74,0.12)',  border: 'rgba(22,163,74,0.35)',  dot: '#4ade80', text: '#dcfce7' },
  pink:   { bg: 'rgba(162,28,175,0.12)', border: 'rgba(162,28,175,0.35)', dot: '#e879f9', text: '#fae8ff' },
}

interface Props {
  note: Note
  isDark: boolean
  onUpdate: (id: string, content: string) => void
  onDelete: (id: string) => void
}

export default function NoteCard({ note, isDark, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft]     = useState(note.content)
  const c = (isDark ? DARK : LIGHT)[note.color]

  const save = () => { onUpdate(note.id, draft.trim()); setEditing(false) }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg p-3 relative group cursor-pointer"
      style={{ background: c.bg, border: `1px solid ${c.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      onClick={() => !editing && setEditing(true)}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: c.dot }} />
          <span className="text-xs font-mono" style={{ color: c.dot }}>{note.date}</span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onDelete(note.id) }}
          className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-full flex items-center justify-center text-base leading-none transition-all hover:bg-red-50 hover:text-red-400"
          style={{ color: c.dot }}
        >
          ×
        </button>
      </div>

      {editing ? (
        <div onClick={e => e.stopPropagation()}>
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={e => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) save()
              if (e.key === 'Escape') { setDraft(note.content); setEditing(false) }
            }}
            autoFocus
            rows={3}
            className="w-full text-xs font-mono bg-transparent leading-relaxed"
            style={{ border: 'none', outline: 'none', resize: 'none', color: c.text, padding: 0 }}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs opacity-50" style={{ color: c.text, fontFamily: 'DM Mono' }}>⌘↵ save</span>
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
        <p className="text-xs font-mono whitespace-pre-wrap leading-relaxed" style={{ color: c.text }}>
          {note.content || <span style={{ opacity: 0.4 }}>Click to edit…</span>}
        </p>
      )}
    </motion.div>
  )
}