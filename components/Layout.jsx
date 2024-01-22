import React, { useState } from 'react';
import Sidebar from './Sidebar';

import Chart from './Chart';

const Layout = () => {
  const [title, setTitle] = useState('Escriba el Título del gráfico');
  return (
    <div className="w-full h-screen bg-back bg-no-repeat bg-cover flex items-center ">
      <Sidebar />
      <div className="flex-1 p-4 text-black">
        <div className="flex flex-row justify-center items-center">
          <section className="grow-[4] p-32">
            <header>
              <input
                type="text"
                placeholder="Escriba el Título del gráfico"
                className="text-2xl outline-none w-full text-center bg-transparent overflow-visible"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
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
