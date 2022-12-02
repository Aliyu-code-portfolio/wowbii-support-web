import { getAuth } from "firebase/auth";
import React, {useState,useEffect} from "react";

export const AuthContext= React.createContext();

export const AuthProvider=({children})=>{
    const [currentUser, setCurrentUser]=useState(null);

    useEffect(()=>{
        getAuth().onAuthStateChanged(setCurrentUser)
    },[])

    return(
        <AuthContext.Provider
        value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}