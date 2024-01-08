'use client';
import React from "react";
import { useState } from 'react';
import Sidebar from "./Sidebar";
import Chart from "./Chart";
import UploadImage from './UploadImage.jsx';
import FrequencyBox from "./FrequencyBox";



const Layout = () => {
  const [title, setTitle] = useState('Título del gráfico');
  return (
    <div className="w-full h-screen bg-back bg-no-repeat bg-cover flex items-center">
      <Sidebar />
      <div className="bg-opacity-100 flex-1 p-4 text-black flex justify-center items-center">
      <main className="w-3/4 h-3/4">
      <div>
        <UploadImage />
        <FrequencyBox/>
        <section>
          <header>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </header>
          <main className="flex justify-center items-center">
            <Chart />
          </main>
        </section>
      </div>
    </main>
      </div>
    </div>
  );
};

export default Layout;
