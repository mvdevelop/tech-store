
// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { loginUser, refreshToken, logoutUser } from '../api/auth';

export function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(true);

  // ✅ Tenta renovar o token quando a página é recarregada
  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await refreshToken();
        if (res.data.user) {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
      } catch (err) {
        console.warn('Sessão expirada, login necessário novamente.');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  // ✅ Login
  const login = async (credentials) => {
    const res = await loginUser(credentials);
    setUser(res.data.user);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  };

  // ✅ Logout
  const logout = async () => {
    await logoutUser();
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, login, logout, loading };
}
