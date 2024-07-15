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
        <option value="">Select Type:</option>
        <option value="Domestico">Domestic</option>
        <option value="Jardineria">Jardineria</option>
        <option value="Agricultura">Agricultura</option>
      </select>
      <input
        type="number"
        name="price"
        onChange={handleFilterPrice}
        placeholder="Search by maximum price:"
        className={styles.input}
      />
      <Sort />
    </div>
  );
};

export default Filters;
