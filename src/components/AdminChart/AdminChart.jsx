import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from '/src/config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminChart = () => {
  const [chartData, setChartData] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${BASE_URL}/monthly-sales`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        const labels = data.map(item => item.month);
        const sales = data.map(item => parseFloat(item.total_sales));

        const maxSales = Math.max(...sales);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Ventas mensuales (€)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
              data: sales,
            }
          ]
        });

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: maxSales + 300,
              ticks: {
                callback: (value) => `${value}€`,
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
            }
          }
        };

        setChartData(prevData => ({
          ...prevData,
          options
        }));
      })
      .catch(error => console.error('Error al obtener datos:', error));
  }, [token]);

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '20px',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ color: '#000', marginBottom: '20px' }}>Ventas mensuales (€)</h3>
      <div style={{ flex: 1, minHeight: '300px', width: '100%' }}>
        {chartData ? <Bar data={chartData} options={chartData.options} /> : <p>Cargando datos...</p>}
      </div>
    </div>
  );
};

export default AdminChart;
