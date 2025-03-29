import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { authService } from "../lib/authServices"

export default function Navbar() {
  const navigate = useNavigate()
  const userType = authService.getUserType()
  const currentUser = authService.getCurrentUser()

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  const handleLogoClick = () => {
    navigate(userType === 'admin' ? '/admin' : '/user')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F6EEEE] shadow-sm">
      <div className="h-16 flex items-center justify-between">
        <div className="pl-4">
          <img
            src="/src/assets/Horiz.Preferente.png"
            alt="Logo"
            className="h-8 w-auto cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>
        <div className="pr-4 flex items-center space-x-4">
          {currentUser && (
            <span className="text-gray-600">
              {userType === 'admin' ? 'Administrador' : 'Usuario'}: {currentUser.username}
            </span>
          )}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-[#DB6A00] hover:text-[#DB6A00] "
          >
            <LogOut className="h-5 w-5 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </nav>
  )
}
