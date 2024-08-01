import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App"; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/cartSlice";
import {
  MdOutlineShoppingCart,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import styles from "./addButton.module.css";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND;

const AddButton = ({ quantity, productId, stock, available }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const cartItems = useSelector((state) => state.cart.items); 

  // Use state to hold item information
  const [itemInfo, setItemInfo] = useState({
    id:  user.id,
    item: `${productId}:0`,
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user.id));
      setItemInfo((prev) => ({
        ...prev,
        id: user.id,
        item: `${productId}:${quantity}`,
      }));
    }
  }, [quantity, user, dispatch]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = async () => {
    if (!user) {
      navigate('/login');
    } else {

    

      const existingItem = cartItems.find(item => item.startsWith(`${productId}:`));
      const existingQuantity = existingItem ? parseInt(existingItem.split(':')[1], 10) : 0;
      const totalQuantity = existingQuantity + quantity;

      if (totalQuantity > stock) {
        alert("Cannot add more quantity than stock");
      } else {
        try {

          
         
          const { data } = await axios.post(`${backendUrl}/user/addCart`, itemInfo);
          console.log("Cart updated successfully: ", data);
          

          dispatch(fetchCart(user.id)); // Refresh the cart data
          setTimeout(() => {
            setIsDisabled(false);
          }, 500);
        } catch (error) {

          console.error("Error in handleClick: ", error.message);
        }
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={styles.button}
      disabled={!available || isDisabled}
    >
      {available ? (
        <MdOutlineShoppingCart />
      ) : (
        <MdOutlineRemoveShoppingCart />
      )}
    </button>
  );
};

export default AddButton;
