import React, { useContext, useEffect, useState } from "react";
import CartItem from "../CartItem/CartItem";
import Checkout from "../Checkout/Checkout";
import styles from "./Cart.module.css";
import { UserContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import MercadoPagoButton from "../MercadoPagoButton/MercadoPagoButton";

const backendUrl = import.meta.env.VITE_BACKEND;

const Cart = () => {
  const { user } = useContext(UserContext);
  const userCart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [preferenceId, setPreferenceId] = useState(null); // Estado para manejar la preferencia

  useEffect(() => {
    const loadCartData = async () => {
      await dispatch(fetchCart(user.id));
      setLoading(false);
    };

    loadCartData();
  }, [user.id, dispatch, userCart.length, totalPrice]);

  const fetchProductPrice = async (id) => {
    try {
      const { data } = await axios.get(`${backendUrl}/products/${id}`);
      return data.price;
    } catch (error) {
      console.error('Error fetching product price:', error);
      return 0;
    }
  };

  const calculateTotalPrice = async (items) => {
    let total = 0;
    for (const item of items) {
      const [id, amount] = item.split(':').map(Number);
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
  }, [userCart, userCart.length]);

 
  const handleCreatePreference = async () => {
    try {
      const cartItems = await Promise.all(
        userCart.map(async (item) => {
          const [id, quantity] = item.split(':').map(Number);
          const { data } = await axios.get(`${backendUrl}/products/${id}`);
          return {
            name: data.name, 
            price: data.price,
            quantity,
          };
        })
      );

      const { data } = await axios.post(`${backendUrl}/payment/create_preference`, {
        cartItems,
      });

      setPreferenceId(data.preferenceId); // Guarda el ID de la preferencia para usar en el botón
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userCart.length === 0) {
    return <div>Carrito Vacio. Ve a comprar!</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.secondContainer}>
        <h2 className={styles.title}>Mi Carrito</h2>
        <hr />
        {userCart?.map((item, index) => {
          const [id, amount] = item.split(':');
          return (
            <CartItem
              key={index}
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
          {totalPrice && totalPrice > 1 && (
            <button>
              <Link
                to="/checkout"
                state={{ totalPrice }}
              >Checkout</Link>
            </button>
          )}
          {/* Botón para crear la preferencia y mostrar el botón de Mercado Pago */}
          <button onClick={handleCreatePreference}>
            Crear Preferencia de Pago
          </button>
          {preferenceId && (
            <MercadoPagoButton preferenceId={preferenceId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
