import React, {useState} from 'react'
import { apiEndPoints } from '../../../../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryComponent = ({ category, categoriesUpdated, setCategoriesUpdated }) => {

    const [isEditing, setIsEditing]=useState(false);
    const [newName, setNewName]=useState('');

    const deleteCategoryHandler = async (id) => {
        try {
            const response = await fetch(apiEndPoints.deleteCategory, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            setCategoriesUpdated(!categoriesUpdated);
            toast.success('Category Deleted', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        } catch (error) {
            const errorMessage=error.message || "Something went wrong";
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    }

    const editButtonHandler=async ()=>{
        setIsEditing(true);
    }

    const submitButtonHandler=async()=>{
        try{
            const response=await fetch(apiEndPoints.editCategory, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: category._id,
                    newName
                })
            })
            const data=await response.json();

            if(!response.ok){
                throw new Error(data.message);
            }

            setIsEditing(false);
            setCategoriesUpdated(!categoriesUpdated);
            toast.success('Category Updated Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            });

        }catch(error){
            const errorMessage=error.message || "Something went wrong";
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    }

    const cancelButtonHandler=()=>{
        setIsEditing(false);
    }

    return (
        <div className='w-full flex items-center justify-between border-t border-gray-400 p-2'>
            {
                isEditing ?
                    <input type='text' className='focus:outline-none border-2 border-gray-400 rounded-md text-lg py-1 px-2 w-4/12' placeholder='Enter new name' value={newName} onChange={(e)=>setNewName(e.target.value)} />
                    :
                    <div className='text-lg'>{category.name}</div>
            }
            <div className='btn-group flex gap-2'>
                {
                    isEditing ?
                        <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg' onClick={submitButtonHandler} >Submit</button>
                        :
                        <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg' onClick={editButtonHandler} >Edit</button>
                }
                {
                    isEditing ?
                        <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg' onClick={cancelButtonHandler} >Cancel</button>
                        :
                        <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg' onClick={() => { deleteCategoryHandler(category._id) }}>Delete</button>
                }
            </div>
        </div>
    )
}

export default CategoryComponent