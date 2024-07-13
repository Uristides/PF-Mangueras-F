import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { pathname } = useLocation();
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
          Home
        </Link>
        <Link
          to='/cart'
          className={`${styles.links} ${
            pathname === '/cart' ? styles.active : ''
          }`}
        >
          Cart
        </Link>
        <Link
          to='/about'
          className={`${styles.links} ${
            pathname === '/about' ? styles.active : ''
          }`}
        >
          About
        </Link>
      </div>
      <Link to='/login' className={styles.loginButton}>
        Login
      </Link>
    </div>
  );
};

export default Navbar;
