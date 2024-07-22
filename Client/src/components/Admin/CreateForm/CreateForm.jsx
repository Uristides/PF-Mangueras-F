import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTypes } from "../../../redux/typesSlice";
import { fetchBrands } from "../../../redux/brandsSlice";
import { productCreate } from '../../../redux/itemsSlice'
import { useNavigate } from "react-router-dom";
import styles from "./CreateForm.module.css";
import Cloudinary from "../../Cloudinary/Cloudinary";


const backendUrl = import.meta.env.VITE_BACKEND;

const CreateForm = () => {

  const dispatch = useDispatch();
  const  types  = useSelector((state) => state.types.types);
  const  brands  = useSelector((state) => state.brands.brands);
 

  useEffect(()=>{
    dispatch(fetchTypes())
    dispatch(fetchBrands())
  }, [])

 



  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    diameter: '',
    longitude: '',
    description: '',
    stock:0,
    available: false,
    show: false,
    brand: '',
    type: '',
  });

  const [loading, setLoading] = useState(false); // Cambiado a false inicialmente
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState)=>({
      ...prevState,
      [name]: value
      
    }))
  };

 

  const handleSetImageUrl = (imageUrl) =>{
    setFormData((prevState)=>({
      ...prevState,
      image: imageUrl
    }))
  }

  // Validaciones del formulario
  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Nombre es requerido";
    }
    if (!formData.diameter) {
      newErrors.diameter = "Diámetro es requerido";
    }
    if (!formData.brand) {
      newErrors.brand = "Marca es requerida";
    }
    if (!formData.longitude) {
      newErrors.longitude = "Longitud es requerida";
    }
    if (!formData.type) {
      newErrors.type = "Tipo es requerido";
    }
    if (!formData.stock) {
      newErrors.stock = "Stock es requerido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
     try {
      await dispatch(productCreate(formData)).unwrap()
      setSuccessMessage("Producto Creado exitosamente!")

      setLoading(false)
      setFormData({
        name: '',
        image: '',
        price: '',
        diameter: '',
        longitude: '',
        description: '',
        stock:0,
        available: false,
        show: false,
        brand: '',
        type: '',
        })
        alert("Producto Creado exitosamente!")
      
     } catch (error) {
      console.log("Error submit: ", error.message)
     }
    }
  };



  // para volver a la pagina principal
  const handleClick = () => {
    navigate("/");
  };

      

  return (
    <div className={styles["create-form"]}>
      
      <h1>Crear Nueva Manguera</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Marca</label>
    
          <select name="brand" value={formData.brand} onChange={handleChange}>

            <option value="">Selecciona una marca</option>
 
            {brands && brands.map((marca) => (
              
              <option key={marca.id} value={marca.brand} name={marca.brand}>{marca.brand}</option>
            ))}
          </select>
          {errors.brand && <p className="error">{errors.brand}</p>}
        </div>
        <div>
          <label>Precio</label>
            <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            />
        </div>
        <div>
          <label>Diámetro (cm)</label>
          <input
            type="number"
            name="diameter"
            value={formData.diameter}
            onChange={handleChange}
          />
          {errors.diameter && <p className="error">{errors.diameter}</p>}
        </div>
        <div>
          <label>Longitud (m)</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
          {errors.longitude && <p className="error">{errors.longitude}</p>}
        </div>
      
        
        <div>
          <label>Tipo</label>
          <select name="type" value={formData.type} onChange={handleChange}>

            <option value="">Select a type</option>
 
            {types && types.map((tipo) => (
              
              <option key={tipo.id} value={tipo.type} name={tipo.type}>{tipo.type}</option>
            ))}
          </select>

          {errors.type && <p className="error">{errors.type}</p>}
        </div>
        
        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
          {errors.stock && <p className="error">{errors.stock}</p>}
        </div>
        <div>
          <label>Disponible</label>
          <select name="available" value={formData.available} onChange={handleChange}>
            <option>--</option>
            <option name="available" value={true}>Si</option>
            <option name="available" value={false}>No</option>
          </select>
        </div>
        <div>
          <label>Mostrar en Tienda</label>
          <select name="show" value={formData.show} onChange={handleChange}>
            <option>--</option>
            <option  value={true}>Si</option>
            <option  value={false}>No</option>
          </select>
        </div>
        
        <div>
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          {/* <label>Imagen</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          /> */}
          <Cloudinary 
          onValueChange={handleSetImageUrl}/>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Manguera"}
        </button>
      </form>
      {/* {successMessage && <p>{successMessage}</p>} */}
      <button onClick={handleClick}>Volver a Home</button>
    </div>
  );
};

export default CreateForm;
