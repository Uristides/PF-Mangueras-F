import Filters from '../../components/Filters/Filters';
import Cards from '../../components/Cards/Cards';
import styles from './home.module.css';

export function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Filters />
      </div>
      <Cards />
    </div>
  );
}
