// Authentication utilities using Axios API client
import authApi from '@/api/authApi';
import userApi from '@/api/userApi';

const TOKEN_KEY = 'token';  // Match axiosClient.js token key
const TOKEN_EXPIRES_KEY = 'token_expires';
const TOKEN_TYPE_KEY = 'token_type';

function saveToken(accessToken, tokenType, expiresAt) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  if (tokenType) localStorage.setItem(TOKEN_TYPE_KEY, tokenType);
  if (expiresAt) localStorage.setItem(TOKEN_EXPIRES_KEY, expiresAt);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRES_KEY);
  localStorage.removeItem(TOKEN_TYPE_KEY);
}

function parseJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

export const auth = {
  // login with email/username and password using the Axios API
  async login(identifier, password) {
    const isEmail = typeof identifier === 'string' && identifier.includes('@');
    const loginData = isEmail ? { email: identifier, password } : { username: identifier, password };

    try {
      const response = await authApi.login(loginData);
      const { data } = response.data; // Axios wraps the API response

      if (!data?.accessToken) {
        throw new Error('Invalid login response - missing access token');
      }

      // Save token data
      const { accessToken, tokenType, expiresAt } = data;
      saveToken(accessToken, tokenType, expiresAt);

      // Get user profile immediately after login
      const userDetails = await auth.fetchUserDetails();
      return { accessToken, tokenType, expiresAt, user: userDetails };

    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(msg);
    }
  },

  logout() {
    clearToken();
    // Optionally clear other session state
  },

  getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    const expires = localStorage.getItem(TOKEN_EXPIRES_KEY);
    const tokenType = localStorage.getItem(TOKEN_TYPE_KEY);

    if (!token) {
      console.debug('No token found in storage');
      return null;
    }

    // Validate token format (should be JWT-like)
    if (!token.includes('.') || token.split('.').length !== 3) {
      console.warn('Invalid token format, clearing token');
      clearToken();
      return null;
    }

    // Check expiry
    if (expires) {
      const ts = Date.parse(expires);
      if (!isNaN(ts)) {
        const now = Date.now();
        const timeToExpiry = ts - now;
        
        if (timeToExpiry <= 0) {
          console.debug('Token expired, clearing');
          clearToken();
          return null;
        }
        
        // Log warning if token expires soon (within 5 minutes)
        if (timeToExpiry < 5 * 60 * 1000) {
          console.warn('Token expires in less than 5 minutes');
        }
      }
    }

    // Ensure we have a token type (default to Bearer if missing)
    if (!tokenType) {
      localStorage.setItem(TOKEN_TYPE_KEY, 'Bearer');
    }

    return token;
  },

  isAuthenticated() {
    return !!auth.getToken();
  },

  getCurrentUser() {
    const token = auth.getToken();
    if (!token) return null;
    const payload = parseJwt(token);
    if (!payload) return null;
    // standard JWT claims: sub, email, name, exp, iat
    return {
      id: payload.sub,
      email: payload.email || payload.sub || null,
      name: payload.name || payload.fullname || null,
      raw: payload,
    };
  },

  // helper to perform authenticated fetches with Authorization header
  async fetchWithAuth(input, init = {}) {
    const token = auth.getToken();
    if (!token) {
      throw new Error('Not authenticated - no valid token found');
    }

    const tokenType = localStorage.getItem(TOKEN_TYPE_KEY) || 'Bearer';
    const headers = new Headers(init.headers || {});
    headers.set('Authorization', `${tokenType} ${token}`);
    headers.set('Accept', 'application/json');

    try {
      const res = await fetch(input, { ...init, headers });

      // Log helpful debugging info for auth issues
      if (!res.ok && (res.status === 401 || res.status === 403)) {
        console.warn(`Auth error ${res.status} for ${input}`, {
          tokenExists: !!token,
          tokenLength: token?.length,
          authHeader: headers.get('Authorization')?.replace(token, '[REDACTED]'),
        });
        
        if (res.status === 401) {
          // Clear token on unauthorized (but not on forbidden)
          clearToken();
          throw new Error('Session expired - please login again');
        }
      }

      return res;
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        console.error('Network error during authenticated request:', err);
        throw new Error('Unable to connect to server - please check your connection');
      }
      throw err;
    }
  },

  async fetchUserDetails() {
    try {
      const response = await userApi.getCurrentUser();
      const { data } = response.data;

      if (!data) {
        throw new Error('Invalid user details response - missing data');
      }

      // Extract user details from response
      const { id, username, email, fullname, roles, status } = data;
      return {
        id,
        username,
        email,
        fullname,
        roles: roles || [],
        status,
        isAdmin: roles?.some(role => role.name === 'ADMIN'),
        isActive: status === 'ACTIVE'
      };
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Failed to fetch user details';
      throw new Error(msg);
    }
  }
};

// Keep mock users for local-only use (not used by the API)
export const mockUsers = [
  {
    id: 1,
    username: 'demo',
    email: 'demo@example.com',
    password: 'demo123', // local-only
    name: 'Demo User',
    avatar: '/avatars/default.jpg'
  },
];