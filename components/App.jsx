import React, { useState } from 'react';
import { RiFileExcel2Line } from 'react-icons/ri';
import { BsTextareaResize } from 'react-icons/bs';
import { CiImageOn, CiSettings } from 'react-icons/ci';
import Image from 'next/image';
import control from '../public/control.png';
import Logo from './icons/Logo';
import UploadExcel from './UploadExcel';
import InsertData from './InsertData';
import UploadImage from './UploadImage';
import ChartConfig from './ChartConfig';
import DataTable from './DataTable';
import { useSelector } from 'react-redux';
import Chart from './Chart';

const App = () => {
  const [open, setOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(1);
  const filteredData = useSelector((state) => state.chartData);
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
              }`}
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
      </div>
      <div
        className="flex-1 p-7 text-2xl font-semibold min-h-screen overflow-auto"
        style={{ marginLeft: open ? '72px' : '20px' }}
      >
        <div className="grid grid-cols-3 grid-auto-rows:min-content gap-9 h-full">
          <div className="w-full h-full bg-gray-100 rounded-xl shadow-2xl col-span-3 flex flex-col items-center justify-center">
            <header className="pt-4 pb-6 flex flex-col items-center">
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Escriba el Título del gráfico"
                  className="w-96 h-14 bg-gradient-to-tr from-ztz-softblue to-ztz-indigoblue rounded-xl px-4 text-white text-center"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Escriba el Subtitulo del gráfico"
                  className="w-80 h-10 bg-gradient-to-tr from-orange-300 to-orange-500 rounded-xl px-4 text-white text-center"
                  name="title"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
              </div>
            </header>

            <Chart />
          </div>
          <div className="w-full h-auto bg-gray-100 rounded-xl shadow-2xl row-start-2 col-span-1">
            {selectedOption === 1 && <UploadExcel />}
            {selectedOption === 2 && <InsertData />}
            {selectedOption === 3 && <UploadImage />}
            {selectedOption === 4 && <ChartConfig />}
          </div>
          <div className="w-full h-full bg-gray-100 rounded-xl shadow-2xl row-start-2 col-span-1"></div>
          <div className="w-full h-full bg-gray-100 rounded-xl shadow-2xl row-start-2 col-span-1 flex items-center justify-center">
            <DataTable data={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
