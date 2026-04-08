// import type { MonthTheme, Holiday } from './types'

// // Using high-quality Unsplash images per month theme
// export const MONTH_THEMES: MonthTheme[] = [
//   {
//     month: 0, label: 'January', season: 'winter',
//     imageUrl: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=800&q=80',
//     imageAlt: 'Mountain climber in winter',
//     accentColor: '#2196F3',
//     accentLight: '#E3F2FD',
//     accentDark: '#1565C0',
//     gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%)'
//   },
//   {
//     month: 1, label: 'February', season:'winter',
//     imageUrl: 'https://images.unsplash.com/photo-1518050346340-aa2ec3bb424b?w=800&q=80',
//     imageAlt: 'Snow covered forest',
//     accentColor: '#E91E63',
//     accentLight: '#FCE4EC',
//     accentDark: '#880E4F',
//     gradient: 'linear-gradient(135deg, #1a0a12 0%, #4a1428 100%)'
//   },
//   {
//     month: 2, label: 'March',
//     imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80',
//     imageAlt: 'Spring cherry blossoms',
//     accentColor: '#FF9800',
//     accentLight: '#FFF3E0',
//   },
//   {
//     month: 3, label: 'April',
//     imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80',
//     imageAlt: 'Spring meadow sunrise',
//     accentColor: '#4CAF50',
//     accentLight: '#E8F5E9',
//   },
//   {
//     month: 4, label: 'May',
//     imageUrl: 'https://images.unsplash.com/photo-1723449841759-4bea00ce1ae4?q=80&w=326&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     imageAlt: 'Blooming flowers field',
//     accentColor: '#9C27B0',
//     accentLight: '#F3E5F5',
//   },
//   {
//     month: 5, label: 'June',
//     imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
//     imageAlt: 'Tropical beach sunset',
//     accentColor: '#00BCD4',
//     accentLight: '#E0F7FA',
//   },
//   {
//     month: 6, label: 'July',
//     imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
//     imageAlt: 'Mountain lake summer',
//     accentColor: '#FF5722',
//     accentLight: '#FBE9E7',
//   },
//   {
//     month: 7, label: 'August',
//     imageUrl: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80',
//     imageAlt: 'Sunflower field',
//     accentColor: '#FFC107',
//     accentLight: '#FFF8E1',
//   },
//   {
//     month: 8, label: 'September',
//     imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
//     imageAlt: 'Autumn forest path',
//     accentColor: '#795548',
//     accentLight: '#EFEBE9',
//   },
//   {
//     month: 9, label: 'October',
//     imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
//     imageAlt: 'Fall foliage',
//     accentColor: '#FF6F00',
//     accentLight: '#FFF3E0',
//   },
//   {
//     month: 10, label: 'November',
//     imageUrl: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=800&q=80',
//     imageAlt: 'Misty autumn morning',
//     accentColor: '#607D8B',
//     accentLight: '#ECEFF1',
//   },
//   {
//     month: 11, label: 'December',
//     imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
//     imageAlt: 'Winter snow scene',
//     accentColor: '#3F51B5',
//     accentLight: '#E8EAF6',
//   },
// ]

// export const HOLIDAYS: Holiday[] = [
//   { date: '01-01', name: "New Year's Day" },
//   { date: '01-26', name: 'Republic Day' },
//   { date: '02-14', name: "Valentine's Day" },
//   { date: '03-08', name: "Women's Day" },
//   { date: '03-25', name: 'Holi' },
//   { date: '04-14', name: 'Ambedkar Jayanti' },
//   { date: '05-01', name: 'Labour Day' },
//   { date: '06-21', name: "Father's Day" },
//   { date: '08-15', name: 'Independence Day' },
//   { date: '10-02', name: 'Gandhi Jayanti' },
//   { date: '10-24', name: 'Diwali' },
//   { date: '11-14', name: "Children's Day" },
//   { date: '12-25', name: 'Christmas' },
//   { date: '12-31', name: "New Year's Eve" },
// ]

// export function getTheme(month: number): MonthTheme {
//   return MONTH_THEMES[month]
// }

// export function getHolidayForDate(date: Date): Holiday | undefined {
//   const key = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
//   return HOLIDAYS.find(h => h.date === key)
// }

import type { MonthTheme, Holiday } from './types'

