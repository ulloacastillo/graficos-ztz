import React from 'react';
import { useSelector } from 'react-redux';

export const ColumnSelector = () => {
  const columnNames = useSelector(state => state.chartHeaders);

  return (
    <select>
      {columnNames.map((name, index) => (
        <option key={index} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
