import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND;

const PaymentFeedback = () => {
  const location = useLocation();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      const params = new URLSearchParams(location.search);
      const totalPrice = params.get("totalPrice"); // Obtén totalPrice de la URL

      try {
        const response = await axios.get(
          `${backendUrl}/feedback${location.search}&totalPrice=${totalPrice}`
        );
        setFeedback(response.data);
      } catch (error) {
        console.error("Error al obtener feedback del pago:", error.message);
      }
    };

    fetchFeedback();
  }, [location.search]);

  return (
    <div>
      {feedback ? (
        <div>
          <h1>Estado del Pago: {feedback.status}</h1>
          <p>ID de Pago: {feedback.paymentId}</p>
          <p>ID de Orden: {feedback.order.id}</p>
        </div>
      ) : (
        <p>Cargando feedback del pago...</p>
      )}
    </div>
  );
};

export default PaymentFeedback;
