// import React from 'react';
// import { FaUserFriends, FaBullseye, FaMedal, FaHeart } from 'react-icons/fa';

// function Aboutus() {
//   const features = [
//     {
//       icon: <FaUserFriends />,
//       title: 'Meet Real Seniors',
//       desc: 'No more random advice! Talk to real students from various top engineering colleges who’ve lived the experience.',
//     },
//     {
//       icon: <FaBullseye />,
//       title: 'Get Clarity on Choices',
//       desc: 'Confused between college or branch? Our mentors will guide you with placement stats, faculty quality, and real-life outcomes.',
//     },
//     {
//       icon: <FaMedal />,
//       title: 'Success Stories',
//       desc: 'Read how previous aspirants cracked their goals and made informed decisions that shaped their careers.',
//     },
//     {
//       icon: <FaHeart />,
//       title: 'Safe & Supportive',
//       desc: 'All conversations are safe and anonymous. Its just guidance with care.',
//     },
//   ];

//   return (
//     <div
//       id="about"
//       className="bg-gradient-to-br from-[#eeeeee] via-[#dfe6e9] to-[#eeeeee] text-[#222831] px-6 py-24"
//     >
//       <div className="max-w-7xl mx-auto text-center">
//         {/* Heading */}
//         <h2 className="text-5xl font-extrabold mb-6 tracking-tight text-[#222831] drop-shadow-sm">
//           About <span className="text-[#76ABAE]">SeniorConnect</span>
//         </h2>
//         <p className="max-w-3xl mx-auto text-lg text-[#31363F] mb-16 leading-relaxed">
//           We connect fresh aspirants of JEE & CET with seniors from top engineering colleges.
//           Get real insights, make smart decisions, and kickstart your dream journey with confidence.
//         </p>

//         {/* Features */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
//           {features.map((item, i) => (
//             <div
//               key={i}
//               className="bg-[#31363F] text-white border border-[#76ABAE]/40 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:shadow-[#76ABAE]/30 transition-transform hover:scale-[1.04]"
//             >
//               {/* Icon */}
//               <div className="bg-[#76ABAE] w-14 h-14 flex items-center justify-center rounded-full text-white text-2xl mx-auto mb-5 shadow-md">
//                 {item.icon}
//               </div>

//               {/* Title & Description */}
//               <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
//               <p className="text-sm text-gray-200 leading-relaxed">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Aboutus;




import React from 'react';
import { motion } from 'framer-motion';
import snehaImg from '../assets/my_photo.jpg'; // Make sure the path is correct
import rajuImg from '../assets/raju_photo.jpg';   // Make sure the path is correct

// Animation config for team members
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

// Team Member Card Component
const TeamMemberCard = ({ image, name, role, description, index }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="text-center flex flex-col items-center"
  >
    {/* Circular Profile Image */}
    <img
      src={image}
      alt={name}
      className="w-48 h-48 rounded-full object-cover object-top shadow-lg mb-4"
    />

    {/* Name, Role, and Description */}
    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
    <p className="text-[#31363F] font-medium">{role}</p>
    {description && <p className="text-gray-500 text-sm mt-1 max-w-xs">{description}</p>}
  </motion.div>
);

// REFACTORED About Us Page
const AboutUs = () => {
  const visionText = `At Senior Connect, We aim to empower students to make informed decisions about their career paths, entrance exams, and academic growth through direct interaction with those who’ve already navigated the journey. By building a trusted, student-driven support network, SeniorConnect strives to cultivate a culture of mentorship, confidence, and shared success across every campus.`;
  return (
    // Main container - background color is now defined by each section
    <div className="min-h-screen text-gray-800">

      {/* --- Section 1: Our Vision --- */}
      {/* UPDATED: Background changed to light blue (bg-sky-50) */}
      <div className="bg-sky-50 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          About Senior Connect
        </h1>
        {/* UPDATED: Font size increased from text-lg to text-xl */}
        <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600 text-center">
          {visionText}
        </p>
      </div>

      {/* --- Section 2: Meet Our Team --- */}
      <div className="bg-white py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Developers
        </h2>
        
        {/* Cards Container */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-16">
          <TeamMemberCard
            image={snehaImg}
            name="Sneha Kodre"
            role="Fullstack Developer"
            description="Student at Pune Institute of Computer Technology"
            index={0}
          />
          <TeamMemberCard
            image={rajuImg}
            name="Rajeshwari Nalbalwar"
            role="Fullstack Developer"
            description={"Student at Pune Institute of Computer Technology"}
            // You can add a description for Rajeshwari here if you like
            // description="Student at [Her College Name]" 
            index={1}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;