export interface Note {
  id: string
  date: string        // ISO yyyy-MM-dd
  content: string
  color: NoteColor
  createdAt: number
}

export type NoteColor = 'yellow' | 'blue' | 'green' | 'pink'

export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface MonthTheme {
  month: number          // 0-indexed
  imageUrl: string
  imageAlt: string
  accentColor: string    // Tailwind-compatible hex
  accentLight: string
  label: string
}

export interface Holiday {
  date: string           // MM-DD
  name: string
}