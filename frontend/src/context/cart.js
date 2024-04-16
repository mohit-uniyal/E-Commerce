import {createContext, useContext, useState} from 'react';

const cartContext=createContext(null);
export const useCart=()=>useContext(cartContext);

const CartProvider=({children})=>{

    const [cart, setCart]=useState([]);

    return (
        <cartContext.Provider value={{
            cart,
            setCart
        }}>
            {children}
        </cartContext.Provider>
    )
}

export {CartProvider}