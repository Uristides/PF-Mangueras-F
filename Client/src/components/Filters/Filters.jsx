import { useDispatch } from 'react-redux';
import {
  fetchItems,
  filterItemsByPrice,
  filterByType,
} from '../../redux/itemsSlice';
import Sort from '../Sort/Sort';
import styles from './Filters.module.css';
import { useEffect, useState } from 'react';

const Filters = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState(localStorage.getItem('filterType') || '');
  const [price, setPrice] = useState(localStorage.getItem('filterPrice') || '');

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setType(value);
    localStorage.setItem('filterType', value);
    if (value === '') {
      dispatch(fetchItems());
    } else {
      dispatch(filterByType(value));
    }
  };

  const handleFilterPrice = (e) => {
    const { value } = e.target;
    setPrice(value);
    localStorage.setItem('filterPrice', value);
    if (value === '') {
      dispatch(fetchItems());
    } else {
      dispatch(filterItemsByPrice(value));
    }
  };

  useEffect(() => {
    if (type) {
      dispatch(filterByType(type));
    }

    if (price) {
      dispatch(filterItemsByPrice(price));
    }
  }, [dispatch, type, price]);

  return (
    <div className={styles.container}>
      <select
        name='type'
        onChange={handleFilterChange}
        value={type}
        className={styles.select}
      >
        <option value=''>Tipos:</option>
        <option value='Domestico'>Domestico</option>
        <option value='Jardineria'>Jardineria</option>
        <option value='Agricultura'>Agricola</option>
      </select>
      <input
        type='number'
        name='price'
        onChange={handleFilterPrice}
        value={price}
        placeholder='Rango de precio'
        className={styles.input}
      />
      <Sort />
    </div>
  );
};

export default Filters;
