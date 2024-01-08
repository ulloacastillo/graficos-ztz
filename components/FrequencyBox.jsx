import React from 'react';
import { useSelector } from 'react-redux';

const FrequencyBox = () => {
  const data = useSelector((state) => state.chartData);

  const calculateFrequencies = (data) => {
    const frequencies = {};
    data.forEach((record) => {
      const year = record[0];
      const value = record[1];
      if (frequencies[year]) {
        frequencies[year].count++;
        frequencies[year].total += value;
      } else {
        frequencies[year] = { count: 1, total: value };
      }
    });
    return frequencies;
  };

  const frequencies = calculateFrequencies(data);

  return (
    <div className="FrequencyBox-container">
      <h3 className='text-center font-bold'> Frecuencia de reclamos </h3>
      {Object.entries(frequencies).map(([year, { count, total }]) => (
        <p key={year}>{`Año ${year} : ${total} Frecuencia de reclamos año: ${count}`}</p>
      ))}
    </div>
  );
};

export default FrequencyBox;
