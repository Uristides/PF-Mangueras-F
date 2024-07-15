/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import { fetchItems } from '../../redux/itemsSlice';

const Cards = ({ filters, sortOption, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const dispatch = useDispatch();
  const mangueras = useSelector((state) => state.items.items);
  const status = useSelector((state) => state.items.status);

  // Fetch items when status is 'idle'
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  // Handle updates to products based on filters, sortOption, searchQuery, and mangueras
  useEffect(() => {
    setProducts(
      mangueras.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    );
  }, [mangueras, filters, sortOption, searchQuery, currentPage, itemsPerPage]);

  const restart = () => {
    setCurrentPage(0);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <section className={styles.section}>
      <article className={styles.Card}>
        {products.map((mang) => (
          <Card key={mang.id} id={mang.id} data={mang} />
        ))}
      </article>
      <article className={styles.pagination}>
        <button onClick={prevPage} className={styles.button}>
          ⬅️ Previous
        </button>
        <button onClick={restart} className={styles.refresh}>
          {currentPage + 1}
        </button>
        <button onClick={nextPage} className={styles.button}>
          Next ➡️
        </button>
      </article>
    </section>
  );
};

export default Cards;
