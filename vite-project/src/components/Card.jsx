
import React from 'react';
import { FaUniversity, FaUserGraduate, FaCode } from 'react-icons/fa';
// import Senior from '../../../Backend/models/senior';


function Card({
  id,
  name = "Unknown",
  collegeName = "N/A",
  currentYear = "N/A",
  branch = "N/A",
  profilePicture,
  isVerified,
  
}) {
  // const handleConnectClick = () => window.open(`/profile/${id}`, '_blank');
  const handleConnectClick = () => {
  window.location.href = `/profile/${id}`;
};
  const profileImage = profilePicture || '/profile.svg'; // fallback if image is not available

  return (
    <div className="bg-white text-[#222831] rounded-3xl shadow-xl border border-[#d0d0d0] hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 w-full max-w-sm mx-auto p-6 font-sans">
      <div className="flex flex-col items-center text-center relative">

        <div className="bg-[#EEEEEE] p-[5px] rounded-full mb-4 shadow-md ring-4 ring-[#76ABAE]">
          <img
            src={profileImage}
            alt={typeof name === 'string' ? name : 'User'}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>

        <h2 className="text-xl font-extrabold tracking-wide mb-1 text-[#31363F]">
          {typeof name === 'object' ? name.name : name}
        </h2>

        {/*   Verified / Verification Pending badge */}
        {typeof isVerified !== 'undefined' && (
          <div
            className={`text-xs font-semibold mb-2 px-3 py-1 rounded-full ${
              isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {isVerified ? 'Verified' : 'Verification Pending'}
          </div>
        )}

        <div className="text-sm text-[#444] space-y-2">
          <p className="flex items-center justify-center gap-2">
            <FaUniversity className="text-[#76ABAE]" />
            <span className="font-medium">College:</span> {collegeName}
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaCode className="text-[#76ABAE]" />
            <span className="font-medium">Branch:</span> {branch}
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaUserGraduate className="text-[#76ABAE]" />
            <span className="font-medium">Year:</span> {currentYear}
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
