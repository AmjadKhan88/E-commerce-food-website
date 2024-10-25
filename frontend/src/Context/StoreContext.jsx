import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)

const StoreContextProvider = (props)=> {

    const [cartItems,setCartItems] = useState([]);
    const url = import.meta.env.SERVER_URL || 'http://localhost:3000';
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]);

    // add to cart
    const addToCart =async (itemId) => {
        if (!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{
                headers:{token:token}
            });
        }
    };
    // remove form cart 
    const removeFromCart =async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{
                headers:{token:token}
            });
        }
    }

    // get total amounts
    const getTotalCartAmount = () => {
        let totalAmount = 0
        
        for (const item in cartItems){
            if(cartItems[item] > 0){
            let itemInfo = food_list.find((product)=>product._id === item);
            if(itemInfo){
            totalAmount += itemInfo.price*cartItems[item]
            }
            }
        }
        return totalAmount;
    }

    // get food list
    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    // load cart data
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{
            headers:{token:token}
        });
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
       
        async function loadData(){
             if (localStorage.getItem("foodToken")) {
               setToken(localStorage.getItem("foodToken"));
               await loadCartData(localStorage.getItem("foodToken"));
             }
            await fetchFoodList();
        }
        loadData();
    },[])

    // provide value to context
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;