import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { authService } from './lib/authServices';
import ProtectedRoute from './protectedRouteProps/ProtectedRouteProps';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';
import Footer from './components/Footer';

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const LandingPage = lazy(() => import('./pages/user/UserLandingPage'));
const Login = lazy(() => import('./pages/auth/Login'));
const Sidebar = lazy(() => import('./components/Sidebar'));
const SidebarUser = lazy(() => import('./components/SidebarUser'));
const Navbar = lazy(() => import('./components/Navbar'));
const UserManagement = lazy(() => import('./pages/admin/users/index'));
const Support = lazy(() => import('./pages/dashboard/Support'));
const CreateProject = lazy(() => import('./pages/dashboard/CreateProject'));
const Projects = lazy(() => import('./pages/dashboard/Projects'));
const Templates = lazy(() => import('./pages/dashboard/Templates'));
const ProjectManagement = lazy(() => import('./pages/dashboard/ProjectManagement'));
const Reports = lazy(() => import('./pages/dashboard/Reports'));
const WebMetrics = lazy(() => import('./pages/admin/metrics/index'));
const ReportGenerator = lazy(() => import('./pages/admin/reports/index'));

const ProtectedLayout = ({ role, children }: { role: 'admin' | 'user', children?: JSX.Element | JSX.Element[] }) => {
  const location = useLocation();
  
  return (
    <div className="flex bg-gray-100 overflow-hidden">
      <Navbar />
      {role === 'admin' ? (
        <Sidebar />
      ) : (
        // Show SidebarUser for all user routes except landing page
        location.pathname !== '/user' && <SidebarUser />
      )}
      <div className="flex-1 overflow-auto">
        {children || <Outlet />}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Admin routes */}
              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route element={<ProtectedLayout role="admin" />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UserManagement />} />
                  <Route path="/admin/reports" element={<ReportGenerator />} />
                  <Route path="/admin/metrics" element={<WebMetrics />} />
                </Route>
              </Route>
              
              {/* User routes */}
              <Route element={<ProtectedRoute requiredRole="user" />}>
                <Route element={<ProtectedLayout role="user" />}>
                  <Route path="/user" element={<LandingPage />} />
                  <Route path="/dashboard/createProject" element={<CreateProject />} />
                  <Route path="/dashboard/projects" element={<Projects />} />
                  <Route path="/dashboard/templates" element={<Templates />} />
                  <Route path="/dashboard/projectManagement" element={<ProjectManagement />} />
                  <Route path="/dashboard/reports" element={<Reports />} />
                  <Route path="/dashboard/support" element={<Support />} />
                </Route>
              </Route>
              
              {/* Default route */}
              <Route path="/" element={<ProtectedRoute />}>
                <Route index element={
                  <Navigate to={authService.getUserType() === 'admin' ? '/admin' : '/user'} replace />
                } />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;