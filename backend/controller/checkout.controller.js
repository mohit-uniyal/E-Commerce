const Order = require('../models/order.model');

const stripe = require('stripe')(process.env.SECRET_KEY);

const createCheckoutSessionController=async (req, res)=>{
    try {
        const cart=req.body;
        const user=req.user;

        const lineItems=cart.map((product)=>(
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.name,
                        images: [product.photo],
                        metadata: {
                            id: product._id,
                            userId: user._id.toString()
                        }
                    },
                    unit_amount: product.price*100
                },
                quantity: 1
            }
        ));

        const session=await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CORS_URL}/success`
        });


        res.status(200).json({
            id: session.id
        });
    } catch (error) {
        const statusCode=error.status || 500;
        const errorMessage=error.message || "Something went wrong";
        console.log(error);
        res.status(statusCode).json(
            {
                message: errorMessage
            }
        )
    }
}

const paymentCompletionController=async(req, res)=>{
    try {
        if(req.body.type==='checkout.session.completed'){
            const {body}=req;
            const sessionId=body.data.object.id;
            const lineItems = await stripe.checkout.sessions.listLineItems(
                sessionId
            );
            // const lineItems = await stripe.checkout.sessions.listLineItems(
            //     sessionId
            // );
            // const productId=lineItems.data[0].price.product;
            // const product = await stripe.products.retrieve(productId);
            // console.log(product.metadata.id);
            let itemIds=[];
            let user;
            for (const item of lineItems.data){
                const productId=item.price.product;
                const product=await stripe.products.retrieve(productId);
                const {id, userId}=product.metadata;
                itemIds.push(id);
                if(!user){
                    user=userId;
                }
            }
    
            await Order.create({
                products: itemIds,
                status: 'processing',
                user: user
            });
    
        }
    } catch (error) {
        console.log(error);
    }
    res.send();
}

module.exports={createCheckoutSessionController, paymentCompletionController};