import React, { useState } from 'react'
import DefaultComponent from './DefaultComponent';
import ManageCategory from './admin_components/ManageCategory';
import ManageProduct from './admin_components/ManageProduct';
import ManageUser from './admin_components/ManageUser';

const AdminDashboard = () => {

  const adminControls=[
    {
      name: "Manage Category",
      component: <ManageCategory />
    },
    {
      name: "Manage Product",
      component: <ManageProduct />
    },
    {
      name: "Users",
      component: <ManageUser />
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
                  adminControls.map((control)=><button className={`w-full text-md rounded-md py-2 ${selectedControl===control.name ? "bg-blue-500 text-white" : "hover:bg-gray-200 border-gray-400 border-2"}`} onClick={()=>handleAdminPanel(control.name, control.component)}>{control.name}</button>)
                }
            </div>
        </div>
        <div className="content w-8/12 mt-2">
            {
              selectedComponent ? selectedComponent : <DefaultComponent />
            }
        </div>
    </div>
  )
}

export default AdminDashboard