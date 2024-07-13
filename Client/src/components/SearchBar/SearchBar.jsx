import { useDispatch } from 'react-redux';
import { searchItems, fetchItems } from '../../redux/itemsSlice';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (value === '') {
      dispatch(fetchItems());
    } else {
      dispatch(searchItems(value));
    }
  };

  return (
    <input
      type='text'
      name='search'
      className={styles.search}
      placeholder='Buscar por nombre'
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
