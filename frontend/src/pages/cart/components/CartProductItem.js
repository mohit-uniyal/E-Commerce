import React from 'react'

const CartProductItem = ({product, cart, setCart}) => {

    const removeItemHandler=()=>{
        setCart(
            cart.filter((item)=>item._id!==product._id)
        );
    }

  return (
    <div className='bg-white rounded-lg hover:scale-101 flex justify-between items-center'>
        <img src={product.photo} alt="" className='w-2/12' />
        <div className='w-7/12 font-semibold'>{product.name}</div>
        <div className='w-2/12 text-center'>
            <div className='text-lg font-semibold'>₹ {product.price}</div>
            <button className='bg-red-500 hover:bg-red-600 rounded-lg text-white p-2' onClick={removeItemHandler}>Remove Item</button>
        </div>
    </div>
  )
}

export default CartProductItem