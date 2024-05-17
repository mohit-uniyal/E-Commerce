import React, { useState } from 'react'
import { useAuth } from '../../../../context/auth';
import { apiEndPoints } from '../../../../utils/api';
import {toast} from 'react-toastify';

const Profile = () => {

    //id, name, email, phone, address

    const {user, setUser}=useAuth();
    const [name, setName]=useState(user.name);
    const [email, setEmail]=useState(user.email);
    const [phone, setPhone]=useState(user.phone);
    const [address, setAddress]=useState(user.address);

    const [requestPending, setRequestPending]=useState(false);

    const handleSubmit=async ()=>{
      setRequestPending(true);
      try{
        const response=await fetch(apiEndPoints.updateUserDetails, {
          method: 'POST',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            _id: user._id,
            name,
            email,
            phone,
            address
          })
        });

        const data=await response.json();

        if(!response.ok){
          throw new Error(data.message);
        }

        setUser(data.data);

        toast.success('Profile Updated', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
        
      }catch(error){
        console.log(error);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
      }
      setRequestPending(false);
    }

  return (
    <div className='flex flex-col gap-3'>
        <div className='text-3xl'>Profile</div>
        <input type="text" id="" placeholder='Name' className='w-full border-2 border-gray-300 rounded-md p-1 text-lg focus:outline-blue-500' disabled={requestPending} value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="text" id="" placeholder='E-mail' className='w-full border-2 border-gray-300 rounded-md p-1 text-lg focus:outline-blue-500' disabled={requestPending} value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="text" id="" placeholder='Phone' className='w-full border-2 border-gray-300 rounded-md p-1 text-lg focus:outline-blue-500' disabled={requestPending} value={phone} onChange={(e)=>setPhone(e.target.value)} />
        <input type="text" id="" placeholder='Address' className='w-full border-2 border-gray-300 rounded-md p-1 text-lg focus:outline-blue-500' disabled={requestPending} value={address} onChange={(e)=>setAddress(e.target.value)} />
        <button type="submit" className='w-full text-lg bg-blue-500 rounded-md text-white py-1 hover:bg-blue-600' onClick={handleSubmit} >Submit</button>
    </div>
  )
}

export default Profile