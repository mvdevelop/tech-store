// src/context/AuthContext.tsx
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { loginUser, logoutUser, refreshToken, setAccessToken } from '../api/auth';
import type { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa o usuário a partir do localStorage (persistência)
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? (JSON.parse(savedUser) as User) : null;
  });
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  // Função para tentar refresh do token
  const attemptRefresh = useCallback(async () => {
    try {
      const res = await refreshToken();
      if (res?.data?.accessToken) {
        setAccessTokenState(res.data.accessToken);
        // Atualiza o token na API client para interceptador
        setAccessToken(res.data.accessToken);
        if (res.data.user) {
          const userData: User = res.data.user;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      }
    } catch {
      console.warn('No valid refresh token');
      setAccessTokenState(null);
      setUser(null);
      localStorage.removeItem('user');
    }
  }, []);

  // Auto refresh on mount
  useEffect(() => {
    attemptRefresh();
  }, [attemptRefresh]);

  // Faz login e guarda dados do usuário + localStorage
  const login = async (email: string, password: string): Promise<void> => {
    const res = await loginUser({ email, password });

    // Validação de tipagem discriminada
    if ('error' in res.data) {
      throw new Error(res.data.error);
    }

    const userData: User = res.data.user;
    const token = res.data.accessToken;

    setUser(userData);
    setAccessTokenState(token);
    setAccessToken(token); // atualiza o interceptador do Axios
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Faz logout e limpa dados do estado e localStorage
  const logout = async (): Promise<void> => {
    await logoutUser();
    setUser(null);
    setAccessTokenState(null);
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
