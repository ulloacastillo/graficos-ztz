import { useEffect } from 'react';

function DonutChart({ total, notAnswered }) {
  useEffect(() => {
    console.log('aca');
  }, []);
  return (
    <div>
      <h2>{total}</h2>
      <h3>{notAnswered}</h3>
    </div>
  );
}

export default DonutChart;
