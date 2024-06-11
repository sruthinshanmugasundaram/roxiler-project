import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../api'; 

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStatistics(selectedMonth);
        setStatistics(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div className="statistics-container">
      <h2 className="statistics-title">Statistics</h2>
      {statistics ? (
        <div className="statistics-content">
          <p>Total Sales: {statistics.totalSales}</p>
          <p>Total Sold Items: {statistics.soldItems}</p>
          <p>Total Unsold Items: {statistics.unsoldItems}</p>
        </div>
      ) : (
        <p className="loading-text">Loading statistics...</p>
      )}

      <style jsx>{`
        .statistics-container {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin-bottom: 20px;
        }

        .statistics-title {
          color: #333;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .statistics-content p {
          color: #555;
          font-size: 16px;
          margin-bottom: 5px;
        }

        .loading-text {
          color: #555;
          font-size: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Statistics;
