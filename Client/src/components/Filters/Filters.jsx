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
  const [priceValue, setPriceValue] = useState('');
  const [typeValue, setTypeValue] = useState('');

  useEffect(() => {
    dispatch(fetchItems());
    const savedPriceValue = localStorage.getItem('priceValue');
    const savedTypeValue = localStorage.getItem('typeValue');

    if (savedPriceValue) {
      setPriceValue(savedPriceValue);
      dispatch(filterItemsByPrice(savedPriceValue));
    }

    if (savedTypeValue) {
      setTypeValue(savedTypeValue);
      dispatch(filterByType(savedTypeValue));
    }
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setTypeValue(value);
    dispatch(filterByType(value));
  };

  const handleFilterPrice = (e) => {
    const { value } = e.target;
    setPriceValue(value);
    dispatch(filterItemsByPrice(value));
  };

  return (
    <div className={styles.container}>
      <select
        name='type'
        onChange={handleFilterChange}
        className={styles.select}
        value={typeValue}
      >
        <option value=''>Tipos:</option>
        <option value='Domestico'>Domestico</option>
        <option value='Jardineria'>Jardineria</option>
        <option value='Agricultura'>Agricola</option>
      </select>
      <input
        type='number'
        value={priceValue}
        name='price'
        onChange={handleFilterPrice}
        placeholder='Rango de precio'
        className={styles.input}
      />
      <Sort />
    </div>
  );
};

export default Filters;
