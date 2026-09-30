import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css"; 

import AuthProvider  from "./context/AuthContext";
import ThemeProvider  from "./context/ThemeContext";

import { RouterProvider } from "react-router-dom";
import { router } from "./route/Route";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
        <AuthProvider>
           <RouterProvider router={router} />  
        </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
