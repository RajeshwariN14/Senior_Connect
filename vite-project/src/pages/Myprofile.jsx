import React, { useState, useEffect } from 'react';
import StudentProfile from './Studentprofile';
import SeniorProfile from './Seniorprofile';

let toggleCount = 0; // This will persist across renders (not reloads)

function Myprofile() {
  const [role, setRole] = useState('');

  useEffect(() => {
    toggleCount++;
    const currentRole = toggleCount % 2 === 1 ? 'student' : 'senior';
    setRole(currentRole);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {role === 'student' ? (
        <StudentProfile />
      ) : role === 'senior' ? (
        <SeniorProfile />
      ) : (
        <div className="text-center text-red-500">Invalid Role or Not Logged In</div>
      )}
    </div>
  );
}

export default Myprofile;
