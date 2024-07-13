import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './views/login/login';
import Navbar from './components/Navbar/Navbar';
import { Home } from './views/home/home';
import Cart from './components/Cart/Cart';
import About from './components/About/about';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
