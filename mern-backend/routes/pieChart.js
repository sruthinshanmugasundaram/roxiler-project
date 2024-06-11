const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const { formatDateRegex } = require('../utils');

router.get('/', async (req, res) => {
  const { month } = req.query;

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $regex: formatDateRegex(month) }
    });

    const categoryCounts = {};

    transactions.forEach(transaction => {
      if (categoryCounts[transaction.category]) {
        categoryCounts[transaction.category]++;
      } else {
        categoryCounts[transaction.category] = 1;
      }
    });

    res.json(categoryCounts);
  } catch (error) {
    res.status(500).send('Error fetching pie chart data');
  }
});

module.exports = router;
