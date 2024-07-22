import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchItems,
  filterItemsByPrice,
  filterByType,
  filterByBrand,
} from '../../redux/itemsSlice';
import { fetchBrands } from '../../redux/brandsSlice';
import Sort from '../Sort/Sort';
import styles from './Filters.module.css';

const Filters = () => {
  const dispatch = useDispatch();
  const brandsList = useSelector((state) => state.brands.brands);
  const [priceValue, setPriceValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [brandsValue, setBrandsValue] = useState('');

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchBrands());
    const savedPriceValue = localStorage.getItem('priceValue');
    const savedTypeValue = localStorage.getItem('typeValue');
    const savedBrandValue = localStorage.getItem('brandValue');

    if (savedPriceValue) {
      setPriceValue(savedPriceValue);
      dispatch(filterItemsByPrice(savedPriceValue));
    }

    if (savedTypeValue) {
      setTypeValue(savedTypeValue);
      dispatch(filterByType(savedTypeValue));
    }

    if (savedBrandValue) {
      setBrandsValue(savedBrandValue);
      dispatch(filterByBrand(savedBrandValue));
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

  const handleFilterBrandsChange = (e) => {
    const { value } = e.target;
    setBrandsValue(value);
    dispatch(filterByBrand(value));
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
      <select
        name='brand'
        className={styles.select}
        value={brandsValue}
        onChange={handleFilterBrandsChange}
      >
        <option value=''>Marcas:</option>
        {brandsList?.map((brand) => (
          <option key={brand.id} value={brand.brand}>
            {brand.brand}
          </option>
        ))}
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
