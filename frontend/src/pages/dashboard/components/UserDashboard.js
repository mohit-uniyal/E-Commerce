import React, { useState } from 'react'
import Profile from './user_components/Profile';
import Orders from './user_components/Orders';

const userControls=[
  {
    name: "Profile",
    component: <Profile />
  },
  {
    name: "Orders",
    component: <Orders />
  }
];

const UserDashboard = () => {

  const [selectedControl, setSelectedControl]=useState(userControls[0].name);
  const [selectedComponent, setSelectedComponent]=useState(userControls[0].component);

  const handleUserPanel=(name, component)=>{
    setSelectedControl(name);
    setSelectedComponent(component);
  }

  return (
    <div className='w-full flex justify-evenly'>
        <div className="user-panel w-3/12">
            <h1 className='text-2xl text-center font-medium my-3'>User Panel</h1>
            <div className="admin-options flex flex-col gap-2">
                {
                  userControls.map((control, index)=><button key={index} className={`w-full text-md rounded-md py-2 ${selectedControl===control.name ? "bg-blue-500 text-white" : "hover:bg-gray-200 border-gray-400 border-2"}`} onClick={()=>{handleUserPanel(control.name, control.component)}} >{control.name}</button>)
                }
            </div>
        </div>
        <div className="content w-8/12 my-2 flex flex-col gap-3">
          {
            selectedComponent
          }
        </div>
    </div>
  )
}

export default UserDashboard