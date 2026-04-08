import {
  format as _format,
  startOfMonth as _startOfMonth,
  endOfMonth as _endOfMonth,
  eachDayOfInterval as _eachDayOfInterval,
  isSameDay as _isSameDay,
  isWithinInterval as _isWithinInterval,
  isBefore as _isBefore,
  addMonths as _addMonths,
  subMonths as _subMonths,
} from 'date-fns'

export const format       = _format
export const isSameDay    = _isSameDay
export const isBefore     = _isBefore
export const addMonths    = _addMonths
export const subMonths    = _subMonths
export const eachDayOfInterval = _eachDayOfInterval

export function buildCalendarGrid(year: number, month: number): (Date | null)[] {
  const firstOfMonth = new Date(year, month, 1)
  const startDow     = firstOfMonth.getDay()
  const monOffset    = startDow === 0 ? 6 : startDow - 1
  const days: (Date | null)[] = []
  for (let i = 0; i < monOffset; i++) days.push(null)
  _eachDayOfInterval({ start: _startOfMonth(firstOfMonth), end: _endOfMonth(firstOfMonth) })
    .forEach(d => days.push(d))
  while (days.length % 7 !== 0) days.push(null)
  return days
}

export function toDateKey(date: Date): string {
  return _format(date, 'yyyy-MM-dd')
}

export function formatDisplay(date: Date): string {
  return _format(date, 'MMM d, yyyy')
}

function sorted(a: Date, b: Date): [Date, Date] {
  return _isBefore(a, b) ? [a, b] : [b, a]
}

export function dateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false
  const [s, e] = sorted(start, end)
  return _isWithinInterval(date, { start: s, end: e })
}

export function dateIsRangeStart(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start) return false
  const [s] = sorted(start, end ?? start)
  return _isSameDay(date, s)
}

export function dateIsRangeEnd(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false
  const [, e] = sorted(start, end)
  return _isSameDay(date, e)
}