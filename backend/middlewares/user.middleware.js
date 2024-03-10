const User=require('../models/user.model');
const {ApiError}=require('../utils/ApiError');
const jwt=require('jsonwebtoken');

const verifyJWT=async (req, res, next)=>{
    try{
        const token=req.cookies?.accessToken;
        if(!token){
            throw new ApiError(401, "Unauthorized request");
        }
        const decodedToken=jwt.verify(token, process.env.JWT_SECRET);
        const user=await User.findById(decodedToken?._id).select("-password");
        if(!user){
            throw new ApiError(401, "Invalid Access Token");
        }
        req.user=user;
        next();
    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        res.status(statusCode).json({
            message: errorMessage
        })
    }
}

const verifyAdmin=async (req, res, next)=>{
    try{
        const {user}=req;
        if(!user){
            throw new ApiError(500, "User not Present");
        }
        if(user.role===0){
            throw new ApiError(401, "Not an Admin");
        }
        next();
    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        res.status(statusCode).json({
            messaege: errorMessage
        });
    }
}

module.exports={verifyJWT, verifyAdmin};