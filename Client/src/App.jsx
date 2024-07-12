import { useState } from 'react'
import './App.css'
import { Login } from './views/login/login'
import { Home } from './views/home/home'
import Cart from './components/Cart/Cart'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/cart' element={<Cart/>} />
    </Routes>
    </>
  )
}

export default App