import type { DateRange } from '../../utils/types'
import { formatDisplay } from '../../utils/dateUtils'

interface Props {
  range: DateRange
  accent: string
  accentLight: string
  onClear: () => void
}

export default function RangeBar({ range, accent, accentLight, onClear }: Props) {
  if (!range.start) return null

  const dayCount =
    range.start && range.end
      ? Math.round((range.end.getTime() - range.start.getTime()) / 86400000) + 1
      : null

  return (
    <div
      className="mx-4 mb-3 rounded-xl px-3 py-2 flex items-center justify-between gap-2"
      style={{ background: accentLight, border: `1px solid ${accent}33` }}
    >
      <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
        <span className="inline-flex items-center gap-1 font-semibold text-xs" style={{ color: accent }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M1 5h10" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          {formatDisplay(range.start)}
        </span>

        {range.end ? (
          <>
            <span className="text-gray-300 text-xs">→</span>
            <span className="font-semibold text-xs" style={{ color: accent }}>
              {formatDisplay(range.end)}
            </span>
            {dayCount && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold"
                style={{ background: accent, color: 'white' }}
              >
                {dayCount}d
              </span>
            )}
          </>
        ) : (
          <span className="text-gray-400 text-xs italic">Select end date…</span>
        )}
      </div>

      <button
        onClick={onClear}
        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white transition-all text-base leading-none"
        aria-label="Clear range"
      >
        ×
      </button>
    </div>
  )
}