import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { authService } from '../lib/authServices'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children?: ReactNode
  requiredRole?: 'admin' | 'user'
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const location = useLocation()
  const isAuthenticated = authService.isAuthenticated()
  const userType = authService.getUserType()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && userType !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute