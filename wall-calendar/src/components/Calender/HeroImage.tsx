import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MonthTheme, AppTheme } from '../../utils/types'

interface Props {
  theme: MonthTheme
  year: number
  direction: 'next' | 'prev'
  appTheme: AppTheme
  customImage?: string
  onImageUpload: (dataUrl: string) => void
  onImageClear: () => void
}

const flipVariants = {
  enter: (dir: string) => ({
    rotateY: dir === 'next' ? 90 : -90,
    opacity: 0,
    transformOrigin: dir === 'next' ? 'left center' : 'right center',
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    transformOrigin: 'center center',
    transition: { 
      duration: 0.45, 
      ease: [0.4, 0, 0.2, 1] as const // ✅ FIX
    },
  },
  exit: (dir: string) => ({
    rotateY: dir === 'next' ? -90 : 90,
    opacity: 0,
    transformOrigin: dir === 'next' ? 'right center' : 'left center',
    transition: { 
      duration: 0.35, 
      ease: [0.4, 0, 0.2, 1] as const // ✅ FIX
    },
  }),
}

export default function HeroImage({ theme, year, direction, appTheme, customImage, onImageUpload, onImageClear }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const isDark  = appTheme === 'dark'

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onImageUpload(ev.target?.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const imgSrc = customImage || theme.imageUrl

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: 'clamp(160px, 28vw, 280px)', perspective: 1200 }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${theme.month}-${customImage ? 'custom' : 'default'}`}
          custom={direction}
          variants={flipVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Photo */}
          <img
            src={imgSrc}
            alt={theme.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                135deg,
                ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)'} 30%,
                ${theme.accentColor}bb 75%,
                ${theme.accentColor} 100%
              )`,
            }}
          />

          {/* Chevron wave */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 400 52"
            preserveAspectRatio="none"
          >
            <path
              d="M0 52 L0 24 L100 52 L200 12 L300 52 L400 24 L400 52 Z"
              fill={isDark ? '#1e1e2e' : 'white'}
            />
            <path
              d="M0 24 L100 52 L200 12 L300 52 L400 24"
              fill="none"
              stroke={theme.accentColor}
              strokeWidth="3.5"
            />
          </svg>

          {/* Year + Month label */}
          <div className="absolute right-5" style={{ bottom: 38, textAlign: 'right' }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
              fontSize: 'clamp(11px, 2vw, 14px)',
              color: 'rgba(255,255,255,0.85)', letterSpacing: '0.2em',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }}>
              {year}
            </div>
            <div style={{
              fontFamily: 'Playfair Display, serif', fontWeight: 700,
              fontSize: 'clamp(20px, 4vw, 32px)',
              color: 'white', letterSpacing: '0.05em', lineHeight: 1.1,
              textShadow: '0 2px 8px rgba(0,0,0,0.35)',
            }}>
              {theme.label.toUpperCase()}
            </div>
          </div>

          {/* Season badge */}
          <div
            className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.05em',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
            }}
          >
            {{ winter: '❄️', spring: '🌸', summer: '☀️', autumn: '🍂' }[theme.season]} {theme.season}
          </div>

          {/* Upload / Clear buttons */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {customImage && (
              <button
                onClick={onImageClear}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs backdrop-blur-sm transition-all hover:scale-110"
                style={{ background: 'rgba(239,68,68,0.7)', border: '1px solid rgba(255,255,255,0.3)' }}
                title="Remove custom image"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs backdrop-blur-sm transition-all hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.3)' }}
              title="Upload custom photo"
            >
              📷
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}