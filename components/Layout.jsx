'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import UploadImage from './UploadImage';

import Chart from './Chart';

const Layout = () => {
  const [title, setTitle] = useState('Título del gráfico');
  const [title, setTitle] = useState('Título del gráfico');
  return (
    <div className="w-full h-screen bg-back bg-no-repeat bg-cover flex items-center">
      <Sidebar />
      <div className="bg-white flex-1 p-4 text-black">
        <div className="flex flex-row justify-center items-center">
          <section className="grow-[4]">
            <header>
              <textarea
                className="text-3xl outline-none w-96 ml-6 text-wrap"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
            </header>
            <main>
              <Chart />
            </main>
          </section>
          <div className="grow-[1]">
            <UploadImage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
