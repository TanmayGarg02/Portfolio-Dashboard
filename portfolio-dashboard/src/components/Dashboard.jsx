import React, { useEffect, useState } from 'react';
import {
  fetchAllocation,
  fetchHoldings,
  fetchPerformance,
  fetchSummary,
} from '../services/api';

import OverviewCards from './OverviewCard';
import HoldingsTable from './HoldingsTable';
import AllocationCharts from './AllocationCharts';
import PerformanceChart from './PerformanceChart';
import SummarySection from './TopPerformers';

export default function Dashboard() {
  const [holdings, setHoldings] = useState([]);
  const [allocation, setAllocation] = useState({});
  const [performance, setPerformance] = useState({});
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchHoldings(),
      fetchAllocation(),
      fetchPerformance(),
      fetchSummary(),
    ]).then(([h, a, p, s]) => {
      setHoldings(h.data);
      setAllocation(a.data);
      setPerformance(p.data);
      setSummary(s.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <OverviewCards summary={summary} holdingsCount={holdings.length} />
      <AllocationCharts allocation={allocation} />
      <HoldingsTable holdings={holdings} />
      <PerformanceChart performance={performance} />
      <SummarySection summary={summary} />
    </div>
  );
}

