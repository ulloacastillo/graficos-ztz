import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UploadImage from './UploadImage';
import Chart from './Chart';
import FrequencyBox from './FrequencyBox';
import { ColumnSelector } from './SelectorFrequency';

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
                className="text-2xl outline-none w-full ml-6 text-wrap bg-transparent overflow-visible"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
            </header>
            <main className="relative">
              <Chart />
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Layout;
