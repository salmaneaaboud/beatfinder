import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { Carrousel } from "/src/components/Carrousel/Carrousel";
import { CardList } from "/src/components/CardList/CardList";
import "./ClientDashboard.css";

export function ClientDashboard() {
  return (
    <>
      <LoggedHeader />
      <Container className="dashboard-container">
        <Row>
          <Col md={12} lg={8} xl={8}>
            <Carrousel />
          </Col>

          <Col md={12} lg={4} xl={4}>
            <h4 className="section-title">Popular y Trending</h4>
            <CardList />
          </Col>
        </Row>
      </Container>
    </>
  );
}
