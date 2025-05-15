// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ adminOnly = false }) => {
//   const { user, token } = useSelector(state => state.auth);
  
//   if (!token) return <Navigate to="/login" />;
//   if (adminOnly && !user?.isAdmin) return <Navigate to="/" />;
  
//   return <Outlet />;
// };

// export default ProtectedRoute;

// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ adminOnly, ...props }) => {
//   const user = useSelector((state) => state.auth.user);
//   const token = useSelector((state) => state.auth.token);

//   if (!token) {
//     // If not logged in, redirect to login
//     return <Navigate to="/login" />;
//   }

//   if (adminOnly && user.role !== 'admin') {
//     // If the route is admin-only and the user is not an admin, redirect to home
//     return <Navigate to="/" />;
//   }

//   return <Route {...props} />;
// };

// export default ProtectedRoute;


import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";



const ProtectedRoute = ({ adminOnly = false }) => {

  const token = useSelector((state) => state.auth.token);

  const user = useSelector((state) => state.auth.user);



  if (!token) {

    // Not logged in

    return <Navigate to="/login" />;

  }



  if (adminOnly && user?.role !== "admin") {

    // Not an admin, redirect to home

    return <Navigate to="/" />;

  }



  // Allowed, render nested route

  return <Outlet />;

};



export default ProtectedRoute;