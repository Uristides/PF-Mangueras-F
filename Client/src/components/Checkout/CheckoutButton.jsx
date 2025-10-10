import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import styles from './CheckoutButton.module.css'

const backendUrl = import.meta.env.VITE_BACKEND;
const publicKey = import.meta.env.VITE_PUBLIC_KEY_MERCADO_PAGO;


const CheckoutButton = ({ totalPrice }) => {
  initMercadoPago(publicKey, {
    locale: "es-MX",
  });

  const { user } = useContext(UserContext);
  const [possibleCheckout, setPossibleCheckout] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    if (totalPrice > 1) setPossibleCheckout(true);
  }, [totalPrice]);

  const handleCheckout = async () => {
    const checkoutOrder = {
      id: user.id,
      totalAmount: totalPrice,
    };

    console.log("Checkout order:", checkoutOrder);

    try {
      const { data } = await axios.post(
        `${backendUrl}/user/buyCart`,
        checkoutOrder, // No necesitamos JSON.stringify aquí
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response data:", data);
      //const { id } = data.data;
      return data;
    } catch (error) {
      console.log("Error in handleCheckout", error.message);
    }
  };
  const handleBuy = async () => {
    const id = await handleCheckout();
    if (id) {
      setPreferenceId(id);
    }
  };
  return (
    <div>
      <button
        onClick={handleBuy}
        disabled={!possibleCheckout}
        className={styles.checkoutButton}
        
      >
        <MdOutlineShoppingCartCheckout style={{ fontSize: '30px' }} />
        <span>Proceder al Checkout</span>
      </button>
      <div id="wallet_container">
        {preferenceId && <Wallet initialization={{ preferenceId }} />}
      </div>
    </div>
  );
};

export default CheckoutButton;
