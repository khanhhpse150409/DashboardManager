import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const role = localStorage.getItem('student');
    return(
      role === "Admin" ? <Outlet/> : <Navigate to="/"/>
    )
};
export default PrivateRoute;

// const PrivateRoute = ({ component: Components, ...rest }) => {
//     const navigate = useNavigate();
//     const role = localStorage.getItem('student');
//   return (
 
//     <Route
//       {...rest}
//       render={(props) => {
//         return role === "Admin" ? (
//           <Components {...props} />
//         ) : (
//           navigate("/login")
//         );
//       }}
//     />
//   );
// };
