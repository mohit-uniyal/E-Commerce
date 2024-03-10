import React from 'react'

const UserDashboard = () => {
  return (
    <div className='w-full flex justify-evenly'>
        <div className="user-panel w-3/12">
            <h1 className='text-2xl text-center font-medium my-3'>User Panel</h1>
            <div className="admin-options flex flex-col gap-2">
                <button className='w-full text-md border-2 rounded-md border-gray-400 hover:bg-gray-200 py-2'>Profile</button>
                <button className='w-full text-md border-2 rounded-md border-gray-400 hover:bg-gray-200 py-2'>Orders</button>
            </div>
        </div>
        <div className="content w-8/12 my-2 bg-blue-500">
            content
        </div>
    </div>
  )
}

export default UserDashboard