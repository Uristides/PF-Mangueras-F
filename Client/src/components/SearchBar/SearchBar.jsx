import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { fetchItems } from "../../redux/itemsSlice";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm) {
      onSearch(searchTerm);
    }
  }, [searchTerm, onSearch]);

  useEffect(() => {
    if (!searchTerm) {
      dispatch(fetchItems()); // Fetch all items if search term is cleared
    }
  }, [searchTerm, dispatch]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    localStorage.setItem("searchTerm", value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      name="search"
      className={styles.search}
      placeholder="Nombre del producto"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
