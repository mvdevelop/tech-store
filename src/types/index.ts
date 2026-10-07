/**
 * Tipos globais do projeto Tech Store
 * Usados em toda a aplicação para garantir tipagem consistente
 */

// ─── Usuário ───────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Autenticação ──────────────────────────────────────────────────────────

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface RefreshResponse {
  accessToken: string;
  user?: User;
}

// ─── Produtos ──────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  description: string;
  oldPrice: number;
  newPrice: number;
  category: string;
  image: string;
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
}

// ─── Contexto de Autenticação ───────────────────────────────────────────────

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
