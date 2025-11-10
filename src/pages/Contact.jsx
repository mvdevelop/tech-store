
import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import emailjs from "emailjs-com";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    setError("");

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", // ← substitua pelo seu Service ID
        "YOUR_TEMPLATE_ID", // ← substitua pelo seu Template ID
        form.current,
        "YOUR_PUBLIC_KEY" // ← substitua pelo seu Public Key
      )
      .then(
        () => {
          setSent(true);
          setLoading(false);
          form.current.reset();
        },
        (err) => {
          setError("Erro ao enviar a mensagem. Tente novamente mais tarde.");
          console.error(err);
          setLoading(false);
        }
      );
  };

  return (
    <div className="min-vh-100 bg-dark text-light d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card
              className="shadow-lg border-0 p-4"
              style={{ backgroundColor: "#1e1e1e" }}
            >
              <Card.Body>
                <h2 className="text-center text-primary fw-semibold mb-4">
                  Contato
                </h2>
                <p className="text-center text-secondary small mb-4">
                  Envie uma mensagem e entraremos em contato com você o mais rápido possível.
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
                        <Spinner animation="border" size="sm" className="me-2" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Mensagem"
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
