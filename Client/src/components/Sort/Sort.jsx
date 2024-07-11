import React from 'react';

const Sort = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    const { value } = e.target;
    onSortChange(value);
  };

  return (
    <div>
      <h2>Ordenar Productos</h2>
      <select onChange={handleSortChange}>
        <option value="">Seleccionar</option>
        <option value="price_asc">Precio: Bajo a Alto</option>
        <option value="price_desc">Precio: Alto a Bajo</option>
        <option value="name_asc">Nombre: A-Z</option>
        <option value="name_desc">Nombre: Z-A</option>
      </select>
    </div>
  );
};

export default Sort;
