// src/components/Admin/AdminPromotions.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]); // Estado para los productos
  const [selectedProducts, setSelectedProducts] = useState([]); // Productos seleccionados
  const [form, setForm] = useState({
    title: '',
    description: '',
    discountPercentage: 0,
    startDate: '',
    endDate: '',
    isActive: true,
  });
  const [editing, setEditing] = useState(false);
  const [currentPromotionId, setCurrentPromotionId] = useState(null);

  useEffect(() => {
    fetchPromotions();
    fetchProducts();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get('/api/promotions');
      setPromotions(response.data);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...form,
        products: selectedProducts,
      };
      if (editing) {
        await axios.put(`/api/promotions/${currentPromotionId}`, data);
      } else {
        await axios.post('/api/promotions', data);
      }
      fetchPromotions();
      resetForm();
    } catch (error) {
      console.error('Error saving promotion:', error);
    }
  };

  const handleEdit = (promotion) => {
    setEditing(true);
    setCurrentPromotionId(promotion.id);
    setForm({
      title: promotion.title,
      description: promotion.description,
      discountPercentage: promotion.discountPercentage,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      isActive: promotion.isActive,
    });
    setSelectedProducts(promotion.products.map((p) => p.id)); // Asigna productos seleccionados
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/promotions/${id}`);
      fetchPromotions();
    } catch (error) {
      console.error('Error deleting promotion:', error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await axios.put(`/api/promotions/${id}`, { isActive: !isActive });
      fetchPromotions();
    } catch (error) {
      console.error('Error toggling promotion:', error);
    }
  };

  const resetForm = () => {
    setEditing(false);
    setCurrentPromotionId(null);
    setForm({
      title: '',
      description: '',
      discountPercentage: 0,
      startDate: '',
      endDate: '',
      isActive: true,
    });
    setSelectedProducts([]);
  };

  return (
    <div className="admin-promotions">
      <h1>Gestión de Promociones</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="discountPercentage"
          placeholder="Porcentaje de Descuento"
          value={form.discountPercentage}
          onChange={handleInputChange}
          required
          min="0"
          max="100"
        />
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleInputChange}
          required
        />
        
        <h3>Selecciona los Productos</h3>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id}>
              <label>
                <input
                  type="checkbox"
                  value={product.id}
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleProductSelect(product.id)}
                />
                {product.name}
              </label>
            </li>
          ))}
        </ul>

        <button type="submit">{editing ? 'Actualizar' : 'Crear'} Promoción</button>
      </form>

      <h2>Promociones Actuales</h2>
      <ul>
        {promotions.map((promotion) => (
          <li key={promotion.id}>
            <h3>{promotion.title}</h3>
            <p>{promotion.description}</p>
            <p>Descuento: {promotion.discountPercentage}%</p>
            <p>Desde: {new Date(promotion.startDate).toLocaleDateString()}</p>
            <p>Hasta: {new Date(promotion.endDate).toLocaleDateString()}</p>
            <p>Estado: {promotion.isActive ? 'Activo' : 'Inactivo'}</p>
            <button onClick={() => handleEdit(promotion)}>Editar</button>
            <button onClick={() => handleDelete(promotion.id)}>Eliminar</button>
            <button onClick={() => handleToggleActive(promotion.id, promotion.isActive)}>
              {promotion.isActive ? 'Desactivar' : 'Activar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPromotions;
