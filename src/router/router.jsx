
import {
  createBrowserRouter,
  
} from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Navbar from "../pages/shared/Navbar";
import Home from "../pages/home/home";







export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
        {
            index: true,
            Component: Home
        }
    ]
  },
   
]);