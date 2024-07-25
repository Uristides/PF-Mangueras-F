import React, { useContext, useState, useEffect } from "react";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import styles from "./home.module.css";
import { UserContext } from "../../App.jsx";
import CreateButton from "../../components/CrearBoton/CreateButton.jsx"; // Ajusta la ruta al botón de creación
import { useDispatch } from "react-redux";
import {
  fetchItems,
  searchItems,
  filterItemsByPriceRange,
  filterByType,
  filterByBrand,
  resetFilters,
} from "../../redux/itemsSlice";
const backendUrl = import.meta.env.VITE_BACKEND;

const Home = ({ sesion, searchTerm }) => {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    searchTerm: searchTerm || "",
    minPrice: "",
    maxPrice: "",
    typeValue: "",
    brandsValue: "",
    sortValue: "",
  });

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    setFilters((prevFilters) => ({ ...prevFilters, searchTerm }));
  }, [searchTerm]);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    const { searchTerm, minPrice, maxPrice, typeValue, brandsValue } = filters;
    if (searchTerm) {
      dispatch(searchItems(searchTerm));
    }
    if (minPrice || maxPrice) {
      dispatch(filterItemsByPriceRange({ minPrice, maxPrice }));
    }
    if (typeValue) {
      dispatch(filterByType(typeValue));
    }
    if (brandsValue) {
      dispatch(filterByBrand(brandsValue));
    }
    if (!searchTerm && !minPrice && !maxPrice && !typeValue && !brandsValue) {
      dispatch(fetchItems());
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      typeValue: "",
      brandsValue: "",
      sortValue: "",
    });
    dispatch(resetFilters());
    dispatch(fetchItems());
  };

  const borrarCookie = (nombre) => {
    document.cookie =
      nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const logout = async () => {
    const response = await fetch(`${backendUrl}/user/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      borrarCookie("lacookie");
      sesion();
      return location.reload();
    }
  };

  return (
    <main>
      <section className={styles.sectionmain}>
        <div className={styles.container}>
          <div className={styles.filters}>
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>
          <Cards />
        </div>
        <section className={styles.section}>
          {user && <h1 className={styles.h1}>Bienvenido {user.name}</h1>}
        </section>
      </section>
    </main>
  );
};

export default Home;
