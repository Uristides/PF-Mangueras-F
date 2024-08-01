import React from "react";
import { Link } from "react-router-dom";
import styles from "./orders.module.css";

const IndividualOrder = ({ data }) => {
  return (
    <div className={styles.order}>
      <p>{data.id}</p>
      <p>{data.userId}</p>
      <p>{data.amount}</p>
      <p>{data.status ? "true" : "false"}</p>
      <Link to={`/admin/orders/${data.id}`} className={styles.details}>
        Detalles
      </Link>
    </div>
  );
};

export default IndividualOrder;
