import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchPieChartData } from '../api'; 

const PieChart = ({ selectedMonth }) => {
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPieChartData(selectedMonth);
        setPieChartData(data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div className="pie-chart-container">
      <h2 className="chart-title">Pie Chart</h2>
      <div className="chart-wrapper">
        {pieChartData ? (
          <Pie data={pieChartData} />
        ) : (
          <p>Loading pie chart...</p>
        )}
      </div>

      <style jsx>{`
        .pie-chart-container {
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin-bottom: 20px;
        }

        .chart-title {
          color: #333;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .chart-wrapper {
          height: 400px; /* Adjust height as needed */
        }

        .chart-wrapper p {
          color: #555;
          font-size: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default PieChart;
