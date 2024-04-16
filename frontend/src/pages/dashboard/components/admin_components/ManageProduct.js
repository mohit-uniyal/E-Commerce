import React, { useEffect, useState } from 'react'
import { apiEndPoints } from '../../../../utils/api';
import ProductCard from './ProductCard';
import UpdateProduct from './UpdateProduct';

const ManageProduct = () => {

  const [products, setProducts]=useState([]);
  const [updateProduct, setUpdateProduct]=useState(false);
  const [currentProductId, setCurrentProductId]=useState('');
  const [productsUpdated, setProductsUpdated]=useState(false);

  useEffect(()=>{
    const getProducts=async ()=>{
      try{
        const response=await fetch(apiEndPoints.getProducts, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            categoriesSelected: [],
            priceSelected: {}
          })
        });
        const data=await response.json();
        if(!response.ok){
          throw new Error(data.message);
        }
        setProducts(data.data);
      }catch(error){
        console.log(error);
      }
    }
    getProducts();
  }, [productsUpdated]);

  return (
    <div className=' w-full'>
      {
        updateProduct
        ?
        <UpdateProduct setUpdateProduct={setUpdateProduct} currentProductId={currentProductId} productsUpdated={productsUpdated} setProductsUpdated={setProductsUpdated} />
        :
        <div>
          <h1 className='text-3xl'>Manage Product</h1>
          <div className='flex flex-wrap gap-4 justify-between mt-2'>
            {
              products.map((product, index)=><ProductCard key={index} product={product} setCurrentProductId={setCurrentProductId} setUpdateProduct={setUpdateProduct} />)
            }
          </div>
        </div>
      }
    </div>
  )
}

export default ManageProduct