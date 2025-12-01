import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { token } = useAuth();
  const location = useLocation();

  const isAuthenticated = !!(token);

  // Redirect to login if not authenticated, preserve intended route
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Render protected child routes
};
