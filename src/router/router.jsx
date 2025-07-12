
import {
  createBrowserRouter,
  
} from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Navbar from "../pages/shared/Navbar";
import Home from "../pages/home/home";
import Login from "../authentication/login/Login";
import AuthenticationLayout from "../layouts/AuthenticationLayout";
import Register from "../authentication/register/Register";







export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
        {
            index: true,
            Component: Home
        },
      
    ]
  },
  {
    path: "/",
    Component: AuthenticationLayout,
    children: [
        {
            path: "login" ,
            Component: Login
        },
         {
            path: "register" ,
            Component: Register
        },
    ]    
  },
   
]);