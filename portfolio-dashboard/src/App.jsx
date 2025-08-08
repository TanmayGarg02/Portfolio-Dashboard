import { useState, useEffect } from 'react';
import './App.css';
import PortfolioOverview from './components/PortfolioOverview';
import AssetAllocation from './components/AssetsAllocation';
import HoldingsTable from './components/HoldingsTable';
import PerformanceChart from './components/PerformanceChart';
import TopPerformers from './components/TopPerformers';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { portfolioService } from './services/api';

function App() {
  const [portfolioData, setPortfolioData] = useState({
    summary: null,
    holdings: [],
    allocation: null,
    performance: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [summary, holdings, allocation, performance] = await Promise.all([
        portfolioService.getSummary(),
        portfolioService.getHoldings(),
        portfolioService.getAllocation(),
        portfolioService.getPerformance()
      ]);

      setPortfolioData({
        summary,
        holdings,
        allocation,
        performance
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch portfolio data');
      console.error('Error fetching portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchPortfolioData} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Portfolio Dashboard</h1>
        <button className="refresh-btn" onClick={fetchPortfolioData}>
          Refresh Data
        </button>
      </header>

      <main className="main-content">
        <PortfolioOverview 
          summary={portfolioData.summary}
          holdings={portfolioData.holdings}
        />
        
        <div className="dashboard-grid">
          <div className="chart-section">
            <AssetAllocation allocation={portfolioData.allocation} />
          </div>
          
          <div className="performance-section">
            <PerformanceChart performance={portfolioData.performance} />
          </div>
        </div>

        <HoldingsTable holdings={portfolioData.holdings} />
        
        <TopPerformers 
          summary={portfolioData.summary}
          holdings={portfolioData.holdings}
        />
      </main>
    </div>
  );
}

export default App;