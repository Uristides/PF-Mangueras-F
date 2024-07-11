import mangueras from "../../../../db.json";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./Cards.module.css";

const Cards = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const applyFilters = () => {
    let filteredProducts = mangueras;

    if (filters.type) {
      filteredProducts = filteredProducts.filter(
        (mang) => mang.type === filters.type
      );
    }

    if (filters.price) {
      filteredProducts = filteredProducts.filter(
        (mang) => Number(mang.price) <= Number(filters.price)
      );
    }

    return filteredProducts.filter(
      (mang) => mang.available === true && mang.stock > 0
    );
  };

  useEffect(() => {
    const data = applyFilters();
    setProducts(data.slice(0, itemsPerPage));
  }, [filters]);

  const restart = () => {
    setCurrentPage(0);
    const data = applyFilters();
    setProducts(data.slice(0, itemsPerPage));
  };

  const nextPage = () => {
    const next = currentPage + 1;
    const data = applyFilters();
    const Index = next * itemsPerPage;
    if (Index >= data.length) return;
    setProducts(data.slice(Index, Index + itemsPerPage));
    setCurrentPage(next);
  };

  const prevPage = () => {
    const prev = currentPage - 1;
    if (prev < 0) return;
    const data = applyFilters();
    const first = prev * itemsPerPage;
    setProducts(data.slice(first, first + itemsPerPage));
    setCurrentPage(prev);
  };

  return (
    <section className={styles.section}>
      <article className={styles.Card}>
        {products.map((mang) => (
          <Card
            key={mang.id}
            id={mang.id}
            data={mang}
          />
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
