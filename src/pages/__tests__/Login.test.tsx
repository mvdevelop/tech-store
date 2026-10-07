import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login';

// Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  };
});

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o formulário de login com campos de email e senha', () => {
    render(
      <AuthContext.Provider
        value={{
          user: null,
          accessToken: null,
          login: vi.fn(),
          logout: vi.fn(),
        }}
      >
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro quando credenciais são inválidas', async () => {
    const mockLogin = vi.fn().mockRejectedValue(new Error('Invalid credentials'));

    render(
      <AuthContext.Provider
        value={{
          user: null,
          accessToken: null,
          login: mockLogin,
          logout: vi.fn(),
        }}
      >
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>,
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const submitButton = screen.getByRole('button', { name: 'Entrar' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Credenciais inválidas. Verifique seu e-mail e senha.'),
      ).toBeInTheDocument();
    });
  });

  it('deve chamar login com email e senha corretos ao submeter', async () => {
    const mockLogin = vi.fn().mockResolvedValue(undefined);

    render(
      <AuthContext.Provider
        value={{
          user: null,
          accessToken: null,
          login: mockLogin,
          logout: vi.fn(),
        }}
      >
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>,
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const submitButton = screen.getByRole('button', { name: 'Entrar' });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password123');
    });
  });
});
