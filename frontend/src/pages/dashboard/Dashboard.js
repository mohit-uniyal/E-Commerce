import React from 'react'
import Navbar from './../../components/Navbar'
import CustomFooter from '../../components/CustomFooter'
import { useAuth } from '../../context/auth'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'

const Dashboard = () => {
    const {user}=useAuth();
  return (
    <div className='flex flex-col min-h-screen justify-between'>
        <Navbar />
        <div className="main-dashboard grow w-screen">
            {user.role===1 ? <AdminDashboard /> : <UserDashboard />}
        </div>
        <CustomFooter />
    </div>
  )
}

export default Dashboard