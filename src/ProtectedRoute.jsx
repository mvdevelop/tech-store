
// src/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, accessToken } = useContext(AuthContext);

  // Enquanto o AuthContext ainda está tentando restaurar o estado (ex: refresh inicial)
  if (user === undefined) {
    return <div>Loading...</div>; // ou um spinner mais bonito
  }

  // Se não há user logado, redireciona
  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Tudo certo → renderiza a rota protegida
  return children;
}
