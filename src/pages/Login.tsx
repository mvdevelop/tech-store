// src/pages/Login.tsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { AuthContextType } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';

export default function Login() {
  const { login } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    } finally {
      setIsSubmitting(false);
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
              Login
            </h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary text-light border-0"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary text-light border-0"
                  required
                  minLength={8} // 🔒 NIST recomenda mínimo 8 caracteres
                />
              </Form.Group>

              {error && (
                <Alert variant="danger" className="py-2 text-center">
                  {error}
                </Alert>
              )}

              <Button
                variant="info"
                type="submit"
                disabled={isSubmitting}
                className="w-100 fw-semibold text-dark"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </Form>

            {/* 🔹 Link para registro */}
            <div className="text-center mt-4">
              <p className="text-secondary mb-1">
                Não tem uma conta?
              </p>
              <Link
                to="/register"
                className="text-info text-decoration-none fw-semibold"
              >
                Criar Conta
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
