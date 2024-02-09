import React from 'react';
import { MONTHS } from '@/app/constants';
import * as XLSX from 'xlsx';
import { useChartSettings } from '@/app/store/store';

const DataTable = ({ data }) => {
  const filterType = useChartSettings((state) => state.filterType);
  const selectedYear = useChartSettings((state) => state.selectedYear);

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        [getHeader()]: formatDate(item[0]),
        Reclamos: item[1],
      })),
    );

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName;
    if (filterType === 'Mes') {
      fileName =
        selectedYear !== 'Todos'
          ? `Reclamos de meses del Año ${selectedYear}.xlsx`
          : 'Reclamos de meses de todos los años.xlsx';
    } else if (filterType === 'Año') {
      fileName = 'Reclamos filtrados por Año.xlsx';
    }

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
    <div>
      <div className="mt-4 px-8">
        <button
          className="cursor-pointer transition-all bg-ztz-mainblue text-white px-6 py-2 rounded-lg
border-ztz-indigoblue
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          onClick={handleExportExcel}
        >
          Generar Excel
        </button>
      </div>
      <div className="py-6">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-3">{getHeader()}</th>
              <th className="px-6 py-3">Reclamos</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b dark:border-neutral-500  hover:bg-ztz-mainblue hover:text-white"
              >
                <td className="whitespace-nowrap px-6 py-3 font-medium">
                  {formatDate(item[0])}
                </td>
                <td className="whitespace-nowrap px-6 py-3">{item[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
