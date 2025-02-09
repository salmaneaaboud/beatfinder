import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from '/src/config'; // Asegúrate de importar BASE_URL correctamente

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  // Obtener el id del productor desde localStorage
  const userId = JSON.parse(localStorage.getItem('user')).id;

  // Obtener el token de localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${BASE_URL}/producer/${userId}/sales`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Agregar el token al encabezado
        'Content-Type': 'application/json', // Asegurarse de que se envíen datos en formato JSON
      }
    })
      .then(response => response.json())
      .then(data => {
        const labels = data.map(item => item.month);
        const ingresos = data.map(item => parseFloat(item.total_sales));

        // Calcular el valor máximo de las ventas
        const maxSales = Math.max(...ingresos);

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

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: maxSales + 300,  // Añadir un margen adicional al valor máximo
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

        // Actualizar las opciones del gráfico
        setChartData(prevData => ({
          ...prevData,
          options
        }));
      })
      .catch(error => console.error('Error al obtener datos:', error));
  }, [userId, token]);

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

export default Chart;
