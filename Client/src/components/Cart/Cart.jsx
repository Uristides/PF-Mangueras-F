import CartItem from "../CartItem/CartItem";
import styles from "./Cart.module.css";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/cartSlice";
import axios from 'axios';

const Cart = () => {
  const { user } = useContext(UserContext);
  const userCart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchCart(user.id));
  }, [user.id, dispatch]);

  const fetchProductPrice = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/products/${id}`);
      return data.price;
    } catch (error) {
      console.error("Error fetching product price:", error);
      return 0; // Default value if there's an error
    }
  };

  const calculateTotalPrice = async (items) => {
    let total = 0;
    for (const item of items) {
      const [id, amount] = item.split(":");
      const price = await fetchProductPrice(id);
      total += price * parseInt(amount, 10);
    }
    return total;
  };

  useEffect(() => {
    const calculateAndSetTotalPrice = async () => {
      const total = await calculateTotalPrice(userCart);
      setTotalPrice(total);
    };
    
    calculateAndSetTotalPrice();
  }, [userCart]);

  return (
    <div className={styles.container}>
      <div className={styles.secondContainer}>
        My Cart
        <hr />
        {userCart.map((item) => {
          const [id, amount] = item.split(":");
          return (
            <CartItem
              key={id}
              id={id}
              amount={amount}
              onPriceUpdate={(id, price) => {
                // Optionally, handle price updates here if needed
              }}
            />
          );
        })}
      </div>

      <div className={styles.subTotal}>
        Resumen

        <div className={styles.subTotalContainer}>
        
        
        <div>

          Subtotal: ${totalPrice}
        </div>


        <div>
        Envio: $TBD

        </div>


        <div>
        Total Estimado: ${totalPrice}

        </div>

      
       
        
       

        </div>
      </div>
    </div>
  );
};

export default Cart;
