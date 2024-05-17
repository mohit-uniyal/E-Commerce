import React from 'react'

const OrderProductItem = ({product}) => {
  return (
    <div className='bg-white rounded-lg hover:scale-101 flex justify-between items-center'>
        <img src={product.photo} alt="" className='w-1/12' />
        <div className='w-7/12 font-semibold'>{product.name}</div>
        <div className='w-2/12 text-center'>
            <div className='text-lg font-semibold'>₹ {product.price}</div>
        </div>
    </div>
  )
}

export default OrderProductItem