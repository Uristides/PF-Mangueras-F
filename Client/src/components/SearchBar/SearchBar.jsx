import React from 'react';

const SearchBar = ({ onSearchChange }) => {
  const handleSearchChange = (e) => {
    const { value } = e.target;
    onSearchChange(value);
  };

  return (
    <div>
      <h2>Buscar Productos</h2>
      <input type="text" placeholder="Buscar por nombre" onChange={handleSearchChange} />
    </div>
  );
};


export default SearchBar;
