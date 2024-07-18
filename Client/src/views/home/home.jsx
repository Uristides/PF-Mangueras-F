// src/views/home/home.jsx
import React, { useContext } from "react";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import styles from "./home.module.css";
import { UserContext } from "../../App.jsx";
import CreateButton from "../../components/CrearBoton/CreateButton.jsx"; // Ajusta la ruta al botón de creación
const backendUrl = process.env.REACT_APP_BACKEND;

const Home = ({ sesion }) => {
  const { user } = useContext(UserContext);

  const borrarCookie = (nombre) => {
    document.cookie =
      nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const logout = async () => {
    const response = await fetch(`http://localhost:3001/user/logout`, {
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
            <Filters />
          </div>
          <Cards />
        </div>
        <section className={styles.section}>
          {user && <h1 className={styles.h1}>Bienvenido {user.name}</h1>}
          <CreateButton /> {/* Renderiza el botón de creación */}
          <button onClick={logout} className={styles.logout}>
            Cerrar sesión
          </button>
        </section>
      </section>
    </main>
  );
};

export default Home; // Exporta el componente Home como predeterminado
