import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const backendUrl = import.meta.env.VITE_BACKEND;

const CheckoutButton = ({ totalPrice }) => {
  initMercadoPago("APP_USR-f9778cd5-2698-4783-954b-94f05d959a29", {
    locale: "es-MX",
  }); // Reemplaza 'YOUR_PUBLIC_KEY' con tu clave pública real

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
      <button onClick={handleBuy} disabled={!possibleCheckout}>
        Checkout
      </button>
      <div id="wallet_container">
        {preferenceId && <Wallet initialization={{ preferenceId }} />}
      </div>
    </div>
  );
};

export default CheckoutButton;
