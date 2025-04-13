import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthStore, UserRole } from "../store/userStore";

interface ProtectedRouteProps {
  children?: ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, role, isAdmin, isUser } = useAuthStore();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    console.log("🔒 Usuario no autenticado, redirigiendo a login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si se requiere un rol específico y no coincide, redirigir
  if (requiredRole && role !== requiredRole) {
    console.log("⚠️ Rol requerido:", requiredRole, "Rol actual:", role);
    return <Navigate to={isAdmin() ? "/admin" : "/user"} replace />;
  }

  // Si no hay rol requerido, redirigir según el rol del usuario
  if (!requiredRole) {
    console.log("🔄 Redirigiendo según rol:", role);
    return <Navigate to={isAdmin() ? "/admin" : "/user"} replace />;
  }

  // Si todo está bien, renderizar los children o el Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
