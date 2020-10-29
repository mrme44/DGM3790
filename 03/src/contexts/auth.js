import React, { createContext, useState } from 'react';

const authContext = React.createContext({isLoggedIn:false, username:null, email:null})

function AuthContextProvider(props){
    const [auth, setAuth] = useState({isLoggedIn:false, username:null, email:null})

    function login(username, email){
        setAuth({isLoggedIn:true, username:username, email:email})
    }
    function logout(username, email){
        setAuth({isLoggedIn:false, username:'', email:''})
    }

    return <authContext.provider value={auth}>{props.children}</authContext.provider>
}

export default AuthContextProvider;
