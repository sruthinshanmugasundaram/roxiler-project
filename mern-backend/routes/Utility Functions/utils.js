const formatDateRegex = (month) => new RegExp(`^\\d{4}-${String(month).padStart(2, '0')}-\\d{2}T`);

const filterByMonthAndSearch = (month, search) => {
  const dateRegex = formatDateRegex(month);
  const searchRegex = new RegExp(search, 'i');
  return {
    dateOfSale: { $regex: dateRegex },
    $or: [
      { title: searchRegex },
      { description: searchRegex },
      { price: parseFloat(search) || 0 }
    ]
  };
};

module.exports = { formatDateRegex, filterByMonthAndSearch };
