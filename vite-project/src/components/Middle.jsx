
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from './Card';

// function Middle({ twoPerRow, searchQuery }) {
//   const [seniors, setSeniors] = useState([]);

//   useEffect(() => {
//     if (!searchQuery || searchQuery.trim() === '') {
//       fetchAllSeniors();
//     } else {
//       handleSearch(searchQuery);
//     }
//   }, [searchQuery]);

//   const fetchAllSeniors = () => {
//     axios.get('https://senior-connect-backend.onrender.com3000/api/auth/seniors')
//       .then(res => setSeniors(res.data))
//       .catch(err => console.error('Error fetching seniors:', err));
//   };

//   const handleSearch = async (query) => {
//     try {
//       const res = await axios.get(`https://senior-connect-backend.onrender.com3000/api/seniors/search?collegeName=${query}`);
//       setSeniors(res.data);
//     } catch (err) {
//       console.error('Search failed', err);
//     }
//   };

//   return (
//     <section className="bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] py-20 px-4 min-h-screen">
//       <div className="text-center mb-10">
//         <h2 className="text-4xl font-bold text-[#222831] mb-4">
//           Find Guidance. Build Real Connections.
//         </h2>
//         <p className="text-[#31363F] max-w-2xl mx-auto text-base">
//           Connect with experienced seniors who’ve walked the same path. Real conversations, real growth.
//         </p>
//       </div>

//       {/* Card Section */}
//       <div className={`max-w-7xl mx-auto grid gap-8 px-4 ${
//         twoPerRow ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
//       }`}>
//         {seniors.map(senior => (
//           <Card
//             key={senior._id}
//             id={senior._id}
//             name={typeof senior.name === 'object' ? senior.name.name : senior.name}
//             collegeName={senior.collegeName}
//             currentYear={senior.currentYear}
//             branch={senior.branch}
//             profilePicture={senior.profilePicture || 'https://via.placeholder.com/150'}
//             isVerified={senior.isVerified}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Middle;


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Card from './Card';

const keywords = ['Guidance', 'Support', 'Success'];

function Middle({ twoPerRow }) {
  const [seniors, setSeniors] = useState([]);

  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    axios.get('https://senior-connect-backend.onrender.com3000/api/auth/seniors')
      .then(res => setSeniors(res.data))
      .catch(err => console.error('Error fetching seniors:', err));
  }, []);

  // Typewriter (no backspace)
  useEffect(() => {
    const fullLine1 = `Find ${keywords[lineIndex]} and`;
    const fullLine2 = `Build Real Connections.`;
    const fullText = fullLine1 + '\n' + fullLine2;

    const totalLength = fullText.length;

    const delay = 70;

    const timeout = setTimeout(() => {
      if (charIndex < totalLength) {
        const nextCharIndex = charIndex + 1;
        const slice = fullText.slice(0, nextCharIndex);
        setLine1(slice.split('\n')[0] || '');
        setLine2(slice.split('\n')[1] || '');
        setCharIndex(nextCharIndex);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex]);

  return (
    <section className="relative bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] py-20 px-4 min-h-screen font-[Poppins]">
      
      {/* Typing Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#222831] leading-snug">
          {line1}
          <br />
          {line2}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-[#31363F] max-w-2xl mx-auto text-lg mt-4"
        >
          Connect with experienced seniors who’ve walked the same path. Real conversations, real growth.
        </motion.p>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className={`max-w-7xl mx-auto grid gap-8 px-4 ${
          twoPerRow ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
        }`}
      >
        {seniors.map(senior => (
          <Card
            key={senior._id}
            id={senior._id}
            name={senior.name}
            collegeName={senior.collegeName}
            currentYear={senior.currentYear}
            branch={senior.branch}
            profilePicture={senior.profilePicture || 'https://via.placeholder.com/150'}
            isVerified={senior.isVerified}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default Middle;

