import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { Login } from './views/login/login'
import { Home } from './views/home/home'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Login></Login>
      <Home></Home>
    </>
  )
}

export default App
