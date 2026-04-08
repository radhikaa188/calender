import React from 'react'
import WallCalendar from './components/Calender/index'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center p-4 py-10">
      <WallCalendar />
    </div>
  )
}