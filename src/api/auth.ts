// src/api/auth.ts
import axios, { AxiosInstance } from 'axios';

// ✅ Define a URL base da API — usa variável de ambiente ou fallback local
// Em ambientes de produção, VITE_API_URL deve ser definida como HTTPS
const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || 'http://localhost:3000/api/auth';

// ⚠️ Log de segurança: alerta em ambiente de desenvolvimento quando using HTTP
if (import.meta.env.DEV && API_URL.startsWith('http://')) {
  console.warn(
    '⚠️  Running in development with HTTP API URL. ' +
    'Set VITE_API_URL to an HTTPS endpoint for production.',
  );
}

// ✅ Cria uma instância do Axios com cookies e cabeçalhos configurados
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // necessário para enviar cookies HttpOnly
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptador para adicionar token de acesso às requisições
// Este é um padrão recomendado para JWT — token é adicionado dinamicamente
// Não armazenamos o token no localStorage (mitiga XSS)
let accessToken: string | null = null;

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};

api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ Tipos para as respostas da API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthApiResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// ✅ Funções de autenticação com tipagem
export const registerUser = (data: RegisterRequest) =>
  api.post<AuthApiResponse>('/register', data);

export const loginUser = (data: LoginRequest) =>
  api.post<AuthApiResponse>('/login', data);

export const refreshToken = () =>
  api.post<{ accessToken: string; user?: AuthApiResponse['user'] }>('/refresh', {});

export const logoutUser = () =>
  api.post('/logout', {});

export default api;
