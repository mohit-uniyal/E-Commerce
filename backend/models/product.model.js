const mongoose=require('mongoose');
const {Schema}=mongoose;

const productSchema=new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        photo: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const Product=mongoose.model('Product', productSchema);
module.exports=Product;