'use client';
import React from "react";
import { useState } from 'react';
import Sidebar from "./Sidebar";
import Chart from "./chart";
import UploadImage from './UploadImage.jsx';



const Layout = () => {
  const [title, setTitle] = useState('Título del gráfico');
  return (
    <div className="h-screen flex flex-row justify-start bg-F6F8FA">
      <Sidebar />
      <div className="bg-white flex-1 p-4 text-black">
      <main>
      <div>
        <UploadImage />
        <section>
          <header>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </header>
          <main>
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
