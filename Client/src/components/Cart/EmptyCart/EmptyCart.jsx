import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from './EmptyCart.module.css'

const EmptyCart = () => {
  const vacio = 'Vacío';

  return (
    <div className={styles.emptyCartContainer}>
        <div style={{margin: '20px'}}>
            <h1>Tu Carrito Está <span style={{ color: 'red' }}>{vacio}!</span></h1>
        </div>
        <div className={styles.emptyCartIcon}>
            <BsCartX />
        </div>
        <div>
            <Link to='/'>
        <button className={styles.returnToShopBtn}>Regresar a Comprar</button>
            </Link>

        </div>
        

    </div>
  );
}

export default EmptyCart;
