// src/pages/Home.tsx
import products from '../data/products';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import type { Product } from '../types';

export default function Home() {
  return (
    <div className="bg-dark text-light py-5">
      <Container>
        <h2 className="text-center mb-5 text-info fw-bold">
          🕹️ Produtos Gamer
        </h2>

        <Row className="g-4">
          {products.map((product: Product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="h-100 bg-secondary border-0 shadow-sm text-light"
                style={{ transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'translateY(-5px)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'translateY(0)')
                }
              >
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-semibold mb-1">
                    {product.name}
                  </Card.Title>
                  <Card.Subtitle className="text-info small mb-2">
                    {product.category}
                  </Card.Subtitle>
                  <Card.Text className="text-light-50 small flex-grow-1">
                    {product.description}
                  </Card.Text>

                  <div className="text-center mt-auto">
                    <div className="mb-2">
                      <span className="text-muted text-decoration-line-through me-2 small">
                        R$ {product.oldPrice.toFixed(2)}
                      </span>
                      <span className="text-success fw-bold fs-5">
                        R$ {product.newPrice.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      variant="info"
                      className="w-100 fw-semibold text-dark"
                    >
                      Adicionar ao carrinho 🛒
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
