import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const dummyConnections = [
  {
    id: 1,
    name: 'Sneha Patil',
    university: 'PICT Pune',
    branch: 'AI & DS',
    year: '2025',
    skills: ['Node.js', 'SQL', 'React'],
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    linkedin: 'https://linkedin.com/in/snehapatil',
    requestStatus: 'scheduled',
    meetingDate: '2025-07-10',
  },
  {
    id: 2,
    name: 'Riya Shah',
    university: 'VIT Pune',
    branch: 'IT',
    year: '2026',
    skills: ['UI/UX', 'Figma'],
    image: 'https://randomuser.me/api/portraits/women/18.jpg',
    linkedin: 'https://linkedin.com/in/riyashah',
    requestStatus: 'pending',
  },
  {
    id: 3,
    name: 'Karan Verma',
    university: 'PCCOE Pune',
    branch: 'Comp Engg',
    year: '2025',
    skills: ['Backend', 'Docker'],
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    linkedin: 'https://linkedin.com/in/karanverma',
    requestStatus: 'completed',
  },
];

function Connections() {
  return (
    <div className="min-h-screen px-6 py-12 bg-[#EEEEEE] font-sans">
      <h1 className="text-4xl font-extrabold text-center text-[#222831] mb-12">
        Your <span className="text-[#76ABAE]">Connections</span>
      </h1>

      {dummyConnections.length === 0 ? (
        <p className="text-center text-[#444] text-lg">
          You haven't connected with any seniors yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyConnections.map((senior) => (
            <div
              key={senior.id}
              className="bg-[#31363F] text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300"
            >
              <img
                src={senior.image}
                alt={senior.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[#76ABAE] shadow-md"
              />
              <h2 className="text-xl font-bold text-center">{senior.name}</h2>
              <p className="text-sm text-center text-gray-300">{senior.university}</p>
              <p className="text-sm text-center text-gray-400 mb-2">
                {senior.branch} • {senior.year}
              </p>

              <div className="flex flex-wrap justify-center mt-2 gap-2">
                {senior.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-[#76ABAE]/20 text-[#76ABAE] text-xs px-3 py-1 rounded-full border border-[#76ABAE]/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-center gap-3 mt-5">
                <a
                  href={senior.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#76ABAE] text-white px-4 py-1.5 rounded hover:bg-[#5ea0a2] flex items-center gap-2 text-sm shadow"
                >
                  <FaLinkedin /> LinkedIn
                </a>

                {senior.requestStatus === 'pending' ? (
                  <button
                    disabled
                    className="bg-yellow-400 text-white px-4 py-1.5 rounded text-sm cursor-not-allowed shadow"
                  >
                    ⏳ Pending
                  </button>
                ) : senior.requestStatus === 'scheduled' ? (
                  <button
                    disabled
                    className="bg-green-500 text-white px-4 py-1.5 rounded text-sm cursor-not-allowed shadow"
                  >
                    🗓 {senior.meetingDate}
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-500 text-white px-4 py-1.5 rounded text-sm cursor-not-allowed shadow"
                  >
                    ✅ Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Connections;
