import React from 'react'
import ReactDOM from 'react-dom/client'
import {Auth0Provider} from '@auth0/auth0-react';
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import store from './redux/store.js'
import { Provider } from 'react-redux';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

<Provider store={store}>
  <BrowserRouter>
  <React.StrictMode>
    <Auth0Provider domain='facundocortez.us.auth0.com' clientId='Ur1a4ABUQXK5Sl6wiwOgt8Bmtn2E8NMM' >
     <App />
    </Auth0Provider>
  </React.StrictMode>
  </BrowserRouter>
</Provider>
)