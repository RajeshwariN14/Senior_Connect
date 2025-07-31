import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserFriends, FaChalkboardTeacher } from 'react-icons/fa';
import axios from 'axios';
import Card from './Card'; // Ensure this is the correct path

function Middle({ twoPerRow }) {
  const [seniors, setSeniors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/auth/seniors') // Adjust URL if needed
      .then(res => setSeniors(res.data))
      .catch(err => console.error('Error fetching seniors:', err));
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] py-20 px-4 min-h-screen">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#222831] mb-4">
          Find Guidance. Build Real Connections.
        </h2>
        <p className="text-[#31363F] max-w-2xl mx-auto text-base">
          Connect with experienced seniors who’ve walked the same path. Real conversations, real growth.
        </p>
      </div>

      {/* Dynamic Cards Section */}
      <div className={`max-w-7xl mx-auto grid gap-8 px-4 ${
        twoPerRow ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
      }`}>
        {seniors.map(senior => (
          <Card
            key={senior._id}
            id={senior._id}
            name={senior.name}
            collegeName={senior.collegeName}
            currentYear={senior.currentYear}
            branch={senior.branch}
            profilePicture={senior.profilePicture || 'https://via.placeholder.com/150'}
            isVerified={ senior.isVerified}
          />
        ))}
      </div>

      {/* Stats */}
     
    </section>
  );
}

export default Middle;
