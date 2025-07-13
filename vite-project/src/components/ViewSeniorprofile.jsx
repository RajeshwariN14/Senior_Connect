// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   FaUniversity,
//   FaUserGraduate,
//   FaCode,
//   FaLinkedin,
//   FaUserPlus,
// } from 'react-icons/fa';

// function ViewSeniorprofile() {
//   const [requestStatus, setRequestStatus] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [percentile, setPercentile] = useState('');
//   const { id } = useParams();

//   const cardData = [
//     {
//       id: 1,
//       name: 'Sneha Patil',
//       university: 'PICT Pune',
//       year: '2025',
//       branch: 'AI & DS',
//       description: 'Passionate about backend and data analytics.',
//       image: 'https://randomuser.me/api/portraits/women/12.jpg',
//       linkedin: 'https://linkedin.com/in/snehapatil',
//       email: 'sneha@example.com',
//       expectedPercentile: '95+',
//     },
//     // other data ...
//   ];

//   const senior = cardData.find((user) => user.id === parseInt(id));

//   const handleSendRequest = async () => {
//     if (!percentile.trim()) {
//       alert('Please enter your CET/JEE percentile.');
//       return;
//     }

//     setRequestStatus('pending');

//     try {
//       const res = await fetch('http://localhost:5000/api/send-request-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: senior.name,
//           email: senior.email,
//           percentile,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setRequestStatus('sent');
//         setShowModal(false);
//       } else {
//         setRequestStatus('error');
//         alert(`Failed to send email: ${data.message}`);
//       }
//     } catch (error) {
//       console.error(error);
//       setRequestStatus('error');
//       alert('An error occurred while sending the request');
//     }
//   };

//   if (!senior) {
//     return (
//       <div className="p-6 text-center text-red-500 font-semibold text-xl">
//         Senior not found.
//       </div>
//     );
//   }

//   return (
//     <div className="relative max-w-3xl mx-auto mt-12 px-6 py-10 bg-white text-[#222831] rounded-3xl shadow-xl border border-[#d0d0d0] font-sans">
//       <div className="flex flex-col items-center text-center relative">
//         <div className="bg-[#EEEEEE] p-[5px] rounded-full mb-5 shadow-md ring-4 ring-[#76ABAE]">
//           <img
//             src={senior.image}
//             alt={senior.name}
//             className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
//           />
//         </div>

//         <h2 className="text-3xl font-extrabold tracking-wide mb-1 text-[#31363F]">{senior.name}</h2>
//         <p className="italic text-sm text-[#555] mb-3">{senior.description}</p>

//         <div className="text-sm text-[#444] space-y-2 mb-6">
//           <p className="flex items-center justify-center gap-2">
//             <FaUniversity className="text-[#76ABAE]" />
//             <span className="font-medium">College:</span> {senior.university}
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             <FaCode className="text-[#76ABAE]" />
//             <span className="font-medium">Branch:</span> {senior.branch}
//           </p>
//           <p className="flex items-center justify-center gap-2">
//             <FaUserGraduate className="text-[#76ABAE]" />
//             <span className="font-medium">Year:</span> {senior.year}
//           </p>
//         </div>

//         <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
//           <a
//             href={senior.linkedin}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-2 bg-[#76ABAE] text-[#222831] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#5a9295] transition shadow-md"
//           >
//             <FaLinkedin /> LinkedIn Profile
//           </a>

//           {requestStatus === 'sent' ? (
//             <span className="px-5 py-2.5 bg-[#FFD369] text-black rounded-full text-sm font-semibold shadow-md">
//               Request Sent
//             </span>
//           ) : (
//             <button
//               onClick={() => setShowModal(true)}
//               disabled={requestStatus === 'pending'}
//               className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-md ${
//                 requestStatus === 'pending'
//                   ? 'bg-gray-400 cursor-not-allowed text-white'
//                   : 'bg-[#222831] hover:bg-[#5a9295] text-white'
//               }`}
//             >
//               <FaUserPlus />
//               {requestStatus === 'pending' ? 'Sending...' : 'Request a Session'}
//             </button>
//           )}
//         </div>

//         {showModal && (
//           <div className="absolute top-full mt-6 left-1/2 transform -translate-x-1/2 bg-[#f8f8f8] p-6 rounded-xl shadow-2xl w-full max-w-sm z-30 border border-[#76ABAE] text-[#222831]">
//             <h3 className="text-lg font-semibold mb-4 text-center">
//               Enter your CET/JEE Percentile
//             </h3>
//             <input
//               type="text"
//               value={percentile}
//               onChange={(e) => setPercentile(e.target.value)}
//               placeholder="e.g. 98.75"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
//             />
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendRequest}
//                 className="px-4 py-2 bg-[#76ABAE] text-[#222831] rounded-md hover:bg-[#5a9295]"
//               >
//                 Submit & Send
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ViewSeniorprofile;
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaUniversity,
  FaUserGraduate,
  FaCode,
  FaLinkedin,
  FaUserPlus,
} from 'react-icons/fa';

