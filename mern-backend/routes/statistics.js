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

    const totalSales = transactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const soldItems = transactions.filter(transaction => transaction.sold).length;
    const unsoldItems = transactions.length - soldItems;

    res.json({ totalSales, soldItems, unsoldItems });
  } catch (error) {
    res.status(500).send('Error fetching statistics');
  }
});

module.exports = router;
