import React, { useEffect, useState } from 'react'
import CustomFooter from '../../components/CustomFooter'
import Navbar from '../../components/Navbar'
import { CiShoppingCart } from "react-icons/ci";
import CartProductItem from './components/CartProductItem';
import { useCart } from '../../context/cart';

const EmptyCart=()=>{
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <Navbar />
      <div className='flex flex-col items-center'>
        <CiShoppingCart className='text-6xl animate-bounce' />
        <div className='text-3xl font-bold text-center'>Cart is empty</div>
      </div>
      <CustomFooter />
    </div>
  );
}

const Cart = () => {
  
  const {cart, setCart}=useCart();
  const [totalCost, setTotalCost]=useState(0);
  
  useEffect(()=>{
    setTotalCost(cart.reduce((total, item)=>total+item.price, 0));
  }, [cart]); 

  if(cart.length===0){
    return <EmptyCart />
  }

  return (
    <div className='flex flex-col min-h-screen justify-between gap-4'>
        <Navbar />
        <div className='grow flex justify-evenly gap-2'>
          <div className=' bg-gray-200 rounded-lg h-fit w-6/12 p-3 flex flex-col gap-3'>
            {
              cart.map((product, index)=>{
                return <CartProductItem key={index} product={product} setCart={setCart} cart={cart} />
              })
            }
          </div>
          <div className=' w-3/12'>
            <div className=' text-center text-4xl font-light'>Cart Summary</div>
            <br />
            <div className='text-center text-md'>Total | Checkout | Payment</div>
            <br />
            <div className=' bg-black h-[1px]' ></div>
            <br />
            <div className='text-3xl text-center'>Total:₹ {totalCost}</div>
          </div>
        </div>
        <CustomFooter />
    </div>
  )
}

export default Cart