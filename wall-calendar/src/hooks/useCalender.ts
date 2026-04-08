import { useState, useCallback, useRef } from 'react'
import { addMonths, subMonths, isBefore, isSameDay } from 'date-fns'
import type { DateRange, Note, AppTheme } from '../utils/types'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuid } from '../utils/uuid'

export function useCalendar() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [range, setRange] = useState<DateRange>({ start: null, end: null })
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [notes, setNotes] = useLocalStorage<Note[]>('wall-calendar-notes-v2', [])
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [appTheme, setAppTheme] = useLocalStorage<AppTheme>('wall-calendar-theme', 'light')
  const [customImages, setCustomImages] = useLocalStorage<Record<number, string>>('wall-calendar-images', {})
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef<Date | null>(null)

  const year  = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const goNext = useCallback(() => {
    setDirection('next')
    setCurrentDate(d => addMonths(d, 1))
  }, [])

  const goPrev = useCallback(() => {
    setDirection('prev')
    setCurrentDate(d => subMonths(d, 1))
  }, [])

  const goToMonth = useCallback((month: number) => {
    setCurrentDate(d => {
      const next = new Date(d.getFullYear(), month, 1)
      setDirection(next > d ? 'next' : 'prev')
      return next
    })
  }, [])

  const goToToday = useCallback(() => {
    setDirection('next')
    setCurrentDate(new Date())
  }, [])

  const handleDayClick = useCallback((date: Date) => {
    setRange(prev => {
      if (!prev.start) return { start: date, end: null }
      if (prev.start && !prev.end) {
        if (isSameDay(date, prev.start)) return { start: null, end: null }
        if (isBefore(date, prev.start)) return { start: date, end: prev.start }
        return { start: prev.start, end: date }
      }
      return { start: date, end: null }
    })
  }, [])

  // Drag selection
  const handleDragStart = useCallback((date: Date) => {
    setIsDragging(true)
    dragStart.current = date
    setRange({ start: date, end: null })
  }, [])

  const handleDragEnter = useCallback((date: Date) => {
    if (!isDragging || !dragStart.current) return
    const s = dragStart.current
    if (isBefore(date, s)) {
      setRange({ start: date, end: s })
    } else {
      setRange({ start: s, end: date })
    }
  }, [isDragging])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    dragStart.current = null
  }, [])

  const clearRange = useCallback(() => setRange({ start: null, end: null }), [])

  const toggleTheme = useCallback(() => {
    setAppTheme(t => t === 'light' ? 'dark' : 'light')
  }, [setAppTheme])

  const setCustomImage = useCallback((month: number, dataUrl: string) => {
    setCustomImages(prev => ({ ...prev, [month]: dataUrl }))
  }, [setCustomImages])

  const clearCustomImage = useCallback((month: number) => {
    setCustomImages(prev => {
      const next = { ...prev }
      delete next[month]
      return next
    })
  }, [setCustomImages])

  const addNote = useCallback((note: Omit<Note, 'id' | 'createdAt'>) => {
    setNotes(prev => [...prev, { ...note, id: uuid(), createdAt: Date.now() }])
  }, [setNotes])

  const updateNote = useCallback((id: string, content: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, content } : n))
  }, [setNotes])

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id))
  }, [setNotes])

  const getNotesForMonth = useCallback((): Note[] => {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
    return notes.filter(n => n.date.startsWith(prefix))
  }, [notes, year, month])

  return {
    today, currentDate, year, month,
    range, hoverDate, setHoverDate, direction,
    appTheme, toggleTheme,
    customImages, setCustomImage, clearCustomImage,
    isDragging,
    handleDayClick, handleDragStart, handleDragEnter, handleDragEnd,
    clearRange,
    goNext, goPrev, goToMonth, goToToday,
    notes, addNote, updateNote, deleteNote,
    getNotesForMonth,
  }
}
