import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { Carrousel } from "/src/components/Carrousel/Carrousel";
import { CardList } from "/src/components/CardList/CardList";
import Card from "/src/components/Card/Card";
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import beatsData from "/src/assets/resources/beatsData/beatsData.json";
import "./ClientDashboard.css";

function ClientDashboard() {
  return (
    <>
      <LoggedHeader />
      <Container className="dashboard-container">
        <Row>
          <Col md={12} lg={8} xl={8}>
            <h2 className="welcome-text">¡Bienvenido, <span>Cliente</span>!</h2>
            <Carrousel />

            <div className="buttons-container container d-flex gap-3 my-4">
              <CustomButton type="primary"  value="Para ti"/>
              <CustomButton type="btn-light-grey"  value="Para ti"/>
              <CustomButton type="btn-light-grey"  value="Siguiendo"/>
            </div>

            <div className="trending-beats">
              <h4 className="section-title">Trending Beats</h4>
              <div className="d-flex flex-wrap justify-content-between">
                {beatsData.map((beat, index) => (
                  <Card
                    key={index}
                    title={beat.title}
                    subtitle={beat.subtitle}
                    imageURL={beat.imageURL}
                    detailsURL={beat.detailsURL}
                    className="custom-card"
                  />
                ))}
              </div>
            </div>
          </Col>

          <Col md={12} lg={4} xl={4}>
            <h4 className="section-title">Popular y Trending</h4>
            <CardList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClientDashboard;
