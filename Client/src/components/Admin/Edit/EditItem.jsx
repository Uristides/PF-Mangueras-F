import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editItem } from "../../../redux/itemsSlice";
import { fetchBrands } from "../../../redux/brandsSlice";
import { fetchTypes } from "../../../redux/typesSlice";
import Cloudinary from "../../Cloudinary/Cloudinary";
import axios from "axios";
import styles from "./EditItem.module.css";

const backendUrl = import.meta.env.VITE_BACKEND;

const EditItem = () => {
  const { id: itemId } = useParams();
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccessful, setUpdateSuccessful] = useState(false)

//Redux
  const dispatch = useDispatch()
  const  types  = useSelector((state) => state.types.types);
  const  brands  = useSelector((state) => state.brands.brands);

  useEffect(()=>{
    dispatch((fetchBrands()))
    dispatch((fetchTypes()))
  },[])

  const [updatedProduct, setUpdatedProduct] = useState({
        id: itemId,
        name: '',
        image: '',
        price: '',
        diameter: '',
        longitude: '',
        description: '',
        stock: '',
        available: '',
        show: '',
        brand: '',
        type: '',
  });

  useEffect(() => {
    const getById = async (id) => {
      try {
        const { data } = await axios.get(`${backendUrl}/products/${id}`);
        setFetchedData(data);
        setUpdatedProduct(data)
        setLoading(false);
        setUpdateSuccessful(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to fetch product data.");
        setLoading(false);
      }
    };
    getById(itemId);
  }, [itemId, updateSuccessful]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleSetImageUrl = (imageUrl) =>{
    setUpdatedProduct((prevState)=>({
      ...prevState,
      image: imageUrl
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editItem(updatedProduct)).unwrap()
      setUpdatedProduct(fetchedData)
      setUpdateSuccessful(true)
    } catch (error) {
      console.error("Error updating data: ", error);
      setError("Failed to update product data.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleBackClick = ()=>{
    navigate(-1)
  }

  return (
    <div>
      <button onClick={handleBackClick}>Atras</button>
      <h2>Edit</h2>

      <form onSubmit={handleSubmit} className={styles.formDivs}>
        <div className={styles.pictureDiv}>
          <label>Current Image: </label>
          <img
            src={fetchedData.image}
            alt="Current product"
            className={styles.img}
          />
          <Cloudinary
          onValueChange={handleSetImageUrl}
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
          <select name="brand" value={updatedProduct.brand} onChange={handleChange}>

            <option value="">Selecciona una marca</option>
 
            {brands && brands.map((marca) => (
              
              <option key={marca.id} value={marca.brand} name={marca.brand}>{marca.brand}</option>
            ))}
          </select>
          
          <br />

          <label>Current Type: {fetchedData.type}</label>
          <select name="type" value={updatedProduct.type} onChange={handleChange}>
            <option value="">Select a type</option>

            {types && types.map((tipo) => (
              
              <option key={tipo.id} value={tipo.type} name={tipo.type}>{tipo.type}</option>
            ))}
            </select>
        
          <br />

          <label>Current Price: {fetchedData.price}</label>
          <input
            type="number"
            value={updatedProduct.price}
            name="price"
            onChange={handleChange}
            placeholder="New Price"
          />
          <br />

          <label>Current Diameter: {fetchedData.diameter}</label>
          <input

            value={updatedProduct.diameter}
            type="number"
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
            type="number"
            name="stock"
            onChange={handleChange}
            placeholder="New Stock"
          />

          <div>

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
          
          <div>

          <label>Current Show {String(fetchedData.show)}</label>
          <select name="show" value={updatedProduct.show} onChange={handleChange}>
            <option>--</option>
            <option  value={true}>Si</option>
            <option  value={false}>No</option>
          </select>
          </div>
        </div>



        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditItem;
