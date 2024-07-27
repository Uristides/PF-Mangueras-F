import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  filterItemsByPriceRange,
  filterByType,
  filterByBrand,
  sortItemsByNameAscending,
  sortItemsByNameDescending,
  sortItemsByPriceAscending,
  sortItemsByPriceDescending,
  resetFilters,
} from "../../redux/itemsSlice";
import { fetchBrands } from "../../redux/brandsSlice";
import { fetchTypes } from "../../redux/typesSlice";
import Sort from "../Sort/Sort";
import styles from "./Filters.module.css";

const Filters = ({ filters, onFilterChange, onResetFilters }) => {
  const dispatch = useDispatch();
  const brandsList = useSelector((state) => state.brands.brands);
  const typesList = useSelector((state) => state.types.types);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchBrands());
    dispatch(fetchTypes());
    const savedFilters = [
      "minPrice",
      "maxPrice",
      "typeValue",
      "brandsValue",
      "selectedSort",
    ].reduce((acc, key) => {
      const value = localStorage.getItem(key);
      if (value) acc[key] = value;
      return acc;
    }, {});
    onFilterChange(savedFilters);
  }, [dispatch, onFilterChange]);

  useEffect(() => {
    const { minPrice, maxPrice, typeValue, brandsValue, sortValue } = filters;
    if (minPrice || maxPrice)
      dispatch(filterItemsByPriceRange({ minPrice, maxPrice }));
    if (typeValue) dispatch(filterByType(typeValue));
    if (brandsValue) dispatch(filterByBrand(brandsValue));
    if (sortValue) handleSort(sortValue);
  }, [filters, dispatch]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      onFilterChange({ [name]: value });
      if (name === "minPrice" || name === "maxPrice")
        dispatch(filterItemsByPriceRange({ ...filters, [name]: value }));
      if (name === "typeValue") dispatch(filterByType(value));
      if (name === "brandsValue") dispatch(filterByBrand(value));
      if (name === "sortValue") handleSort(value);
      localStorage.setItem(name, value);
    },
    [filters, onFilterChange, dispatch]
  );

  const handleSort = useCallback(
    (value) => {
      switch (value) {
        case "price_asc":
          dispatch(sortItemsByPriceAscending());
          break;
        case "price_desc":
          dispatch(sortItemsByPriceDescending());
          break;
        case "name_asc":
          dispatch(sortItemsByNameAscending());
          break;
        case "name_desc":
          dispatch(sortItemsByNameDescending());
          break;
        default:
          break;
      }
    },
    [dispatch]
  );

  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(fetchItems());
    onResetFilters();
  };

  const memoizedBrandsList = useMemo(() => brandsList, [brandsList]);
  const memoizedTypesList = useMemo(() => typesList, [typesList]);

  const { minPrice, maxPrice, typeValue, brandsValue, sortValue } = filters;

  return (
    <div className={styles.container}>
      <select
        name="typeValue"
        onChange={handleInputChange}
        className={styles.select}
        value={typeValue}
      >
        <option value="">Tipos:</option>
        {Array.isArray(memoizedTypesList) &&
          memoizedTypesList.map((type) => (
            <option key={type.id} value={type.type}>
              {type.type}
            </option>
          ))}
      </select>
      <select
        name="brandsValue"
        onChange={handleInputChange}
        className={styles.select}
        value={brandsValue}
      >
        <option value="">Marcas:</option>
        {Array.isArray(memoizedBrandsList) &&
          memoizedBrandsList.map((brand) => (
            <option key={brand.id} value={brand.brand}>
              {brand.brand}
            </option>
          ))}
      </select>
      <input
        type="number"
        name="minPrice"
        value={minPrice}
        onChange={handleInputChange}
        placeholder="Precio Mínimo"
        className={styles.input}
      />
      <input
        type="number"
        name="maxPrice"
        value={maxPrice}
        onChange={handleInputChange}
        placeholder="Precio Máximo"
        className={styles.input}
      />
      <Sort
        sortValue={sortValue}
        onSortChange={(value) =>
          handleInputChange({ target: { name: "sortValue", value } })
        }
      />
      <button onClick={handleResetFilters} className={styles.resetButton}>
        Limpiar Filtros
      </button>
    </div>
  );
};

export default Filters;
