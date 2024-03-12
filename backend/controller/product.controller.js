const { uploadOnCoudinary } = require("../utils/cloudinary");
const Product =require('../models/product.model');
const { ApiResponse } = require("../utils/ApiResponse");
const fs=require('fs');

const createProductController=async (req, res)=>{
    try{
        //1. fetch all the details from the body
        //2. check if the details are filled
        //3. get the photo if exists
        //4. upload the photo to cloudinary
        //5. get the url from the response.
        //6. create a new document for the new product and save.
        //7. return the response to the client.

        const {name, description, price, category, quantity}=req.body;
        if(!name || !description || !price || !category || !quantity){
            throw new Error('fill the all the details');
        }


        const productPhotoLocalPath=req.file?.path;
        const productPhoto=await uploadOnCoudinary(productPhotoLocalPath);

        const productCreated=await Product.create({
            name,
            description,
            price,
            category,
            quantity,
            photo: productPhoto?.url || ""
        });

        res
        .status(201)
        .json(
            new ApiResponse(
                201,
                productCreated,
                "Product created successfully"
            )
        );
    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong"
        res.status(statusCode).json({
            message: errorMessage
        });
    }
}

module.exports={createProductController};