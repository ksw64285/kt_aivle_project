import React, { createContext, useState } from "react";
import jwt_decode from 'jwt-decode'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    console.log('Update token called')
    
    let [authUsers, setauthUsers] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    
    let contextData = {
        user:user,
        setUser:setUser,
        setauthUsers:setauthUsers,
        authUsers:authUsers
    }

    // Context 전달하기: Context.Provider
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}