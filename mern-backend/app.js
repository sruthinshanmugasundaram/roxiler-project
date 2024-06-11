const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');
const statisticsRoutes = require('./routes/statistics');
const barChartRoutes = require('./routes/barChart');
const pieChartRoutes = require('./routes/pieChart');
const combinedRoutes = require('./routes/combined');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/transactions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.get('/initialize', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(response.data);
    res.send('Database initialized with seed data');
  } catch (error) {
    res.status(500).send('Error initializing database');
  }
});

app.use('/transactions', transactionRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/bar-chart', barChartRoutes);
app.use('/pie-chart', pieChartRoutes);
app.use('/combined', combinedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
