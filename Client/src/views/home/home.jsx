import { useContext } from 'react';
import Filters from '../../components/Filters/Filters';
import Cards from '../../components/Cards/Cards';
import styles from './home.module.css';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { UserContext } from '../../App.jsx';

export function Home({ sesion }) {
  const { user } = useContext(UserContext);
  const borrarCookie = (nombre) => {
    document.cookie =
      nombre + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };
  const logout = async () => {
    const response = await fetch('http://localhost:3001/user/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      borrarCookie('lacookie');
      sesion();
      return location.reload();
    }
  };

  return (
    <main>
      <header className={styles.header}>
        <Navbar></Navbar>
      </header>
      <section className={styles.sectionmain}>
        <div className={styles.container}>
          <div className={styles.filters}>
            <Filters />
          </div>
          <Cards />
        </div>
        <section className={styles.section}>
          {user && <h1 className={styles.h1}>Bienvenido {user.name}</h1>}
          <button onClick={logout} className={styles.logout}>
            Cerrar sesion
          </button>
        </section>
      </section>
    </main>
  );
}
