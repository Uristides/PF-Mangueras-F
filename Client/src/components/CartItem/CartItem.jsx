import styles from './CartItem.module.css';
import { useState, useEffect } from 'react';
import RemoveButton from '../AddRemoveCart/RemoveButton';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND;

const CartItem = ({ id, amount, onPriceUpdate }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(amount);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/products/${id}`);
        if (data) {
          setProduct(data);
          onPriceUpdate(id, data.price * quantity); // Pass initial price to parent
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, quantity, onPriceUpdate]);

  useEffect(() => {
    if (product) {
      onPriceUpdate(id, product.price * quantity);
    }
  }, [product, quantity, onPriceUpdate, id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.secondContainer}>
        {product.image && (
          <img
            src={product.image}
            alt='Product'
            className={styles.cartItemImg}
          />
        )}
        <div className={styles.productContainer}>
          <h2 className={styles.titleProduct}>{product.name}</h2>
          <p>Brand: {product.brand}</p>
          <p>Diameter: {product.diameter}</p>
          <p>Length: {product.longitude}</p>
          <p>Quantity: {quantity}</p>
          <RemoveButton id={product.id} />
        </div>
      </div>
      <div className={styles.priceContainer}>
        <p>
          Price: <span className={styles.price}>${product.price}</span>
        </p>
        <p>
          Total:
          <span className={styles.price}>${product.price * quantity}</span>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
