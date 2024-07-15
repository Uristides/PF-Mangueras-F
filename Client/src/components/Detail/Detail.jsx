import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './Detail.module.css'

const Detail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1)

  console.log("Product in detail: ", product);

  useEffect(() => {
    const getById = async (id) => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/products/${id}`
        );
        if (data) setProduct(data);        
      } catch (error) {
        console.log(error.message);
      }
    };
    getById(id);
  }, [id]);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div>
      <h1>Manguera de tipo: {product?.type}</h1>

      {product ? (
        <div className={styles.productContainer}>

            <div>
            <img src={product.image} alt="product" className={styles.productImage}/>
            </div>  

            <div>
            <h1>{product.name}</h1>
            <p>{product.brand}</p>
            <hr/>
            <h3>$ {product.price}.00</h3>
            <hr/>
            <p>Marca: {product.brand}</p>
            <p>Diametro: {product.diameter}cm</p>
            <p>Tipo/Uso: {product.type}</p>
            <p>Acerca de: {product.description}</p>
            </div>

            <div className={styles.moneyContainer}>
                <h2>$: {product.price}</h2>
                {product.available === true ? (
                    <p style={{color: 'green'}}><strong>Disponible</strong></p>
                    ): (<p style={{color: 'red'}}><strong>No Disponible</strong></p>)}

                    {/* <option value="" disabled hidden>Cantidad: {quantity || 1}</option> */}
                    <label>Cantidad: </label>

                    <select 
                    id="quantity-select"
                    value={quantity}
                    onChange={handleQuantityChange}
                    >
                    {product.available ? Array.from({ length: product.stock }, (_, index) => index + 1).map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                        )) : <></>}
                    </select>
                    <br/>
                <button 
                className={styles.carritoButton}
                disabled={!product.available}
                >Agregar al Carrito</button>
            </div>

         
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
