import React from "react";
import OrderProductItem from "./OrderProductItem";

const SingleOrder = ({order}) => {

    const date=new Date(order.createdAt);

  return (
    <div className=" bg-gray-200 rounded-lg h-fit w-full p-3 flex flex-col gap-3">
        <div className="flex justify-between">
            <div className=" text-lg ">Order Date: {`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</div>
            <div className="text-lg">Status: {`${order.status}`}</div>
        </div>
      {
        order.products.map((product, index) => <OrderProductItem key={index} product={product} />)
      }
    </div>
  );
};

export default SingleOrder;
