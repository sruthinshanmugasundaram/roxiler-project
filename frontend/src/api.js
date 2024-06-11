import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchTransactions = async (params) => {
  try {
    const response = await axiosInstance.get('/transactions', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const fetchStatistics = async (month) => {
  try {
    const response = await axiosInstance.get('/statistics', { params: { month } });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

export const fetchBarChartData = async (month) => {
  try {
    const response = await axiosInstance.get('/bar-chart', { params: { month } });
    return response.data;
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    throw error;
  }
};

export const fetchPieChartData = async (month) => {
  try {
    const response = await axiosInstance.get('/pie-chart', { params: { month } });
    return response.data;
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    throw error;
  }
};


axiosInstance.interceptors.request.use(
    (config) => {
      console.log('Request made with ', config);
      return config;
    },
    (error) => {
      console.log('Error making request', error);
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('Response received', response);
      return response;
    },
    (error) => {
      console.log('Error in response', error);
      return Promise.reject(error);
    }
  );
  

  