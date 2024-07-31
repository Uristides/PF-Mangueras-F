// src/components/PaymentFeedback/PaymentFeedback.js
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";

const backendUrl = import.meta.env.VITE_BACKEND;

const PaymentFeedback = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [feedback, setFeedback] = useState(null);
  const params = new URLSearchParams(location.search);
  const totalPrice = params.get("totalPrice");

  useEffect(() => {
    const fetchFeedback = async () => {
      const collectionStatus = params.get("collection_status");

      if (collectionStatus === "approved") {
        try {
          const response = await axios.get(
            `${backendUrl}/user/feedBack?userId=${user.id}&totalPrice=${totalPrice}`
          );
          setFeedback(response.data);
        } catch (error) {
          console.error("Error al obtener feedback del pago:", error.message);
        }
      }
    };

    fetchFeedback();
  }, [params, user?.id, totalPrice]);

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
