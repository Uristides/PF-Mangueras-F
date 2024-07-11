import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import styles from './Cart.module.css';



const Cart = () => {
  const items = useSelector((state) => state.cart.items);

  console.log("In cart: ", items);

  return (
    <div className={styles.cart}>
      {items && items.length > 0 ? (
        items.map((item) => (
          <CartItem key={item.id} data={item} />
        ))
      ) : (
        <p>Nothing here</p>
      )}
    </div>
  );
};

export default Cart;