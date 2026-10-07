// src/pages/Contact.tsx
import React, { useRef, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  Spinner,
} from 'react-bootstrap';

// 🔧 Tipos
interface EmailJsResponse {
  status: number;
  text: string;
}

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  // 🔐 Credenciais carregadas de variáveis de ambiente (nunca hardcoded)
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação: verifica se credenciais estão configuradas
    if (!serviceId || !templateId || !publicKey) {
      setError(
        'Configurações do EmailJS não encontradas. ' +
        'Verifique as variáveis de ambiente.'
      );
      return;
    }

    setLoading(true);
    setSent(false);
    setError('');

    // 🔄 Dinâmico import para EmailJS — carregado sob demanda
    import('emailjs-com')
      .then((emailjs) => {
        emailjs.sendForm<EmailJsResponse>(
          serviceId,
          templateId,
          form.current as HTMLFormElement,
          publicKey,
        );
      })
      .then(() => {
        setSent(true);
        setLoading(false);
        form.current?.reset();
      })
      .catch((err: unknown) => {
        setError('Erro ao enviar a mensagem. Tente novamente mais tarde.');
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="min-vh-100 bg-dark text-light d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card
              className="shadow-lg border-0 p-4"
              style={{ backgroundColor: '#1e1e1e' }}
            >
              <Card.Body>
                <h2 className="text-center mb-4 text-primary fw-semibold">
                  Contato
                </h2>
                <p className="text-center text-secondary small mb-4">
                  Envie uma mensagem e entraremos em contato com você o mais
                  rápido possível.
                </p>

                {sent && (
                  <Alert variant="success" className="py-2 text-center">
                    Mensagem enviada com sucesso! ✅
                  </Alert>
                )}
                {error && (
                  <Alert variant="danger" className="py-2 text-center">
                    {error}
                  </Alert>
                )}

                <Form ref={form} onSubmit={sendEmail}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Control
                      type="text"
                      placeholder="Seu nome"
                      name="user_name"
                      required
                      className="bg-secondary text-light border-0"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                      type="email"
                      placeholder="Seu e-mail"
                      name="user_email"
                      required
                      className="bg-secondary text-light border-0"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="message">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Sua mensagem"
                      name="message"
                      required
                      className="bg-secondary text-light border-0"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="w-100 fw-semibold"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensagem'
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
