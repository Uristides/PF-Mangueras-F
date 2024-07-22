/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import AddButton from '../AddRemoveCart/AddButton';
import styles from './Card.module.css';
import { Link, useSearchParams } from 'react-router-dom';

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
    stockId,
  } = props.data;

  const [productId, setProductId] = useState(id);
  const [quantity, setQuantity] = useState('1');

  const [productWithQuantity, setProductWithQuantity] = useState('');

  useEffect(() => {
    setProductWithQuantity(`${productId}:${quantity}`);
  });

  return (
    <div className={styles.container}>
      <Link to={`/detail/${id}`}>
        <article className={styles.card} key={id}>
          <img src={image} alt='manguera pic' className={styles.img} />
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
      <AddButton available={available} data={productWithQuantity} />
    </div>
  );
};

export default Card;
