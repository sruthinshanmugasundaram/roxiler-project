import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChartData } from '../api';

const BarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBarChartData(selectedMonth);
        const formattedData = {
          labels: Object.keys(data),
          datasets: [{
            label: 'Transactions',
            data: Object.values(data),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }]
        };
        setBarChartData(formattedData);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div className="bar-chart-container">
      <h2 className="chart-title">Bar Chart</h2>
      <div className="chart-wrapper">
        {barChartData ? (
          <Bar data={barChartData} />
        ) : (
          <p>Loading bar chart...</p>
        )}
      </div>

      <style jsx>{`
        .bar-chart-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .chart-title {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .chart-wrapper {
          height: 400px; /* Adjust height as needed */
        }
      `}</style>
    </div>
  );
};

export default BarChart;
