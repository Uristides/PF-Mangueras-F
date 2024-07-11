import styles from './CartItem.module.css'
import { removeItem } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = (props) => {
  
  const { id, name, image, price, diameter, longitude, brand, stock, type, description, available } = props.data;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id)=>{
    dispatch(removeItem(id))
  }

  console.log("Props: ", props)

  return (
    <div>
      <h1>Name: {name}</h1>
      <p>Price: ${price}</p>
      <img className={styles.cartItemImg} src={image} alt="mang-checkout pic" />
      <p>Brand: {brand}</p>
      <p>Stock: {stock}</p>
      <p>Type: {type}</p>
      <p>Description: {description}</p>
      <p>Available: {available ? 'Yes' : 'No'}</p>
      <button onClick={()=>handleRemoveFromCart(id)}>Remove from Cart</button>
    </div>
  );
};

export default CartItem;