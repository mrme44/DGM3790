import React, { createContext, useState } from 'react';

const authContext = createContext()

const AuthContextProvider = props => {
    const [auth, setAuth] = useState({isLoggedIn:false, username:null, email:null})

    function login(username, email){
        let newObj = {isLoggedIn:true, username:username, email:email}
        setAuth(newObj)
    }
    function logout(){
        setAuth({isLoggedIn:false, username:'', email:''})
    }

    return (
        <authContext.Provider value={[auth, login, logout]}>
            {props.children}
        </authContext.Provider>
    );
}

export {authContext}
export default AuthContextProvider;
