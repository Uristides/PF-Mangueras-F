import React, { useState, useEffect, createContext } from "react";
import { Login } from "./views/login/login";
import Home from "./views/home/home";
import About from "./components/About/about";
import Cart from "./components/Cart/Cart";
import Detail from "./components/Detail/Detail";
import Dashboard from "./views/admin/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Checkout from "./components/Checkout/Checkout";
import PaymentFeedback from "./components/PaymentFeedback/PaymentFeedback";
import Profile from "./components/Profile/Profile";
import { Route, Routes, Navigate } from "react-router-dom";
import { initMercadoPago } from "@mercadopago/sdk-react";

const backendUrl = import.meta.env.VITE_BACKEND;

export const UserContext = createContext(null);


initMercadoPago('APP_USR-f9778cd5-2698-4783-954b-94f05d959a29', {
  locale: 'es-MX',
});

function App() {
  const [user, setUser] = useState(false
    // Recupera el usuario de localStorage al inicializar el estado
    //const savedUser = localStorage.getItem('user');
    //return savedUser ? JSON.parse(savedUser) : false;
  );
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar sesion={sesion} onSearch={setSearchTerm} />
        <Routes>
          <Route
            path="/"
            element={<Home sesion={sesion} searchTerm={setSearchTerm} />}
          />
          {user ? (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/feedback" element={<PaymentFeedback />} />
              <Route path="/profile" element={<Profile />} />
              {user.rol === "Admin" && (
                <Route
                  path="/admin/*"
                  element={<Dashboard sesion={sesion} />}
                />
              )}
            </>
          ) : (
            <>
              <Route path="/cart" element={<Login sesion={sesion} />} />
              <Route path="/profile" element={<Navigate to="/login" />} />
            </>
          )}
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login sesion={sesion} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
