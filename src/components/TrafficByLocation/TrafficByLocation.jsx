import React, { useEffect, useState } from "react";
import api from '/src/services/api';
import './TrafficByLocation.css';

const TrafficByLocation = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        api.get('/traffic-by-location')
            .then(response => {
                if (response.data.success) {
                    setLocations(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos de tráfico por ubicación:', error);
            });
    }, []);

    return (
        <div className="d-flex flex-column justify-content-start align-items-center w-100 h-100"
            style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '10px'
            }}>
            <h2 className="text-black" style={{ marginBottom: '10px' }}>Tráfico por localización</h2>

            <div className="table-responsive w-100" style={{
                maxHeight: 'calc(100% - 60px)', // Resta el espacio del título
                overflowY: 'auto',
                scrollbarWidth: 'thin' // Para Firefox
            }}>
                <table className="table table-hover">
                    <thead style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#fff',
                        zIndex: 1
                    }}>
                        <tr>
                            <th>País</th>
                            <th>Visitas</th>
                            <th>Porcentaje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map((location, index) => {
                            const percent = ((location.value / locations.reduce((acc, loc) => acc + loc.value, 0)) * 100).toFixed(1);
                            return (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={location.countryFlag}
                                            alt={location.country}
                                            style={{ width: '20px', marginRight: '8px' }}
                                        />
                                        {location.country}
                                    </td>
                                    <td>{location.value}</td>
                                    <td>{percent}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrafficByLocation;
