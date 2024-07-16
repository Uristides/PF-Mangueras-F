import { useDispatch } from "react-redux";
import {
  fetchItems,
  filterItemsByPrice,
  filterByType,
} from "../../redux/itemsSlice";
import Sort from "../Sort/Sort";
import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const { value } = e.target;
    if (value === "") {
      dispatch(fetchItems());
    } else {
      dispatch(filterByType(value));
    }
  };

  const handleFilterPrice = (e) => {
    const { value } = e.target;
    if (value === "") {
      dispatch(fetchItems());
    } else {
      dispatch(filterItemsByPrice(value));
    }
  };

  return (
    <div className={styles.container}>
      <select
        name="type"
        onChange={handleFilterChange}
        className={styles.select}
      >
        <option value="">Tipos:</option>
        <option value="Domestico">Domestico</option>
        <option value="Jardineria">Jardineria</option>
        <option value="Agricultura">Agricola</option>
      </select>
      <input
        type="number"
        name="price"
        onChange={handleFilterPrice}
        placeholder="Rango de precio"
        className={styles.input}
      />
      <Sort />
    </div>
  );
};

export default Filters;
