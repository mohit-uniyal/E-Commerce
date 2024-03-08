import React from 'react'
import CustomFooter from '../components/CustomFooter'
import Navbar from '../components/Navbar'

const Notfound = () => {
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <Navbar />
      <div className='flex flex-col gap-2 text-center'>
        <div className='text-8xl animate-bounce'>404</div>
        <div className='text-2xl'>Oops! page not found</div>
      </div>
      <CustomFooter />
    </div>
  )
}

export default Notfound