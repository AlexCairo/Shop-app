import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const UserContext = React.createContext();
const { Provider } = UserContext;

function UserProvider({children}){

    const [ email, setEmail ] = useState(null)
    const [ userId, setUserId ] = useState(null);
    const [ access,setAccess ] = useState(null);
    const [ token, setToken ] = useState(localStorage.token);
    const [ user, setUser ] = useState(null);
    function login(data){
        const token = data.token;
        const decodedToken = jwt_decode(token);
        setAccess(decodedToken.access);
        setUserId(decodedToken.userId);
        setUser(decodedToken.user);
        setEmail(decodedToken.email);
        setToken(token);
        localStorage.token = token;
    }
    function logout(){
        setUser(null);
        localStorage.removeItem("token");
    }
    useEffect(()=>{
        if(token){
            try{
                const decodedToken = jwt_decode(token);
                setUserId(decodedToken.userId);
                setUser(decodedToken.user);
                setAccess(decodedToken.access);
                setEmail(decodedToken.email);
            } catch (error) {
                console.log("Token inválido");
            }
        }
    },[token]);
    return(
        <Provider value = {{userId, token, email, access, user, login, logout}}>
            {children}
        </Provider>
    )
}

export { UserProvider, UserContext };