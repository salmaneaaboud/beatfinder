import { Container, Row, Col, Button } from "react-bootstrap";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import Card from "/src/components/Card/Card";
import ProducerSidebar from "/src/components/ProducerSidebar/ProducerSidebar";
import Chart from "/src/components/Chart/Chart";
import { useEffect, useState, useContext } from "react";
import AuthContext from "/src/contexts/AuthContext";
import { BASE_URL } from "./../../../config";

function ProducerDashboard() {
    const { user } = useContext(AuthContext);
    const [beatsData, setBeatsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const beatsPerPage = 4;

    const [monthlySales, setMonthlySales] = useState({
        totalSales: '0.00',
        totalOrders: 0
    });
    const [monthlyListeners, setMonthlyListeners] = useState(0);

    useEffect(() => {
        const fetchBeats = async () => {
            if (user && user.role === 'producer') {
                const response = await fetch(BASE_URL + '/beats/my', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setBeatsData(data);
            }
        };

        const fetchMonthlySales = async () => {
            if (user && user.role === 'producer') {
                const producerId = user.id;
                const response = await fetch(BASE_URL + `/producer/${producerId}/month-sales`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setMonthlySales({
                    totalSales: data.total_sales,
                    totalOrders: data.total_orders
                });
            }
        };

        const fetchMonthlyListeners = async () => {
            if (user && user.role === 'producer') {
                const producerId = user.id;
                const response = await fetch(BASE_URL + `/producer/${producerId}/monthly-listeners`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setMonthlyListeners(data.monthly_listeners);
            }
        };

        fetchBeats();
        fetchMonthlySales();
        fetchMonthlyListeners();
    }, [user]);

    const indexOfLastBeat = currentPage * beatsPerPage;
    const indexOfFirstBeat = indexOfLastBeat - beatsPerPage;
    const currentBeats = beatsData.slice(indexOfFirstBeat, indexOfLastBeat);

    const totalPages = Math.ceil(beatsData.length / beatsPerPage);

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
                                <span className="mt-2" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#343a40' }}>{monthlyListeners}</span>
                                <p className="mt-2 mb-0" style={{ fontSize: '1.2rem', color: '#6c757d' }}>Oyentes Mensuales</p>
                            </div>
                            <div className="custom-card d-flex flex-column justify-content-center align-items-center p-4 bg-success text-white shadow-sm rounded">
                                <span className="mt-2" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{monthlySales.totalSales}€</span>
                                <p className="mt-2 mb-0" style={{ fontSize: '1.2rem' }}>Ingresados ultimo mes</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="py-5">
                        <Col>
                            <div className="trending-beats">
                                <h4 className="section-title">Mis Beats</h4>
                                <div className="row d-flex flex-wrap justify-content-between g-3">
                                    {user && user.role === 'producer' && currentBeats.map((beat, index) => (
                                        <Col key={index} xs={12} sm={12} md={6} lg={6} xl={6} className="card-col">
                                            <Card
                                                title={beat.title}
                                                subtitle={beat.subtitle}
                                                imageURL={beat.cover}
                                                detailsURL={"/beat-detail/" + beat.id}
                                            />
                                            {console.log(beat)}
                                            
                                        </Col>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <Button variant="dark" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Anterior</Button>
                                    <span className="mx-3" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{currentPage} / {totalPages}</span>
                                    <Button variant="dark" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</Button>
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
