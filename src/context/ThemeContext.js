import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {

  const [theme, setTheme] = useState(false)
  
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  )
}