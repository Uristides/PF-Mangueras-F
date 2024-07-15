import { useState, useEffect, createContext } from 'react';
//import './App.css'
import Navbar from './components/Navbar/Navbar';
import { Login } from './views/login/login';
import { Home } from './views/home/home';
import Cart from './components/Cart/Cart';
import Detail from './components/Detail/Detail';
import About from './components/About/about';

import { Route, Routes } from 'react-router-dom';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(false);

  const sesion = async () => {
    try {
      const data = await fetch('http://localhost:3001/user/protected', {
        credentials: 'include',
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

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);
  //console.log(user);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home sesion={sesion} />} />
          {user ? (
            <Route path='/cart' element={<Cart />} />
          ) : (
            <Route path='/cart' element={<Login sesion={sesion} />} />
          )}
          <Route path='/about' element={<About />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/login' element={<Login sesion={sesion} />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
