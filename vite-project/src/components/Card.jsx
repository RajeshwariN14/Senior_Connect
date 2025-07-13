// import React from 'react';
// import { FaUniversity, FaUserGraduate, FaCode } from 'react-icons/fa';

// function Card({ id, name, university, year, branch, image }) {
//   const handleConnectClick = () => {
//     // Opens the profile in a new tab using window.open
//     window.open(`/profile/${id}`, '_blank');
//   };

//   return (
//     <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 w-full max-w-sm mx-auto p-6 font-sans hover:scale-[1.02]">
//       <div className="flex flex-col items-center text-center">
//         <div className="bg-gradient-to-r from-indigo-500 to-blue-400 p-[2px] rounded-full mb-4">
//           <img
//             src={image}
//             alt={name}
//             className="w-20 h-20 rounded-full object-cover border-2 border-white"
//           />
//         </div>

//         <h2 className="text-xl font-bold text-gray-800 tracking-wide mb-1">{name}</h2>

//         <div className="text-sm text-gray-600 space-y-1">
//           <p>
//             <span className="font-medium">College:</span> {university}
//           </p>
//           <p>
//             <span className="font-medium">Branch:</span> {branch}
//           </p>
//           <p>
//             <span className="font-medium">Year:</span> {year}
//           </p>
//         </div>

//         <button
//           onClick={handleConnectClick}
//           className="mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2 rounded-md font-medium text-sm hover:from-indigo-600 hover:to-blue-600 transition"
//         >
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Card;
import React from 'react';
import { FaUniversity, FaUserGraduate, FaCode } from 'react-icons/fa';

function Card({ id, name, university, year, branch, image }) {
  const handleConnectClick = () => window.open(`/profile/${id}`, '_blank');

  return (
    <div className="bg-white text-[#222831] rounded-3xl shadow-xl border border-[#d0d0d0] hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 w-full max-w-sm mx-auto p-6 font-sans">
      <div className="flex flex-col items-center text-center relative">
        <div className="absolute top-4 right-4 w-3 h-3  rounded-full animate-ping"></div>

        <div className="bg-[#EEEEEE] p-[5px] rounded-full mb-4 shadow-md ring-4 ring-[#76ABAE]">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>

        <h2 className="text-xl font-extrabold tracking-wide mb-2 text-[#31363F]">{name}</h2>

        <div className="text-sm text-[#444] space-y-2">
          <p className="flex items-center justify-center gap-2">
            <FaUniversity className="text-[#76ABAE]" /> <span className="font-medium">College:</span> {university}
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaCode className="text-[#76ABAE]" /> <span className="font-medium">Branch:</span> {branch}
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaUserGraduate className="text-[#76ABAE]" /> <span className="font-medium">Year:</span> {year}
          </p>
        </div>

        <button
          onClick={handleConnectClick}
          className="mt-5 bg-[#222831] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#5a9295] transition shadow-lg"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default Card;
