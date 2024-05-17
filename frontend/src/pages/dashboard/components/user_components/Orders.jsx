import React, { useMemo, useState } from 'react'
import { apiEndPoints } from '../../../../utils/api';
import SingleOrder from './components/SingleOrder';

const Orders = () => {

  const [orders, setOrders]=useState([]);

  useMemo(()=>{
    const fetchUserOrders=async ()=>{
      try{
        const response=await fetch(apiEndPoints.getUserOrders, {
          method: 'GET',
          credentials: 'include'
        });

        const data=await response.json();

        if(!response.ok){
          throw new Error(data.message);
        }

        setOrders(data.data);

      }catch(error){
        console.log(error);
      }
    }
    fetchUserOrders();
  }, []);

  return (
    <div className='w-full'>
        <div className='text-3xl'>Orders</div>
        <br />
        <div className='w-full flex flex-col gap-3'>
          {
            orders.map((order, index)=><SingleOrder key={index} order={order} />)
          }
        </div>
    </div>
  )
}

export default Orders