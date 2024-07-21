import CartItem from "../CartItem/CartItem";
import styles from "./Cart.module.css";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/cartSlice";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;

const Cart = () => {
  const { user } = useContext(UserContext);
  const userCart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const loadCartData = async () => {
      await dispatch(fetchCart(user.id));
      setLoading(false); // Set loading to false after fetching
    };

    loadCartData();
  }, [user.id, dispatch, userCart?.length]);

  const fetchProductPrice = async (id) => {
    try {
      const { data } = await axios.get(`${backendUrl}/products/${id}`);
      return data.price;
    } catch (error) {
      console.error("Error fetching product price:", error);
      return 0; // Default value if there's an error
    }
  };

  const calculateTotalPrice = async (items) => {
    let total = 0;
    for (const item of items) {
      const [id, amount] = item.split(":").map(Number);
      const price = await fetchProductPrice(id);
      total += price * parseInt(amount, 10);
    }
    return total;
  };

  useEffect(() => {
    if (userCart?.length > 0) {
      const calculateAndSetTotalPrice = async () => {
        const total = await calculateTotalPrice(userCart);
        setTotalPrice(total);
      };

      calculateAndSetTotalPrice();
    }
  }, [userCart]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className={styles.container}>
      <div className={styles.secondContainer}>
        My Cart
        <hr />
        {userCart?.map((item, index) => {
          const [id, amount] = item.split(":");
          return (
            <CartItem
              key={index} // Use index or id if unique
              id={id}
              amount={amount}
              onPriceUpdate={() => {
                /* No price update needed here */
              }}
            />
          );
        })}
      </div>

      <div className={styles.subTotal}>
        Summary
        <div className={styles.subTotalContainer}>
          <div>Subtotal: ${totalPrice}</div>
          <div>Shipping: $TBD</div>
          <div>Estimated Total: ${totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
