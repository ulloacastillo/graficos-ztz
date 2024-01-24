import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Chart from './Chart';
import { takeScreenshot } from '@/app/utils/screenShot';
import * as XLSX from 'xlsx';

const Layout = () => {
  const [title, setTitle] = useState('Escriba el Título del gráfico');
  const filteredData = useSelector((state) => state.chartData);

  const captureScreenShot = () => {
    takeScreenshot('takeScreenshotChart', 'Grafico', 'image/png');
  };

  const generateExcel = () => {
    if (filteredData && filteredData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(filteredData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Datos');
      XLSX.writeFile(wb, 'datos.xlsx');
    } else {
      console.log('No hay datos para generar el archivo Excel.');
    }
  };
  console.log(filteredData);
  return (
    <div className="w-full h-screen bg-back bg-no-repeat bg-cover flex items-center ">
      <Sidebar />
      <div className="flex-1 p-4 text-black">
        <div className="inline-flex rounded-md shadow-sm py-px" role="group">
          <button
            onClick={captureScreenShot}
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <svg
              className="w-3 h-3 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            Captura de Gráfico
          </button>
          <button
            onClick={generateExcel}
            disabled={!filteredData || filteredData.length === 0}
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <svg
              className="w-3 h-3 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>
            Exportar Excel
          </button>
        </div>
        <div className="flex flex-row justify-center items-center">
          <section id="takeScreenshotChart" className="grow-[4] pl-2 pr-2">
            <header>
              <input
                type="text"
                placeholder="Escriba el Título del gráfico"
                className="text-2xl outline-none w-full text-center bg-transparent overflow-visible"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </header>
            <main className="relative pl-2 pr-2  bg-cover">
              {
                ////bg-[url('/velentines.avif')]
              }
              <Chart />
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Layout;
