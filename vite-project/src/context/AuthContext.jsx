// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { jwtDecode } from 'jwt-decode'; // Ensure you have this installed: npm install jwt-decode

// // Create the Auth Context
// const AuthContext = createContext(null);

// // Custom hook to use the Auth Context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [isAuthReady, setIsAuthReady] = useState(false); // To indicate initial auth check is done

//   // Function to decode JWT and check its validity
//   const checkTokenValidity = useCallback(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       try {
//         const decoded = jwtDecode(storedToken);
//         const currentTime = Date.now() / 1000; // Current time in seconds

//         if (decoded.exp < currentTime) {
//           // Token is expired
//           console.log('JWT token expired. Logging out automatically.');
//           logout(); // Call logout to clear everything
//           return false;
//         } else {
//           // Token is valid
//           setToken(storedToken);
//           // Assuming your token payload contains user info or you can fetch it
//           // For now, we'll use basic info from localStorage or a mock
//           const storedName = localStorage.getItem('name');
//           const storedEmail = localStorage.getItem('email');
//           const storedRole = localStorage.getItem('role');
//           const storedPicture = localStorage.getItem('picture'); // For Google profile picture

//           setUser({
//             id: decoded.id, // Assuming 'id' is in your JWT payload
//             name: storedName || 'User',
//             email: storedEmail || '',
//             role: storedRole || 'student',
//             picture: storedPicture || null
//           });
//           return true;
//         }
//       } catch (error) {
//         console.error('Error decoding or validating token:', error);
//         logout(); // Invalid token format, force logout
//         return false;
//       }
//     }
//     // No token found
//     logout(); // Ensure no stale user data if token is missing
//     return false;
//   }, []); // useCallback to memoize the function

//   // Effect to run once on component mount to check initial token state
//   useEffect(() => {
//     checkTokenValidity();
//     setIsAuthReady(true); // Mark auth check as complete
//   }, [checkTokenValidity]);

//   // Login function
//   const login = (newToken, userData) => {
//     localStorage.setItem('token', newToken);
//     localStorage.setItem('name', userData.name);
//     localStorage.setItem('email', userData.email);
//     localStorage.setItem('role', userData.role || 'student');
//     if (userData.picture) { // For Google users
//       localStorage.setItem('picture', userData.picture);
//     }

//     setToken(newToken);
//     setUser(userData);
//     window.dispatchEvent(new Event('userUpdated')); // Notify other components like Navbar
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.clear(); // Clear all relevant items
//     setToken(null);
//     setUser(null);
//     window.dispatchEvent(new Event('userUpdated')); // Notify other components
//   };

//   // Value provided by the context
//   const authContextValue = {
//     user,
//     token,
//     isAuthReady,
//     login,
//     logout,
//     checkTokenValidity, // Expose for specific checks before API calls if needed
//   };

//   return (
//     <AuthContext.Provider value={authContextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ensure you have this installed: npm install jwt-decode

// Create the Auth Context
const AuthContext = createContext(null);

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false); // To indicate initial auth check is done

  // Function to decode JWT and check its validity
  const checkTokenValidity = useCallback(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decoded.exp < currentTime) {
          // Token is expired
          console.log('JWT token expired. Logging out automatically.');
          logout(); // Call logout to clear everything
          return false;
        } else {
          // Token is valid
          setToken(storedToken);
          // Assuming your token payload contains user info or you can fetch it
          // For now, we'll use basic info from localStorage or a mock
          const storedName = localStorage.getItem('name');
          const storedEmail = localStorage.getItem('email');
          const storedRole = localStorage.getItem('role');
          const storedPicture = localStorage.getItem('picture'); // For Google profile picture

          setUser({
            id: decoded.id, // Assuming 'id' is in your JWT payload
            name: storedName || 'User',
            email: storedEmail || '',
            role: storedRole || 'student',
            picture: storedPicture || null
          });
          return true;
        }
      } catch (error) {
        console.error('Error decoding or validating token:', error);
        logout(); // Invalid token format, force logout
        return false;
      }
    }
    // No token found
    logout(); // Ensure no stale user data if token is missing
    return false;
  }, []); // useCallback to memoize the function

  // Effect to run once on component mount to check initial token state
  // useEffect(() => {
  //   checkTokenValidity();
  //   setIsAuthReady(true); // Mark auth check as complete
  // }, [checkTokenValidity]);
  useEffect(() => {
  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    try {
      const decoded = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;
      const timeUntilExpiry = (decoded.exp - currentTime) * 1000;

      if (decoded.exp < currentTime) {
        logout();
      } else {
        setToken(storedToken);

        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        const storedRole = localStorage.getItem('role');
        const storedPicture = localStorage.getItem('picture');

        setUser({
          id: decoded.id,
          name: storedName || 'User',
          email: storedEmail || '',
          role: storedRole || 'student',
          picture: storedPicture || null,
        });

        // 🔥 Set a timeout to auto-logout when token expires
        const logoutTimer = setTimeout(() => {
          console.log('Auto-logout triggered due to token expiry');
          logout();
        }, timeUntilExpiry);

        // ✅ Cleanup timeout if component unmounts
        return () => clearTimeout(logoutTimer);
      }
    } catch (error) {
      console.error('Token decode error', error);
      logout();
    }
  } else {
    logout();
  }

  setIsAuthReady(true);
}, []);


  // Login function
  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('name', userData.name);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('role', userData.role || 'student');
    if (userData.Profilepicture) { // For Google users
      localStorage.setItem('picture', userData.picture);
    }

    setToken(newToken);
    setUser(userData);
    window.dispatchEvent(new Event('userUpdated')); // Notify other components like Navbar
  };

  // Logout function
  const logout = () => {
    localStorage.clear(); // Clear all relevant items
    setToken(null);
    setUser(null);
    window.dispatchEvent(new Event('userUpdated')); // Notify other components
  };

  // Value provided by the context
  const authContextValue = {
    user,
    token,
    isAuthReady,
    login,
    logout,
    checkTokenValidity, // Expose for specific checks before API calls if needed
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};