import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMusic, FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { FaArrowTrendUp } from "react-icons/fa6";
import Chart from '/src/components/Chart/Chart';
import './AdminDashboard.css';
import { LoggedHeader } from '/src/components/LoggedHeader/LoggedHeader';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();

    const statsData = [
        { title: 'Ventas totales', value: '225', percentage: '+40% vs últimos 7 días', icon: <FaChartLine size={30} />, percentageIcon: <FaArrowTrendUp size={20} /> },
        { title: 'Ingresos totales', value: '31.762€', percentage: '+16% vs últimos 7 días', icon: <FaDollarSign size={30} />, percentageIcon: <FaArrowTrendUp size={20} /> },
        { title: 'Usuarios totales', value: '230.469', percentage: '+3% vs últimos 7 días', icon: <FaUsers size={30} />, percentageIcon: <FaArrowTrendUp size={20} /> },
    ];

    return (
        <>
            <LoggedHeader />
            <div className="container-fluid">
                <div className="row">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <h1 className="mt-3 text-white">Admin Dashboard</h1>
                        <div className="row mt-4">
                            <div className="col-md-4">
                                <div className="card text-white bg-warning mb-3">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="card-title">6 Beats</h5>
                                            <button onClick={() => navigate('/')} className="btn btn-light">Ver todos</button>
                                        </div>
                                        <FaMusic size={40} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-white bg-primary mb-3">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="card-title">6 Usuarios</h5>
                                            <button onClick={() => navigate('/user-management')} className="btn btn-light">Ver todos</button>
                                        </div>
                                        <FaUsers size={40} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            {statsData.map((stat, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="stats-card text-white bg-white mb-3">
                                        <div className="card-body text-dark d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="card-title">{stat.title}</h5>
                                                <p className="card-text">{stat.value}</p>
                                                <p className="fw-bold" style={{ color: "rgba(120, 52, 255, 0.5)" }}>
                                                    {stat.percentage} {stat.percentageIcon}
                                                </p>
                                            </div>
                                            {stat.icon}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <Chart />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;