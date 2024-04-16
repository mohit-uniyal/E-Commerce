import React, { useEffect, useState } from 'react'
import CustomFooter from '../components/CustomFooter'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { apiEndPoints } from '../utils/api'
import { toast } from 'react-toastify';
import { useCart } from '../context/cart'


const ProductDetails = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState({});
    const navigate = useNavigate();
    const {cart, setCart}=useCart();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${apiEndPoints.getProduct}/${id}`, {
                    method: 'GET'
                })

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setProductDetails(data.data);
            } catch (error) {
                console.log(error);
                navigate('/*');
            }
        }
        fetchProductDetails();
        // eslint-disable-next-line
    }, [])

    const cartHandler = () => {
        for (const item of cart) {
            if (item._id === productDetails._id) {
                toast.warn('Already added to cart', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                return;
            }
        }
        setCart([
            ...cart,
            productDetails
        ]);
        toast.success('Added to cart', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }

    return (
        <div className='flex flex-col min-h-screen justify-between'>
            <Navbar />
            <div className='w-full flex justify-evenly my-4'>
                <img src={productDetails.photo} alt="" className='w-3/12' />
                <div className=' w-8/12 flex flex-col gap-2'>
                    <h1 className='text-xl font-semibold' >{productDetails.name}</h1>
                    <div className='text-lg font-light text-justify'>{productDetails.description}</div>
                    <div className='text-xl font-semibold' >₹ {productDetails.price}</div>
                    <button className='bg-yellow-400 hover:bg-yellow-500 text-white w-3/12 py-2 rounded-md' onClick={cartHandler} >Add to Cart</button>
                </div>
            </div>
            <CustomFooter />
        </div>
    )
}

export default ProductDetails