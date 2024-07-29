import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND;

const PaymentFeedback = () => {
  const location = useLocation();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/feedback${location.search}`
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
          <p>ID de Pago: {feedback.payment_id}</p>
          <p>ID de Orden: {feedback.merchant_order_id}</p>
        </div>
      ) : (
        <p>Cargando feedback del pago...</p>
      )}
    </div>
  );
};

export default PaymentFeedback;
