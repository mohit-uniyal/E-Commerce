import React from 'react'

const AdminDashboard = () => {
  return (
    <div className='w-full flex justify-evenly'>
        <div className="admin-panel w-3/12">
            <h1 className='text-2xl text-center font-medium my-3'>Admin Panel</h1>
            <div className="admin-options flex flex-col gap-2">
                <button className='w-full text-md border-2 rounded-md border-gray-400 hover:bg-gray-200 py-2'>Create Category</button>
                <button className='w-full text-md border-2 rounded-md border-gray-400 hover:bg-gray-200 py-2'>Create Product</button>
                <button className='w-full text-md border-2 rounded-md border-gray-400 hover:bg-gray-200 py-2'>User</button>
            </div>
        </div>
        <div className="content w-8/12 mt-2 bg-blue-500">
            content
        </div>
    </div>
  )
}

export default AdminDashboard