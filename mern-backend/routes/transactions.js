const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const { filterByMonthAndSearch } = require('../utils');

router.get('/', async (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;

  try {
    const transactions = await Transaction.find(filterByMonthAndSearch(month, search))
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
      
    res.json(transactions);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
});

module.exports = router;
