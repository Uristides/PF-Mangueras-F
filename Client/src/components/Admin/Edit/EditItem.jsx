import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./EditItem.module.css";
const backendUrl = import.meta.env.VITE_BACKEND;

const EditItem = () => {
  const { id: itemId } = useParams();
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [updatedProduct, setUpdatedProduct] = useState({
    id: itemId,
    name: "",
    brand: "",
    type: "",
    price: "",
    stock: "",
    available: "",
    diameter: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const getById = async (id) => {
      try {
        const { data } = await axios.get(`${backendUrl}/products/${id}`);
        setFetchedData(data);
        // setUpdatedProduct(data); // Initialize the form with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to fetch product data.");
        setLoading(false);
      }
    };
    getById(itemId);
  }, [itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`putEndpoint here`, updatedProduct);
      // Handle the response data if needed
    } catch (error) {
      console.error("Error updating data: ", error);
      setError("Failed to update product data.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Edit</h2>

      <form onSubmit={handleSubmit} className={styles.formDivs}>
        <div className={styles.pictureDiv}>
          <label>Current Image: </label>
          <img
            src={fetchedData.image}
            alt="Current product"
            className={styles.img}
          />
          <input
            value={updatedProduct.image}
            name="image"
            onChange={handleChange}
            placeholder="New image URL"
          />
        </div>

        <div className={styles.infoDiv}>
          <label>Current Name: {fetchedData.name}</label>
          <input
            value={updatedProduct.name}
            name="name"
            onChange={handleChange}
            placeholder="New Name"
          />
          <br />

          <label>Current Brand: {fetchedData.brand}</label>
          <input
            value={updatedProduct.brand}
            name="brand"
            onChange={handleChange}
            placeholder="New Brand"
          />
          <br />

          <label>Current Type: {fetchedData.type}</label>
          <input
            value={updatedProduct.type}
            name="type"
            onChange={handleChange}
            placeholder="New Type"
          />
          <br />

          <label>Current Price: {fetchedData.price}</label>
          <input
            value={updatedProduct.price}
            name="price"
            onChange={handleChange}
            placeholder="New Price"
          />
          <br />

          <label>Current Diameter: {fetchedData.diameter}</label>
          <input
            value={updatedProduct.diameter}
            name="diameter"
            onChange={handleChange}
            placeholder="New Diameter"
          />
          <br />

          <label>Current Description: {fetchedData.description}</label>
          <br />
          <textarea
            value={updatedProduct.description}
            name="description"
            onChange={handleChange}
            placeholder="New Description"
          />
          <br />
        </div>

        <div className={styles.infoDiv}>
          <label>Current Stock: {fetchedData.stock}</label>
          <input
            value={updatedProduct.stock}
            name="stock"
            onChange={handleChange}
            placeholder="New Stock"
          />
          <label>Current Available: {String(fetchedData.available)}</label>
          <select
            value={updatedProduct.available}
            name="available"
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditItem;
