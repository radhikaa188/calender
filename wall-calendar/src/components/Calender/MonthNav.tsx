import React from 'react'

interface Props {
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  accent: string
}

export default function MonthNav({ onPrev, onNext, onToday, accent }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <button
        onClick={onPrev}
        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-2xl font-light"
        aria-label="Previous month"
      >
        ‹
      </button>
      <button
        onClick={onToday}
        className="text-xs font-body font-semibold px-3 py-1 rounded-full border transition-all hover:shadow-sm"
        style={{ borderColor: accent, color: accent }}
      >
        Today
      </button>
      <button
        onClick={onNext}
        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-2xl font-light"
        aria-label="Next month"
      >
        ›
      </button>
    </div>
  )
}