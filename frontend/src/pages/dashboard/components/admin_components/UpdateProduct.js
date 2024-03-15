import React, { useEffect, useState } from 'react'
import { apiEndPoints } from '../../../../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProduct = ({currentProductId, setUpdateProduct, setProductsUpdated, productsUpdated}) => {
    const [categories, setCategories] = useState([]);
    const [categorySelector, setCategorySelector] = useState('');
    const [image, setImage] = useState('');
    const [name, setName]=useState('');
    const [description, setDescription]=useState('');
    const [price, setPrice]=useState(null);
    const [quantity, setQuantity]=useState(null);
    const [requestPending, setRequestPending]=useState(false);
  
    useEffect(() => {
      const getCategories = async () => {
        try {
          const response = await fetch(apiEndPoints.getCategories, {
            method: 'GET'
          })
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message);
          }
          setCategories(data.data);
        } catch (error) {
          console.log(error);
        }
      }
      getCategories();
    }, []);
  
    const handleSubmit=async(e)=>{
      e.preventDefault();
      setRequestPending(true);
      try{
        const formData=new FormData();
        formData.append('id', currentProductId);
        formData.append('name', name);
        formData.append('category', categorySelector);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('image', image);
        const response=await fetch(apiEndPoints.updateProduct, {
          method: 'POST',
          credentials: 'include',
          body: formData
        });
        const data=await response.json();
        if(!response.ok){
          throw new Error(data.message);
        }
  
        setCategorySelector('');
        setImage('');
        setName('');
        setDescription('');
        setPrice(null);
        setQuantity(null);
  
        toast.success('Product updated', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        setRequestPending(false);
        setUpdateProduct(false);
        setProductsUpdated(!productsUpdated);
  
      }catch(error){
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        setRequestPending(false);
      }
    }

    const handleDelete=async (e)=>{
      setRequestPending(true);
      try{
        const response=await fetch(`${apiEndPoints.deleteProduct}/${currentProductId}`, {
          method: 'GET',
          credentials: 'include'
        });
        const data=await response.json();

        if(!response.ok){
          throw new Error(data.message);
        }

        setRequestPending(false);
        setUpdateProduct(false);

        toast.success('Product deleted', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        
        setProductsUpdated(!productsUpdated);

      }catch(error){
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        setRequestPending(false);
      }
    }
  
    return (
      <div className='w-full flex flex-col gap-3'>
        <div className='text-3xl'>Update Product</div>
        <form className='flex flex-col gap-2 items-center'>
          <select name="category" id="" placeholder='Select a category' className='border-2 border-gray-300 rounded-md p-1 text-lg focus:outline-none cursor-pointer w-full' value={categorySelector} disabled={requestPending} onChange={(e) => setCategorySelector(e.target.value)}>
            <option value="">Select a category</option>
            {
              categories.map((category, index) => <option key={index} value={category._id}>{category.name}</option>)
            }
          </select>
          {
            image && <img src={URL.createObjectURL(image)} draggable={false} alt="" className='w-1/3' />
          }
          <label htmlFor="file-selector" className='w-full border-2 border-gray-300 rounded-md p-1 text-lg focus:outline-none text-center cursor-pointer hover:bg-gray-400 hover:text-white hover:border-gray-400' >
            Upload Photo
            <input type="file" className='file-selector hidden' id='file-selector' name='image' accept='image/*' disabled={requestPending} onChange={(e) => setImage(e.target.files[0])} />
          </label>
          <input type="text" name="name" id="" placeholder='Product name' className='w-full border-2 border-gray-300 rounded-md p-1 text-lg focus:outline-none' value={name} disabled={requestPending} onChange={(e)=>setName(e.target.value)} />
          <textarea type="text" name="description" placeholder='Product description' className='w-full border-2 border-gray-300 rounded-md p-1 text-lg focus:outline-none' value={description} disabled={requestPending} onChange={(e)=>setDescription(e.target.value)} />
          <input type="number" name="price" id="" placeholder='Price' className='w-full border-2 border-gray-300 rounded-md p-1 text-lg focus:outline-none' value={price} disabled={requestPending} onChange={(e)=>setPrice(e.target.value)} />
          <input type="number" name="quantity" id="" placeholder='Quantity' className='w-full border-2 border-gray-300 rounded-md p-1 text-lg focus:outline-none' value={quantity} disabled={requestPending} onChange={(e)=>setQuantity(e.target.value)} />
          <button type="submit" className='w-full text-lg bg-blue-500 rounded-md text-white py-1 hover:bg-blue-600' disabled={requestPending} onClick={handleSubmit}>Update Product</button>
          <button type="submit" className='w-full text-lg bg-red-500 rounded-md text-white py-1 hover:bg-red-600' disabled={requestPending} onClick={handleDelete}>Delete Product</button>
          <button className='w-full text-lg rounded-md text-red-300 border-2 border-red-300 py-1 hover:border-red-600 hover:text-red-600' disabled={requestPending} onClick={()=>{setUpdateProduct(false)}} >Cancel</button>
        </form>
      </div>
    )
}

export default UpdateProduct