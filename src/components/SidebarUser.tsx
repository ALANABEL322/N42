import { User, Users, BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../lib/authServices'
import { useEffect, useState } from 'react'

export default function SidebarUser() {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState(authService.getState())

  useEffect(() => {
    const unsubscribe = authService.subscribe((newState) => {
      setAuthState(newState)
    })
    return () => unsubscribe()
  }, [])

  if (authState.user?.userType !== 'user') {
    return null
  }

  const menuItems = [
    {
      icon: BarChart3,
      label: 'Mi Dashboard',
      path: '/dashboard'
    },
    {
      icon: Users,
      label: 'Mi Perfil',
      path: '/dashboard/profile'
    }
  ]

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-[#F6EEEE] border-r border-gray-200 flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="h-6 w-6 text-gray-400" />
            <span className="text-gray-800 font-medium">
              Usuario: {authState.user?.username || 'Usuario'}
            </span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full"
              >
                <item.icon className="h-5 w-5 mr-3 text-gray-400" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}