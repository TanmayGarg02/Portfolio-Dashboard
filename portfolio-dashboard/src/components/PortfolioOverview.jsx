import { TrendingUp, TrendingDown, Wallet, BarChart3 } from 'lucide-react';

const PortfolioOverview = ({ summary, holdings }) => {
  if (!summary) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (percentage) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const cards = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(summary.totalValue),
      icon: Wallet,
      className: 'value-card'
    },
    {
      title: 'Total Gain/Loss',
      value: formatCurrency(summary.totalGainLoss),
      icon: summary.totalGainLoss >= 0 ? TrendingUp : TrendingDown,
      className: summary.totalGainLoss >= 0 ? 'gain-card' : 'loss-card',
      percentage: formatPercentage(summary.totalGainLossPercent)
    },
    {
      title: 'Portfolio Performance',
      value: formatPercentage(summary.totalGainLossPercent),
      icon: summary.totalGainLossPercent >= 0 ? TrendingUp : TrendingDown,
      className: summary.totalGainLossPercent >= 0 ? 'gain-card' : 'loss-card',
      subtitle: `vs Initial Investment`
    },
    {
      title: 'Number of Holdings',
      value: holdings.length,
      icon: BarChart3,
      className: 'holdings-card',
      subtitle: `Active Investments`
    }
  ];

  return (
    <div className="portfolio-overview">
      <div className="overview-grid">
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className={`overview-card ${card.className}`}>
              <div className="card-header">
                <div className="card-icon">
                  <IconComponent size={24} />
                </div>
                <h3 className="card-title">{card.title}</h3>
              </div>
              
              <div className="card-content">
                <div className="card-value">{card.value}</div>
                {card.percentage && (
                  <div className="card-percentage">{card.percentage}</div>
                )}
                {card.subtitle && (
                  <div className="card-subtitle">{card.subtitle}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="portfolio-insights">
        <div className="insight-item">
          <span className="insight-label">Diversification Score:</span>
          <span className="insight-value">{summary.diversificationScore}/10</span>
        </div>
        <div className="insight-item">
          <span className="insight-label">Risk Level:</span>
          <span className={`insight-value risk-${summary.riskLevel.toLowerCase()}`}>
            {summary.riskLevel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;