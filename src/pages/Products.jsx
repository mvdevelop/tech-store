
import React, { useEffect, useState } from 'react';
import { Spinner, Card, Container, Row, Col, Alert } from 'react-bootstrap';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setProducts([]);
      } finally {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchData();

    // Se após 10s não receber dados, mostra mensagem
    timeoutId = setTimeout(() => {
      setLoading(false);
      setTimeoutReached(true);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 text-primary fw-semibold">Nossos Produtos</h2>

      {/* 🔹 Carregando */}
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status" variant="secondary" />
        </div>
      )}

      {/* 🔹 Lista de produtos */}
      {!loading && products.length > 0 && (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map((item, index) => {
            const hasImage = typeof item.image === 'string' && item.image.trim() !== '';
            const imageUrl = hasImage
              ? item.image.startsWith('http')
                ? item.image
                : `http://localhost:3000${
                    item.image.startsWith('/uploads')
                      ? item.image
                      : `/uploads/${item.image}`
                  }`
              : null;

            return (
              <Col key={item._id || index}>
                <Card className="h-100 shadow-sm border-0">
                  {imageUrl ? (
                    <Card.Img
                      variant="top"
                      src={imageUrl}
                      alt={item.name || 'Product image'}
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
                      <p className="text-muted mb-0">📷 Sem imagem</p>
                    </div>
                  )}

                  <Card.Body className="text-center">
                    <Card.Title className="fw-semibold">{item.name || 'Produto sem nome'}</Card.Title>
                    <Card.Text className="text-secondary mb-0">
                      💲 {item.value || 'N/A'}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* 🔹 Timeout ou sem produtos */}
      {!loading && products.length === 0 && (
        <div className="text-center my-5">
          {timeoutReached ? (
            <Alert variant="warning" className="d-inline-block">
              Nenhum produto encontrado 😕
            </Alert>
          ) : (
            <Alert variant="secondary" className="d-inline-block">
              Carregando produtos...
            </Alert>
          )}
        </div>
      )}
    </Container>
  );
}
