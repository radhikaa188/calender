import WallCalendar from './components/Calender'

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-10"
      style={{ background: 'linear-gradient(135deg, #e8edf5 0%, #dce8f5 50%, #e5ddf5 100%)' }}
    >
      <WallCalendar />
    </div>
  )
}