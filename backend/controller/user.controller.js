const User = require("../models/user.model");
const {ApiError}=require("./../utils/ApiError");
const {ApiResponse}=require("./../utils/ApiResponse");

const registerController=async (req, res)=>{
    // 1. fetch all data from body of request
    // 2. check if relevant data is provided or not
    // 3. check if the user already exists or not
    // 4. create a new user object
    // 5. check for new user creation and remove password from response
    // 6. return response
    
    try{
        const {name, email, password, phone, address}=req.body;
        if(!name || !email || !password || !phone){
            throw new ApiError(400, "Inadequate information");
        }

        const exists=await User.findOne({email});

        if(exists){
            throw new ApiError(409, "User already exists");
        }

        const user=await User.create({
            name,
            email,
            password,
            phone,
            address
        });

        const createdUser=await User.findById(user._id).select("-password");

        if(!createdUser){
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        return res.status(201).json(
            new ApiResponse(201, createdUser, "User registered successfully")
        );

    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        return res.status(statusCode).json({
            message: errorMessage
        });
    }
}

const loginController=async (req, res)=>{
    //1. fetch data from request body
    //2. check if all the fields are available
    //3. check if user exists or not
    //4. check for password
    //5. generate token and send as cookie
    //6. send the response
    try{
        const {email, password}=req.body;

        if(!email || !password){
            throw new ApiError(400, "Inadequate information");
        }

        const user=await User.findOne({email});

        if(!user){
            throw new ApiError(404, "User not registered");
        }

        const isPasswordValid=await user.isPasswordCorrect(password);

        if(!isPasswordValid){
            throw new ApiError(401, "Invalid user credentials");
        }

        const accessToken=user.generateAccessToken();

        const loggedInUser=await User.findById(user._id).select("-password");

        const options={
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken
                },
                "User logged in successfully"
            )
        );

    }catch(error){
        const statusCode=error.statusCode || 500;
        const errorMessage=error.message || "Something went wrong";
        return res.status(statusCode).json({
            message: errorMessage
        });
    }
}

const logoutController=(req, res)=>{
    const options={
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie('accessToken', '', options)
    .json(
        new ApiResponse(
            200,
            {},
            "Logged out successfully"
        )
    );
}

const userDetailsController=async (req, res)=>{
    try{
        const user=req.user;
        res.status(200).json(
            new ApiResponse(
                200,
                user,
                "Details fetched successfully"
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

module.exports={registerController, loginController, userDetailsController, logoutController};