import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { UserContext } from "../../App";

const Navbar = ({ sesion }) => {
  const { pathname } = useLocation();

  const { setUser, user } = useContext(UserContext);

  const deletCokie = (param) => {
    document.cookie =
      param + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const logout = async () => {
    const out = await fetch("http://localhost:3001/user/logout", {
      method: "POST",
      credentials: "include",
      header: { "Content-Type": "aplication/json" },
    });
    if (out.ok) {
      sesion();
      deletCokie("lacookie");
      return location.reload();
    }
  };

  return (
    <div className={styles.main}>
      
      <Link to="/" className={styles.linksTitle}>
        The Hose Factory
      </Link>
      <div className={styles.linksContainer}>
        <Link
          to="/"
          className={`${styles.links} ${pathname === "/" ? styles.active : ""}`}
        >
          INICIO
        </Link>
        <Link 
          to="/cart"
          className={`${styles.links} ${
            pathname === "/cart" ? styles.active : ""
          }`}
        >
          CARRO
        </Link>
        <Link
          to="/about"
          className={`${styles.links} ${
            pathname === "/about" ? styles.active : ""
          }`}
        >
          SOBRE NOSOTROS
        </Link>
        <Link
          to="/admin"
          className={`${styles.links} ${
            pathname === "/admin" ? styles.active : ""
          }`}
        >
          ADMINISTRADOR
        </Link>
      </div>
      <SearchBar />
      {!user ? (
        <Link to="/login" className={styles.loginButton}>
          REGISTRARSE
        </Link>
      ) : (
        <button onClick={logout}> logout </button>
      )}
    </div>
  );
};

export default Navbar;
