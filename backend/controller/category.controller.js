const Category=require('../models/category.model');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

const createCategoryController=async(req, res)=>{
    try{
        //1. fetch the name of the new category from the req body.
        //2. check if the category is not already present in the database.
        //3. create category and send the response.
        const {categoryName}=req.body;
        const exists=await Category.findOne({name: categoryName});
        if(exists){
            throw new ApiError(409, "Category already exists");
        }
        const newCategory=await Category.create({
            name: categoryName.toLowerCase()
        })
        res.status(201).json(
            new ApiResponse(
                201,
                newCategory,
                "Category created successfully"
            )
        );
    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        res.status(statusCode).json({
            message: errorMessage
        })
    }
}

const updateCategoryController=async (req, res)=>{
    try{
        //1. fetch the id and newName of the category from req body;
        //2. if the id exists in the database
        //3. update the category with new name
        //4. send the success response
        const {id, newName}=req.body;

        const exists=await Category.findById(id);
        if(!exists){
            throw new ApiError(404, "Category not found");
        }
        const updatedCategory=await Category.findByIdAndUpdate(
            id,
            {
                name: newName
            },
            {
                new: true
            }
        );
        res.status(200).json(
            new ApiResponse(
                200,
                updatedCategory,
                "Category updated successfully"
            )
        )
    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        res.status(statusCode).json({
            message: errorMessage
        })
    }
}

const deleteCategoryController=async(req, res)=>{
    try{
        //1. fetch the id of the category from the request body.
        //2. check if the category exists
        //3. delete the category
        const {id}=req.body;

        const exists=await Category.findById(id);
        if(!exists){
            throw new ApiError(404, "Category not found");
        }
        await Category.findByIdAndDelete(id);
        res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Category removed successfully"
            )
        )
    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        res.status(statusCode).json({
            message: errorMessage
        })
    }
}

const getCategoriesController=async(req, res)=>{
    try{
        //1. fetch all the categories from the database.
        //2. send the categories as response to the user.
        const categories=await Category.find({}).select("-createdAt -updatedAt");
        res.status(200).json(
            new ApiResponse(
                200,
                categories,
                "categores fetched successfully"
            )
        );
    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        res.status(statusCode).json({
            message: errorMessage
        })
    }
}

module.exports={
    createCategoryController, 
    updateCategoryController, 
    deleteCategoryController,
    getCategoriesController
};