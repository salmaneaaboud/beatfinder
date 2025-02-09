import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "/src/components/Sidebar/Sidebar";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { Carrousel } from "/src/components/Carrousel/Carrousel";
import { CardList } from "/src/components/CardList/CardList";
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import "./ClientDashboard.css";
import AuthContext from "/src/contexts/AuthContext";
import { BASE_URL } from "/src/config";
import Card from "/src/components/Card/Card";

function ClientDashboard() {
  const { user } = useContext(AuthContext);
  const [trendingBeats, setTrendingBeats] = useState([]);
  const [popularProducers, setPopularProducers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/beats/trending`)
      .then((res) => res.json())
      .then((data) => setTrendingBeats(data))
      .catch((err) => console.error(err));

    fetch(`${BASE_URL}/producer/popular`)
      .then((res) => res.json())
      .then((data) => setPopularProducers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <LoggedHeader />
        <Container className="dashboard-container">
          <Row>
            <Col md={12} lg={8} xl={8}>
              <h2 className="welcome-text">
                ¡Bienvenido, <span>{user?.name || "Usuario"}</span>!
              </h2>
              <Carrousel />
              <div className="trending-beats">
                <h4 className="section-title">Trending Beats</h4>
                <div className="row d-flex flex-wrap justify-content-between g-3">
                  {trendingBeats.map((beat, index) => (
                    <Col key={index} xs={12} sm={12} md={6} lg={6} xl={6} className="card-col">
                      <Card
                        title={beat.title}
                        subtitle={beat.user.name}
                        imageURL={beat.cover}
                        detailsURL={`/beat-detail/${beat.id}`}
                        className="custom-card"
                      />
                    </Col>
                  ))}
                </div>
              </div>
            </Col>
            <Col md={12} lg={4} xl={4}>
              <h4 className="section-title">Popular y Trending</h4>
              <CardList trendingProducers={popularProducers} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ClientDashboard;
