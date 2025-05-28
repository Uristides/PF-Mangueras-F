import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from "./Cards.module.css";
import { fetchItems } from "../../redux/itemsSlice";

const Cards = ({ filters, sortOption, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const dispatch = useDispatch();
  const allMangueras = useSelector((state) => state.items.items);
  const status = useSelector((state) => state.items.status);

  const mangueras = useMemo(() => {
    if (!Array.isArray(allMangueras)) return [];
    let filteredItems = allMangueras.filter((mang) => mang.show === true);

    // Apply search filter
    if (searchQuery) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    if (filters) {
      if (filters.minPrice) {
        filteredItems = filteredItems.filter(
          (item) => item.price >= parseFloat(filters.minPrice)
        );
      }
      if (filters.maxPrice) {
        filteredItems = filteredItems.filter(
          (item) => item.price <= parseFloat(filters.maxPrice)
        );
      }
      if (filters.typeValue) {
        filteredItems = filteredItems.filter(
          (item) => item.type === filters.typeValue
        );
      }
      if (filters.brandsValue) {
        filteredItems = filteredItems.filter(
          (item) => item.brand === filters.brandsValue
        );
      }
    }

    // Apply sorting
    if (sortOption) {
      if (sortOption === "price_asc") {
        filteredItems.sort((a, b) => a.price - b.price);
      } else if (sortOption === "price_desc") {
        filteredItems.sort((a, b) => b.price - a.price);
      } else if (sortOption === "name_asc") {
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption === "name_desc") {
        filteredItems.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    return filteredItems;
  }, [allMangueras, filters, sortOption, searchQuery]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const products = useMemo(() => {
    return mangueras.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }, [mangueras, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(mangueras.length / itemsPerPage);

  const restart = () => {
    setCurrentPage(0);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // console.log("Products in cards: ", products);

  return (
    <section className={styles.section}>
      <article className={styles.Card}>
        {products.length > 0 ? (
          products.map((mang) => (
            <Card key={mang.id} id={mang.id} data={mang} />
          ))
        ) : (
          <div>Nothing here</div>
        )}
      </article>
      {products.length > 0 && (
        <article className={styles.pagination}>
          <button
            onClick={prevPage}
            className={styles.button}
            disabled={currentPage === 0}
          >
            ⬅️ Anterior
          </button>
          <button onClick={restart} className={styles.refresh}>
            {currentPage + 1}
          </button>
          <button
            onClick={nextPage}
            className={styles.button}
            disabled={currentPage >= totalPages - 1}
          >
            Siguiente ➡️
          </button>
        </article>
      )}
    </section>
  );
};

export default Cards;
