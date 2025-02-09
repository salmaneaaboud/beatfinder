import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/ventas')
      .then(response => response.json())
      .then(data => {
        const labels = data.meses;
        const ingresos = data.ingresos;

        setChartData({
          labels,
          datasets: [
            {
              label: 'Ingresos mensuales (€)',
              backgroundColor: 'rgba(120, 52, 255, 0.5)',
              borderColor: 'rgb(120, 52, 255)',
              borderWidth: 1,
              data: ingresos,
            }
          ]
        });
      })
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}€`
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

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
        {chartData ? <Bar data={chartData} options={options} /> : <p>Cargando datos...</p>}
      </div>
    </div>
  );
};

export default Chart;