function ViewSeniorprofile() {
  const [showFormCard, setShowFormCard] = useState(false);
  const [cetPercentile, setCetPercentile] = useState('');
  const [jeePercentile, setJeePercentile] = useState('');
  const [requestStatus, setRequestStatus] = useState(null);
  const { id } = useParams();

  const cardData = [
    {
      id: 1,
      name: 'Sneha Patil',
      university: 'PICT Pune',
      year: '2025',
      branch: 'AI & DS',
      description: 'Passionate about backend and data analytics.',
      image: 'https://randomuser.me/api/portraits/women/12.jpg',
      linkedin: 'https://linkedin.com/in/snehapatil',
      email: 'sneha@example.com',
    },
  ];

  const senior = cardData.find((user) => user.id === parseInt(id));

  const handleSendRequest = async () => {
    if (!cetPercentile.trim() && !jeePercentile.trim()) {
      alert('Please enter at least one percentile.');
      return;
    }

    setRequestStatus('pending');

    try {
      const res = await fetch('http://localhost:5000/api/send-request-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: senior.name,
          email: senior.email,
          cetPercentile,
          jeePercentile,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setRequestStatus('sent');
        setShowFormCard(false);
      } else {
        alert(`Failed to send email: ${data.message}`);
        setRequestStatus('error');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while sending the request.');
      setRequestStatus('error');
    }
  };

  if (!senior) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold text-xl">
        Senior not found.
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 py-10 font-sans">
      <div className="relative w-full max-w-3xl bg-white text-[#222831] rounded-3xl shadow-xl border border-[#d0d0d0] px-6 py-10 text-center overflow-hidden">

        {/* Popup form inside the card */}
        {/* {showFormCard && (
          <div className="absolute top-0 left-0 w-full h-full bg-[#f8f8f8] bg-opacity-95 z-20 flex flex-col justify-center items-center p-6">
            <div className="w-full max-w-sm">
              <h2 className="text-xl font-semibold mb-4 text-center">Enter Percentile Details</h2>
              <input
                type="text"
                placeholder="CET Percentile (e.g. 98.75)"
                value={cetPercentile}
                onChange={(e) => setCetPercentile(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
              />
              <input
                type="text"
                placeholder="JEE Percentile (e.g. 97.50)"
                value={jeePercentile}
                onChange={(e) => setJeePercentile(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowFormCard(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendRequest}
                  className="px-4 py-2 bg-[#76ABAE] text-[#222831] rounded hover:bg-[#5a9295]"
                >
                  Submit & Send
                </button>
              </div>
            </div>
          </div>
        )} */}
        {showFormCard && (
  <div className="absolute inset-0 z-20 flex items-center justify-center">
    <div className="bg-white border border-[#76ABAE] rounded-xl shadow-2xl p-6 w-[90%] max-w-sm text-[#222831]">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Enter Your Percentile Details
      </h3>

      <input
        type="text"
        placeholder="CET Percentile (e.g. 98.75)"
        value={cetPercentile}
        onChange={(e) => setCetPercentile(e.target.value)}
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
      />

      <input
        type="text"
        placeholder="JEE Percentile (e.g. 97.50)"
        value={jeePercentile}
        onChange={(e) => setJeePercentile(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
      />

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowFormCard(false)}
          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSendRequest}
          className="px-4 py-2 bg-[#76ABAE] text-[#222831] rounded-md hover:bg-[#5a9295]"
        >
          Submit & Send
        </button>
      </div>
    </div>
  </div>
)}


        {/* Main card content */}
        <div className={`${showFormCard ? 'blur-sm pointer-events-none' : ''}`}>
          <div className="flex flex-col items-center">
            <div className="bg-[#EEEEEE] p-[5px] rounded-full mb-5 shadow-md ring-4 ring-[#76ABAE]">
              <img
                src={senior.image}
                alt={senior.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            <h2 className="text-3xl font-extrabold mb-1 text-[#31363F]">{senior.name}</h2>
            <p className="italic text-sm text-[#555] mb-3">{senior.description}</p>

            <div className="text-sm text-[#444] space-y-2 mb-6">
              <p className="flex items-center justify-center gap-2">
                <FaUniversity className="text-[#76ABAE]" />
                <span className="font-medium">College:</span> {senior.university}
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaCode className="text-[#76ABAE]" />
                <span className="font-medium">Branch:</span> {senior.branch}
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaUserGraduate className="text-[#76ABAE]" />
                <span className="font-medium">Year:</span> {senior.year}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <a
                href={senior.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#76ABAE] text-[#222831] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#5a9295] transition shadow-md"
              >
                <FaLinkedin /> LinkedIn Profile
              </a>

              {requestStatus === 'sent' ? (
                <span className="px-5 py-2.5 bg-[#FFD369] text-black rounded-full text-sm font-semibold shadow-md">
                  Request Sent
                </span>
              ) : (
                <button
                  onClick={() => setShowFormCard(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#222831] text-white hover:bg-[#5a9295] rounded-full text-sm font-semibold shadow-md"
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

