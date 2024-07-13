import React, { useState ,useContext} from 'react';
import Filters from '../../components/Filters/Filters';
import Sort from '../../components/Sort/Sort';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';
import styles from "./home.module.css"
import Navbar from '../../components/Navbar/Navbar.jsx'
import { UserContext } from '../../App.jsx';

export function Home({sesion}) {
  const {user} = useContext(UserContext);
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  console.log(user);
  const borrarCookie = (nombre) => {
    document.cookie = nombre + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
};
const logout = async()=>{
    const response = await fetch("http://localhost:3001/user/logout",{
      method:'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json' 
    },
    });
    if (response.ok) {
        borrarCookie("lacookie")
        sesion();
       return location.reload()
    }
}
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
    <main>
      <header className={styles.header}>
        <Navbar></Navbar>
      </header>
      <section className={styles.sectionmain}>
        <aside className={styles.filter}>
          <Filters onFilterChange={handleFilterChange} />
          <Sort onSortChange={handleSortChange} />
          <SearchBar onSearchChange={handleSearchChange} />
        </aside>
        <section className={styles.section}>
          {user && <h1 className={styles.h1}>Bienvenido {user.name}</h1>}
          <Cards filters={filters} sortOption={sortOption} searchQuery={searchQuery} />
          <button onClick={logout} className={styles.logout}>Cerrar sesion</button>
        </section>
      </section>
    </main>
  );
}
