import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <ul>
                    <li className={pathname === "/admin/products" ? styles.active : ""}>
                        <Link 
                            to='products'
                            className={styles.links}
                        >Products</Link>
                    </li>
                    <li className={pathname === "/admin/users" ? styles.active : ""}>
                        <Link 
                            to='users'
                            className={styles.links}
                        >Users</Link>
                    </li>
                    <li className={pathname === "/admin/create-product" ? styles.active : ""}>
                        <Link
                            to='create-product'
                            className={styles.links}
                        >Create Product</Link>
                    </li>
                    <li className={pathname === "/admin/orders" ? styles.active : ""}>
                        <Link
                            to='orders'
                            className={styles.links}
                        >Orders</Link>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
