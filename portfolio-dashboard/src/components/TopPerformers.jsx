import { TrendingUp, TrendingDown, Shield, Target } from 'lucide-react';

const TopPerformers = ({ summary, holdings }) => {
  if (!summary || !holdings) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Find the actual holdings data for top and worst performers
  const topPerformer = holdings.find(h => h.symbol === summary.topPerformer.symbol);
  const worstPerformer = holdings.find(h => h.symbol === summary.worstPerformer.symbol);

  // Find top 3 and worst 3 performers from holdings
  const sortedHoldings = [...holdings].sort((a, b) => b.gainLossPercent - a.gainLossPercent);
  const topPerformers = sortedHoldings.slice(0, 3);
  const worstPerformers = sortedHoldings.slice(-3).reverse();

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return '#10b981';
      case 'moderate': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="top-performers">
      <h2>Portfolio Insights</h2>
      
      <div className="insights-grid">
        {/* Key Metrics */}
        <div className="insight-card metrics-card">
          <div className="card-header">
            <Target size={24} />
            <h3>Key Metrics</h3>
          </div>
          <div className="metrics-content">
            <div className="metric-item">
              <span className="metric-label">Diversification Score</span>
              <div className="metric-value">
                <span className="score">{summary.diversificationScore}</span>
                <span className="score-max">/10</span>
                <div className="score-bar">
                  <div 
                    className="score-fill"
                    style={{ width: `${(summary.diversificationScore / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="metric-item">
              <span className="metric-label">Risk Level</span>
              <span 
                className="risk-badge"
                style={{ backgroundColor: getRiskLevelColor(summary.riskLevel) }}
              >
                {summary.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Top Performer */}
        <div className="insight-card performer-card top-performer">
          <div className="card-header">
            <TrendingUp size={24} />
            <h3>Best Performer</h3>
          </div>
          {topPerformer && (
            <div className="performer-content">
              <div className="performer-main">
                <div className="performer-symbol">{topPerformer.symbol}</div>
                <div className="performer-name">{topPerformer.name}</div>
              </div>
              <div className="performer-metrics">
                <div className="performer-return">
                  +{topPerformer.gainLossPercent.toFixed(2)}%
                </div>
                <div className="performer-gain">
                  {formatCurrency(topPerformer.gainLoss)}
                </div>
                <div className="performer-value">
                  Value: {formatCurrency(topPerformer.value)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Worst Performer */}
        <div className="insight-card performer-card worst-performer">
          <div className="card-header">
            <TrendingDown size={24} />
            <h3>Worst Performer</h3>
          </div>
          {worstPerformer && (
            <div className="performer-content">
              <div className="performer-main">
                <div className="performer-symbol">{worstPerformer.symbol}</div>
                <div className="performer-name">{worstPerformer.name}</div>
              </div>
              <div className="performer-metrics">
                <div className="performer-return negative">
                  {worstPerformer.gainLossPercent.toFixed(2)}%
                </div>
                <div className="performer-gain negative">
                  {formatCurrency(worstPerformer.gainLoss)}
                </div>
                <div className="performer-value">
                  Value: {formatCurrency(worstPerformer.value)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top 3 and Worst 3 Performers */}
      <div className="performers-lists">
        <div className="performers-section">
          <h3 className="section-title">
            <TrendingUp size={20} />
            Top 3 Performers
          </h3>
          <div className="performers-list">
            {topPerformers.map((holding, index) => (
              <div key={holding.symbol} className="performer-item positive">
                <div className="performer-rank">#{index + 1}</div>
                <div className="performer-info">
                  <div className="performer-symbol-small">{holding.symbol}</div>
                  <div className="performer-name-small">{holding.name}</div>
                </div>
                <div className="performer-stats">
                  <div className="performer-return-small positive">
                    +{holding.gainLossPercent.toFixed(2)}%
                  </div>
                  <div className="performer-gain-small">
                    {formatCurrency(holding.gainLoss)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="performers-section">
          <h3 className="section-title">
            <TrendingDown size={20} />
            Worst 3 Performers
          </h3>
          <div className="performers-list">
            {worstPerformers.map((holding, index) => (
              <div key={holding.symbol} className="performer-item negative">
                <div className="performer-rank">#{index + 1}</div>
                <div className="performer-info">
                  <div className="performer-symbol-small">{holding.symbol}</div>
                  <div className="performer-name-small">{holding.name}</div>
                </div>
                <div className="performer-stats">
                  <div className="performer-return-small negative">
                    {holding.gainLossPercent.toFixed(2)}%
                  </div>
                  <div className="performer-gain-small negative">
                    {formatCurrency(holding.gainLoss)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;