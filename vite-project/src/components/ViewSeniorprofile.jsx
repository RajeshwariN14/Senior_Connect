
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   FaUniversity,
//   FaUserGraduate,
//   FaCode,
//   FaLinkedin,
//   FaUserPlus,
// } from 'react-icons/fa';

// function ViewSeniorprofile() {
//   const { id: seniorId } = useParams();
//   const [senior, setSenior] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showFormCard, setShowFormCard] = useState(false);
//   const [cetPercentile, setCetPercentile] = useState('');
//   const [jeePercentile, setJeePercentile] = useState('');
//   const [cetScoreCard, setCetScoreCard] = useState(null);
//   const [jeeScoreCard, setJeeScoreCard] = useState(null);
//   const [requestSent, setRequestSent] = useState(false);

//   useEffect(() => {
//     const fetchSenior = async () => {
//       try {
//         const res = await fetch(`https://senior-connect-backend.onrender.com3000/api/auth/seniors/${seniorId}`);
//         const data = await res.json();
//         setSenior(data);
//       } catch (error) {
//         console.error('Error fetching senior data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSenior();
//   }, [seniorId]);

//   useEffect(() => {
//     const checkIfAlreadyRequested = async () => {
//       try {
//         const res = await fetch("https://senior-connect-backend.onrender.com3000/api/pending/student", {
//           credentials: "include",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         const data = await res.json();

//         const alreadySent = data.some(
//           (request) => request.senior._id === seniorId
//         );

//         if (alreadySent) {
//           setRequestSent(true);
//         }
//       } catch (error) {
//         console.error("Error checking existing session request:", error);
//       }
//     };

//     checkIfAlreadyRequested();
//   }, [seniorId]);

//   const handleSendRequest = async () => {
//     if (!jeePercentile && !cetPercentile) {
//       alert('Please enter at least one percentile (JEE or CET)');
//       return;
//     }
//     if (jeePercentile && !jeeScoreCard) {
//       alert('Please upload JEE scorecard');
//       return;
//     }
//     if (cetPercentile && !cetScoreCard) {
//       alert('Please upload CET scorecard');
//       return;
//     }

//     const formData = new FormData();
//     formData.append("seniorId", seniorId);
//     if (jeePercentile) formData.append("jeePercentile", jeePercentile);
//     if (cetPercentile) formData.append("cetPercentile", cetPercentile);
//     if (jeeScoreCard) formData.append("jeeScoreCard", jeeScoreCard);


//     if (cetScoreCard) formData.append("cetScoreCard", cetScoreCard);

//     try {
//       const res = await fetch("https://senior-connect-backend.onrender.com3000/api/requests/request", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setRequestSent(true);
//         setShowFormCard(false);
//         alert("Session request sent successfully!");
//       } else {
//         alert(`Failed to send request: ${data.msg || data.message}`);
//       }
//     } catch (error) {
//       console.error('Error sending request:', error);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-center text-gray-500 font-semibold text-xl">Loading senior profile...</div>;
//   }

//   if (!senior) {
//     return <div className="p-6 text-center text-red-500 font-semibold text-xl">Senior not found.</div>;
//   }

//   return (
//     <div className="flex justify-center px-4 py-10 font-sans">
//       <div className="relative w-full max-w-3xl bg-white text-[#222831] rounded-3xl shadow-xl border border-[#d0d0d0] px-6 py-10 text-center overflow-hidden">

//         {/* Modal */}
//         {showFormCard && (
//           <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/90">
//             <div className="border border-[#76ABAE] rounded-xl shadow-2xl p-6 w-[90%] max-w-sm text-[#222831] bg-white">
//               <h3 className="text-lg font-semibold mb-4 text-center">
//                 Enter Your Percentile Details
//               </h3>

//               <input
//                 type="text"
//                 placeholder="CET Percentile (e.g. 98.75)"
//                 value={cetPercentile}
//                 onChange={(e) => setCetPercentile(e.target.value)}
//                 className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
//               />

//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">CET Marksheet:</label>
//                 <label className="inline-block px-4 py-2 cursor-pointer bg-[#76ABAE] text-white rounded-md">
//                   Upload
//                   <input
//                     type="file"
//                     accept=".jpg,.jpeg,.png,.pdf"
//                     onChange={(e) => setCetScoreCard(e.target.files[0])}
//                     className="hidden"
//                   />
//                 </label>
//                 {cetScoreCard && <p className="mt-2 text-sm">{cetScoreCard.name}</p>}
//               </div>

//               <input
//                 type="text"
//                 placeholder="JEE Percentile (e.g. 97.50)"
//                 value={jeePercentile}
//                 onChange={(e) => setJeePercentile(e.target.value)}
//                 className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
//               />

