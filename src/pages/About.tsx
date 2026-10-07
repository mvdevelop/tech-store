// src/pages/About.tsx
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  ProgressBar,
  Button,
} from 'react-bootstrap';
import logo from '../assets/img/icon.png';

// 📋 Tipos
interface MissionItem {
  title: string;
  text: string;
}

interface Skill {
  label: string;
  now: number;
}

interface TeamMember {
  name: string;
  role: string;
  img: string;
}

interface Testimonial {
  name: string;
  text: string;
}

export default function About() {
  const missionItems: MissionItem[] = [
    {
      title: '🎯 Nossa Missão',
      text: 'Tornar a tecnologia acessível, empolgante e funcional. Queremos ajudar cada cliente a encontrar a solução perfeita para suas necessidades — com atendimento humanizado e preços justos.',
    },
    {
      title: '🚀 Nossa Visão',
      text: 'Ser reconhecida como a principal referência em produtos tecnológicos e experiência de compra online, elevando os padrões de qualidade e inovação no Brasil.',
    },
    {
      title: '💡 Nossos Valores',
      text: 'Transparência, inovação, responsabilidade e paixão pela tecnologia. Cada produto, cada atendimento e cada detalhe refletem nosso compromisso com a excelência.',
    },
  ];

  const skills: Skill[] = [
    { label: 'Montagem de PCs Gamer', now: 95 },
    { label: 'Suporte e Manutenção Técnica', now: 90 },
    { label: 'Periféricos e Acessórios Premium', now: 88 },
    { label: 'Consultoria de Hardware', now: 85 },
    { label: 'Atendimento Personalizado', now: 97 },
  ];

  const teamMembers: TeamMember[] = [
    { name: 'Marcos Dilly', role: 'Fundador & CEO', img: 'https://via.placeholder.com/150' },
    { name: 'Ana Souza', role: 'Gerente de Operações', img: 'https://via.placeholder.com/150' },
    { name: 'Carlos Lima', role: 'Desenvolvedor Full Stack', img: 'https://via.placeholder.com/150' },
    { name: 'Julia Mendes', role: 'Designer UX/UI', img: 'https://via.placeholder.com/150' },
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Lucas Pereira',
      text: 'Comprei meu PC Gamer na Tech Store e foi a melhor decisão! Atendimento rápido e montagem impecável. Recomendo muito!',
    },
    {
      name: 'Fernanda Costa',
      text: 'Fiquei impressionada com o suporte técnico. Resolveram meu problema em minutos e com muita paciência!',
    },
    {
      name: 'João Silva',
      text: 'Produtos originais, entrega rápida e preços justos. É minha loja favorita para qualquer acessório tecnológico.',
    },
  ];

  return (
    <div className="min-vh-100 bg-dark text-light py-5">
      <Container>
        {/* Introdução */}
        <Row className="justify-content-center mb-5">
          <Col md={10} className="text-center">
            <Image
              src={logo}
              alt="Tech Store Logo"
              width={90}
              height={90}
              rounded
              className="mb-4"
            />
            <h1 className="fw-bold text-primary mb-3">Sobre a Tech Store</h1>
            <p className="text-secondary fs-5">
              A <strong>Tech Store</strong> nasceu da paixão por tecnologia
              e do desejo de transformar o acesso a produtos de ponta. Desde
              o início, buscamos unir inovação, desempenho e estilo para
              oferecer aos nossos clientes uma experiência única — seja para
              o gamer competitivo, o programador exigente ou o amante de
              gadgets.
            </p>
          </Col>
        </Row>

        {/* História */}
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <Card
              className="border-0 shadow-lg p-4"
              style={{ backgroundColor: '#1e1e1e' }}
            >
              <Card.Body>
                <h3 className="text-info fw-semibold mb-3">
                  📜 Nossa História
                </h3>
                <p className="text-light small mb-3">
                  Fundada em 2020, a Tech Store começou em uma pequena sala de
                  coworking em São Paulo. A visão era clara: oferecer
                  tecnologia de alta performance sem complicações. Em poucos
                  meses, conquistamos o público gamer com periféricos de ponta
                  e atendimento diferenciado.
                </p>
                <p className="text-light small mb-0">
                  Hoje, com milhares de clientes satisfeitos e parcerias com
                  marcas líderes como ASUS, Logitech e AMD, a Tech Store é
                  referência em qualidade, confiança e inovação no mercado de
                  tecnologia. 💻
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Missão, Visão e Valores */}
        <Row className="g-4 mb-5">
          {missionItems.map((item, index) => (
            <Col md={4} key={index}>
              <Card
                className="h-100 border-0 shadow-lg"
                style={{ backgroundColor: '#1e1e1e' }}
              >
                <Card.Body>
                  <Card.Title className="text-info fw-semibold mb-3">
                    {item.title}
                  </Card.Title>
                  <Card.Text className="text-light small">
                    {item.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Nossas Tecnologias */}
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <h3 className="fw-semibold text-primary text-center mb-4">
              🔧 Nossas Especialidades
            </h3>
            <Card
              className="border-0 shadow-lg p-4"
              style={{ backgroundColor: '#1e1e1e' }}
            >
              <Row className="gy-4">
                {skills.map((skill, index) => (
                  <Col md={6} key={index}>
                    <div className="mb-3">
                      <span className="small fw-semibold">
                        {skill.label}
                      </span>
                      <ProgressBar
                        now={skill.now}
                        label={`${skill.now}%`}
                        variant="info"
                        animated
                        className="mt-1"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Equipe */}
        <Row className="justify-content-center mb-5">
          <Col md={10} className="text-center mb-4">
            <h3 className="fw-semibold text-primary">
              👥 Nossa Equipe
            </h3>
            <p className="text-secondary small">
              Um time apaixonado por tecnologia, inovação e atendimento de
              excelência.
            </p>
          </Col>

          {teamMembers.map((member, index) => (
            <Col
              md={3}
              sm={6}
              xs={12}
              key={index}
              className="mb-4"
            >
              <Card
                className="border-0 shadow-lg h-100 text-center"
                style={{ backgroundColor: '#1e1e1e' }}
              >
                <Card.Body>
                  <Image
                    src={member.img}
                    roundedCircle
                    width={100}
                    height={100}
                    className="mb-3 border border-secondary"
                  />
                  <h6 className="fw-semibold">{member.name}</h6>
                  <p className="text-muted small">{member.role}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Depoimentos */}
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <h3 className="fw-semibold text-primary text-center mb-4">
              ⭐ Avaliações de Clientes
            </h3>
            <Row className="g-4">
              {testimonials.map((review, index) => (
                <Col md={4} key={index}>
                  <Card
                    className="h-100 border-0 shadow-lg"
                    style={{ backgroundColor: '#1e1e1e' }}
                  >
                    <Card.Body>
                      <Card.Text className="text-light small mb-3">
                        "{review.text}"
                      </Card.Text>
                      <Card.Title className="text-info small">
                        — {review.name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Rodapé */}
        <Row>
          <Col className="text-center">
            <p className="text-muted small mb-2">
              © {new Date().getFullYear()} Tech Store — Tecnologia que move o futuro.
            </p>
            <Button variant="outline-info" size="sm">
              Entre em Contato
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
