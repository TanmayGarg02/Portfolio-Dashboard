import { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const HoldingsTable = ({ holdings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  // Filter holdings based on search term
  const filteredHoldings = useMemo(() => {
    return holdings.filter(holding => 
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.sector.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [holdings, searchTerm]);

  // Sort holdings based on current sort configuration
  const sortedHoldings = useMemo(() => {
    if (!sortConfig.key) return filteredHoldings;

    return [...filteredHoldings].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aString = aValue.toString().toLowerCase();
      const bString = bValue.toString().toLowerCase();
      
      if (sortConfig.direction === 'asc') {
        return aString.localeCompare(bString);
      } else {
        return bString.localeCompare(aString);
      }
    });
  }, [filteredHoldings, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={16} className="sort-icon" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp size={16} className="sort-icon active" />
      : <ArrowDown size={16} className="sort-icon active" />;
  };

  const columns = [
    { key: 'symbol', label: 'Symbol', sortable: true },
    { key: 'name', label: 'Company Name', sortable: true },
    { key: 'quantity', label: 'Qty', sortable: true },
    { key: 'avgPrice', label: 'Avg Price', sortable: true },
    { key: 'currentPrice', label: 'Current Price', sortable: true },
    { key: 'value', label: 'Market Value', sortable: true },
    { key: 'gainLoss', label: 'Gain/Loss', sortable: true },
    { key: 'gainLossPercent', label: 'Return %', sortable: true },
    { key: 'sector', label: 'Sector', sortable: true },
    { key: 'marketCap', label: 'Market Cap', sortable: true }
  ];

  if (!holdings || holdings.length === 0) {
    return (
      <div className="holdings-table">
        <h2>Portfolio Holdings</h2>
        <div className="no-data">No holdings data available</div>
      </div>
    );
  }

  return (
    <div className="holdings-table">
      <div className="table-header">
        <h2>Portfolio Holdings ({holdings.length} stocks)</h2>
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by symbol, company, or sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="holdings-data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className={column.sortable ? 'sortable' : ''}
                  onClick={column.sortable ? () => handleSort(column.key) : undefined}
                >
                  <div className="header-content">
                    <span>{column.label}</span>
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((holding, index) => (
              <tr key={holding.symbol} className="holding-row">
                <td className="symbol-cell">
                  <strong>{holding.symbol}</strong>
                </td>
                <td className="name-cell" title={holding.name}>
                  {holding.name}
                </td>
                <td className="quantity-cell">
                  {holding.quantity.toLocaleString()}
                </td>
                <td className="price-cell">
                  {formatCurrency(holding.avgPrice)}
                </td>
                <td className="price-cell">
                  {formatCurrency(holding.currentPrice)}
                </td>
                <td className="value-cell">
                  <strong>{formatCurrency(holding.value)}</strong>
                </td>
                <td className={`gain-loss-cell ${holding.gainLoss >= 0 ? 'positive' : 'negative'}`}>
                  {formatCurrency(holding.gainLoss)}
                </td>
                <td className={`percentage-cell ${holding.gainLossPercent >= 0 ? 'positive' : 'negative'}`}>
                  <strong>{formatPercentage(holding.gainLossPercent)}</strong>
                </td>
                <td className="sector-cell">
                  <span className={`sector-badge sector-${holding.sector.toLowerCase()}`}>
                    {holding.sector}
                  </span>
                </td>
                <td className="marketcap-cell">
                  <span className={`marketcap-badge marketcap-${holding.marketCap.toLowerCase()}`}>
                    {holding.marketCap}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredHoldings.length === 0 && searchTerm && (
        <div className="no-results">
          No holdings found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;