import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function RequireAuth({ children }) {
  const { isAuthenticated, openAuthModal } = useAuth();

  if (!isAuthenticated) {
    // Open the auth modal (handled globally) and redirect to home
    openAuthModal?.();
    return <Navigate to="/" replace />;
  }

  return children;
}