import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect } from 'react';
import { authService } from './lib/authServices';
import ProtectedRoute from './protectedRouteProps/ProtectedRouteProps';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';
import Footer from './components/Footer';
import SidebarUserMobile from './components/SidebarUserMobile';
import SidebarAdminMobile from './components/SidebarAdminMobile';
import { AnimatePresence } from 'framer-motion';
import { useFooterProximity } from './hookUI/useFooterProximity';
import { ProjectsProvider } from './contexts/ProjectsContext';

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const LandingPage = lazy(() => import('./pages/user/UserLandingPage'));
const Login = lazy(() => import('./pages/auth/Login'));
const Sidebar = lazy(() => import('./components/Sidebar'));
const SidebarUser = lazy(() => import('./components/SidebarUser'));
const Navbar = lazy(() => import('./components/Navbar'));
const UserManagement = lazy(() => import('./pages/admin/users/index'));
const SupportAdmin = lazy(() => import('./components/admin/SupportAdmin'));
const CreateProject = lazy(() => import('./pages/dashboard/CreateProject'));
const Projects = lazy(() => import('./pages/dashboard/Projects'));
const WebMetrics = lazy(() => import('./pages/admin/metrics/index'));
const ReportGenerator = lazy(() => import('./pages/admin/reports/index'));
const BrandIdentityPreview = lazy(() => import('./components/brandIdentityPreview/BrandIdentityPreview'));
const ProjectDetailsView = lazy(() => import('./pages/dashboard/ProjectDetailsView'));
const QuestionSelector = lazy(() => import('./components/questionSelector/QuestionSelector'));
const SupportUser = lazy(() => import('./pages/dashboard/SupportUser'));

function useWindowDimensions() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

const ProtectedLayout = ({ role, children }: { role: 'admin' | 'user', children?: JSX.Element | JSX.Element[] }) => {
  const location = useLocation();
  const width = useWindowDimensions();
  const isMobile = width <= 1300;
  const isFooterNear = useFooterProximity();

  return (
    <div className="flex bg-white overflow-hidden">
      <Navbar />
      {role === 'admin' ? (
        <>
          {!isMobile && <Sidebar />}
          <AnimatePresence>
            {isMobile && <SidebarAdminMobile visible={!isFooterNear} />}
          </AnimatePresence>
        </>
      ) : (
        location.pathname !== '/user' && (
          <>
            {!isMobile && <SidebarUser />}
            <AnimatePresence>
              {isMobile && <SidebarUserMobile visible={!isFooterNear} />}
            </AnimatePresence>
          </>
        )
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
      <ProjectsProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="flex flex-col min-h-screen bg-white">
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
                    <Route path="/admin/support" element={<SupportAdmin />} />
                  </Route>
                </Route>
                
                {/* User routes */}
                <Route element={<ProtectedRoute requiredRole="user" />}>
                  <Route element={<ProtectedLayout role="user" />}>
                    <Route path="/user" element={<LandingPage />} />
                    <Route path="/dashboard/createProject" element={<CreateProject />} />
                    <Route path="/dashboard/support" element={<QuestionSelector />} />
                    <Route path="/dashboard/support/question/:id" element={<SupportUser />} />
                    <Route path="/dashboard/projects" element={<Projects />} />
                    <Route path="/dashboard/projects/:id" element={<ProjectDetailsView />} />
                    <Route path="/dashboard/preview" element={<BrandIdentityPreview />} />
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
      </ProjectsProvider>
    </Router>
  );
}

export default App;