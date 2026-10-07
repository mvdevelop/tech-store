// src/ProtectedRoute.tsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import type { ReactNode } from 'react';
import type { AuthContextType } from './types';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, accessToken } = useContext(AuthContext) as AuthContextType;

  // Enquanto o AuthContext ainda está tentando restaurar o estado (ex: refresh inicial)
  // O estado `user` começa como `undefined` indicando "não inicializado"
  if (user === undefined) {
    return <div>Loading...</div>; // ou um spinner mais bonito
  }

  // Se não há user logado ou não há access token, redireciona para login
  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Tudo certo → renderiza a rota protegida
  return <>{children}</>;
}
