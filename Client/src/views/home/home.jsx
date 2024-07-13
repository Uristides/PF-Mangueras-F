import { useState } from 'react';
import Filters from '../../components/Filters/Filters';
import Sort from '../../components/Sort/Sort';
import Cards from '../../components/Cards/Cards';
import styles from './home.module.css';

export function Home() {
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('');

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Filters onFilterChange={handleFilterChange} />
        <Sort onSortChange={handleSortChange} />
      </div>
      <Cards filters={filters} sortOption={sortOption} />
    </div>
  );
}
