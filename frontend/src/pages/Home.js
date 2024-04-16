import React, { useEffect, useState } from 'react'
import Navbar from './../components/Navbar.js'
// import { useAuth } from '../context/auth.js'
import CustomFooter from '../components/CustomFooter.js';
import { apiEndPoints } from '../utils/api.js';
import ProductCard from './components/ProductCard.js';

const Home = () => {
  // const {user, isLoggedIn}=useAuth();

  const prices=[
    {
      name: '0 - 5000',
      lb: 0,
      ub: 5000
    },
    {
      name: '5000 - 10000',
      lb: 5000,
      ub: 10000
    },
    {
      name: '10000 - 30000',
      lb: 10000,
      ub: 30000
    },
    {
      name: '30000 +',
      lb: 30000,
      ub: 99999
    }
  ]

  const [products, setProducts]=useState([]);
  const [categories, setCategories]=useState([]);
  const [categoriesSelected, setCategoriesSelected]=useState([]);
  const [priceSelected, setPriceSelected]=useState({});

  useEffect(()=>{
    const getCategories=async ()=>{
      try {
        const response=await fetch(apiEndPoints.getCategories, {
          method: 'GET'
        })
        const data=await response.json();
        setCategories(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, []);

  useEffect(()=>{
    const getProducts=async ()=>{
      try {
        
        const response=await fetch(apiEndPoints.getProducts, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            categoriesSelected,
            priceSelected
          })
        })
        const data=await response.json();

        if(!response.ok){
          throw new Error(data.message);
        }

        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
      
    }
    getProducts();
  }, [categoriesSelected, priceSelected]);

  const handleCategorySelector=(e, category)=>{
    if(e.target.checked){
      setCategoriesSelected([
        ...categoriesSelected,
        category._id
      ])
    }else{
      setCategoriesSelected(categoriesSelected.filter((id)=>id!==category._id));
    }
  }

  const handlePriceSelector=(e, lb, ub)=>{
    setPriceSelected({
      lb,
      ub
    });
  }

  return (
    <div className='flex flex-col min-h-screen justify-between'>
        <Navbar />
        <div className='grow flex justify-between gap-6 my-2 px-2'>
          <div className=' w-3/12 flex flex-col '>
            <div className='flex flex-col'>
              <h1 className='text-2xl font-semibold'>Filter by category</h1>
              {
                categories.map((category, index)=>{
                  return (
                    <div key={index} className='flex gap-2 '>
                      <input className='cursor-pointer' name='category-selected' type="checkbox" onChange={(e)=>{handleCategorySelector(e, category)}} id={`${category.name}-selector`} />
                      <label className=' cursor-pointer font-normal' htmlFor={`${category.name}-selector`}>{category.name}</label>
                    </div>
                  )
                })
              }
              <br />
              <h1 className='text-2xl font-semibold'>Filter by price</h1>
              {
                prices.map((price, index)=>{
                  return (
                    <div key={index} className='flex gap-2 '>
                      <input className='cursor-pointer' value={price} type="radio" name='price' onChange={(e)=>{handlePriceSelector(e, price.lb, price.ub)}} id={`price-selector-${index}`} />
                      <label className=' cursor-pointer font-normal' htmlFor={`price-selector-${index}`}>
                        {
                          `₹${price.name}`
                        }
                      </label>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className=' grow w-5/12 flex gap-4 flex-wrap'>
            {
              products.map((product, index)=><ProductCard key={index} product={product} />)
            }
          </div>
        </div>
        <CustomFooter />
    </div>
  )
}

export default Home