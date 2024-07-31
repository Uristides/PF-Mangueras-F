import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App"; // Ajusta la ruta según la ubicación del UserContext

const backendUrl = import.meta.env.VITE_BACKEND;

const PaymentFeedback = () => {
  const location = useLocation();
  const { user } = useContext(UserContext); // Obtener el usuario del contexto
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      const params = new URLSearchParams(location.search);
      const collectionStatus = params.get("collection_status");
      const totalPrice = location.state.totalPrice; // Obtiene el totalPrice del estado

      if (collectionStatus === "approved") {
        try {
          const response = await axios.get(
            `${backendUrl}/feedback?userId=${user.id}&totalPrice=${totalPrice}`
          );
          setFeedback(response.data);
        } catch (error) {
          console.error("Error al obtener feedback del pago:", error.message);
        }
      }
    };

    fetchFeedback();
  }, [location.search, user?.id, location.state.totalPrice]);

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
