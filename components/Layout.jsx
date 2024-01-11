import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UploadImage from './UploadImage';
import Chart from './Chart';
import FrequencyBox from './FrequencyBox';
import { ColumnSelector } from './SelectorFrequency';

const Layout = () => {
  const [title, setTitle] = useState('Título del gráfico');
  return (
    <div className="w-full h-screen bg-back bg-no-repeat bg-cover flex items-center">
      <Sidebar />
      <div className="bg-white flex-1 p-4 text-black">
        <div className="grid grid-cols-3 gap-4">
          <section className="col-span-2">
            <header>
              <textarea
                className="text-3xl outline-none w-96 ml-6 text-wrap"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
              <ColumnSelector/>
            </header>
            <main>
              <Chart />
            </main>
          </section>
          <div className="col-span-1">
            <UploadImage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
