'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Chart from './components/chart';
import UploadImage from './components/UploadImage.jsx';

export default function Home() {
  const [title, setTitle] = useState('Título del gráfico');

  return (
    <main className={styles.main}>
      <div className={styles.description}>
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
  );
}
