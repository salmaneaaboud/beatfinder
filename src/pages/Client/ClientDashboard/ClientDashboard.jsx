import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { Carrousel } from "/src/components/Carrousel/Carrousel";
import { CardList } from "/src/components/CardList/CardList";
import Card from "/src/components/Card/Card";
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import beatsData from "/src/assets/resources/beatsData/beatsData.json";
import "./ClientDashboard.css";
import { useAuth } from '/src/hooks/useAuth';
import { useTranslation } from 'react-i18next';

function ClientDashboard() {
  const { t } = useTranslation();
  const auth = useAuth();
  const [toggled, setToggled] = useState(false);

  const toggleSidebar = () => {
    setToggled(!toggled);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar toggled={toggled} toggleSidebar={toggleSidebar} />

      <div className={`content ${toggled ? "content-shifted" : ""}`} style={{ flex: 1 }}>
        <LoggedHeader />
        <Container className="dashboard-container">
          <Row>
            <Col md={12} lg={8} xl={8}>
              <h2 className="welcome-text">
                {t("clientDashboard.welcome")}, <span>{auth.user?.name || t("clientDashboard.defaultUser")}</span>!
              </h2>
              <Carrousel />
              <div className="buttons-container container d-flex gap-3 my-4">
                <CustomButton type="primary" value={t("clientDashboard.forYou")} />
                <CustomButton type="btn-light-grey" value={t("clientDashboard.shuffle")} />
                <CustomButton type="btn-light-grey" value={t("clientDashboard.following")} />
              </div>
              <div className="trending-beats">
                <h4 className="section-title">{t("clientDashboard.trendingBeats")}</h4>
                <div className="row d-flex flex-wrap justify-content-between g-3">
                  {beatsData.map((beat, index) => (
                    <Col key={index} xs={12} sm={12} md={6} lg={6} xl={6} className="card-col">
                      <Card
                        title={beat.title}
                        subtitle={beat.subtitle}
                        imageURL={beat.imageURL}
                        detailsURL={beat.detailsURL}
                        className="custom-card"
                      />
                    </Col>
                  ))}
                </div>
              </div>
            </Col>

            <Col md={12} lg={4} xl={4}>
              <h4 className="section-title">{t("clientDashboard.popularAndTrending")}</h4>
              <CardList />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ClientDashboard;
