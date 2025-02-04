import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [data] = useState({
    labels: ['Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Ingresos mensuales (€)',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(120, 52, 255, 0.5)',
        borderColor: 'rgb(120, 52, 255)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(71, 225, 167, 0.5)',
        pointHoverBorderColor: 'rgb(71, 225, 167)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [5000, 6000, 4500, 7000, 5500, 4000, 5000],
      },
    ],
  });

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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;