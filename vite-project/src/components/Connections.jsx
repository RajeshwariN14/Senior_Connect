
// import React, { useEffect, useState } from 'react';
// import { FaLinkedin } from 'react-icons/fa';
// import axios from 'axios';

// function Connections() {
//   const [connections, setConnections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:3000/api/pending/student', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // Deduplicate by senior._id — keep only latest
//         const uniqueMap = new Map();
//         res.data.forEach((conn) => {
//           const seniorId = conn.senior._id;
//           if (!uniqueMap.has(seniorId)) {
//             uniqueMap.set(seniorId, conn);
//           }
//         });

//         setConnections(Array.from(uniqueMap.values()));
//       } catch (err) {
//         console.error('Error fetching connections:', err);
//         setError('Failed to fetch connections');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConnections();
//   }, []);

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleString('en-IN', {
//       dateStyle: 'medium',
//       timeStyle: 'short',
//     });
//   };

//   if (loading) return <p className="text-center py-10">Loading...</p>;
//   if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

//   return (
//     <div className="min-h-screen px-6 py-12 bg-[#EEEEEE] font-sans">
//       <h1 className="text-4xl font-extrabold text-center text-[#222831] mb-12">
//         Your <span className="text-[#76ABAE]">Connections</span>
//       </h1>

//       {connections.length === 0 ? (
//         <p className="text-center text-[#444] text-lg">
//           You haven't connected with any seniors yet.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {connections.map((request) => {
//             const senior = request.senior;
//             const isConfirmed = request.status === 'confirmed';
//             const isPending = request.status === 'pending';
//             const isCompleted = request.status === 'completed';

//             return (
//               <div
//                 key={request._id}
//                 className="bg-[#31363F] text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300"
//               >
//                 <img
//                   src={senior.image || '/profile.svg'}
//                   alt={senior.name?.name || 'Senior'}
//                   className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[#76ABAE] shadow-md"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = '/profile.svg';
//                   }}
//                 />
//                 <h2 className="text-xl font-bold text-center">{senior.name?.name}</h2>
//                 <p className="text-sm text-center text-gray-300">{senior.collegeName}</p>
//                 <p className="text-sm text-center text-gray-400 mb-2">
//                   {senior.branch} • {senior.currentYear}
//                 </p>

//                 <div className="flex flex-wrap justify-center mt-2 gap-2">
//                   {senior.skills?.map((skill, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-[#76ABAE]/20 text-[#76ABAE] text-xs px-3 py-1 rounded-full border border-[#76ABAE]/50"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex justify-center gap-3 mt-5">
//                   <a
//                     href={senior.LinkedInUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="bg-[#76ABAE] text-white px-4 py-1.5 rounded hover:bg-[#5ea0a2] flex items-center gap-2 text-sm shadow"
//                   >
//                     <FaLinkedin /> LinkedIn
//                   </a>

//                   {isPending && (
//                     <button
//                       disabled
//                       className="bg-yellow-400 text-white px-4 py-1.5 rounded text-sm cursor-not-allowed shadow"
//                     >
//                       ⏳ Pending
//                     </button>
//                   )}

//                   {isConfirmed && (
//                     <button
//                       disabled
//                       className="bg-green-500 text-white px-4 py-1.5 rounded text-xs text-center cursor-not-allowed shadow leading-tight"
//                     >
//                        Confirmed<br />
//                       <span className="text-white font-normal text-[11px]">
//                         {request.scheduledAt ? formatDate(request.scheduledAt) : 'Meeting Scheduled'}
//                       </span>
//                     </button>
//                   )}

//                   {isCompleted && (
//                     <button
//                       disabled
//                       className="bg-gray-500 text-white px-4 py-1.5 rounded text-sm cursor-not-allowed shadow"
//                     >
//                        Completed
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Connections;



import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaUniversity, FaUserGraduate, FaCode } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';

function Connections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/pending/student', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const uniqueMap = new Map();
        res.data.forEach((conn) => {
          const seniorId = conn.senior._id;
          if (!uniqueMap.has(seniorId)) {
            uniqueMap.set(seniorId, conn);
          }
        });

        setConnections(Array.from(uniqueMap.values()));
      } catch (err) {
        console.error('Error fetching connections:', err);
        setError('Failed to fetch connections');
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="min-h-screen px-6 py-12 bg-[#EEEEEE] font-sans">
      <h1 className="text-4xl font-extrabold text-center text-[#222831] mb-12">
        Your <span className="text-[#76ABAE]">Connections</span>
      </h1>

      {connections.length === 0 ? (
        <p className="text-center text-[#444] text-lg">
          You haven't connected with any seniors yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {connections.map((request) => {
            const senior = request.senior;
            const isConfirmed = request.status === 'confirmed';
            const isPending = request.status === 'pending';
            const isCompleted = request.status === 'completed';

            const profileImage = senior.image || '/profile.svg';

            return (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white text-[#222831] rounded-3xl shadow-xl border border-[#d0d0d0] hover:shadow-2xl w-full max-w-sm mx-auto p-6"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-[#EEEEEE] p-[4px] rounded-full mb-4 shadow-md ring-4 ring-[#76ABAE]"
                  >
                    <img
                      src={profileImage}
                      alt={senior.name?.name || 'Senior'}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/profile.svg';
                      }}
                    />
                  </motion.div>

                  <h2 className="text-xl font-bold mb-1 text-[#31363F]">
                    {senior.name?.name}
                  </h2>
                  <div className="text-sm text-[#444] space-y-2">
                    <p className="flex items-center justify-center gap-2">
                      <FaUniversity className="text-[#76ABAE]" />
                      {senior.collegeName}
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <FaCode className="text-[#76ABAE]" />
                      {senior.branch}
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <FaUserGraduate className="text-[#76ABAE]" />
                      Year: {senior.currentYear}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center mt-4 gap-2">
                    {senior.skills?.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-[#76ABAE]/20 text-[#76ABAE] text-xs px-3 py-1 rounded-full border border-[#76ABAE]/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center flex-wrap gap-3 mt-5">
                    <a
                      href={senior.LinkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#76ABAE] text-white px-4 py-1.5 rounded-full hover:bg-[#5ea0a2] flex items-center gap-2 text-sm shadow"
                    >
                      <FaLinkedin /> LinkedIn
                    </a>

                    {isPending && (
                      <button
                        disabled
                        className="bg-yellow-400 text-white px-4 py-1.5 rounded-full text-sm cursor-not-allowed shadow"
                      >
                        ⏳ Pending
                      </button>
                    )}

                    {isConfirmed && (
                      <button
                        disabled
                        className="bg-green-500 text-white px-4 py-1.5 rounded-full text-xs text-center cursor-not-allowed shadow leading-tight"
                      >
                         Confirmed
                        <br />
                        <span className="text-white font-normal text-[11px]">
                          {request.scheduledAt ? formatDate(request.scheduledAt) : 'Meeting Scheduled'}
                        </span>
                      </button>
                    )}

                    {isCompleted && (
                      <button
                        disabled
                        className="bg-gray-500 text-white px-4 py-1.5 rounded-full text-sm cursor-not-allowed shadow"
                      >
                         Completed
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Connections;


