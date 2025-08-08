// Simple API service for portfolio data
const API_BASE_URL = 'http://localhost:8080/api';

// Simple fetch function with error handling
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

// API functions
export const portfolioService = {
  // Get portfolio summary
  getSummary: () => fetchData('/portfolio/summary'),
  
  // Get portfolio holdings
  getHoldings: () => fetchData('/portfolio/holdings'),
  
  // Get portfolio allocation
  getAllocation: () => fetchData('/portfolio/allocation'),
  
  // Get performance data
  getPerformance: () => fetchData('/portfolio/performance')
};