const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRY
        }
    );
}

const User=mongoose.model('User', userSchema);
module.exports=User;