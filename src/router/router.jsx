
import {
  createBrowserRouter,
  
} from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Navbar from "../pages/shared/Navbar";
import Home from "../pages/home/home";
import Login from "../authentication/login/Login";
import AuthenticationLayout from "../layouts/AuthenticationLayout";
import Register from "../authentication/register/Register";
import ErrorPage from "../pages/errorPage/ErrorPage";
import BeATrainer from "../pages/beATrainer/BeATrainer";
import TrainerLayout from "../layouts/TrainerLayout";
import DashBoardLayout from "../layouts/DashBoardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import PendingTrainers from "../pages/dashboard/PendingTrainers";








export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            index: true,
            Component: Home
        },
        
      
    ]
  },
  {
    path: '/be-a-trainer',
    element: <TrainerLayout></TrainerLayout>,
    children: [
      { index: true, 
        Component: BeATrainer },
    ],
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
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children: [
      {
        path: '/pendingTrainers',
        Component: PendingTrainers
      }
    ]
  }
   
]);