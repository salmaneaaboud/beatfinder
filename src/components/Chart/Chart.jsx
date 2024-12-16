import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "bootstrap/dist/css/bootstrap.min.css";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [data, setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
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
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      var oldDataSet = data.datasets[0];
      var newData = [];

      for (var x = 0; x < data.labels.length; x++) {
        newData.push(Math.floor(Math.random() * 100));
      }

      var newDataSet = {
        ...oldDataSet,
      };

      newDataSet.data = newData;

      var newState = {
        ...data,
        datasets: [newDataSet],
      };

      setData(newState);
    }, 5000);

    return () => clearInterval(interval); 
  }, [data]);

  return (
    <CDBContainer style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px' }}> 
      <h3 style={{ color: '#000' }}>Estadísticas</h3> 
      <Bar data={data} options={{ responsive: true }} />
    </CDBContainer>
  );
};

export default Chart;