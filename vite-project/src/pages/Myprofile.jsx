// import React, { useState, useEffect } from 'react';
// import StudentProfile from './Studentprofile';
// import SeniorProfile from './Seniorprofile';

// let toggleCount = 0; // This will persist across renders (not reloads)

// function Myprofile() {
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     toggleCount++;
//     const currentRole = toggleCount % 2 === 1 ? 'student' : 'senior';
//     setRole(currentRole);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {role === 'student' ? (
//         <StudentProfile />
//       ) : role === 'senior' ? (
//         <SeniorProfile />
//       ) : (
//         <div className="text-center text-red-500">Invalid Role or Not Logged In</div>
//       )}
//     </div>
//   );
// }

// export default Myprofile;


import React, { useState, useEffect } from 'react';
import StudentProfile from './Studentprofile';
import SeniorProfile from './Seniorprofile';

function Myprofile() {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setRole('');
      setLoading(false);
      return;
    }

    fetch('https://senior-connect-backend.onrender.com/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setRole(data.role || '');
        setLoading(false);
      })
      .catch(() => {
        setRole('');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

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
