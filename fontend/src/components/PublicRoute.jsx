import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect authenticated users to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}