import { createBrowserRouter } from "react-router";
import RootLayOut from "../LayOut/RootLayOut";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../LayOut/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import Addrequest from "../Pages/Dashboard/Addrequest/Addrequest";
import Alluser from "../Pages/Dashboard/Alluser/Alluser";
import PrivetRoute from "../Context/PrivetRoute";
import Myrequest from "../Pages/Dashboard/Myrequest/Myrequest";
import Profile from "../Pages/Dashboard/Profile/Profile";
import Allrequest from "../Pages/Dashboard/Allrequest/Allrequest";
import Funding from "../Pages/Funding/Funding";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import Viewmyrequest from "../Pages/Dashboard/Myrequest/Viewmyrequest";
import EditRequest from "../Pages/Dashboard/Myrequest/EditRequest";
export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayOut,
    children:[
        {
            index:true,
            path:"/",
            Component: Home,
        },
        {
            path:"/login",
            Component: Login
        },
        {
            path:"/register",
            Component: Register
        },
        {
          path:"/funding",
          Component: Funding
        },
        {
          path:"/search-request",
          Component: SearchRequest
        },
        {
          path:"/payment-success",
          Component: PaymentSuccess
        },
        {
          path:"/donation-request",
          Component: DonationRequest
        },
        {
          path:"/donation-details/:id",
          element: <PrivetRoute>
            <DonationDetails></DonationDetails>
          </PrivetRoute>
        }
    ]
  },
  {
    path:"Dashboard",
    element: <PrivetRoute> <DashboardLayout></DashboardLayout> </PrivetRoute> ,
    children:[
      {
        path:"/Dashboard",
        Component:MainDashboard
      },
      {
        path:"Add-request",
        Component: Addrequest
      },
      {
        path:"All-user",
        Component:Alluser
      },
      {
        path:"My-request",
        Component: Myrequest
      },
      {
        path:"profile",
        Component:Profile
      },
      {
        path:"All-request",
        Component:Allrequest
      },
      {
        path:"/Dashboard/view-request/:id",
        Component: Viewmyrequest
      },
      {
        path:"/Dashboard/edit-request/:id",
        Component: EditRequest
      }
    ]
  }
]);