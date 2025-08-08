import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <Loader2 size={48} className="loading-spinner" />
        <h2>Loading Portfolio Data</h2>
        <p>Please wait while we fetch your investment information...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;