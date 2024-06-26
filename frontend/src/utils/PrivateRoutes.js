import { Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../context/auth';

const PrivateRoutes=()=>{
    const {isLoggedIn}=useAuth();
    return (
        isLoggedIn ? <Outlet /> : <Navigate to='/login' />
    )   
}

export default PrivateRoutes;