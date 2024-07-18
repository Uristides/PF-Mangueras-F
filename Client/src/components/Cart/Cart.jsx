import CartItem from "../CartItem/CartItem";
import styles from "./Cart.module.css";
import { UserContext } from "../../App";
import { useContext } from "react";

const Cart = () => {
  const { user } = useContext(UserContext)

  

  console.log("User in cart: ", user)

  console.log("In cart: ", user.cart);

  return (
    <div className={styles.cart}>
      
       Cart here: 
    </div>
  );
};

export default Cart;
