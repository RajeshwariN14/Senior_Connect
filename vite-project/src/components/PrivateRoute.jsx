// // components/PrivateRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// function PrivateRoute({ children }) {
//   const token = localStorage.getItem('token');

//   if (token) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// }

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

function PrivateRoute({ children }) {
  const { user, isAuthReady } = useAuth(); // Get user and auth readiness from AuthContext

  // Show a loading indicator or null while authentication state is being determined
  if (!isAuthReady) {
    return <div>Loading authentication...</div>; // Or a spinner/skeleton loader
  }

  // If user is authenticated, render the children
  if (user) {
    return children;
  } else {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;

