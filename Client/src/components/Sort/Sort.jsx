import { useDispatch } from 'react-redux';
import {
  sortItemsByNameAscending,
  sortItemsByNameDescending,
  sortItemsByPriceAscending,
  sortItemsByPriceDescending,
} from '../../redux/itemsSlice';
import styles from './Sort.module.css';

const Sort = () => {
  const dispatch = useDispatch();
  const handleSortChange = (e) => {
    const { value } = e.target;
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

  return (
    <select onChange={handleSortChange} className={styles.select}>
      <option value=''>Seleccionar</option>
      <option value='price_asc'>Precio: Bajo a Alto</option>
      <option value='price_desc'>Precio: Alto a Bajo</option>
      <option value='name_asc'>Nombre: A-Z</option>
      <option value='name_desc'>Nombre: Z-A</option>
    </select>
  );
};

export default Sort;
