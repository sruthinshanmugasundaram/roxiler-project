import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../api';

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadTransactions = async () => {
      const { data } = await fetchTransactions({ month: selectedMonth, page, search });
      setTransactions(data);
    };
    loadTransactions();
  }, [selectedMonth, page, search]);

  return (
    <div className="transactions-container">
      <input 
        type="text" 
        className="search-input"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="prev-btn" onClick={() => setPage(page => page - 1)} disabled={page === 1}>Previous</button>
        <button className="next-btn" onClick={() => setPage(page => page + 1)}>Next</button>
      </div>

      <style jsx>{`
        .transactions-container {
          margin-bottom: 20px;
        }

        .search-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .transactions-table {
          width: 100%;
          border-collapse: collapse;
        }

        .transactions-table th, .transactions-table td {
          padding: 8px;
          border-bottom: 1px solid #ddd;
        }

        .transactions-table th {
          text-align: left;
          font-weight: bold;
        }

        .pagination {
          margin-top: 20px;
          text-align: center;
        }

        .prev-btn, .next-btn {
          padding: 10px 20px;
          margin: 0 5px;
          border: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
        }

        .prev-btn:disabled, .next-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default TransactionsTable;
