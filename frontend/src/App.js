import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Notfound from './pages/Notfound';
import PrivateRoutes from './utils/PrivateRoutes.js';
import Dashboard from './pages/dashboard/Dashboard.js';
import Cart from './pages/cart/Cart.js';
import ProductDetails from './pages/ProductDetails.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Notfound />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
      {/* <ToastContainer /> */}
    </BrowserRouter>
  )
}

export default App