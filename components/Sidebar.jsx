import React, { useState } from 'react';
import { RiFileExcel2Line } from 'react-icons/ri';
import { BsTextareaResize } from 'react-icons/bs';

import { CiImageOn, CiSettings } from 'react-icons/ci';

import Logo from './icons/Logo';
import Link from 'next/link';
import UploadExcel from './UploadExcel';
import UploadImage from './UploadImage';
import InsertData from './InsertData';
import ChartConfig from './ChartConfig';

const menuItems = [
  { id: 1, label: 'Subir Excel', icon: RiFileExcel2Line, link: '/' },
  { id: 2, label: 'Ingreso manual', icon: BsTextareaResize, link: '/' },
  { id: 3, label: 'Subir Imagen', icon: CiImageOn, link: '/' },
  { id: 4, label: 'Configuración', icon: CiSettings, link: '/' },
];

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const wrapperClasses =
    'h-screen px-4 pt-8 pb-4 bg-slate-300 flex justify-between flex-col w-80';

  const activeButton = 'bg-red-300';

  return (
    <div className={wrapperClasses}>
      <div className="flex flex-col w-full m-5">
        <div className="flex items-center pl-1 gap-4 w-full">
          <span>
            <Logo />
          </span>
        </div>
        <div className="flex flex-col items-start mt-10 gap-2">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            return (
              <div
                key={menu.id}
                onClick={() => setSelectedOption(menu.id)}
                className={`flex items-center w-[200px] gap-3 px-3 py-2 rounded-lg ${
                  menu.id === selectedOption && 'bg-white text-slate-500'
                }`}
              >
                <Link href={menu.link}>
                  <div className={`flex items-center gap-3`}>
                    <Icon
                      size={30}
                      color={`${
                        menu.id === selectedOption
                          ? 'rgb(100 116 139)'
                          : 'white'
                      }`}
                    />
                    <h2 className="text-lg text-text-light w-full">
                      {menu.label}
                    </h2>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-start mt-24 w-full">
          {selectedOption === 1 && <UploadExcel />}
          {selectedOption === 2 && <InsertData />}
          {selectedOption === 3 && <UploadImage />}
          {selectedOption === 4 && <ChartConfig />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
