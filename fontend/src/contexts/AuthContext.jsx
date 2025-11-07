import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in on initial load and fetch details
    const initAuth = async () => {
      if (auth.isAuthenticated()) {
        try {
          await fetchAndSetUserDetails();
        } catch {
          // Failed to fetch user details - will redirect in fetchAndSetUserDetails
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  // Periodically check token validity and auto logout on expiration
  useEffect(() => {
    const id = setInterval(() => {
      const stillAuth = auth.isAuthenticated();
      if (!stillAuth && user) {
        // token expired or invalid
        auth.logout();
        setUser(null);
        // close modal if open
        setAuthModalOpen(false);
        try {
          window.location.href = '/';
        } catch {
          /* ignore */
        }
      }
    }, 30 * 1000); // check every 30s

    return () => clearInterval(id);
  }, [user]);

  const fetchAndSetUserDetails = async () => {
    try {
      const userDetails = await auth.fetchUserDetails();
      setUser(userDetails);
    } catch (err) {
      console.error('Failed to fetch user details:', err);
      // If we can't fetch user details, logout
      auth.logout();
      setUser(null);
      try {
        window.location.href = '/';
      } catch {
        /* ignore */
      }
    }
  };

  const login = async (identifier, password) => {
    const result = await auth.login(identifier, password);
    // After login success, fetch complete user details
    await fetchAndSetUserDetails();
    return result;
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    // redirect to landing page
    try {
      window.location.href = '/';
    } catch {
      // ignore
    }
  };

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      authModalOpen,
      setAuthModalOpen,
      openAuthModal,
      closeAuthModal,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};