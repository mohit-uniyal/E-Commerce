import React from 'react'

const ProductCard = ({product, setCurrentProductId, setUpdateProduct}) => {

  const handleProductClick=()=>{
    setCurrentProductId(product._id);
    setUpdateProduct(true);
  }

  return (
    <div className='w-[30%] cursor-pointer px-2 py-4 rounded-md bg-gray-100 flex flex-col justify-between gap-1 items-center' onClick={handleProductClick}>
        <img className=' w-5/6 rounded-md' src={product.photo} alt="" />
        <div className=' text-lg font-semibold '>{product.name}</div>
        <div className='text-2xl w-full'>₹{product.price}</div>
    </div>
  )
}

export default ProductCard