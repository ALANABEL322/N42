import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { authService } from '../lib/authServices'
import { ReactNode, useEffect, useState } from 'react'

interface ProtectedRouteProps {
  children?: ReactNode
  requiredRole?: 'admin' | 'user'
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const location = useLocation()
  const [authState, setAuthState] = useState(authService.getState())

  useEffect(() => {
    const unsubscribe = authService.subscribe((state) => {
      setAuthState(state)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const isAuthenticated = authState.isAuthenticated
  const userType = authState.user?.userType

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && userType !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  // If no requiredRole is specified, redirect based on user type
  if (!requiredRole) {
    return <Navigate to={userType === 'admin' ? '/admin' : '/user'} replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute