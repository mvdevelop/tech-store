
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser, logoutUser, refreshToken } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializa o usuário a partir do localStorage (persistência)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [accessToken, setAccessToken] = useState(null);

  // Função para tentar refresh do token
  const attemptRefresh = useCallback(async () => {
    try {
      const res = await refreshToken();
      if (res?.data?.accessToken) {
        setAccessToken(res.data.accessToken);
      }
    } catch {
      console.warn('No valid refresh token');
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('user');
    }
  }, []);

  // Auto refresh on mount
  useEffect(() => {
    attemptRefresh();
  }, [attemptRefresh]);

  // Faz login e guarda dados do usuário + localStorage
  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    localStorage.setItem('user', JSON.stringify(res.data.user));
  };

  // Faz logout e limpa dados do estado e localStorage
  const logout = async () => {
    await logoutUser();
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
  };

  // Renova token periodicamente (ex: a cada 14 min)
  useEffect(() => {
    if (!accessToken) return;
    const interval = setInterval(() => {
      attemptRefresh();
    }, 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, [accessToken, attemptRefresh]);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
