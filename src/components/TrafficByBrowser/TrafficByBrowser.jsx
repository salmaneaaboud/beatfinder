import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import api from '/src/services/api';

const TrafficByBrowser = () => {
  const [browsers, setBrowsers] = useState([]);

  useEffect(() => {
    api.get('/traffic-by-browser')
      .then(response => {
        if (response.data.success) {
          setBrowsers(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching traffic by browser data:', error);
      });
  }, []);

  const total = browsers.reduce((acc, browser) => acc + browser.value, 0);
  const series = browsers.map(browser => browser.value);
  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: browsers.map(browser => browser.browser),
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const seriesValue = opts.w.config.series[opts.seriesIndex];
        const percent = (
          (seriesValue / total) * 100
        ).toFixed(1);
        return `${seriesValue.toFixed(0)} (${percent}%)`;
      },
    },
  };

  return (
    <div className="d-flex flex-column justify-content-start align-items-center w-100 h-100" 
         style={{ 
             padding: '20px', 
             backgroundColor: '#fff', 
             borderRadius: '10px'
         }}>
      <h2 className="text-black" style={{ marginBottom: '10px' }}>Tráfico por navegador</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
      />
    </div>
  );
};

export default TrafficByBrowser;
