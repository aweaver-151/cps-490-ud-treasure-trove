import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header.jsx'

export function Shared() {
  return (
    <div className='min-h-screen bg-slate-950 text-white overflow-hidden'>
      <Header />
      <div style={{ padding: 8 }}>
        <Outlet />
      </div>
    </div>
  )
}
