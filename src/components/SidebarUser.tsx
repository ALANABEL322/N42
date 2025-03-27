import { useNavigate } from 'react-router-dom'
import { authService } from '../lib/authServices'
import { useEffect, useState } from 'react'
import {
  Folder,
  Package,
  Settings,
  LifeBuoy,
  Users,
  PieChart,
  FileText as ReportIcon
} from 'lucide-react'

export default function SidebarUser() {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState(authService.getState())

  useEffect(() => {
    const unsubscribe = authService.subscribe((newState) => {
      setAuthState(authService.getState())
    })
    return () => unsubscribe()
  }, [])

  if (authState.user?.userType !== 'user') {
    return null
  }

  const menuItems = [
    {
      icon: Package,
      label: 'Crear Proyecto',
      path: '/dashboard/createProject'
    },
    {
      icon: Folder,
      label: 'Mis Proyectos',
      path: '/dashboard/projects'
    },
    {
      icon: PieChart,
      label: 'Plantillas',
      path: '/dashboard/templates'
    },
    {
      icon: Settings,
      label: 'Gestión de Proyectos',
      path: '/dashboard/projectManagement'
    },
    {
      icon: ReportIcon,
      label: 'Informes',
      path: '/dashboard/reports'
    },
    {
      icon: LifeBuoy,
      label: 'Soporte',
      path: '/dashboard/support'
    }
  ]

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-[#F6EEEE] border-r border-gray-200 flex flex-col">
      <div className="flex-1 flex flex-col mt-12">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="h-6 w-6 text-gray-400" />
            <span className="text-gray-800 font-medium">
              User: {authState.user?.username || 'User'}
            </span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <item.icon className="h-5 w-5 text-gray-400 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}