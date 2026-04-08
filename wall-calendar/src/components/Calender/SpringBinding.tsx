

interface Props {
  count?: number
  isDark?: boolean
}

export default function SpiralBinding({ count = 16, isDark = false }: Props) {
  return (
    <div className="flex justify-center gap-[14px] px-8 pb-1 relative z-10" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative" style={{ width: 16, height: 24 }}>
          <div style={{
            width: 16, height: 14,
            borderRadius: '50% 50% 0 0 / 80% 80% 0 0',
            border: `2.5px solid ${isDark ? '#4b5563' : '#a1a1aa'}`,
            borderBottom: 'none',
            background: isDark
              ? 'linear-gradient(180deg, #374151 0%, #1f2937 100%)'
              : 'linear-gradient(180deg, #e4e4e7 0%, #a1a1aa 100%)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)',
          }} />
          <div style={{
            width: 2.5, height: 12,
            background: isDark ? '#4b5563' : '#a1a1aa',
            margin: '0 auto',
            borderRadius: '0 0 2px 2px',
          }} />
        </div>
      ))}
    </div>
  )
}