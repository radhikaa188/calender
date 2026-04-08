import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MonthTheme } from '../../utils/types'

interface Props {
  theme: MonthTheme
  year: number
  direction: 'next' | 'prev'
}

const variants = {
  enter: (dir: string) => ({ opacity: 0, x: dir === 'next' ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir: string) => ({ opacity: 0, x: dir === 'next' ? -60 : 60 }),
}

export default function HeroImage({ theme, year, direction }: Props) {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: 'clamp(160px, 28vw, 280px)' }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={theme.month}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <img
            src={theme.imageUrl}
            alt={theme.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Colour gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                135deg,
                rgba(0,0,0,0.05) 30%,
                ${theme.accentColor}bb 75%,
                ${theme.accentColor} 100%
              )`,
            }}
          />

          {/* Chevron wave at bottom */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 400 52"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* White fill */}
            <path d="M0 52 L0 24 L100 52 L200 12 L300 52 L400 24 L400 52 Z" fill="white" />
            {/* Accent stripe */}
            <path
              d="M0 24 L100 52 L200 12 L300 52 L400 24"
              fill="none"
              stroke={theme.accentColor}
              strokeWidth="3.5"
            />
          </svg>

          {/* Year + Month label */}
          <div
            className="absolute right-5"
            style={{ bottom: 36, textAlign: 'right' }}
          >
            <div
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(11px, 2vw, 14px)',
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.2em',
                textShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }}
            >
              {year}
            </div>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                fontSize: 'clamp(20px, 4vw, 32px)',
                color: 'white',
                letterSpacing: '0.05em',
                lineHeight: 1.1,
                textShadow: '0 2px 8px rgba(0,0,0,0.25)',
              }}
            >
              {theme.label.toUpperCase()}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}