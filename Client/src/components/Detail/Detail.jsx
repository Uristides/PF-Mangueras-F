import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AddButton from "../AddRemoveCart/AddButton";
import styles from './Detail.module.css';
import { UserContext } from "../../App";
const backendUrl = import.meta.env.VITE_BACKEND;


const Detail = () => {
  const { id } = useParams();
  const productId = id.toString();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quantityString, setQuantityString] = useState('1');
  const [productWithQuantity, setProductWithQuantity] = useState('');
  const { user } = useContext(UserContext)

  console.log("Product in detail: ", product);


  useEffect(() => {
    const getById = async (id) => {
      try {
     const { data } = await axios.get(`${backendUrl}/products/${id}`);
        if (data) {
          setProduct(data);
          setProductWithQuantity(`${id}:1`);
        }        
      } catch (error) {
        console.log(error.message);
      }
    };
    getById(id);
  }, [id]);

  useEffect(() => {
    setQuantityString(quantity.toString());
    setProductWithQuantity(`${productId}:${quantity}`);
  }, [quantity, productId]);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div>
      <h1>Manguera de tipo: {product?.type}</h1>

      {product ? (
        <div className={styles.productContainer}>
          <div>
            <img
              src={product.image}
              alt="product"
              className={styles.productImage}
            />
          </div>
          <div>
            <h1>{product.name}</h1>
            <p>{product.brand}</p>
            <hr />
            <h3>$ {product.price}</h3>
            <hr />
            <p>Marca: {product.brand}</p>
            <p>Diametro: {product.diameter}cm</p>
            <p>Tipo/Uso: {product.type}</p>
            <p>Acerca de: {product.description}</p>
          </div>

          <div className={styles.moneyContainer}>
            <h2>{product.price} $</h2>
            {product.available ? product.stock > 0 && (
                <div>
                  <p style={{ color: 'green' }}><strong>Disponible</strong></p>
                  <p>En existencia: {product.stock}</p>

                  <label>Cantidad: </label>
                  <div>
                    <button onClick={() => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1))}>-</button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const value = Math.max(1, Math.min(product.stock, Number(e.target.value)));
                        setQuantity(value);
                      }}
                    />
                    <button onClick={() => setQuantity(prevQuantity => Math.min(prevQuantity + 1, product.stock))}>+</button>
                    {product.stock === quantity && (
                      <p>**{product.stock} es la maxima cantidad disponible </p>
                    )}
                  </div>       
                  <AddButton
                    data={productWithQuantity}
                    available={product.available}
                    className={styles.carritoButton}
                  /> 
                  {!user && (
                    <p>Inicia sesion para agregar a carrito</p>
                  )}               
                </div> 
              ) : (
                <p style={{ color: 'red' }}><strong>No Disponible</strong></p>
              )}


           
             
              
            <br/>

            
            
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
