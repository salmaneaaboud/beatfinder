import { Container, Row, Col } from "react-bootstrap";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import Card from "/src/components/Card/Card";
import beatsData from "/src/assets/resources/beatsData/beatsData.json";
import ProducerSidebar from "/src/components/ProducerSidebar/ProducerSidebar";
import React from 'react';
import Chart from "/src/components/Chart/Chart";

function ProducerDashboard() {
    return (
        <div style={{ display: "flex" }}>
            <ProducerSidebar />
            <div style={{ flex: 1 }}>
                <LoggedHeader />
                <Container>
                    <Row>
                        <Col md={12} lg={8} xl={8}>
                            <Chart />
                        </Col>
                    </Row>
                    <Row className="py-5">
                        <Col>
                            <div className="trending-beats">
                                <h4 className="section-title">Mis Beats</h4>
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
                    </Row>
                </Container>

            </div>
        </div>
    );
};

export default ProducerDashboard;