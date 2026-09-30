import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext()

 const ThemeProvider = ({children})=>{
   const [darkMode, setDarkMode] = useState(() => {
   const saved = localStorage.getItem("chat-theme");
     return saved === "dark" ? true : false;
    });
   
   useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("chat-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("chat-theme", "light");
    }
  }, [darkMode]);
   
  return (
      <ThemeContext.Provider value={{darkMode, setDarkMode}}>
         {children}
       </ThemeContext.Provider>
     );
 };
 
 export default ThemeProvider;
 
 