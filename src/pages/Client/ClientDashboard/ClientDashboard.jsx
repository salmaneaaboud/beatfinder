import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import trendingProducers from "/src/assets/resources/trendingProducers/trending.json";

import "./ClientDashboard.css";

export function ClientDashboard() {
  return (
    <>
      <LoggedHeader />
      <Container className="dashboard-container">
        <Row>
          <Col md={12} lg={10} xl={8}>
            {/* Contenido principal podría ir aquí */}
          </Col>

          <Col md={12} lg={2} xl={4}>
            <h4 className="section-title">Popular y Trending</h4>
            <div className="trending-producers-list">
              {trendingProducers?.length > 0 ? (
                trendingProducers.map(
                  ({ id, title, producer, image }, index) => (
                    <div className="producer-item" key={id}>
                      <img
                        src={image}
                        alt={`${producer}`}
                        className="producer-img"
                      />
                      <div className="producer-text">
                        <h5 className="producer-title">{title}</h5>
                        <p className="producer-subtitle">{producer}</p>
                      </div>
                      <div className="producer-arrow">
                        <span>&#x2794;</span>
                      </div>
                    </div>
                  )
                )
              ) : (
                <p>No hay productores en tendencia.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
