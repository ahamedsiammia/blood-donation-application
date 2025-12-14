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
      }
    ]
  }
]);