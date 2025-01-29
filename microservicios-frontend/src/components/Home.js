import React from 'react';
import { FaCogs, FaCloud, FaUsers, FaLayerGroup, FaCode } from 'react-icons/fa';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Home.css'; // Asegúrate de tener este archivo para los estilos personalizados

const Home = () => {
  return (
    <div className="home-container">
      {/* Sección de información */}
      <Container id="informacion" className="my-5">
        <h2 className="text-center mb-4">¿Qué son los Microservicios?</h2>
        <Row>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <FaCogs className="icon" />
                <Card.Title>Arquitectura Modular</Card.Title>
                <Card.Text>
                  Los microservicios dividen una aplicación en componentes independientes, lo que facilita su desarrollo y mantenimiento.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <FaCloud className="icon" />
                <Card.Title>Escalabilidad</Card.Title>
                <Card.Text>
                  Cada microservicio puede escalar de forma independiente, mejorando la eficiencia y la disponibilidad de la aplicación.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <FaUsers className="icon" />
                <Card.Title>Independencia</Card.Title>
                <Card.Text>
                  Los microservicios funcionan de forma autónoma, lo que permite equipos de desarrollo independientes y más ágiles.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6}>
            <Card className="shadow-lg">
              <Card.Body>
                <FaLayerGroup className="icon" />
                <Card.Title>Desarrollo Ágil</Card.Title>
                <Card.Text>
                  Permiten un ciclo de desarrollo rápido, con integración continua y despliegues frecuentes sin afectar a otros servicios.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg">
              <Card.Body>
                <FaCode className="icon" />
                <Card.Title>Integración Sencilla</Card.Title>
                <Card.Text>
                  Los microservicios se comunican entre sí a través de APIs bien definidas, lo que facilita la integración con otros sistemas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="text-center mt-5">
        <h2>Ventajas de los Microservicios</h2>
        <Row>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title>Escalabilidad Independiente</Card.Title>
                <Card.Text>
                  Cada servicio puede escalar por separado según la demanda, lo que optimiza los recursos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title>Resiliencia</Card.Title>
                <Card.Text>
                  Si un servicio falla, no afecta al resto de la aplicación, mejorando la disponibilidad general.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title>Desarrollo Rápido</Card.Title>
                <Card.Text>
                  Los equipos pueden trabajar en servicios independientes, lo que acelera el desarrollo de nuevas funcionalidades.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
