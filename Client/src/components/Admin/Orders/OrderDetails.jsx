import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./OrderDetailsPage.module.css";

const backendUrl = import.meta.env.VITE_BACKEND;

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Obtener todas las órdenes
        const { data: orders } = await axios.get(`${backendUrl}/user/orders`);
        // Filtrar la orden específica
        const order = orders.find((order) => order.id === orderId);

        // Obtener detalles de los productos en la orden
        const products = await Promise.all(
          order.cart.map(async (item) => {
            const [productId, quantity] = item.split(":");
            const { data: product } = await axios.get(
              `${backendUrl}/products/${productId}`
            );
            return { ...product, quantity };
          })
        );
        setOrderDetails({ ...order, products });
      } catch (error) {
        console.error("Error fetching order details: ", error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) return <p>Loading...</p>;

  return (
    <div className={styles.detailsContainer}>
      <button
        style={{
          margin: "15px",
          width: "70px",
          border: "solid 1px black",
          borderRadius: "20em",
          textDecoration: "underline",
          backgroundColor: "#99e49b",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/admin/orders");
        }}
      >
        Atras
      </button>
      <h2>Detalles de la Orden</h2>
      <p>
        <strong>ID:</strong> {orderDetails.id}
      </p>
      <p>
        <strong>Usuario ID:</strong> {orderDetails.userId}
      </p>
      <p>
        <strong>Total:</strong> {orderDetails.amount}
      </p>
      <p>
        <strong>Fecha de Creación:</strong>{" "}
        {new Date(orderDetails.creation_date).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {orderDetails.status ? "true" : "false"}
      </p>
      <div className={styles.cartList}>
        <h3>Carrito</h3>
        <div className={styles.cartHeader}>
          <p>Producto</p>
          <p>Cantidad</p>
        </div>
        {orderDetails.products.map((product) => (
          <Link to={`/detail/${product.id}`}>
            <div key={product.id} className={styles.cartItem}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <p>{product.name}</p>
              <p>{product.quantity}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
