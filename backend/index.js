const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const userRoutes=require('./routes/user.routes');
const categoryRoutes=require('./routes/category.routes');
const productRoutes=require('./routes/product.routes');
const checkoutRoutes=require('./routes/checkout.routes');
const orderRoutes=require('./routes/order.routes');
const { connectDB } = require('./config/db');
const cookieParser = require('cookie-parser');
const port=process.env.PORT || 4000;

//dotenv config
dotenv.config();

//middlewares
app.use(cors({
    origin: ['https://e-commerce-frontend-iota-ten.vercel.app/'],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routes
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/order', orderRoutes);

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log("server started at http://localhost:"+port);
    })
})
.catch((err)=>{
    console.log(err);
})
