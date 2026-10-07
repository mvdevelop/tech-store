// src/pages/Register.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import type { AuthContextType } from '../types';
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';

export default function Register() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext) as AuthContextType | null;
  const login = authContext?.login;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🔒 Validação de senha conforme NIST 800-63B
  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return 'A senha deve ter pelo menos 8 caracteres.';
    }
    return null;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    const pwdError = validatePassword(password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({ name, email, password });

      if (res.data && 'error' in res.data) {
        const msg =
          res?.data?.error ||
          res?.data?.message ||
          'Falha no registro';
        setError(msg);
        setLoading(false);
        return;
      }

      if (typeof login === 'function') {
        try {
          await login(email, password);
        } catch (err) {
          console.warn('Auto-login falhou:', err);
          navigate('/login');
          return;
        }
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } catch (err) {
      const error = err as {
        response?: { data?: { error?: string; message?: string } };
        message?: string;
      };
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Erro no registro';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark text-light">
      <Container className="d-flex justify-content-center">
        <Card
          className="p-4 shadow-lg border-0"
          style={{
            maxWidth: '400px',
            width: '100%',
            backgroundColor: '#1f1f1f',
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4 text-info fw-semibold">
              Criar Conta
            </h2>

            {error && (
              <Alert variant="danger" className="py-2 text-center">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Control
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-secondary text-light border-0"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary text-light border-0"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Senha (mínimo 8 caracteres)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                  className="bg-secondary text-light border-0"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="info"
                disabled={loading}
                className="w-100 fw-semibold text-dark"
              >
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Criando...
                  </>
                ) : (
                  'Criar Conta'
                )}
              </Button>
            </Form>

            <div className="text-center mt-4">
              <p className="text-secondary mb-1">
                Já tem uma conta?
              </p>
              <Button
                variant="link"
                className="text-decoration-none text-info p-0 fw-semibold"
                onClick={() => navigate('/login')}
              >
                Fazer Login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
