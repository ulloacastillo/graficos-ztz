import React from 'react';
import { MONTHS } from '@/app/constants';
import * as XLSX from 'xlsx';
import { useChartSettings } from '@/app/store/store';

const DataTable = ({ data }) => {
  const filterType = useChartSettings((state) => state.filterType);

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        [getHeader()]: formatDate(item[0]),
        Reclamos: item[1],
      })),
    );

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const fileName = `Reclamos filtrados por ${
      filterType === 'Mes' ? 'Mes' : 'Año'
    }.xlsx`;

    XLSX.writeFile(wb, fileName);
  };

  const getHeader = () => {
    if (filterType === 'Mes') {
      return 'Mes';
    } else if (filterType === 'Año') {
      return 'Año';
    }
    return 'Fecha';
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg inline-block">
      <table className="w-2/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-1">{getHeader()}</th>
            <th className="px-6 py-1">Reclamos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-1">{formatDate(item[0])}</td>
              <td className="px-6 py-1">{item[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleExportExcel}>Exportar a Excel</button>
    </div>
  );
};

const formatDate = (dateString) => {
  if (dateString.length === 2) {
    return MONTHS[dateString];
  }
  return dateString;
};

export default DataTable;
