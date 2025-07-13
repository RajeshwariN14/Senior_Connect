import React, { useState } from 'react';
import Card from './Card';

const cardData = [
  {
    id: 1,
    name: "Sneha Patil",
    university: "PICT Pune",
    year: "2025",
    branch: "AI & DS",
    description: "Passionate about backend and data analytics.",
    skills: ["Node.js", "SQL", "React"],
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    linkedin: "https://linkedin.com/in/snehapatil",
    email: "sneha@example.com",
  },
  {
    id: 2,
    name: "Aarav Mehta",
    university: "COEP",
    year: "2024",
    branch: "Computer Science",
    description: "Open-source contributor and Java enthusiast.",
    skills: ["Java", "Spring Boot", "Git"],
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    linkedin: "https://linkedin.com/in/aaravmehta",
    email: "aarav@example.com",
  },
  {
    id: 3,
    name: "Riya Shah",
    university: "VIT Pune",
    year: "2026",
    branch: "Information Technology",
    description: "Frontend developer and UI/UX designer.",
    skills: ["HTML", "CSS", "Figma"],
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    linkedin: "https://linkedin.com/in/riyashah",
    email: "riya@example.com",
  },
  {
    id: 4,
    name: "Vivaan Deshmukh",
    university: "MIT WPU",
    year: "2025",
    branch: "AI & ML",
    description: "AI researcher and Kaggle competitor.",
    skills: ["Python", "TensorFlow", "Pandas"],
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    linkedin: "https://linkedin.com/in/vivaandeshmukh",
    email: "vivaan@example.com",
  },
  {
    id: 5,
    name: "Ananya Joshi",
    university: "SPIT Mumbai",
    year: "2024",
    branch: "Information Technology",
    description: "Cybersecurity enthusiast and web developer.",
    skills: ["CyberSec", "Linux", "JavaScript"],
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    linkedin: "https://linkedin.com/in/ananyajoshi",
    email: "ananya@example.com",
  },
  {
    id: 6,
    name: "Karan Verma",
    university: "PCCOE Pune",
    year: "2025",
    branch: "Computer Engineering",
    description: "Backend developer with DevOps interest.",
    skills: ["Express.js", "Docker", "MongoDB"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedin: "https://linkedin.com/in/karanverma",
    email: "karan@example.com",
  },
];



function CardSection({ twoPerRow }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleConnectClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <div className={`max-w-7xl mx-auto grid gap-6 ${twoPerRow ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {cardData.map((user, index) => (
          <Card key={index} {...user} onConnectClick={() => handleConnectClick(user)} />
        ))}
      </div>

      {/* Modal Popout */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 text-gray-600 text-xl hover:text-red-500"
            >
              &times;
            </button>
            <div className="text-center">
              <img src={selectedUser.image} alt={selectedUser.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-800">{selectedUser.name}</h2>
              <p className="text-sm text-gray-600">{selectedUser.university}</p>
              <p className="text-sm text-gray-600">{selectedUser.branch} • {selectedUser.year}</p>
              <p className="text-gray-700 mt-4">{selectedUser.description}</p>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {selectedUser.skills.map((skill, i) => (
                  <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{skill}</span>
                ))}
              </div>

              {/* Connect buttons */}
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={selectedUser.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Connect on LinkedIn
                </a>
                <button
                  onClick={() => alert(`Email sent to ${selectedUser.email}`)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Send Connect Request via Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardSection;
