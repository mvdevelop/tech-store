
// src/api/auth.js
import axios from 'axios';

// ✅ Define a URL base da API — usa variável de ambiente ou fallback local
const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || 'http://localhost:3000/api/auth';

// ✅ Cria uma instância do Axios com cookies e cabeçalhos configurados
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // necessário para enviar cookies HttpOnly
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Funções de autenticação
export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);
export const refreshToken = () => api.post('/refresh', {}); // ✅ corrigido para POST
export const logoutUser = () => api.post('/logout', {});
