import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <AlertCircle size={48} className="error-icon" />
        <h2>Unable to Load Portfolio Data</h2>
        <p className="error-message">{message}</p>
        <button className="retry-button" onClick={onRetry}>
          <RefreshCw size={20} />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;