import React from 'react'
import CustomFooter from '../../components/CustomFooter'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'

const Success = () => {

  const navigate=useNavigate();

  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <Navbar />
      <div className='flex flex-col gap-4 text-center items-center'>
        <div className='text-4xl'>Payment successful</div>
        <button className='text-2xl border-[1px] hover:scale-[1.05] transition-all py-1 rounded-md border-gray-500 w-1/5' onClick={()=>{navigate('/')}} >Shop More</button>
      </div>
      <CustomFooter />
    </div>
  )
}

export default Success