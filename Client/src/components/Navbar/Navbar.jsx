import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import { searchItems, fetchItems } from "../../redux/itemsSlice";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Navbar.module.css";
import { useDispatch } from "react-redux";

import { BsPersonCircle } from 'react-icons/bs';

const backendUrl = import.meta.env.VITE_BACKEND;

const Navbar = ({ sesion, onSearch }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const logout = async () => {
    const response = await fetch(`${backendUrl}/user/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      deleteCookie('lacookie');
      sesion();
      location.reload();
    }
  };

  const handleSearch = (term) => {
    localStorage.setItem('searchTerm', term);
    onSearch(term);
    if (term === '') {
      dispatch(fetchItems());
    } else {
      dispatch(searchItems(term));
    }
  };

  return (
    <div className={styles.main}>
      <Link to='/' className={styles.linksTitle}>
        The Hose Factory
      </Link>
      <div className={styles.linksContainer}>
        <Link
          to='/'
          className={`${styles.links} ${pathname === '/' ? styles.active : ''}`}
        >
          INICIO
        </Link>
        <Link
          to='/cart'
          className={`${styles.links} ${
            pathname === '/cart' ? styles.active : ''
          }`}
        >
          CARRO
        </Link>
        <Link
          to='/about'
          className={`${styles.links} ${
            pathname === '/about' ? styles.active : ''
          }`}
        >
          SOBRE NOSOTROS
        </Link>
        {user && user.rol === 'Admin' && (
          <Link
            to='/admin'
            className={`${styles.links} ${
              pathname === '/admin' ? styles.active : ''
            }`}
          >
            ADMINISTRADOR
          </Link>
        )}
      </div>
      <SearchBar onSearch={handleSearch} />
      <Link to={'/profile'} className={styles.profile}>
        <BsPersonCircle className={styles.profileIcon} />
      </Link>
      {!user ? (
        <Link to='/login' className={styles.loginButton}>
          REGISTRARSE
        </Link>
      ) : (
        <button className={styles.logout} onClick={logout}>
          CERRAR SESIÓN
        </button>
      )}
    </div>
  );
};

export default Navbar;
