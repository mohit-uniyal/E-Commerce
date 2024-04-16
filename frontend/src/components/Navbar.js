import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingBag } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from '../context/auth';
import { apiEndPoints } from '../utils/api';

const Header = () => {
    const currentPage=window.location.pathname;
    const [navOpen, setNavOpen]=useState(false);
    const {isLoggedIn, setIsLoggedIn, setUser}=useAuth();
    
    const navOptions=[
      {
        path: '/',
        page: 'Home'
      },
      {
        path: '/signup',
        page: 'Signup'
      },
      {
        path: '/login',
        page: 'Login'
      },
      {
        path: '/dashboard',
        page: 'Dashboard'
      },
      {
        path: '/cart',
        page: 'Cart'
      }
    ]

    const logoutHandler=async()=>{
      try{
        const response=await fetch(apiEndPoints.logout, {
          method: 'GET',
          credentials: 'include'
        });
        if(!response.ok){
          const data=await response.json();
          throw new Error(data.message);
        }
        setIsLoggedIn(false);
        setUser(null);
      }catch(error){
        console.log(error);
      }
    }

  return (
    <div className='flex justify-between relative w-full items-center md:p-3 py-3 px-2 border-b-2 border-gray-400 bg-white'>
        <Link to='/home' className='flex gap-2 items-center md:text-2xl text-xl font-medium z-10' >
            <FaShoppingBag />
            <h1 >Ecommerce-App</h1>
        </Link>
        <div className={`nav-links transition-all flex md:flex-row flex-col md:static absolute -left-0.5 ${navOpen ? 'top-full' : '-top-[123px]'} w-screen text-xl text-gray-500 md:w-1/3 md:min-w-96 gap-2 items-center md:justify-between z-0`}>
            {
              navOptions
              .filter((navOption) => {
                if(isLoggedIn){
                  if(navOption.path==='/signup' || navOption.path==='/login'){
                    return false;
                  }else{
                    return true;
                  }
                }else{
                  if(navOption.path==='/dashboard'){
                    return false;
                  }else{
                    return true;
                  }
                }
              })
              .map((navOption, index)=> <Link key={index} to={navOption.path} className={`hover:text-gray-700 transition-all ${currentPage===navOption.path ? 'underline' : ''}`}>{navOption.page}</Link>)
            }
            {isLoggedIn && <button className='hover:text-gray-700 transition-all' onClick={logoutHandler} >Logout</button>}
        </div>
        <GiHamburgerMenu className='md:hidden text-2xl z-10' onClick={()=>{setNavOpen(!navOpen)}} />
    </div>
  )
}

export default Header