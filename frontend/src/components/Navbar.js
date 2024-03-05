import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingBag } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    const currentPage=window.location.pathname;
    const [navOpen, setNavOpen]=useState(false);
  return (
    <div className='flex justify-between relative w-screen items-center md:p-3 py-3 px-2 border-b-2 border-gray-400 bg-white'>
        <Link to='/home' className='flex gap-2 items-center md:text-2xl text-xl font-medium z-10' >
            <FaShoppingBag />
            <h1 >Ecommerce-App</h1>
        </Link>
        <div className={`nav-links transition-all flex md:flex-row flex-col md:static absolute -left-0.5 ${navOpen ? 'top-full' : '-top-[123px]'} w-screen text-xl text-gray-500 md:w-1/3 md:min-w-96 gap-2 items-center md:justify-between z-0`}>
            <Link to='/' className={`hover:text-gray-700 transition-all ${currentPage==='/' ? 'underline' : ''}`}>Home</Link>
            <Link to='/category' className={`hover:text-gray-700 transition-all ${currentPage==='/category' ? 'underline' : ''}`}>Category</Link>
            <Link to='/signup' className={`hover:text-gray-700 transition-all ${currentPage==='/signup' ? 'underline' : ''}`}>Signup</Link>
            <Link to='/login' className={`hover:text-gray-700 transition-all ${currentPage==='/login' ? 'underline' : ''}`}>Login</Link>
            <Link to='/cart' className={`hover:text-gray-700 transition-all ${currentPage==='/cart' ? 'underline' : ''}`}>Cart</Link>
            
        </div>
        <GiHamburgerMenu className='md:hidden text-2xl z-10' onClick={()=>{setNavOpen(!navOpen)}} />
    </div>
  )
}

export default Header