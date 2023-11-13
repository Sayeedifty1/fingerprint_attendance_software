import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Home from "../components/Home";
import Main from "../layout/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TeacherDash from "../pages/TeacherDash";
import UserDetails from "../pages/UserDetails";
import StudentDash from "../pages/StudentDash";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
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
          },
          {
            path:'/teacher-dashboard',
            element:<TeacherDash/>
          },
          {
            path:'/std-dashboard',
            element:<StudentDash/>
          }
      ]
    },
  ]);

  export default router;