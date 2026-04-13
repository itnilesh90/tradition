import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();
  const { token, user, initialized } = useAuth();
  const isAuthenticated = Boolean(token);
  const isAdmin = user?.role === "admin";

  if (!initialized && isAuthenticated) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
