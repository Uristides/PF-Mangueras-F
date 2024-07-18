import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { searchItems, fetchItems } from '../../redux/itemsSlice';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      dispatch(searchItems(savedSearchTerm));
    } else {
      dispatch(fetchItems());
    }
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    localStorage.setItem('searchTerm', value);
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
      placeholder='Nombre del producto'
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
