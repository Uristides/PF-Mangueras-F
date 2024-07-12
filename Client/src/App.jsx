import './App.css'
import { Login } from './views/login/login'
import { Home } from './views/home/home'
import Cart from './components/Cart/Cart'
import Navbar from './components/Navbar/Navbar'
import Detail from './components/Detail/Detail'
import {Route, Routes} from 'react-router-dom'


function App() {
  
  return (
    <>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/detail/:id' element={<Detail/>} />
    </Routes>
    </>
  )
}

export default App