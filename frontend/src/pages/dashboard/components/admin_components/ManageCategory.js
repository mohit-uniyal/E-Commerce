import React, { useEffect, useState } from 'react'
import { apiEndPoints } from '../../../../utils/api';
import CategoryComponent from './CategoryComponent';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const ManageCategory = () => {

    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [categoriesUpdated, setCategoriesUpdated] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(apiEndPoints.getCategories, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                setCategories(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, [categoriesUpdated]);

    const createCategoryHandler = async () => {
        try {
            const response = await fetch(apiEndPoints.createCategory, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    categoryName: newCategory
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            // toast('New Category Added');
            setNewCategory('');
            setCategoriesUpdated(!categoriesUpdated);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='w-full flex flex-col gap-6'>
            <div className='text-4xl'>Manage Category</div>
            <div className='flex items-center'>
                <input type="text" placeholder="Enter new category" className='w-1/2 focus:outline-none text-xl border-2 border-gray-400 p-2 mx-4 rounded-lg' value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                <button className='bg-blue-500 hover:bg-blue-600 p-3 text-white rounded-lg' onClick={createCategoryHandler} >Submit</button>
            </div>
            <div className='w-full flex flex-col'>
                {
                    categories.map((category, index) => <CategoryComponent category={category} categoriesUpdated={categoriesUpdated} setCategoriesUpdated={setCategoriesUpdated} />)
                }
            </div>
            {/* <ToastContainer /> */}
        </div>
    )
}

export default ManageCategory