//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">JEE Marksheet:</label>
//                 <label className="inline-block px-4 py-2 cursor-pointer bg-[#76ABAE] text-white rounded-md">
//                   Upload
//                   <input
//                     type="file"
//                     accept=".jpg,.jpeg,.png,.pdf"
//                     onChange={(e) => setJeeScoreCard(e.target.files[0])}
//                     className="hidden"
//                   />
//                 </label>
//                 {jeeScoreCard && <p className="mt-2 text-sm">{jeeScoreCard.name}</p>}
//               </div>

//               <div className="flex justify-end gap-4">
//                 <button
//                   onClick={() => setShowFormCard(false)}
//                   className="px-4 py-2 bg-[#EEEEEE] text-[#222831] rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSendRequest}
//                   className="px-4 py-2 bg-[#222831] text-white rounded-md hover:bg-[#5a999c]"
//                 >
//                   Submit & Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Profile Display */}
//         <div className={`${showFormCard ? 'blur-sm pointer-events-none' : ''}`}>
//           <div className="flex flex-col items-center">
//             <div className="bg-[#EEEEEE] p-[5px] rounded-full mb-5 shadow-md ring-4 ring-[#76ABAE]">
//               <img
//                 src={senior.profilePicture || '/profile.svg'}
//                 alt={senior?.name?.name || 'Senior'}
//                 className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
//               />
//             </div>

//             <h2 className="text-3xl font-extrabold mb-1 text-[#31363F]">
//               {senior?.name?.name}
//             </h2>
//             <p className="italic text-sm text-[#555] mb-3">
//               {senior.description || 'Senior Mentor'}
//             </p>

//             <div className="text-sm text-[#444] space-y-2 mb-6">
//               <p className="flex items-center justify-center gap-2">
//                 <FaUniversity className="text-[#76ABAE]" />
//                 <span className="font-medium">College:</span> {senior.collegeName}
//               </p>
//               <p className="flex items-center justify-center gap-2">
//                 <FaCode className="text-[#76ABAE]" />
//                 <span className="font-medium">Branch:</span> {senior.branch}
//               </p>
//               <p className="flex items-center justify-center gap-2">
//                 <FaUserGraduate className="text-[#76ABAE]" />
//                 <span className="font-medium">Year:</span> {senior.currentYear}
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
//               {senior.LinkedInUrl && (
//                 <a
//                   href={senior.LinkedInUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 bg-[#76ABAE] text-[#222831] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#5a9295]"
//                 >
//                   <FaLinkedin /> LinkedIn Profile
//                 </a>
//               )}

//               {requestSent ? (
//                 <span className="px-5 py-2.5 bg-[#FFD369] text-black rounded-full text-sm font-semibold shadow-md">
//                   Request Sent
//                 </span>
//               ) : (
//                 <button
//                   onClick={() => setShowFormCard(true)}
//                   className="flex items-center gap-2 px-5 py-2.5 bg-[#222831] text-white hover:bg-[#5a9295] rounded-full text-sm font-semibold shadow-md"
//                 >
//                   <FaUserPlus /> Request a Session
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewSeniorprofile;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaUniversity,
  FaUserGraduate,
  FaCode,
  FaLinkedin,
  FaUserPlus,
} from 'react-icons/fa';

