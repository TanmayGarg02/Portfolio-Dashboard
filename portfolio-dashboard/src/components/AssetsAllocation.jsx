import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AssetAllocation = ({ allocation }) => {
  if (!allocation) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Colors for different categories
  const sectorColors = {
    Technology: '#3b82f6',
    Banking: '#10b981',
    Energy: '#f59e0b',
    Healthcare: '#ef4444',
    Automotive: '#8b5cf6',
    FMCG: '#06b6d4'
  };

  const marketCapColors = {
    Large: '#059669',
    Mid: '#0ea5e9',
    Small: '#dc2626'
  };

  // Transform data for charts
  const sectorData = Object.entries(allocation.bySector).map(([sector, data]) => ({
    name: sector,
    value: data.value,
    percentage: data.percentage
  }));

  const marketCapData = Object.entries(allocation.byMarketCap).map(([cap, data]) => ({
    name: cap,
    value: data.value,
    percentage: data.percentage
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p className="tooltip-value">{formatCurrency(data.value)}</p>
          <p className="tooltip-percentage">{data.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="chart-legend">
        {payload.map((entry, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="legend-text">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="asset-allocation">
      <h2>Asset Allocation</h2>
      
      <div className="allocation-charts">
        <div className="chart-container">
          <h3>By Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {sectorData.map((entry, index) => (
                  <Cell 
                    key={`sector-${index}`} 
                    fill={sectorColors[entry.name] || '#6b7280'} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="allocation-details">
            {sectorData.map((item, index) => (
              <div key={index} className="allocation-item">
                <div className="allocation-info">
                  <span 
                    className="allocation-color"
                    style={{ backgroundColor: sectorColors[item.name] || '#6b7280' }}
                  ></span>
                  <span className="allocation-name">{item.name}</span>
                </div>
                <div className="allocation-values">
                  <span className="allocation-value">{formatCurrency(item.value)}</span>
                  <span className="allocation-percent">{item.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3>By Market Cap</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={marketCapData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {marketCapData.map((entry, index) => (
                  <Cell 
                    key={`marketcap-${index}`} 
                    fill={marketCapColors[entry.name] || '#6b7280'} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="allocation-details">
            {marketCapData.map((item, index) => (
              <div key={index} className="allocation-item">
                <div className="allocation-info">
                  <span 
                    className="allocation-color"
                    style={{ backgroundColor: marketCapColors[item.name] || '#6b7280' }}
                  ></span>
                  <span className="allocation-name">{item.name} Cap</span>
                </div>
                <div className="allocation-values">
                  <span className="allocation-value">{formatCurrency(item.value)}</span>
                  <span className="allocation-percent">{item.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;

