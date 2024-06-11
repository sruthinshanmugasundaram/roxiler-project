const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const { month } = req.query;

  try {
    const [transactionsResponse, statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
      axios.get('http://localhost:3000/transactions', { params: { month } }),
      axios.get('http://localhost:3000/statistics', { params: { month } }),
      axios.get('http://localhost:3000/bar-chart', { params: { month } }),
      axios.get('http://localhost:3000/pie-chart', { params: { month } })
    ]);

    res.json({
      transactions: transactionsResponse.data,
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data
    });
  } catch (error) {
    res.status(500).send('Error fetching combined data');
  }
});

module.exports = router;
