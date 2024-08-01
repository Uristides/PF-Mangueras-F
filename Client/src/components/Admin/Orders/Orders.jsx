import { useState, useEffect } from "react";
import IndividualOrder from "./IndividualOrder";
import styles from "./orders.module.css";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/user/orders`);
        if (data) setOrders(data);
      } catch (error) {
        console.log("Error in getAllOrders: ", error.message);
      }
    };
    getAllOrders();
  }, []);

  return (
    <div>
      <div className={styles.ordersList}>
        <div className={styles.ordersHeader}>
          <p>ID</p>
          <p>User</p>
          <p>Total</p>
          <p>Status</p>
          <p>Actions</p>
        </div>
        {orders.length > 0 ? (
          orders.map((order) => <IndividualOrder key={order.id} data={order} />)
        ) : (
          <p>Sin órdenes</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
