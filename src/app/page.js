import styles from './page.module.css';
import Chart from './components/chart';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Gráficos ZTZ</h1>
        <Chart />
      </div>
    </main>
  );
}
