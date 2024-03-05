import React from 'react'
import Navbar from './../components/Navbar.js'
import { useAuth } from '../context/auth.js'

const Home = () => {
  const {user, isLoggedIn}=useAuth();
  return (
    <div>
        <Navbar />
    </div>
  )
}

export default Home