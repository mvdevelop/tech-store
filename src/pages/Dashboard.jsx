
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Container, Card } from "react-bootstrap";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark text-light">
      <Container className="d-flex justify-content-center">
        <Card
          className="text-center p-4 shadow-lg border-0"
          style={{
            maxWidth: "420px",
            width: "100%",
            backgroundColor: "#1f1f1f",
          }}
        >
          <Card.Body>
            <h1 className="mb-4 fs-3 fw-semibold text-info">
              Bem-vindo{user?.name ? `, ${user.name}` : ""} 👋
            </h1>

            <Button
              variant="outline-info"
              onClick={logout}
              className="px-4 fw-semibold text-light"
            >
              Sair
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
