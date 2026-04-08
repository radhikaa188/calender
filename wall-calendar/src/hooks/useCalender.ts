import { useState, useCallback } from 'react'
import { addMonths, subMonths, isBefore, isSameDay } from '../utils/dateUtils'
import type { DateRange, Note } from '../utils/types'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuid } from '../utils/uuid'

export function useCalendar() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [range, setRange] = useState<DateRange>({ start: null, end: null })
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [notes, setNotes] = useLocalStorage<Note[]>('wall-calendar-notes', [])
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const goNext = useCallback(() => {
    setDirection('next')
    setCurrentDate(d => addMonths(d, 1))
  }, [])

  const goPrev = useCallback(() => {
    setDirection('prev')
    setCurrentDate(d => subMonths(d, 1))
  }, [])

  const goToToday = useCallback(() => {
    setDirection('next')
    setCurrentDate(new Date())
  }, [])

  const handleDayClick = useCallback((date: Date) => {
    setRange(prev => {
      if (!prev.start) {
        return { start: date, end: null }
      }
      if (prev.start && !prev.end) {
        if (isSameDay(date, prev.start)) return { start: null, end: null }
        if (isBefore(date, prev.start)) return { start: date, end: prev.start }
        return { start: prev.start, end: date }
      }
      return { start: date, end: null }
    })
  }, [])

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null })
  }, [])

  const addNote = useCallback(
    (note: Omit<Note, 'id' | 'createdAt'>) => {
      const newNote: Note = { ...note, id: uuid(), createdAt: Date.now() }
      setNotes(prev => [...prev, newNote])
    },
    [setNotes]
  )

  const updateNote = useCallback(
    (id: string, content: string) => {
      setNotes(prev => prev.map(n => (n.id === id ? { ...n, content } : n)))
    },
    [setNotes]
  )

  const deleteNote = useCallback(
    (id: string) => {
      setNotes(prev => prev.filter(n => n.id !== id))
    },
    [setNotes]
  )

  const getNotesForMonth = useCallback((): Note[] => {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
    return notes.filter(n => n.date.startsWith(prefix))
  }, [notes, year, month])

  const getNotesForDate = useCallback(
    (dateStr: string): Note[] => {
      return notes.filter(n => n.date === dateStr)
    },
    [notes]
  )

  return {
    today,
    currentDate,
    year,
    month,
    range,
    hoverDate,
    setHoverDate,
    direction,
    goNext,
    goPrev,
    goToToday,
    handleDayClick,
    clearRange,
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNotesForMonth,
    getNotesForDate,
  }
}