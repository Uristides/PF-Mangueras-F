import React, { useState } from 'react';
import Filters from '../../components/Filters/Filters';
import Sort from '../../components/Sort/Sort';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';

export function Home() {
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <Sort onSortChange={handleSortChange} />
      <SearchBar onSearchChange={handleSearchChange} />
      <Cards filters={filters} sortOption={sortOption} searchQuery={searchQuery} />
    </div>
  );
}
