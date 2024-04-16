import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useCart } from '../../context/cart';

const ProductCard = ({product}) => {

  const navigate=useNavigate();
  const {cart, setCart}=useCart();

  const cartHandler=()=>{
    for(const item of cart){
      if(item._id===product._id){
        toast.warn('Already added to cart', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        return;
      }
    }
    setCart([
      ...cart,
      product
    ]);
    toast.success('Added to cart', {
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

  return (
    <div className='w-[30%] px-2 py-4 rounded-md bg-gray-100 flex flex-col justify-between gap-2 items-center'>
        <img className=' w-5/6 rounded-md' src={product.photo} alt="" />
        <div className=' text-lg font-semibold '>{product.name}</div>
        <div className='text-2xl w-full'>₹{product.price}</div>
        <div className='w-full flex justify-between'>
          <button className='w-5/12 cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded-md py-2 text-white' onClick={()=>{navigate(`product/${product._id}`)}} >Description</button>
          <button className='w-5/12 cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded-md py-2 text-white' onClick={cartHandler} >Add to cart</button>
        </div>
    </div>
  )
}

export default ProductCard