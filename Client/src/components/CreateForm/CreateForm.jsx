import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CreateForm.module.css";
// import { createProduct } from "../../redux/actions";
const backendUrl = import.meta.env.VITE_BACKEND;

const CreateForm = () => {
  const initialState = {
    name: "",
    diameter: "",
    brand: "",
    length: "",
    type: "",
    stock: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false); // Cambiado a false inicialmente
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    if (!formData.length) {
      newErrors.length = "Longitud es requerida";
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
        const response = await axios.post(`${backendUrl}/products`, formData);
        console.log("Respuesta del servidor:", response.data);
        setSuccessMessage("Manguera creada exitosamente");
        setFormData(initialState); // Limpiar campos del formulario
      } catch (error) {
        console.error("Error creando manguera:", error);
      } finally {
        setLoading(false); // Ocultar estado de carga después de completar la solicitud
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
          <label>Diámetro</label>
          <input
            type="text"
            name="diameter"
            value={formData.diameter}
            onChange={handleChange}
          />
          {errors.diameter && <p className="error">{errors.diameter}</p>}
        </div>
        <div>
          <label>Marca</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
          {errors.brand && <p className="error">{errors.brand}</p>}
        </div>
        <div>
          <label>Longitud</label>
          <input
            type="text"
            name="length"
            value={formData.length}
            onChange={handleChange}
          />
          {errors.length && <p className="error">{errors.length}</p>}
        </div>
        <div>
          <label>Tipo</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
          {errors.type && <p className="error">{errors.type}</p>}
        </div>
        <div>
          <label>Stock</label>
          <input
            type="text"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
          {errors.stock && <p className="error">{errors.stock}</p>}
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
          <label>Imagen</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Manguera"}
        </button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      <button onClick={handleClick}>Volver a Home</button>
    </div>
  );
};

export default CreateForm;
