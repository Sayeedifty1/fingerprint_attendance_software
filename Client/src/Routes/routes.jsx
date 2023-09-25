import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Home from "../components/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDetails from "../pages/UserDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element:<Register/>
    },
    {
      path: "/dashboard",
      element: <UserDetails />,
    }
  ]);

  export default router;