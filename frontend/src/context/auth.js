import React, {createContext, useContext, useEffect, useState} from "react";
import { apiEndPoints } from "../utils/api";

const AuthContext=createContext(null);
export const useAuth=() => useContext(AuthContext);

const AuthProvider=({children})=>{
    const [user, setUser]=useState(null);
    const [isLoggedIn, setIsLoggedIn]=useState(false);

    useEffect(()=>{
        const getUserDetails=async ()=>{
            try{
                const response=await fetch(apiEndPoints.getUserDetails, {
                    method: 'GET',
                    credentials: 'include'
                })
                const data=await response.json();
                setUser(data.data);
                setIsLoggedIn(true);
            }catch(error){
                console.log(error);
            }
        }
        getUserDetails();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isLoggedIn,
            setIsLoggedIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider};