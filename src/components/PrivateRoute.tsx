import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

interface PrivateRouteProps {
  requireAdmin?: boolean;
}

function PrivateRoute({ requireAdmin = false }: PrivateRouteProps) {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="loading">로딩 중...</div>;
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default PrivateRoute;