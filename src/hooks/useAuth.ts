// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { loginUser, refreshToken, logoutUser } from '../api/auth';
import type { User } from '../types';

/**
 * Hook de autenticação do usuário
 * Gerencia estado de usuário, loading e operações de auth
 *
 * 🔒 Segurança:
 * - Usuário é armazenado no localStorage apenas como persistência
 * - Access token é mantido em memória (não em localStorage)
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const [loading, setLoading] = useState(true);

  // ✅ Tenta renovar o token quando a página é recarregada
  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await refreshToken();
        if (res.data.user) {
          const userData: User = res.data.user;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch {
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
  const login = async (credentials: { email: string; password: string }): Promise<User> => {
    const res = await loginUser(credentials);

    // Validação de tipagem discriminada
    if ('error' in res.data) {
      throw new Error(res.data.error);
    }

    const userData: User = res.data.user;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  // ✅ Logout
  const logout = async (): Promise<void> => {
    await logoutUser();
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, login, logout, loading };
}
