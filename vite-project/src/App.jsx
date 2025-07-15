import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Middle from './components/Middle';
import Aboutus from './components/Aboutus';

import Studentlogin from './pages/Studentlogin';
import Myprofile from './pages/Myprofile';
import ViewSeniorprofile from './components/ViewSeniorprofile';
import Connections from './components/Connections';
import Connectionsenior from './components/Connectionsenior';
import Register from './pages/register';

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <Middle twoPerRow={false} />
              <Aboutus />
            </div>
          }
        />
        <Route path="/login" element={<Studentlogin />} />
        <Route path="/profile" element={<Myprofile />} />
        <Route path="/profile/:id" element={<ViewSeniorprofile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/seniorconnection" element={<Connectionsenior />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
