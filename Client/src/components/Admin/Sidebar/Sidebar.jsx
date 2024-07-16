import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <div>
            <div>
                <ul>
                    <li className={pathname === "/admin/products" ? styles.active : ""}>
                        <Link 
                            to='products'
                            className={styles.links}
                        >Productos</Link>
                    </li>
                    <li className={pathname === "/admin/users" ? styles.active : ""}>
                        <Link 
                            to='users'
                            className={styles.links}
                        >Usuarios</Link>
                    </li>
                    <li className={pathname === "/admin/create-product" ? styles.active : ""}>
                        <Link
                            to='create-product'
                            className={styles.links}
                        >Crear Producto</Link>
                    </li>
                    <li className={pathname === "/admin/orders" ? styles.active : ""}>
                        <Link
                            to='orders'
                            className={styles.links}
                        >Ordenes</Link>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
