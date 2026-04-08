// Single source of truth for all date-fns imports across the project.
// date-fns v3 — all named exports from the root package.
export {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isWithinInterval,
  isBefore,
  isAfter,
  addMonths,
  subMonths,
  parseISO,
} from 'date-fns'

import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  isBefore,
} from 'date-fns'

/** Build a Monday-first calendar grid for a given month. Cells without a date are null. */
export function buildCalendarGrid(year: number, month: number): (Date | null)[] {
  const firstOfMonth = new Date(year, month, 1)
  const startDow = firstOfMonth.getDay() // 0 = Sunday
  // Monday-first offset: Mon→0, Tue→1 … Sun→6
  const monOffset = startDow === 0 ? 6 : startDow - 1

  const days: (Date | null)[] = []
  for (let i = 0; i < monOffset; i++) days.push(null)

  eachDayOfInterval({
    start: startOfMonth(firstOfMonth),
    end: endOfMonth(firstOfMonth),
  }).forEach(d => days.push(d))

  while (days.length % 7 !== 0) days.push(null)
  return days
}

export function toDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function formatDisplay(date: Date): string {
  return format(date, 'MMM d, yyyy')
}

// ── Range helpers ────────────────────────────────────────────────────────────

/** Returns the chronologically sorted [start, end] pair. */
function sortedRange(a: Date, b: Date): [Date, Date] {
  return isBefore(a, b) ? [a, b] : [b, a]
}

export function dateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false
  const [s, e] = sortedRange(start, end)
  return isWithinInterval(date, { start: s, end: e })
}

export function dateIsRangeStart(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start) return false
  if (!end) return isSameDay(date, start)
  const [s] = sortedRange(start, end)
  return isSameDay(date, s)
}

export function dateIsRangeEnd(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false
  const [, e] = sortedRange(start, end)
  return isSameDay(date, e)
}