function ViewSeniorprofile() {
  const { id: seniorId } = useParams();
  const [senior, setSenior] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFormCard, setShowFormCard] = useState(false);
  const [cetPercentile, setCetPercentile] = useState('');
  const [jeePercentile, setJeePercentile] = useState('');
  const [cetScoreCard, setCetScoreCard] = useState(null);
  const [jeeScoreCard, setJeeScoreCard] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchSenior = async () => {
      try {
        const res = await fetch(`https://senior-connect-backend.onrender.com3000/api/auth/seniors/${seniorId}`);
        const data = await res.json();
        setSenior(data);
      } catch (error) {
        console.error('Error fetching senior data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSenior();
  }, [seniorId]);

  useEffect(() => {
    const checkIfAlreadyRequested = async () => {
      try {
        const res = await fetch("https://senior-connect-backend.onrender.com3000/api/pending/student", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        const alreadySent = data.some(
          (request) => request.senior._id === seniorId
        );

        if (alreadySent) {
          setRequestSent(true);
        }
      } catch (error) {
        console.error("Error checking existing session request:", error);
      }
    };

    checkIfAlreadyRequested();
  }, [seniorId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('https://senior-connect-backend.onrender.com3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUserRole(data.role);
        }
      } catch (error) {
        console.error("Error fetching current user role:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSendRequest = async () => {
    if (!jeePercentile && !cetPercentile) {
      alert('Please enter at least one percentile (JEE or CET)');
      return;
    }
    if (jeePercentile && !jeeScoreCard) {
      alert('Please upload JEE scorecard');
      return;
    }
    if (cetPercentile && !cetScoreCard) {
      alert('Please upload CET scorecard');
      return;
    }

    const formData = new FormData();
    formData.append("seniorId", seniorId);
    if (jeePercentile) formData.append("jeePercentile", parseFloat(jeePercentile));
    if (cetPercentile) formData.append("cetPercentile", parseFloat(cetPercentile));
    if (jeeScoreCard) formData.append("jeeScoreCard", jeeScoreCard);
    if (cetScoreCard) formData.append("cetScoreCard", cetScoreCard);

    try {
      const res = await fetch("https://senior-connect-backend.onrender.com3000/api/requests/request", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setRequestSent(true);
        setShowFormCard(false);
        alert("Session request sent successfully!");
      } else {
        alert(`Failed to send request: ${data.msg || data.message}`);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500 font-semibold text-xl">Loading senior profile...</div>;
  }

  if (!senior) {
    return <div className="p-6 text-center text-red-500 font-semibold text-xl">Senior not found.</div>;
  }

  return (
    <div className="flex justify-center px-4 py-10 font-sans">
      <div className="relative w-full max-w-3xl bg-white text-[#222831] rounded-3xl shadow-xl border border-[#d0d0d0] px-6 py-10 text-center overflow-hidden">
        {/* Modal */}
        {showFormCard && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/90">
            <div className="border border-[#76ABAE] rounded-xl shadow-2xl p-6 w-[90%] max-w-sm text-[#222831] bg-white">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Enter Your Percentile Details
              </h3>

              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="CET Percentile (e.g. 98.75)"
                value={cetPercentile}
                onChange={(e) => setCetPercentile(e.target.value)}
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
              />

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Upload CET ScoreCard (Only jpg/png/jpeg):</label>
                <label className="inline-block px-4 py-2 cursor-pointer bg-[#76ABAE] text-white rounded-md">
                  Upload
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => setCetScoreCard(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                {cetScoreCard && <p className="mt-2 text-sm">{cetScoreCard.name}</p>}
              </div>

              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="JEE Percentile (e.g. 97.50)"
                value={jeePercentile}
                onChange={(e) => setJeePercentile(e.target.value)}
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
              />

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Upload JEE ScoreCard (Only jpg/png/jpeg):</label>
                <label className="inline-block px-4 py-2 cursor-pointer bg-[#76ABAE] text-white rounded-md">
                  Upload
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => setJeeScoreCard(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                {jeeScoreCard && <p className="mt-2 text-sm">{jeeScoreCard.name}</p>}
              </div>

              {/* CHANGE MADE HERE */}
              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={() => setShowFormCard(false)}
                  className="px-4 py-2 bg-[#EEEEEE] text-[#222831] rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendRequest}
                  className="px-4 py-2 bg-[#222831] text-white rounded-md hover:bg-[#5a999c]"
                >
                  Submit & Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Display */}
        <div className={`${showFormCard ? 'blur-sm pointer-events-none' : ''}`}>
          <div className="flex flex-col items-center">
            <div className="bg-[#EEEEEE] p-[5px] rounded-full mb-5 shadow-md ring-4 ring-[#76ABAE]">
              <img
                src={senior.profilePicture || '/profile.svg'}
                alt={senior?.name?.name || 'Senior'}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            <h2 className="text-3xl font-extrabold mb-1 text-[#31363F]">
              {senior?.name?.name}
            </h2>
            <p className="italic text-sm text-[#555] mb-3">
              {senior.description || 'Senior Mentor'}
            </p>

            <div className="text-sm text-[#444] space-y-2 mb-6">
              <p className="flex items-center justify-center gap-2">
                <FaUniversity className="text-[#76ABAE]" />
                <span className="font-medium">College:</span> {senior.collegeName}
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaCode className="text-[#76ABAE]" />
                <span className="font-medium">Branch:</span> {senior.branch}
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaUserGraduate className="text-[#76ABAE]" />
                <span className="font-medium">Year:</span> {senior.currentYear}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              {senior.LinkedInUrl && (
                <a
                  href={senior.LinkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#76ABAE] text-[#222831] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#5a9295]"
                >
                  <FaLinkedin /> LinkedIn Profile
                </a>
              )}

              {requestSent ? (
                <span className="px-5 py-2.5 bg-[#FFD369] text-black rounded-full text-sm font-semibold shadow-md">
                  Request Sent
                </span>
              ) : (
                <button
                  onClick={() => setShowFormCard(true)}
                  disabled={userRole === 'senior'}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shadow-md ${
                    userRole === 'senior'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#222831] text-white hover:bg-[#5a9295]'
                  }`}
                >
                  <FaUserPlus /> Request a Session
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSeniorprofile;

