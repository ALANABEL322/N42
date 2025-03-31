import { Outlet, Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import SidebarUser from './SidebarUser'
import { authService } from '../lib/authServices'
import { Toaster } from './ui/sonner'

interface ProtectedLayoutProps {
  role: 'admin' | 'user'
}

export default function ProtectedLayout({ role }: ProtectedLayoutProps) {
  const userType = authService.getUserType()

  if (userType !== role) {
    return <Navigate to={userType === 'admin' ? '/admin' : '/dashboard'} replace />
  }

  return (
    <div className="flex min-h-screen">
      <Toaster />
      <Navbar />
      <div className="flex-1 flex">
        {role === 'admin' ? (
          <Sidebar />
        ) : (
          <SidebarUser />
        )}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
