import React, { useState } from 'react'
import DefaultComponent from './DefaultComponent';
import ManageCategory from './admin_components/ManageCategory';
import CreateProduct from './admin_components/CreateProduct';
import ManageUser from './admin_components/ManageUser';
import ManageProduct from './admin_components/ManageProduct';
import Profile from './user_components/Profile';
import Orders from './admin_components/Orders';

const AdminDashboard = () => {

  const adminControls=[
    {
      name: "Profile",
      component: <Profile />
    },
    {
      name: "Manage Category",
      component: <ManageCategory />
    },
    {
      name: "Create Product",
      component: <CreateProduct />
    },
    {
      name: "Manage Product",
      component: <ManageProduct />
    },
    {
      name: "Orders",
      component: <Orders />
    }
  ];

  const [selectedControl, setSelectedControl]=useState('');
  const [selectedComponent, setSelectedComponent]=useState(null);

  const handleAdminPanel=(name, component)=>{
    setSelectedControl(name);
    setSelectedComponent(component);
  }

  return (
    <div className='w-full flex justify-evenly'>
        <div className="admin-panel w-3/12">
            <h1 className='text-2xl text-center font-medium my-3'>Admin Panel</h1>
            <div className="admin-options flex flex-col gap-2">
                {
                  adminControls.map((control, index)=><button key={index} className={`w-full text-md rounded-md py-2 ${selectedControl===control.name ? "bg-blue-500 text-white" : "hover:bg-gray-200 border-gray-400 border-2"}`} onClick={()=>handleAdminPanel(control.name, control.component)}>{control.name}</button>)
                }
            </div>
        </div>
        <div className="content w-8/12 my-2">
            {
              selectedComponent ? selectedComponent : <DefaultComponent />
            }
        </div>
    </div>
  )
}

export default AdminDashboard