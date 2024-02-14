import { useChartSettings } from '@/app/store/store';
import { takeScreenshot } from '@/app/utils/screenShot';
import Image from 'next/image';
import React, { useState } from 'react';
import { BsCamera, BsTextareaResize } from 'react-icons/bs';
import { CiImageOn, CiSettings } from 'react-icons/ci';
import { RiFileExcel2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import control from '../public/control.png';
import Chart from './Chart';
import ChartConfig from './ChartConfig';
import DataTable from './DataTable';
import DonutChart from './DonutChart';
import InsertData from './InsertData';
import Legend from './Legend';
import UploadExcel from './UploadExcel';
import UploadImage from './UploadImage';
import Logo from './icons/Logo';
import AreaChart from './AreaChart';

const App = () => {
  const [open, setOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(1);
  const filteredData = useSelector((state) => state.chartData);
  const colNumber = parseInt(useSelector((state) => state.colNumber));
  const claims = useSelector((state) => state.claims);

  const initialColor = useChartSettings((state) => state.initialColor);
  const endColor = useChartSettings((state) => state.endColor);
  const [title, setTitle] = useState('Escriba el Título del gráfico');
  const [subTitle, setSubTitle] = useState('Escriba el Subtítulo del gráfico');
  const Menu = [
    { id: 1, tittle: 'Subir Excel', icon: RiFileExcel2Line },
    { id: 2, tittle: 'Ingreso manual', icon: BsTextareaResize },
    { id: 3, tittle: 'Subir Imagen', icon: CiImageOn, gap: true },
    { id: 4, tittle: 'Configuración', icon: CiSettings },
  ];
  return (
    <div className="flex">
      <div
        className={`${
          open ? 'w-72' : 'w-20'
        } duration-300 h-screen p-5 pt-8 bg-dark-purple  sticky top-0`}
      >
        <Image
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
     border-2 rounded-full  ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
        <div className=" flex gap-x-4 item-center">
          <Logo className={'cursor-pointer duration-500'} />
        </div>
        <ul className="pt-6">
          {Menu.map((menu, index) => (
            <li
              key={index}
              onClick={() => setSelectedOption(menu.id)}
              className={`text-gray-300 text-4xl flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                menu.gap ? 'mt-9' : 'mt-2'
              } ${selectedOption === menu.id && 'bg-light-white'} 
              `}
            >
              {React.createElement(menu.icon, { size: 20 })}
              <span
                className={`${
                  !open && 'hidden'
                } origin-left duration-200 text-base`}
              >
                {menu.tittle}
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            takeScreenshot('takeScreenshotChart', 'Capturagrafico')
          }
          style={{
            width: open ? '85%' : '60%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className={`absolute bottom-0 left-0 m-5 p-2 cursor-pointer transition-all bg-ztz-mainblue text-white px-6 py-2 rounded-lg
border-ztz-indigoblue
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]${
            !open && 'w-16'
          }`}
        >
          {open ? (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <BsCamera className="mr-2" /> Captura de grafico
            </span>
          ) : (
            <BsCamera />
          )}
        </button>
      </div>

      <div
        className="flex-1 p-7 text-2xl font-semibold min-h-screen overflow-auto"
        style={{ marginLeft: open ? '72px' : '20px' }}
      >
        <div className="grid grid-cols-3 grid-auto-rows:min-content gap-9 h-full">
          <div className="w-full h-full bg-gray-100 rounded-xl shadow-2xl col-span-3 flex flex-col items-center justify-center">
            <header className="w-full px-5 flex flex-row items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="mb-1 mt-6">
                  <input
                    type="text"
                    placeholder="Escriba el Título del gráfico"
                    className="w-96 h-14 font-light bg-gradient-to-tr from-ztz-softblue to-ztz-indigoblue rounded-xl px-4 text-white text-center"
                    name="title"
                    value={title}
                    style={{ background: initialColor }}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Escriba el Subtitulo del gráfico"
                    className="w-80 font-light text-base h-10 bg-gradient-to-tr from-orange-300 to-orange-500 rounded-xl shadow-2xl px-4 text-white text-center"
                    name="title"
                    style={{ background: endColor }}
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                  />
                </div>
              </div>
              <Legend />
            </header>
            <Chart />
          </div>

          <div className="w-full h-auto bg-gray-100 rounded-xl shadow-2xl row-start-2 col-span-1">
            {selectedOption === 1 && <UploadExcel />}
            {selectedOption === 2 && <InsertData />}
            {selectedOption === 3 && <UploadImage />}
            {selectedOption === 4 && <ChartConfig />}
          </div>
          <div className="w-full h-full bg-gray-100 rounded-xl shadow-2xl row-start-2 col-span-1 flex flex-col items-center justify-center">
            {colNumber === 2 ? (
              <DonutChart claims={claims} />
            ) : (
              <h2 className="text-lg font-normal text-center px-3 ">
                No existe Fecha respuesta en archivo subido
              </h2>
            )}
          </div>
          <div className="w-full h-full bg-gray-100 rounded-xl shadow-2xl row-start-2 col-span-1 flex items-center justify-center">
            <DataTable data={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
