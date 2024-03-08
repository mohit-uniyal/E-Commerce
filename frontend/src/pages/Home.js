import React from 'react'
import Navbar from './../components/Navbar.js'
// import { useAuth } from '../context/auth.js'
import CustomFooter from '../components/CustomFooter.js';

const Home = () => {
  // const {user, isLoggedIn}=useAuth();
  return (
    <div className='flex flex-col min-h-screen justify-between'>
        <Navbar />
        <CustomFooter />
    </div>
  )
}

export default Home