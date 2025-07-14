import { createBrowserRouter } from "react-router";
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
import AllTrainers from "../pages/dashboard/AllTrainers";
import TrainerDetails from "../pages/dashboard/TrainerDetails";
import AllClasses from "../pages/dashboard/AllClasses";
import TrainerBookingPage from "../pages/Trainer/TrainerBookingPage";
import Payment from "../pages/payment/Payment";
import MyPaymentHistory from "../pages/User/MyPaymentHistory";
import ForumPage from "../pages/forumPage/ForumPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "trainers",
        Component: AllTrainers,
      },
      {
        path: "trainers/:id",
        Component: TrainerDetails,
      },
      {
        path: "allClasses",
        Component: AllClasses,
      },
      {
        path: "trainer-booking/:trainerId",
        element: (
          <PrivateRoute>
            <TrainerBookingPage></TrainerBookingPage>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path:'forums',
        element: <ForumPage></ForumPage>
      }
    ],
  },
  {
    path: "/be-a-trainer",
    element: <TrainerLayout></TrainerLayout>,
    children: [{ index: true, Component: BeATrainer }],
  },

  {
    path: "/",
    Component: AuthenticationLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "pendingTrainers",
        Component: PendingTrainers,
      },
      {
        path: 'my-payments',
        element: <PrivateRoute><MyPaymentHistory></MyPaymentHistory></PrivateRoute>
      }
    ],
  },
]);
