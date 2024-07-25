import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  sortItemsByNameAscending,
  sortItemsByNameDescending,
  sortItemsByPriceAscending,
  sortItemsByPriceDescending,
} from "../../redux/itemsSlice";
import styles from "./Sort.module.css";

const Sort = ({ sortValue, onSortChange }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sortValue) {
      handleSort(sortValue);
    }
  }, [sortValue]);

  const handleSort = (value) => {
    if (value === "price_asc") {
      dispatch(sortItemsByPriceAscending());
    } else if (value === "price_desc") {
      dispatch(sortItemsByPriceDescending());
    } else if (value === "name_asc") {
      dispatch(sortItemsByNameAscending());
    } else if (value === "name_desc") {
      dispatch(sortItemsByNameDescending());
    }
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    localStorage.setItem("selectedSort", value);
    onSortChange(value);
  };

  return (
    <select
      onChange={handleSortChange}
      value={sortValue}
      className={styles.select}
    >
      <option value="">Ordenar por:</option>
      <option value="price_asc">Precio: Bajo a Alto</option>
      <option value="price_desc">Precio: Alto a Bajo</option>
      <option value="name_asc">Nombre: A-Z</option>
      <option value="name_desc">Nombre: Z-A</option>
    </select>
  );
};

export default Sort;
