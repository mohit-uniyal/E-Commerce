const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const userRoutes=require('./routes/user.routes');
const categoryRoutes=require('./routes/category.routes');
const productRoutes=require('./routes/product.routes');
const { connectDB } = require('./config/db');
const cookieParser = require('cookie-parser');
const port=process.env.PORT || 4000;

//dotenv config
dotenv.config();

//middlewares
app.use(cors({
    origin: [process.env.CORS_URL],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routes
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log("server started at http://localhost:"+port);
    })
})
.catch((err)=>{
    console.log(err);
})
