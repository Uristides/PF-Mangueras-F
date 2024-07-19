// src/App.jsx
import React, { useState, useEffect, createContext } from "react";
//import './App.css'
import { Login } from "./views/login/login";
import Home from "./views/home/home"; // Importa Home como el componente predeterminado
const backendUrl = import.meta.env.VITE_BACKEND;

import About from "./components/About/about";
import Cart from "./components/Cart/Cart";
import Detail from "./components/Detail/Detail";
import Dashboard from "./views/admin/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import EditItem from "./components/Admin/Edit/EditItem";

import { Route, Routes } from "react-router-dom";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(false);

  const sesion = async () => {
    try {
      const data = await fetch(`${backendUrl}/user/protected`, {
        credentials: "include",
      });
      if (data.ok) {
        setUser(await data.json());
      } else {
        return;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  useEffect(() => {
    const handleBeforeUnload = (event) => sesion();
    const handleLoad = () => sesion();

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  console.log(user);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar sesion={sesion} />
        <Routes>
          <Route path="/" element={<Home sesion={sesion} />} />{" "}
          {/* Renderiza Home correctamente */}
          {user ? (
            <Route path="/cart" element={<Cart />} />
          ) : (
            <Route path="/cart" element={<Login sesion={sesion} />} />
          )}
          <Route path="/admin/*" element={<Dashboard />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login sesion={sesion} />} />
          <Route path="/about" element={<About />} />
          {/* <Route path='/admin/product/edit/:id' element={<EditItem/>}/> */}
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