export const MONTH_THEMES: MonthTheme[] = [
  {
    month: 0, label: 'January', season: 'winter',
    imageUrl: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=800&q=80',
    imageAlt: 'Mountain climber in winter',
    accentColor: '#2196F3', accentLight: '#E3F2FD', accentDark: '#1565C0',
    gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%)',
  },
  {
    month: 1, label: 'February', season: 'winter',
    imageUrl: 'https://images.unsplash.com/photo-1518050346340-aa2ec3bb424b?w=800&q=80',
    imageAlt: 'Snow covered forest',
    accentColor: '#E91E63', accentLight: '#FCE4EC', accentDark: '#880E4F',
    gradient: 'linear-gradient(135deg, #1a0a12 0%, #4a1428 100%)',
  },
  {
    month: 2, label: 'March', season: 'spring',
    imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80',
    imageAlt: 'Spring cherry blossoms',
    accentColor: '#FF9800', accentLight: '#FFF3E0', accentDark: '#E65100',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #4a2e00 100%)',
  },
  {
    month: 3, label: 'April', season: 'spring',
    imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80',
    imageAlt: 'Spring meadow sunrise',
    accentColor: '#4CAF50', accentLight: '#E8F5E9', accentDark: '#1B5E20',
    gradient: 'linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 100%)',
  },
  {
    month: 4, label: 'May', season: 'spring',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88df5691cc99?w=800&q=80',
    imageAlt: 'Blooming flowers field',
    accentColor: '#9C27B0', accentLight: '#F3E5F5', accentDark: '#4A148C',
    gradient: 'linear-gradient(135deg, #150a1a 0%, #2e1040 100%)',
  },
  {
    month: 5, label: 'June', season: 'summer',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    imageAlt: 'Tropical beach sunset',
    accentColor: '#00BCD4', accentLight: '#E0F7FA', accentDark: '#006064',
    gradient: 'linear-gradient(135deg, #001a1f 0%, #003540 100%)',
  },
  {
    month: 6, label: 'July', season: 'summer',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    imageAlt: 'Mountain lake summer',
    accentColor: '#FF5722', accentLight: '#FBE9E7', accentDark: '#BF360C',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #3d1500 100%)',
  },
  {
    month: 7, label: 'August', season: 'summer',
    imageUrl: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80',
    imageAlt: 'Sunflower field',
    accentColor: '#FFC107', accentLight: '#FFF8E1', accentDark: '#FF6F00',
    gradient: 'linear-gradient(135deg, #1a1400 0%, #3d3000 100%)',
  },
  {
    month: 8, label: 'September', season: 'autumn',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    imageAlt: 'Autumn forest path',
    accentColor: '#795548', accentLight: '#EFEBE9', accentDark: '#3E2723',
    gradient: 'linear-gradient(135deg, #0f0a08 0%, #2a1a12 100%)',
  },
  {
    month: 9, label: 'October', season: 'autumn',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    imageAlt: 'Fall foliage',
    accentColor: '#FF6F00', accentLight: '#FFF3E0', accentDark: '#E65100',
    gradient: 'linear-gradient(135deg, #1a0e00 0%, #402200 100%)',
  },
  {
    month: 10, label: 'November', season: 'autumn',
    imageUrl: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=800&q=80',
    imageAlt: 'Misty autumn morning',
    accentColor: '#607D8B', accentLight: '#ECEFF1', accentDark: '#263238',
    gradient: 'linear-gradient(135deg, #0a0e10 0%, #1a2428 100%)',
  },
  {
    month: 11, label: 'December', season: 'winter',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
    imageAlt: 'Winter snow scene',
    accentColor: '#3F51B5', accentLight: '#E8EAF6', accentDark: '#1A237E',
    gradient: 'linear-gradient(135deg, #080a1a 0%, #151a3a 100%)',
  },
]

export const HOLIDAYS: Holiday[] = [
  { date: '01-01', name: "New Year's Day",     emoji: '🎆' },
  { date: '01-14', name: 'Makar Sankranti',    emoji: '🪁' },
  { date: '01-26', name: 'Republic Day',        emoji: '🇮🇳' },
  { date: '02-14', name: "Valentine's Day",     emoji: '❤️' },
  { date: '03-08', name: "Women's Day",         emoji: '💜' },
  { date: '03-25', name: 'Holi',                emoji: '🎨' },
  { date: '04-14', name: 'Ambedkar Jayanti',    emoji: '📘' },
  { date: '05-01', name: 'Labour Day',          emoji: '✊' },
  { date: '06-21', name: "Father's Day",        emoji: '👨' },
  { date: '08-15', name: 'Independence Day',    emoji: '🇮🇳' },
  { date: '09-02', name: 'Ganesh Chaturthi',   emoji: '🐘' },
  { date: '10-02', name: 'Gandhi Jayanti',      emoji: '🕊️' },
  { date: '10-20', name: 'Diwali',              emoji: '🪔' },
  { date: '10-31', name: 'Halloween',           emoji: '🎃' },
  { date: '11-14', name: "Children's Day",      emoji: '🧒' },
  { date: '12-25', name: 'Christmas',           emoji: '🎄' },
  { date: '12-31', name: "New Year's Eve",      emoji: '🎉' },
]

export function getTheme(month: number): MonthTheme {
  return MONTH_THEMES[month]
}

export function getHolidayForDate(date: Date): Holiday | undefined {
  const key = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return HOLIDAYS.find(h => h.date === key)
}

export const SEASON_GLOW: Record<string, string> = {
  winter: '0 0 40px 8px rgba(33,150,243,0.18)',
  spring: '0 0 40px 8px rgba(76,175,80,0.18)',
  summer: '0 0 40px 8px rgba(255,193,7,0.18)',
  autumn: '0 0 40px 8px rgba(255,111,0,0.18)',
}