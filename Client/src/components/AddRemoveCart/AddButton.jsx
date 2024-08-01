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
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;



const AddButton = ( {quantity, productId, stock,available, actionType }) => {

  const productQuantity = quantity.toString()
  
  // console.log("Quantity by props: ", quantity)
  console.log("Stock: ", stock)

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const cartItems = useSelector((state) => state.cart.items); 
  

  // console.log("Quantity: ", productQuantity)

  let productwq = `${productId}:${productQuantity}`
  console.log("Product with q: ", productwq)

  // Initialize state with the user ID and an empty item field
  const [itemInfo, setItemInfo] = useState({
    id: user.id,
    item: productwq,
  });

  console.log("Item info: ", itemInfo)

  // Update the itemInfo state whenever props.data changes
  useEffect(() => {
    setItemInfo((prevState) => ({
      ...prevState,
      item: productId,
    }));
  }, [productId, user.id, cartItems]);




  const handleClick =async () => {
    if(!user){
      
      navigate('/login')
    }
     else if( quantity > stock){
      alert("Cannot add more quantity than stock")
     }else{

      try {
        const { data } = await axios.post(`${backendUrl}/user/addCart`, itemInfo )
        console.log("posthandleclick data: ", data)
        
      } catch (error) {
        console.log("Error in handle click", error.message)
      }
      
    // const existingItem = cartItems.find((i) => i.startsWith(`${productId}:`));
    let existingQuantity = 0;
    

    // if (existingItem) {
    //   existingQuantity = parseInt(existingItem.split(":")[1], 10);
    //   console.log("existingquantity in if(existingItem): ", existingQuantity);
    // }

    // const newQuantity =
    //   existingQuantity + (actionType === "addOne" ? 1 : quantity);

    // if (newQuantity <= stock) {
    //   const action =
    //     actionType === "addOne"
    //       ? addOneToCart({ userId: user.id, productId })
    //       : addToCart({ userId: user.id, productId, quantity });

    //   dispatch(action)
    //     .unwrap()
    //     .catch((error) => {
    //       console.error("Error in adding to cart: ", error.message);
          
    //     });
    // } else {
    //   console.log("Cannot add more than available stock.");
    //   alert("Cannot add more than available stock.");
    // }
  }
  
  };

  return (
    <button
      onClick={handleClick}
      className={styles.button}
      disabled={!available}
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
