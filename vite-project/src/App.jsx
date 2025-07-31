
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Navbar from './components/Navbar';
// import Middle from './components/Middle';
// import Aboutus from './components/Aboutus';

// import Studentlogin from './pages/Studentlogin';
// import Myprofile from './pages/Myprofile';
// import ViewSeniorprofile from './components/ViewSeniorprofile';
// import Connections from './components/Connections';
// import Connectionsenior from './components/Connectionsenior';
// import Register from './pages/Register';
// import Becomesenior from './pages/Becomesenior';
// import PrivateRoute from './components/PrivateRoute';
// import Seniorlist from './pages/Seniorlist';

// function AppRoutes() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* Home route */}
//         <Route
//           path="/"
//           element={
//             <div className="flex flex-col min-h-screen">
//               <Middle twoPerRow={false} />
//               <Aboutus />
//             </div>
//           }
//         />

//         {/* Public routes */}
//         <Route path="/login" element={<Studentlogin />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/become-senior" element={<Becomesenior />} />
//         <Route path="/profile" element={<Myprofile />} />
//         <Route path="/profile/:id" element={<ViewSeniorprofile />} />
//         <Route path="/connections" element={<Connections />} />
//         <Route path="/seniorconnection" element={<Connectionsenior />} />

//         {/* Private routes */}
//         <Route
//           path="/studentprofile"
//           element={
//             <PrivateRoute>
//               <Myprofile />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/seniorprofile"
//           element={
//             <PrivateRoute>
//               <Myprofile />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/seniors"
//           element={
//             <PrivateRoute>
//               <Seniorlist />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Middle from './components/Middle';
import Aboutus from './components/Aboutus';

import Studentlogin from './pages/Studentlogin';
import Myprofile from './pages/Myprofile'; // This will render SeniorProfile or StudentProfile
import ViewSeniorprofile from './components/ViewSeniorprofile';
import Connections from './components/Connections';
import Connectionsenior from './components/Connectionsenior';
import Register from './pages/Register';
import Becomesenior from './pages/Becomesenior';
import PrivateRoute from './components/PrivateRoute';
import Seniorlist from './pages/Seniorlist';

// Import the AuthProvider
import { AuthProvider } from './context/AuthContext';

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <Middle twoPerRow={false} />
              <Aboutus />
            </div>
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Studentlogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/become-senior" element={<Becomesenior />} />
        {/* Myprofile route will dynamically render SeniorProfile/StudentProfile based on user role */}
        <Route path="/profile" element={<Myprofile />} />
        <Route path="/profile/:id" element={<ViewSeniorprofile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/seniorconnection" element={<Connectionsenior />} />

        {/* Private routes - now using the PrivateRoute component with AuthContext */}
        <Route
          path="/studentprofile"
          element={
            <PrivateRoute>
              <Myprofile />
            </PrivateRoute>
          }
        />
        <Route
          path="/seniorprofile"
          element={
            <PrivateRoute>
              <Myprofile />
            </PrivateRoute>
          }
        />
        <Route
          path="/seniors"
          element={
            <PrivateRoute>
              <Seniorlist />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* Wrap your entire application with AuthProvider */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;

