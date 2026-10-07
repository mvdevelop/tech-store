// src/pages/Blog.tsx
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { blogPosts } from '../data/blog';
import type { BlogPost } from '../types';

export default function Blog() {
  return (
    <div className="min-vh-100 bg-dark text-light py-5">
      <Container>
        <h2 className="text-center mb-5 fw-semibold text-primary">
          📰 Tech Store Blog
        </h2>

        <Row className="g-4">
          {blogPosts.map((post: BlogPost) => (
            <Col key={post.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="h-100 shadow-lg border-0 text-light"
                style={{ backgroundColor: '#1e1e1e' }}
              >
                <Card.Img
                  variant="top"
                  src={post.image}
                  alt={post.name}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).style.display = 'none')
                  }
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="fw-semibold text-info mb-2">
                      {post.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted small">
                      {post.category}
                    </Card.Subtitle>
                    <Card.Text className="text-light small">
                      {post.description}
                    </Card.Text>
                  </div>
                  <Button
                    variant="primary"
                    className="mt-3 fw-semibold"
                    style={{ backgroundColor: '#0d6efd' }}
                  >
                    Ler mais
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
