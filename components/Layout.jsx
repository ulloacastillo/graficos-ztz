import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Chart from './Chart';
import DonutChart from './DonutChart';
import DataTable from './DataTable';
import { takeScreenshot } from '@/app/utils/screenShot';
import * as XLSX from 'xlsx';

const Layout = () => {
  const [title, setTitle] = useState('Escriba el Título del gráfico');
  const filteredData = useSelector((state) => state.chartData);
  const colNumber = parseInt(useSelector((state) => state.colNumber));
  const claims = useSelector((state) => state.claims);
  console.log(colNumber === 2, colNumber);
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

  return (
    <div className="w-full h-screen bg-back bg-no-repeat bg-cover flex items-center ">
      <Sidebar />
      <div className="flex-1 p-4 text-black">
        <div
          className="inline-flex rounded-md shadow-sm py-px"
          role="group"
        ></div>
        <div className="flex flex-row justify-center items-center">
          <section className="grow-[4] pl-2 pr-2">
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
              <div>
                <div>
                  <Chart />
                </div>
                <button onClick={captureScreenShot}>Descargar</button>
              </div>
              <div className="pt-7">
                <DataTable data={filteredData} />
                {
                  //{colNumber === 2 && <DonutChart claims={claims} />}}
                }
                <DonutChart claims={claims} />
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};
//onClick={captureScreenShot}
//type="button"
export default Layout;
