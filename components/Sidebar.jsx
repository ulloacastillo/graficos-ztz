'use client';
import React, {useState} from 'react'
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import { RiFileExcel2Line } from "react-icons/ri";
import { BsTextareaResize } from "react-icons/bs";
import Icon from './icons/Icon';
import Link from 'next/link';
import UploadExcel from './UploadExcel';
import InsertData from './InsertData';

const menuItems = [
  { id: 1, label: "Subir Excel", icon: RiFileExcel2Line, link: "/" },
  { id: 2, label: "Ingreso manual", icon: BsTextareaResize, link: "/" },
];

const Sidebar = () => {
  const [selectedOption,setSelectedOption]=useState(null);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname) || {id: null},
    [router.pathname]
  );

  const wrapperClasses = "h-screen px-4 pt-8 pb-4 bg-8A90F1 flex justify-between flex-col w-80";

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap text-lg font-bold",
      {
        ["bg-light-lighter"]: activeMenu && activeMenu.id === menu.id,
      }
    );
  };

  return (
    <div className={wrapperClasses}>
      <div className="flex flex-col w-full m-5">
        <div className="flex items-center pl-1 gap-4 w-full">
          <span className="mt-2 text-lg font-bold text-text w-full">
            <Icon className="text-lg"/>
          </span>
        </div>

        <div className="flex flex-col items-start mt-24 w-full">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes} key={menu.id} onClick={()=> setSelectedOption(menu.id)}>
                <Link href={menu.link} className="flex py-4 px-3 items-center w-full h-full">
                  <div style={{ width: "2.5rem" }}>
                    <Icon className="text-lg"/>
                  </div>
                  <span className="text-lg font-bold text-text-light w-full">
                    {menu.label}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
        <div className='flex flex-col items-start mt-24 w-full'>
          {selectedOption === 1 && <UploadExcel/>}
          {selectedOption === 2 && <InsertData/>}
        </div>
      </div>
     
    </div>
  );
};

export default Sidebar;
