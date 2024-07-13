import { useState,useEffect,createContext } from 'react'
//import './App.css'
import { Login } from './views/login/login'
import { Home } from './views/home/home'
import Cart from './components/Cart/Cart'

import {Route, Routes} from 'react-router-dom'

export const UserContext = createContext(null);

function App() {
  const [user , setUser] = useState(false);

  const sesion = async ()=>{
    try {
      const data = await fetch("http://localhost:3001/user/protected",{credentials:"include"})
      if (data.ok) {
        setUser(await data.json())
      }
      else {return}
    } catch (error) {
      throw new Error(error.message);
    }
  }
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
      
      <UserContext.Provider value={{user,setUser}}>
    <Routes>
      
    <Route path='/' element={<Home sesion={sesion}/>} />
      {user ? <Route path='/cart' element={<Cart/>} />:
      <Route path='/cart' element={<Login sesion={sesion}/>} />
      }
      
      
    </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App