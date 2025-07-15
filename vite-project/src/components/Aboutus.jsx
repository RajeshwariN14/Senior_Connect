import React from 'react';
import { FaUserFriends, FaBullseye, FaMedal, FaHeart } from 'react-icons/fa';

function Aboutus() {
  const features = [
    {
      icon: <FaUserFriends />,
      title: 'Meet Real Seniors',
      desc: 'No more random advice! Talk to real students from IITs, NITs, and top engineering colleges who’ve lived the experience.',
    },
    {
      icon: <FaBullseye />,
      title: 'Get Clarity on Choices',
      desc: 'Confused between college or branch? Our mentors will guide you with placement stats, faculty quality, and real-life outcomes.',
    },
    {
      icon: <FaMedal />,
      title: 'Success Stories',
      desc: 'Read how previous aspirants cracked their goals and made informed decisions that shaped their careers.',
    },
    {
      icon: <FaHeart />,
      title: 'Safe & Supportive',
      desc: 'All conversations are safe and anonymous. We use email & Zoom — no number sharing, just guidance with care.',
    },
  ];

  return (
    <div
      id="about"
      className="bg-gradient-to-br from-[#eeeeee] via-[#dfe6e9] to-[#eeeeee] text-[#222831] px-6 py-24"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight text-[#222831] drop-shadow-sm">
          About <span className="text-[#76ABAE]">SeniorConnect</span>
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-[#31363F] mb-16 leading-relaxed">
          We connect fresh aspirants of JEE & CET with seniors from top engineering colleges.
          Get real insights, make smart decisions, and kickstart your dream journey with confidence.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-[#31363F] text-white border border-[#76ABAE]/40 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:shadow-[#76ABAE]/30 transition-transform hover:scale-[1.04]"
            >
              {/* Icon */}
              <div className="bg-[#76ABAE] w-14 h-14 flex items-center justify-center rounded-full text-white text-2xl mx-auto mb-5 shadow-md">
                {item.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-200 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
