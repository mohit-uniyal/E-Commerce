const Order = require("../models/order.model");
const Product = require("../models/product.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");


const getOrdersUserController=async (req, res)=>{
    try{
        //1. fetch the user id from req.
        //2. fetch all the orders of user from database.
        //3. send the response to user.

        const {_id}=req.user;

        const orders=await Order.find({user: _id});

        const ordersUpdated=[];

        for(const order of orders){
            const products=[];
            for(const productId of order.products){
                const product=await Product.findById(productId);
                products.push(
                    {
                        _id: product._id,
                        name: product.name,
                        photo: product.photo,
                        price: product.price
                    }
                );
            }
            ordersUpdated.push(
                {
                    ...order.toObject(),
                    products: products
                }
            )
        }

        res.status(200).json(
            new ApiResponse(
                200,
                ordersUpdated,
                "Orders fetched successfully"
            )
        );

    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        res.status(statusCode).json({
            message: errorMessage
        });
    }
}

const getOrdersAdminController=async (req, res)=>{
    try{
        //1. fetch all orders
        //2. send the response to admin/user.

        const orders=await Order.find({});

        const updatedOrders=[];

        for(const order of orders){
            let products=[];
            for(const productId of order.products){
                const product=await Product.findById(productId);
                products.push(product);
            }
            updatedOrders.push(
                {
                    ...order.toObject(),
                    products
                }
            );
        }

        res.status(200).json(
            new ApiResponse(
                200,
                updatedOrders,
                "Orders fetched successfully"
            )
        );

    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        res.status(statusCode).json({
            message: errorMessage
        });
    }
}

const updateOrderStatusController=async (req, res)=>{
    try{
        //1. fetch id and status from request body.
        //2. check if any such id exists or not.
        //3. if exists, then update the status.
        //4. send success response back.

        const {id, status}=req.body;

        const exists=await Order.findById(id);

        if(!exists){
            throw new ApiError(
                404,
                "Order doesn't exists"
            );
        }

        await Order.findByIdAndUpdate(
            id,
            {
                status
            }
        );

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Order status updated successfully"
            )
        )

    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        res.status(statusCode).json({
            message: errorMessage
        });
    }
}

module.exports={getOrdersUserController, getOrdersAdminController, updateOrderStatusController};