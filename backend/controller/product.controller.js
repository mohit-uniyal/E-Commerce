const { uploadOnCoudinary, deleteFromCloudinary } = require("../utils/cloudinary");
const Product =require('../models/product.model');
const { ApiResponse } = require("../utils/ApiResponse");
const fs=require('fs');
const { ApiError } = require("../utils/ApiError");

const getPublicID=(url)=>{
    return url.split('/').pop().slice(0, -4);
}

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
            throw new ApiError(401, 'fill the all the details');
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

const getAllProductsController=async (req, res)=>{
    try{
        //1. get all the filters from parameters
        //2. fetch all the products from the database.
        //2. send the response to user.
        const {categoriesSelected, priceSelected}=req.body;
        const filter={};
        if(categoriesSelected.length>0){
            filter.category = {
                $in : categoriesSelected
            }
        }
        if(Object.keys(priceSelected).length>0){
            filter.price = {
                $gte: priceSelected.lb,
                $lte: priceSelected.ub
            }
        }
        const products=await Product.find(filter);
        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                products,
                "products fetched successfully"
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

const updateProductController=async (req, res)=>{
    try{
        //1. fetch all the details from the body along with the unique id.
        //2. fetch and check if the product exists.
        //3. temporarily store the old cloudinary url of the product.
        //4. get the photo of product if exists.
        //5. upload the photo to cloudinary.
        //6. get the url from the response.
        //7. update the product.
        //8. fetch the public id of the image from the cloudinary url.
        //9. delete the old cloudinary image.
        //10. return the response to client.

        const {id, name, description, price, category, quantity}=req.body;
        if(!id || !name || !description || !price || !category || !quantity){
            throw new ApiError(400, 'fill the all the details');
        }

        const exists=await Product.findById(id);
        if(!exists){
            throw new ApiError(404, "This product does not exists");
        }

        const oldPhotoURL=exists.photo;

        const productPhotoLocalPath=req.file?.path;
        const productPhoto=await uploadOnCoudinary(productPhotoLocalPath);

        const updatedProduct=await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                category,
                quantity,
                photo: productPhoto?.url || ''
            },
            {
                new: true
            }
        );

        const oldPublicID=getPublicID(oldPhotoURL);

        await deleteFromCloudinary(oldPublicID);

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedProduct,
                "Product updated successfully"
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

const deleteProductController=async (req, res)=>{
    try{
        //1. fetch the id of the product from the url
        //2. check if the product exists
        //3. if exists, temporarily store the photo cloudinary url of the product
        //4. delete the product from database.
        //5. retrieve the public id from the cloudinary url.
        //6. delete the photo from cloudinary.
        //7. return the response.

        const {id}=req.params;

        const exists=await Product.findById(id);

        if(!exists){
            throw new ApiError(404, "product doesn't exists");
        }

        const photoURL=exists.photo;

        await Product.findByIdAndDelete(id);

        const publicId=getPublicID(photoURL);

        await deleteFromCloudinary(publicId);

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Product deleted successfully"
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

const getProductController=async (req, res)=>{
    //1. fetch the id of product
    //2. check if the product exists
    //3. if product exists, send the product info
    try{
        const {id}=req.params;

        const product=await Product.findById(id);

        if(!product){
            throw new ApiError(404, "product not found");
        }

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                product,
                "product fetched successfully"
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

module.exports={createProductController, getAllProductsController, updateProductController, deleteProductController, getProductController};