import { useEffect, useState } from "react";
import AddButton from "../AddRemoveCart/AddButton";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  const {
    id,
    name,
    image,
    price,
    diameter,
    longitude,
    brand,
    type,
    description,
    available,
    stock,
  } = props.data;

  const [productId, setProductId] = useState(id);
  const [quantity, setQuantity] = useState("1");

  const [productWithQuantity, setProductWithQuantity] = useState("");

  useEffect(() => {
    setProductWithQuantity(`${productId}:${quantity}`);
  }, [productId, quantity]);

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value <= stock) {
      setQuantity(value);
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/detail/${id}`}>
        <article className={styles.card} key={id}>
          <img src={image} alt="manguera pic" className={styles.img} />
          {!available && <div className={styles.soldOutLabel}>Agotado</div>}
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.description}>{description}</p>
          <h2 className={styles.otherData}>Marca: {brand}</h2>
          <h2 className={styles.otherData}>Tipo: {type}</h2>
          <h2 className={styles.otherData}>
            Precio: <span className={styles.price}>${price}</span>
          </h2>
        </article>
      </Link>

      <AddButton
        available={available}
        data={productWithQuantity}
        stock={stock}
        actionType="addOne" // Specify the action type for adding specified quantity
        // Specify the action type for adding specified quantity
      />
    </div>
  );
};

export default Card;
