// src/views/home/home.jsx
import React, { useContext, useEffect } from "react";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import styles from "./home.module.css";
import { UserContext } from "../../App.jsx";
import CreateButton from "../../components/CrearBoton/CreateButton.jsx"; // Ajusta la ruta al botón de creación
const backendUrl = import.meta.env.VITE_BACKEND;

const Home = ({ sesion }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.type = "text/javascript";
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '66a1d9ccfe7738be9c3505fd' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    document.body.appendChild(script);

    // Optional: Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
          
          
        </section>
      </section>
      
    </main>
  );
};

export default Home; 
