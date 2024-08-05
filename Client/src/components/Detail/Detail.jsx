import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import AddButton from "../AddRemoveCart/AddButton";
import Reviews from "./Reviews/Reviews";
import CreateReview from "./Reviews/CreateReview/CreateReview";
import axios from "axios";
import styles from "./Detail.module.css";
const backendUrl = import.meta.env.VITE_BACKEND;

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const productId = id.toString();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quantityString, setQuantityString] = useState("1");
  const [productWithQuantity, setProductWithQuantity] = useState("");

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [purchased, setPurchased] = useState([]);
  const { user } = useContext(UserContext);
  // console.log("User in context: ", user);

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
    const getUserPurchases = async (userId) => {
      try {
        const { data } = await axios.get(`${backendUrl}/user/id/${userId}`);
        if (data) {
          setPurchased(data.purchases);
          // console.log("data in getUserPurchases: ", data.purchases);
        } else {
          console.log("Nothing in getUserPurchases");
        }
      } catch (error) {
        console.log("error in getUserPurchases: ", error.message);
      }
    };
    if (user && user.id) {
      getUserPurchases(user.id);
    }
  }, [user]);

  useEffect(() => {
    const averageCalc = (data) => {
      let overallSum = 0;
      data.forEach((rat) => {
        overallSum += rat.rating;
      });
      let average = overallSum / data.length;
      return average.toFixed(1);
    };
    const getReviews = async (productId) => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/products/reviews/${productId}`
        );
        if (data) {
          setReviews(data);
          setAverageRating(averageCalc(data));
        }
      } catch (error) {
        console.log("Error in getReviews", error.message);
      }
    };
    getReviews(id);
  }, [id]);

  useEffect(() => {
    setQuantityString(quantity.toString());
    setProductWithQuantity(`${productId}:${quantity}`);
  }, [quantity, productId]);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const userHasPurchased = purchased.includes(parseInt(id, 10));
  const userHasReviewed = reviews.some((rate) => rate.userId === user.id);

  return (
    <div>
      <div className={styles.backButtonDiv}>
        <button className={styles.backButton} onClick={handleBackClick}>
          Inicio
        </button>
      </div>
      <div className={styles.container}>
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
              {product.available ? (
                product.stock > 0 && (
                  <div>
                    <p style={{ color: "green" }}>
                      <strong>Disponible</strong>
                    </p>
                    <p>En existencia: {product.stock}</p>

                    <label>Cantidad: </label>
                    <div>
                      <button
                        onClick={() =>
                          setQuantity((prevQuantity) =>
                            Math.max(prevQuantity - 1, 1)
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const value = Math.max(
                            1,
                            Math.min(product.stock, Number(e.target.value))
                          );
                          setQuantity(value);
                        }}
                      />
                      <button
                        onClick={() =>
                          setQuantity((prevQuantity) =>
                            Math.min(prevQuantity + 1, product.stock)
                          )
                        }
                      >
                        +
                      </button>
                      {product.stock === quantity && (
                        <p>
                          **{product.stock} es la maxima cantidad disponible{" "}
                        </p>
                      )}
                    </div>
                    <AddButton
                      productId={productId}
                      quantity={quantity}
                      stock={product.stock}
                      available={product.available}
                      className={styles.carritoButton}
                    />
                    {!user && <p>Inicia sesion para agregar a carrito</p>}
                  </div>
                )
              ) : (
                <p style={{ color: "red" }}>
                  <strong>No Disponible</strong>
                </p>
              )}
              <br />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div>
          {reviews ? (
            <>
              {reviews.length > 1 ? (
                <h3>Average rating {averageRating}</h3>
              ) : (
                <p>No hay reseñas </p>
              )}
              <div>
                {user ? (
                  userHasPurchased ? (
                    userHasReviewed ? (
                      <p>Ya has escrito una reseña.</p>
                    ) : (
                      <div>
                        <p>Escribe Tu Reseña</p>
                        <CreateReview data={{ id }} />{" "}
                        {/* Pass an object to the data prop */}
                      </div>
                    )
                  ) : (
                    <p>Debes comprar el producto para escribir una reseña.</p>
                  )
                ) : (
                  <p>Por favor, inicia sesión para escribir una reseña.</p>
                )}
              </div>
              {reviews.map((rev) => (
                <Reviews key={rev.id} data={rev} />
              ))}
            </>
          ) : (
            <p>Loading reviews...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
