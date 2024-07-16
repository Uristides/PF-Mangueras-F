/* eslint-disable no-unused-vars */
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

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

  return (
    <div className={styles.container}>
      <Link to={`/detail/${id}`}>
        <article className={styles.card} key={id}>
          <img src={image} alt='manguera pic' className={styles.img} />
          {!available && <div className={styles.soldOutLabel}>Sold Out</div>}
          
          <h1 className={styles.title}>{name}</h1>
          <h2 className={styles.otherData}>Brand: {brand}</h2>
          <h2 className={styles.otherData}>
            Price: $<span className={styles.price}>{price}</span>
          </h2>
        </article>
      </Link>
      <button className={styles.cartButton}>Add to cart</button>
    </div>
  );
};

export default Card;
