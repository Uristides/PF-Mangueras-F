import React, { useContext, useState, useEffect, useCallback } from "react";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import styles from "./home.module.css";
import { UserContext } from "../../App.jsx";
import CreateButton from "../../components/CrearBoton/CreateButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../redux/itemsSlice";

const backendUrl = import.meta.env.VITE_BACKEND;

const Home = ({ sesion }) => {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);

  // Estado para los filtros
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    typeValue: "",
    brandsValue: "",
    sortValue: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      typeValue: "",
      brandsValue: "",
      sortValue: "",
    });
    localStorage.clear();
  }, []);

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

  const handleSearch = useCallback(
    (term) => {
      if (term === "") {
        setSearchResults(items);
      } else {
        const results = items.filter((item) =>
          item.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(results);
      }
    },
    [items]
  );
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '66a1d9ccfe7738be9c3505fd' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
          <Cards items={searchResults.length ? searchResults : items} />
        </div>
        <section className={styles.section}>
          {user && <h1 className={styles.h1}>Bienvenido {user.name}</h1>}
        </section>
      </section>
      
    </main>
  );
};

export default Home;
