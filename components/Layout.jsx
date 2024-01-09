'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import UploadImage from './UploadImage';
import Chart from './Chart';
import FrequencyBox from './FrequencyBox';

const Layout = () => {
  const [title, setTitle] = useState('Escriba el Título del gráfico');
  return (
    <div className="w-full h-screen bg-back bg-no-repeat bg-cover flex items-center">
      <Sidebar />
      <div className="flex-1 p-4 text-black">
        <div className="flex flex-row justify-center items-center">
          <section className="grow-[4]">
            <header>
              <textarea
                className="text-3xl outline-none w-96 ml-6 text-wrap bg-transparent overflow-visible"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
            </header>
            <main className="relative">
              <Chart />
              <FrequencyBox />
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
