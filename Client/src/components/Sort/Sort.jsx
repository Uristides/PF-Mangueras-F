import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  sortItemsByNameAscending,
  sortItemsByNameDescending,
  sortItemsByPriceAscending,
  sortItemsByPriceDescending,
} from '../../redux/itemsSlice';
import styles from './Sort.module.css';

const Sort = () => {
  const dispatch = useDispatch();
  const [selectedSort, setSelectedSort] = useState('');

  useEffect(() => {
    const savedSort = localStorage.getItem('selectedSort');
    if (savedSort) {
      setSelectedSort(savedSort);
      handleSort(savedSort);
    }
  }, []);

  const handleSort = (value) => {
    if (value === 'price_asc') {
      dispatch(sortItemsByPriceAscending());
    } else if (value === 'price_desc') {
      dispatch(sortItemsByPriceDescending());
    } else if (value === 'name_asc') {
      dispatch(sortItemsByNameAscending());
    } else if (value === 'name_desc') {
      dispatch(sortItemsByNameDescending());
    }
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSelectedSort(value);
    localStorage.setItem('selectedSort', value);
    handleSort(value);
  };

  return (
    <select
      onChange={handleSortChange}
      value={selectedSort}
      className={styles.select}
    >
      <option value=''>Seleccionar</option>
      <option value='price_asc'>Precio: Bajo a Alto</option>
      <option value='price_desc'>Precio: Alto a Bajo</option>
      <option value='name_asc'>Nombre: A-Z</option>
      <option value='name_desc'>Nombre: Z-A</option>
    </select>
  );
};

export default Sort;
