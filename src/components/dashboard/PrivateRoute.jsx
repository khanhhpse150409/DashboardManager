import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const role = localStorage.getItem('student');
    return(
      role === "Admin" ? <Outlet/> : <Navigate to="/"/>
    )
};
export default PrivateRoute;