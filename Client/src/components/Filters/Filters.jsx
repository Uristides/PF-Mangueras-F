import React from 'react';

const Filters = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div>
      <h2>Filtrar Productos</h2>
      <div>
        <label>
          Tipo:
          <select name="type" onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="Domestico">Doméstico</option>
            <option value="Industrial">Industrial</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Precio Máximo:
          <input type="number" name="price" onChange={handleFilterChange} />
        </label>
      </div>
      </div>
  );
};

export default Filters;
