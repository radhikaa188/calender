interface Props {
  count?: number
}

export default function SpiralBinding({ count = 14 }: Props) {
  return (
    <div className="flex justify-center gap-[14px] px-8 relative z-10 pb-1" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative" style={{ width: 16, height: 24 }}>
          {/* Top loop */}
          <div
            style={{
              width: 16,
              height: 14,
              borderRadius: '50% 50% 0 0 / 80% 80% 0 0',
              border: '2.5px solid #a1a1aa',
              borderBottom: 'none',
              background: 'linear-gradient(180deg, #e4e4e7 0%, #a1a1aa 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5)',
            }}
          />
          {/* Stem */}
          <div
            style={{
              width: 2.5,
              height: 12,
              background: '#a1a1aa',
              margin: '0 auto',
              borderRadius: '0 0 2px 2px',
            }}
          />
        </div>
      ))}
    </div>
  )
}