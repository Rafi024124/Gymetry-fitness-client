import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";

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
import MyProfile from "../pages/dashboard/user/MyProfile";
import ActivityLog from "../pages/dashboard/user/ActivityLog";
import BookedTrainers from "../pages/dashboard/user/BookedTrainers";
import HandleAllTrainers from "../pages/dashboard/admin/handleAllTrainers";
import Balance from "../pages/dashboard/admin/Balance";
import AddNewForum from "../pages/dashboard/adminAndTrainer/AddNewForum";
import AddNewClass from "../pages/dashboard/admin/AddNewClass";
import AddSlot from "../pages/dashboard/adminAndTrainer/Trainer/AddSlot";
import ManageSlots from "../pages/dashboard/adminAndTrainer/Trainer/ManageSlots";
import ShowNewsletterSubscribers from "../pages/dashboard/admin/ShowNewsLetterSubscribers";

import MakeAdmin from "../pages/dashboard/admin/MakeAdmin";

import DashboardHome from "../pages/dashboard/DashboardHome";
import PrivateRouteForRole from "../routes/PrivateRouteForRole";
import Forbidden from "../pages/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import TrainerRoute from "../routes/TrainerRoute";
import AdminTrainerRoute from "../routes/AdminTrainerRoute";



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
        path:'forbidden',
        Component: Forbidden

      },
      {
        path: "trainer/:id",
        Component: TrainerDetails,
      },
      {
        path: "allClasses",
        Component: AllClasses,
      },
      {
        path: "trainer/:trainerId/book",
        element: (
    <PrivateRouteForRole allowedRoles={['user']}>
      <TrainerBookingPage></TrainerBookingPage>
    </PrivateRouteForRole>
        )
      },
      {
        path: "payment",
        element: (
    <PrivateRouteForRole allowedRoles={['user']}>
      <Payment></Payment>
    </PrivateRouteForRole>
        ),
      },
      {
        path: "forums",
        element: <ForumPage></ForumPage>,
      },
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
         index: true,
         Component: DashboardHome
      },
      {
        path: "pendingTrainers",
        element: <AdminRoute>
          <PendingTrainers></PendingTrainers>
        </AdminRoute>
      },
      {
        path: "my-payments",
        element: (
          <PrivateRoute>
            <MyPaymentHistory></MyPaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "myprofile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "activity-log",
        element: (
          <PrivateRoute>
            <ActivityLog></ActivityLog>
          </PrivateRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <PrivateRoute>
            <BookedTrainers></BookedTrainers>
          </PrivateRoute>
        ),
      },
       {
        path: "trainers",
        element: (
          <AdminRoute>
            <HandleAllTrainers></HandleAllTrainers>
          </AdminRoute>
        ),
      },
      {
        path: "balance",
        element: (
         <AdminRoute>
           <Balance></Balance>
         </AdminRoute>
        ),
      },
       {
        path: "addforum",
        element: (
          <AdminTrainerRoute>
            <AddNewForum></AddNewForum>
          </AdminTrainerRoute>
        ),
      },
      {
        path: "add-new-class",
        element: (
          <AdminRoute>
            <AddNewClass></AddNewClass>
          </AdminRoute>
        ),
      },
      {
        path: "addSlot",
        element: (
          <TrainerRoute>
            <AddSlot></AddSlot>
          </TrainerRoute>
        ),
      },
      {
        path: "manage-slots",
        element: (
          <TrainerRoute>
            <ManageSlots></ManageSlots>
          </TrainerRoute>
        ),
      },
      {
        path: "newsletters",
        element: (
          <AdminRoute>
            <ShowNewsletterSubscribers></ShowNewsletterSubscribers>
          </AdminRoute>
        ),
      },
      {
        path:'make-admin',
        element: <AdminRoute>

          <MakeAdmin></MakeAdmin>
        </AdminRoute>
      }
    ],
  },
]);
