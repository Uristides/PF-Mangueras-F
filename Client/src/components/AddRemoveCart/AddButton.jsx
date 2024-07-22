import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { addToCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md';
import styles from './addButton.module.css';

const AddButton = (props) => {
  const stock = props.stock;
  // console.log("Stock in addbutton props: ", stock);

  const dispatch = useDispatch();
  const { user } = useContext(UserContext); 
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from the store

  // Initialize state with the user ID and an empty item field
  const [itemInfo, setItemInfo] = useState({
    id: user.id,
    item: '',
  });

  // Update the itemInfo state whenever props.data changes
  useEffect(() => {
    setItemInfo((prevState) => ({
      ...prevState,
      item: props.data,
    }));
  }, [props.data, user.id, cartItems]);

  // Handle click event to dispatch the addToCart action
  const handleClick = () => {
    const [productId, quantity] = props.data.split(':').map(Number);
    const existingItem = cartItems.find((i) => i.startsWith(`${productId}:`));
    let existingQuantity = 0;

    if (existingItem) {
      existingQuantity = parseInt(existingItem.split(':')[1], 10);
      console.log("existingquantity in if(existingItem): ", existingQuantity);

    }

    const newQuantity = existingQuantity + quantity;
    if (newQuantity <= stock) {
      dispatch(addToCart({ userId: user.id, productId, quantity }))
        .unwrap()
        .catch((error) => {
          console.error("Error in adding to cart: ", error.message);
          alert(error.message);
        });
    } else {
      console.log('Cannot add more than available stock.');
      alert('Cannot add more than available stock.');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={styles.button}
      disabled={!props.available}
    >
      {props.available ? (
        <MdOutlineShoppingCart />
      ) : (
        <MdOutlineRemoveShoppingCart />
      )}
    </button>
  );
};

export default AddButton;
