
'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Chart from './components/chart';
import UploadImage from './components/UploadImage.jsx';
import Layout from '../../components/Layout'




export default function Home() {
  const [title, setTitle] = useState('Título del gráfico');

  return (
<<<<<<< HEAD
    <main className={styles.main}>
      <Layout/>
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
=======
   <Layout/>
  )
>>>>>>> felipe
}
