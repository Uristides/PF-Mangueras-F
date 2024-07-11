import React, { useState } from 'react';
import Filters from '../../components/Filters/Filters';
import Cards from '../../components/Cards/Cards';

export function Home() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <Cards filters={filters} />
    </div>
  );
}
