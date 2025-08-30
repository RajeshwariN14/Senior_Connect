
// import React, { useState } from 'react';
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

// import { AuthProvider } from './context/AuthContext';

// function AppRoutes() {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <>
//       <Navbar onSearch={setSearchQuery} /> {/* Pass setter to Navbar */}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div className="flex flex-col min-h-screen">
//               <Middle searchQuery={searchQuery} twoPerRow={false} /> {/* Pass query to Middle */}
//               <Aboutus />
//             </div>
//           }
//         />

//         {/* Public Routes */}
//         <Route path="/login" element={<Studentlogin />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/become-senior" element={<Becomesenior />} />
//         <Route path="/profile" element={<Myprofile />} />
//         <Route path="/profile/:id" element={<ViewSeniorprofile />} />
//         <Route path="/connections" element={<Connections />} />
//         <Route path="/seniorconnection" element={<Connectionsenior />} />

//         {/* Private Routes */}
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
//       <AuthProvider>
//         <AppRoutes />
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 💡 Import your AuthProvider
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Middle from './components/Middle';
import Aboutus from './components/Aboutus';

import Studentlogin from './pages/Studentlogin';
import Myprofile from './pages/Myprofile';
import ViewSeniorprofile from './components/ViewSeniorprofile';
import Connections from './components/Connections';
import Connectionsenior from './components/Connectionsenior';
import Register from './pages/Register';
import Becomesenior from './pages/Becomesenior';
import PrivateRoute from './components/PrivateRoute';
import Seniorlist from './pages/Seniorlist';
import SearchResults from './pages/SearchResults';
import Feedback from './components/Feedback';

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
              <Feedback />
            </div>
          }
        />

        {/* Full-page About Us route */}
        <Route path="/about" element={<Aboutus />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Public routes */}
        <Route path="/login" element={<Studentlogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/become-senior" element={<Becomesenior />} />
        <Route path="/profile/:id" element={<ViewSeniorprofile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/seniorconnection" element={<Connectionsenior />} />
        <Route path="/search-results" element={<SearchResults />} />

        {/* Private routes */}
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
      {/* ✅ Wrap your entire app with AuthProvider */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;

