import React, { useState } from "react";
import OrderProductItem from "./OrderProductItem";
import { apiEndPoints } from "../../../../../utils/api";

const SingleOrder = ({order}) => {

    const [orderStatus, setOrderStatus]=useState(order.status);

    const handleStatusSelector=async (id, status)=>{
        try{
            const response=await fetch(apiEndPoints.updateOrderStatus, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    status
                })
            });

            const data=await response.json();

            if(!response.ok){
                throw new Error(data.message);
            }

            console.log(data);
            setOrderStatus(status);

        }catch(error){
            console.log(error);
        }
    }

    const date=new Date(order.createdAt);

  return (
    <div className=" bg-gray-200 rounded-lg h-fit w-full p-3 flex flex-col gap-3">
        <div className="flex justify-between">
            <div className=" text-lg ">Order Date: {`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</div>
            <select className="text-lg px-3 py-1 rounded-md cursor-pointer" name="status-selector" value={orderStatus} onChange={(e)=>{handleStatusSelector(order._id, e.target.value)}} id="">
                <option value="processing">processing</option>
                <option value="packed">packed</option>
                <option value="shipping">shipping</option>
                <option value="delivered">delivered</option>
            </select>
        </div>
      {
        order.products.map((product, index) => <OrderProductItem key={index} product={product} />)
      }
    </div>
  );
};

export default SingleOrder;
