import React, { useState } from 'react'
import Navbar from './../components/Navbar.js';
import { apiEndPoints } from '../utils/api.js';
import { useAuth } from '../context/auth.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [errorMessage, setErrorMessage]=useState('');
  const {setUser, setIsLoggedIn}=useAuth();
  const navigate=useNavigate();

  const handleSubmit=async (e)=>{
    try{
      if(!email || !password){
        throw new Error('Fill all fields');
      }

      const response=await fetch(
        apiEndPoints.login,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data=await response.json();

      if(!response.ok){
        throw new Error(data.message);
      }

      // console.log(data.data.user);
      setUser(data.data.user);
      setIsLoggedIn(true);
      navigate('/');

    }catch(error){
      // console.log(error.message);
      setErrorMessage(error.message);
    }
  }

  return (
    <div>
      <Navbar />
      <div className='signin-box mx-auto border-gray-200 rounded-md border-2 w-1/3 mt-48 p-3 flex flex-col gap-1'>
        <label htmlFor="email" className='text-lg text-gray-700' >E-mail</label>
        <input type="text" id='email' className='focus:outline-blue-600 rounded-md p-2 text-md bg-gray-100' onChange={(e)=>{setEmail(e.target.value)}} />
        <label htmlFor="password" className='text-lg text-gray-700' >Password</label>
        <input type="password" id='password' className='focus:outline-blue-600 rounded-md p-2 text-md bg-gray-100' onChange={(e)=>{setPassword(e.target.value)}} />
        {errorMessage && <div className='text-red-600 text-center'>{errorMessage}</div>}
        <button className='bg-blue-600 hover:bg-blue-700 text-white mt-2 p-2 text-lg rounded-md' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Login