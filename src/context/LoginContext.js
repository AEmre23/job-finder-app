import React, { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = (props) => {

  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
    <LoginContext.Provider value={[loggedIn,setLoggedIn]}>
      {props.children}
    </LoginContext.Provider>
  )
}