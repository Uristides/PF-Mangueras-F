import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App"; 
import { useNavigate } from "react-router-dom";
import { addToCart, addOneToCart } from "../../redux/cartSlice"; // Import both actions
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineShoppingCart,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import styles from "./addButton.module.css";

const AddButton = (props) => {
  const stock = props.stock;

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from the store
  
  // Initialize state with the user ID and an empty item field
  const [itemInfo, setItemInfo] = useState({
    id: user.id,
    item: "",
  });

  // Update the itemInfo state whenever props.data changes
  useEffect(() => {
    setItemInfo((prevState) => ({
      ...prevState,
      item: props.data,
    }));
  }, [props.data, user.id, cartItems]);

  // Handle click event to dispatch the appropriate action based on the actionType prop
  const handleClick = () => {
    if(!user){
      
      navigate('/login')
    } else{

    
    const [productId, quantity] = props.data.split(":").map(Number);
    const existingItem = cartItems.find((i) => i.startsWith(`${productId}:`));
    let existingQuantity = 0;

    if (existingItem) {
      existingQuantity = parseInt(existingItem.split(":")[1], 10);
      console.log("existingquantity in if(existingItem): ", existingQuantity);
    }

    const newQuantity =
      existingQuantity + (props.actionType === "addOne" ? 1 : quantity);

    if (newQuantity <= stock) {
      const action =
        props.actionType === "addOne"
          ? addOneToCart({ userId: user.id, productId })
          : addToCart({ userId: user.id, productId, quantity });

      dispatch(action)
        .unwrap()
        .catch((error) => {
          console.error("Error in adding to cart: ", error.message);
          
        });
    } else {
      console.log("Cannot add more than available stock.");
      alert("Cannot add more than available stock.");
    }
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
