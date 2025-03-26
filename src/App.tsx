import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { authService } from './lib/authServices'
import ProtectedRoute from './protectedRouteProps/ProtectedRouteProps'
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner'
import Footer from './components/Footer'
// import userLandingPage from './pages/user/UserLandingPage'

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const LandingPage = lazy(() => import('./pages/user/UserLandingPage'))
const Login = lazy(() => import('./pages/auth/Login'))
const Sidebar = lazy(() => import('./components/Sidebar'))
const SidebarUser = lazy(() => import('./components/SidebarUser'))
const Navbar = lazy(() => import('./components/Navbar'))
const UserManagement = lazy(() => import('./pages/admin/users/index'))

const ProtectedLayout = ({ role }: { role: 'admin' | 'user' }) => {
  return (
    <>
      <Navbar />
      {role === 'admin' ? <Sidebar /> : <SidebarUser />}
      <div className={`ml-64 p-4`}>
        <Outlet />
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            
       
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route element={<ProtectedLayout role="admin" />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManagement />} />
              </Route>
            </Route>
            
            <Route element={<ProtectedRoute requiredRole="user" />}>
              <Route element={<ProtectedLayout role="user" />}>
                <Route path="/userLandingPage" element={<LandingPage />} />
              </Route>
            </Route>
            
            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={
                <Navigate to={authService.getUserType() === 'admin' ? '/admin' : '/dashboard'} replace />
              } />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </Suspense>
    </Router>
  )
}

export default App