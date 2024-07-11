import { Link } from "react-router-dom";
import styles from './Navbar.module.css'


const Navbar = ()=>{

    return(
        <div className={styles.main}>
            Navbar
            <Link to='/' className={styles.links}>Home</Link>
            <Link to='/login' className={styles.links}>Login</Link>
            <Link to='/cart' className={styles.links}>Cart</Link>
        </div>
    )
}

export default Navbar;