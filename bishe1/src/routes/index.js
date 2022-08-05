// 重定向  
import { Navigate } from "react-router-dom"

import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../compontes/Home/Home.jsx"
import Teacher from "../pages/Teachers"
import Student from "../pages/Students"

const Routes = [
    {
        path: "/home",
        element: <Home />,
        children: [
            {
                key: "1",
                path: "teacher",

                element: <Teacher />,
                state: {
                    name: "教师管理",
                }
            },
            {
                key: "2",
                path: "student",
                name: "学生管理",
                element: <Student />
            },
            // {
            //     path: "/",
            //     element: <Navigate to="/teacher" />
            // }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Navigate to="/home/teacher" />
    }
]

export default Routes