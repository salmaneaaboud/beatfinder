import { Container, Row, Col } from "react-bootstrap";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import Card from "/src/components/Card/Card";
import beatsData from "/src/assets/resources/beatsData/beatsData.json";
import ProducerSidebar from "/src/components/ProducerSidebar/ProducerSidebar";
import Chart from "/src/components/Chart/Chart";

function ProducerDashboard() {
    return (
        <div style={{ display: "flex" }}>
            <ProducerSidebar />
            <div style={{ flex: 1 }}>
                <LoggedHeader />
                <Container>
                    <Row className="g-4 h-fit">
                        <Col xs={12} md={8} className="d-flex align-items-stretch">
                            <Chart />
                        </Col>
                        <Col xs={12} md={4} className="d-flex flex-column justify-content-around">
                            <div className="custom-card d-flex flex-column justify-content-center align-items-center p-4 bg-light shadow-sm rounded">
                                <i className="fa fa-users fa-3x" aria-hidden="true" style={{ color: 'black' }}></i>
                                <span className="mt-2" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#343a40' }}>1500</span>
                                <p className="mt-2 mb-0" style={{ fontSize: '1.2rem', color: '#6c757d' }}>Oyentes Mensuales</p>
                            </div>
                            <div className="custom-card d-flex flex-column justify-content-center align-items-center p-4 bg-success text-white shadow-sm rounded">
                                <i className="fa fa-euro-sign fa-3x" aria-hidden="true" style={{ color: '#fff' }}></i>
                                <span className="mt-2" style={{ fontSize: '2rem', fontWeight: 'bold' }}>200</span> 
                                <p className="mt-2 mb-0" style={{ fontSize: '1.2rem' }}>Ingresados este mes</p>
                            </div>
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