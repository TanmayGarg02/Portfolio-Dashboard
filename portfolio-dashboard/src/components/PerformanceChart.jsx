import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceChart = ({ performance }) => {
  if (!performance) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Transform timeline data for the chart
  const chartData = performance.timeline.map(point => ({
    date: formatDate(point.date),
    fullDate: point.date,
    Portfolio: point.portfolio,
    'Nifty 50': point.nifty50,
    Gold: point.gold
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="performance-tooltip">
          <p className="tooltip-label">{new Date(data.fullDate).toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              <span className="tooltip-name">{entry.name}:</span>
              <span className="tooltip-value">
                {entry.name === 'Portfolio' 
                  ? formatCurrency(entry.value)
                  : entry.value.toLocaleString()
                }
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const returns = performance.returns;

  return (
    <div className="performance-chart">
      <h2>Performance Comparison</h2>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => {
                if (value >= 100000) {
                  return `${(value / 100000).toFixed(0)}L`;
                }
                return value.toLocaleString();
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Portfolio" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="Nifty 50" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="Gold" 
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="returns-summary">
        <h3>Returns Comparison</h3>
        <div className="returns-grid">
          <div className="returns-section">
            <h4>Portfolio</h4>
            <div className="returns-items">
              <div className="return-item">
                <span className="return-period">1 Month:</span>
                <span className={`return-value ${returns.portfolio['1month'] >= 0 ? 'positive' : 'negative'}`}>
                  {returns.portfolio['1month'] >= 0 ? '+' : ''}{returns.portfolio['1month']}%
                </span>
              </div>
              <div className="return-item">
                <span className="return-period">3 Months:</span>
                <span className={`return-value ${returns.portfolio['3months'] >= 0 ? 'positive' : 'negative'}`}>
                  {returns.portfolio['3months'] >= 0 ? '+' : ''}{returns.portfolio['3months']}%
                </span>
              </div>
              <div className="return-item">
                <span className="return-period">1 Year:</span>
                <span className={`return-value ${returns.portfolio['1year'] >= 0 ? 'positive' : 'negative'}`}>
                  {returns.portfolio['1year'] >= 0 ? '+' : ''}{returns.portfolio['1year']}%
                </span>
              </div>
            </div>
          </div>

          <div className="returns-section">
            <h4>Nifty 50</h4>
            <div className="returns-items">
              <div className="return-item">
                <span className="return-period">1 Month:</span>
                <span className={`return-value ${returns.nifty50['1month'] >= 0 ? 'positive' : 'negative'}`}>
                  {returns.nifty50['1month'] >= 0 ? '+' : ''}{returns.nifty50['1month']}%
                </span>
              </div>
              <div className="return-item">
                <span className="return-period">3 Months:</span>
                <span className={`return-value ${returns.nifty50['3months'] >= 0 ? 'positive' : 'negative'}`}>
                  {returns.nifty50['3months'] >= 0 ? '+' : ''}{returns.nifty50['3months']}%
                </span>
              </div>
              <div className="return-item">
                <span className="return-period">1 Year:</span>
                <span className={`return-value ${returns.nifty50['1year'] >= 0 ? 'positive' : 'negative'}`}>
                  {returns.nifty50['1year'] >= 0 ? '+' : ''}{returns.nifty50['1year']}%
                </span>
              </div>
            </div>
          </div>

          <div className="returns-section">
            <h4>Gold</h4>
            <div className="returns-items">
              <div className="return-item">
                <span className="return-period">1 Month:</span>
                <span className={`return-value ${returns.gold['1month'] >= 0 ? 'positive' : 'negative'}`}>
                  {returns.gold['1month'] >= 0 ? '+' : ''}{returns.gold['1month']}%
                </span>
              </div>
              <div className="return-item">
                <span className="return-period">3 Months:</span>
                <span className={`return-value ${returns.gold['3months'] >= 0 ? 'positive' : 'negative'}`}>
                  {returns.gold['3months'] >= 0 ? '+' : ''}{returns.gold['3months']}%
                </span>
              </div>
              <div className="return-item">
                <span className="return-period">1 Year:</span>
                <span className={`return-value ${returns.gold['1year'] >= 0 ? 'positive' : 'negative'}`}>
                  {returns.gold['1year'] >= 0 ? '+' : ''}{returns.gold['1year']}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;