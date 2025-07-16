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
import AdminDashboardHome from "../pages/dashboard/admin/adminDashboardHome/AdminDashBoardHome";
import MakeAdmin from "../pages/dashboard/admin/MakeAdmin";


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
         Component: AdminDashboardHome
      },
      {
        path: "pendingTrainers",
        Component: PendingTrainers,
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
          <PrivateRoute>
            <HandleAllTrainers></HandleAllTrainers>
          </PrivateRoute>
        ),
      },
      {
        path: "balance",
        element: (
          <PrivateRoute>
            <Balance></Balance>
          </PrivateRoute>
        ),
      },
       {
        path: "addforum",
        element: (
          <PrivateRoute>
             <AddNewForum></AddNewForum>
          </PrivateRoute>
        ),
      },
      {
        path: "add-new-class",
        element: (
          <PrivateRoute>
             <AddNewClass></AddNewClass>
          </PrivateRoute>
        ),
      },
      {
        path: "addSlot",
        element: (
          <PrivateRoute>
             <AddSlot></AddSlot>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-slots",
        element: (
          <PrivateRoute>
             <ManageSlots></ManageSlots>
          </PrivateRoute>
        ),
      },
      {
        path: "newsletters",
        element: (
          <PrivateRoute>
             <ShowNewsletterSubscribers></ShowNewsletterSubscribers>
          </PrivateRoute>
        ),
      },
      {
        path:'make-admin',
        element: <PrivateRoute><MakeAdmin></MakeAdmin></PrivateRoute>
      }
    ],
  },
]);
