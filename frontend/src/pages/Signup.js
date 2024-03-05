import React, { useState } from 'react'
import Navbar from './../components/Navbar.js'
import { apiEndPoints } from '../utils/api.js';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [phoneNumber, setPhoneNumber]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [address, setAddress]=useState('');
  const [errorMessage, setErrorMessage]=useState('');
  const navigate=useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      if(!name || !email || !phoneNumber || !password || !confirmPassword){
        throw new Error("Fill all the fields");
      }

      if(password!==confirmPassword){
        throw new Error("password and confirm password doesn't match");
      }

      const response=await fetch(
        apiEndPoints.register,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone: phoneNumber,
            address
          })
        }
      );

      const data=await response.json();

      if(!response.ok){
        throw Error(data.message);
      }

      navigate('/login');

    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div>
      <Navbar />
      <div className='signup-box mx-auto border-gray-200 rounded-md border-2 w-1/3 mt-16 p-3 flex flex-col gap-1'>
        <label htmlFor="name" className='text-lg text-gray-700'>Name</label>
        <input type="text" id='name' className='focus:outline-blue-600 rounded-md p-2 text-md bg-gray-100' onChange={(e)=>{setName(e.target.value)}} />
        <label htmlFor="email" className='text-lg text-gray-700' >E-mail</label>
        <input type="text" id='email' className='focus:outline-blue-600 rounded-md p-2 text-md bg-gray-100' onChange={(e)=>{setEmail(e.target.value)}} />
        <label htmlFor="mobile" className='text-lg text-gray-700' >Phone Number</label>
        <input type="text" id='mobile' className='focus:outline-blue-600 rounded-md p-2 text-md bg-gray-100' onChange={(e)=>{setPhoneNumber(e.target.value)}} />
        <label htmlFor="password" className='text-lg text-gray-700' >Password</label>
        <input type="password" id='password' className='focus:outline-blue-600 rounded-md p-2 text-md bg-gray-100' onChange={(e)=>{setPassword(e.target.value)}} />
        <label htmlFor="confirm-password" className='text-lg text-gray-700' >Confirm Password</label>
        <input type="password" id='confirm-password' className='focus:outline-blue-600 rounded-md p-2 text-md bg-gray-100' onChange={(e)=>(setConfirmPassword(e.target.value))} />
        <label htmlFor="address" className='text-lg text-gray-700' >Address</label>
        <input type="text" id='address' className='focus:outline-blue-600 rounded-md p-2 text-md bg-gray-100' onChange={(e)=>{setAddress(e.target.value)}} />
        {errorMessage && <div className='text-red-600 text-center'>{errorMessage}</div>}
        <button className='bg-blue-600 hover:bg-blue-700 text-white mt-2 p-2 text-lg rounded-md' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Signup