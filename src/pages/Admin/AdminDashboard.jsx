import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMusic, FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { FaArrowTrendUp } from "react-icons/fa6";
import Chart from '/src/components/Chart/Chart';
import AdminChart from '/src/components/AdminChart/AdminChart';
import './AdminDashboard.css';
import { LoggedHeader } from '/src/components/LoggedHeader/LoggedHeader';
import { useNavigate } from 'react-router-dom';
import Loader from '/src/components/Loader/Loader';
import { BASE_URL } from "./../../config";
import TrafficByBrowser from '../../components/TrafficByBrowser/TrafficByBrowser';
import TrafficByLocation from '../../components/TrafficByLocation/TrafficByLocation';

function AdminDashboard() {
    const navigate = useNavigate();

    // Estado para almacenar las estadísticas
    const [stats, setStats] = useState({
        totalBeats: 0,
        totalUsers: 0,
        totalSales: '225',
        totalRevenue: '31.762€',
    });

    // Estado para manejar el estado de carga
    const [loading, setLoading] = useState(true);

    // Efecto para obtener las estadísticas de la API
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                // Cambiar la URL de la API por la correcta
                const response = await fetch(BASE_URL + '/admin/stats', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setStats({
                        totalBeats: data.beats_count,
                        totalUsers: data.users_count,
                        totalSales: '225',
                        totalRevenue: '31.762€',
                    });
                } else {
                    console.error('Error al obtener las estadísticas');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);  // Cuando termine la carga, cambiar el estado a falso
            }
        };

        fetchStats();
    }, []);

    const statsData = [
        { title: 'Ventas totales', value: stats.totalSales, percentage: '+40% vs últimos 7 días', icon: <FaChartLine size={30} />, percentageIcon: <FaArrowTrendUp size={20} /> },
        { title: 'Ingresos totales', value: stats.totalRevenue, percentage: '+16% vs últimos 7 días', icon: <FaDollarSign size={30} />, percentageIcon: <FaArrowTrendUp size={20} /> },
        { title: 'Usuarios totales', value: stats.totalUsers, percentage: '+3% vs últimos 7 días', icon: <FaUsers size={30} />, percentageIcon: <FaArrowTrendUp size={20} /> },
    ];

    return (
        <div className="d-flex w-100">
            <div className="flex-grow-1">
                <LoggedHeader />
                <div className="container p-4">
                    <h1 className="text-white mb-4">Admin Dashboard</h1>
                    {loading ? (<Loader title="Cargando estadísticas..." />) : (
                        <div className="row">
                            <main className="col-12">
                                <div className="row g-4 mb-4">
                                    <div className="col-md-4">
                                        <div className="card text-white bg-warning h-100">
                                            <div className="card-body d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="card-title">{stats.totalBeats} Beats</h5>
                                                    <button onClick={() => navigate('/beat-management')} className="btn btn-light">Ver todos</button>
                                                </div>
                                                <FaMusic size={40} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card text-white bg-primary h-100">
                                            <div className="card-body d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="card-title">{stats.totalUsers} Usuarios</h5>
                                                    <button onClick={() => navigate('/user-management')} className="btn btn-light">Ver todos</button>
                                                </div>
                                                <FaUsers size={40} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-4 mb-4">
                                    <div className='col-12 col-lg-6'>
                                        <AdminChart />
                                    </div>
                                </div>

                                <div className="container-fluid mb-4">
                                    <div className="row row-cols-1 row-cols-md-3 g-4">
                                        {statsData.map((stat, index) => (
                                            <div className="col d-flex" key={index}>
                                                <div className="stats-card bg-white w-100">
                                                    <div className="card-body text-dark d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h5 className="card-title mb-2">{stat.title}</h5>
                                                            <p className="card-text mb-2">{stat.value}</p>
                                                            <p className="fw-bold mb-0" style={{ color: "rgba(120, 52, 255, 0.5)" }}>
                                                                {stat.percentage} {stat.percentageIcon}
                                                            </p>
                                                        </div>
                                                        {stat.icon}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="row g-4 mb-4">
                                    <div className="col-md-6">
                                        <TrafficByBrowser />
                                    </div>
                                    <div className="col-md-6">
                                        <TrafficByLocation />
                                    </div>
                                </div>
                            </main>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
