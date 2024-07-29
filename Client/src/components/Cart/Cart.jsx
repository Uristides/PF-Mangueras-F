// frontend/src/components/Cart.js
import CartItem from "../CartItem/CartItem";
import Checkout from "../Checkout/Checkout";
import styles from "./Cart.module.css";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
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
  const [preferenceId, setPreferenceId] = useState(null); // Estado para el ID de preferencia

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
      return 0; // Valor predeterminado si hay un error
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

  // Crear preferencia de pago cuando el carrito cambie
  useEffect(() => {
    const createPaymentPreference = async () => {
      try {
        const items = await Promise.all(userCart.map(async (item) => {
          const [id, amount] = item.split(':').map(Number);
          const price = await fetchProductPrice(id);
          return {
            title: `Producto ${id}`,
            quantity: amount,
            unit_price: price,
          };
        }));

        const response = await axios.post(`${backendUrl}/create_preference`, {
          items: items,
        });

        setPreferenceId(response.data.id); // Almacenar el ID de preferencia
      } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
      }
    };

    if (userCart.length > 0) {
      createPaymentPreference();
    }
  }, [userCart]);

  if (loading) {
    return <div>Loading...</div>; // Mostrar mensaje de carga mientras se obtienen los datos
  }

  if (userCart.length === 0) {
    return <div>Carrito Vacío. ¡Ve a comprar!</div>
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
            <>
              <button>
                <Link to="/checkout" state={{ totalPrice }}>
                  Checkout
                </Link>
              </button>
              {/* Botón de Mercado Pago */}
              {preferenceId && (
                <MercadoPagoButton preferenceId={preferenceId} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
