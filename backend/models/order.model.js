const mongoose=require('mongoose');
const {Schema}=mongoose;

const orderSchema=new Schema(
    {
        products: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        ],
        status: {
            type: String,
            enum: ['processing', 'packed', 'shipping', 'delivered'],
            required: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Order=mongoose.model('Order', orderSchema);
module.exports=Order;