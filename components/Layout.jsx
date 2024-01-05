'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import UploadImage from './UploadImage';

import Chart from './Chart';

const Layout = () => {
  const [title, setTitle] = useState('Título del gráfico');
  return (
    <div className="h-screen flex flex-row justify-start bg-F6F8FA">
      <Sidebar />
      <div className="bg-white flex-1 p-4 text-black">
        <div className="flex flex-row justify-center items-center">
          <section className="grow-[4]">
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
          <UploadImage className="grow" />
        </div>
      </div>
    </div>
  );
};

export default Layout;
