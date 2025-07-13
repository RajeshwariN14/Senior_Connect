// import React from 'react';
// import { FaUsers, FaUserFriends, FaChalkboardTeacher } from 'react-icons/fa';
// import CardSection from './Cardsection';

// function Middle({ twoPerRow }) {
//   return (
//     <section className="bg-gradient-to-b from-blue-50 to-blue-100 bg-black py-16 px-4 min-h-screen font-sans">
//       {/* ===== Updated Header ===== */}
//       <div className="text-center mb-14">
//         <h2 className="text-4xl font-bold text-blue-800 mb-2">Find Guidance. Build Real Connections.</h2>
//         <p className="text-gray-600 max-w-xl mx-auto text-sm">
//           We're not here to teach textbooks — we're here to help students connect with experienced seniors who’ve walked the same path. Real conversations, real guidance, real growth.
//         </p>
//       </div>

//       {/* ===== Statistics Section ===== */}
      

//       {/* ===== Connect Cards Section ===== */}
//       <div className="max-w-7xl mx-auto">
//         <CardSection twoPerRow={twoPerRow} />
//       </div>
      

//       {/* ===== Statistics Section ===== */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 text-center mt-10">
//         <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition duration-300">
//           <FaUsers className="text-3xl text-blue-600 mx-auto mb-3" />
//           <h3 className="text-4xl font-extrabold text-blue-700">12,345+</h3>
//           <p className="mt-1 text-gray-600 text-sm font-medium">Visitors on Website</p>
//         </div>
//         <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition duration-300">
//           <FaUserFriends className="text-3xl text-blue-600 mx-auto mb-3" />
//           <h3 className="text-4xl font-extrabold text-blue-700">856+</h3>
//           <p className="mt-1 text-gray-600 text-sm font-medium">Students Connected</p>
//         </div>
//         <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition duration-300">
//           <FaChalkboardTeacher className="text-3xl text-blue-600 mx-auto mb-3" />
//           <h3 className="text-4xl font-extrabold text-blue-700">124+</h3>
//           <p className="mt-1 text-gray-600 text-sm font-medium">Seniors Mentoring</p>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Middle;
// import React from 'react';
// import { FaUsers, FaUserFriends, FaChalkboardTeacher } from 'react-icons/fa';
// import CardSection from './Cardsection';

// function Middle({ twoPerRow }) {
//   return (
//     <section className="bg-[#f4f4f4] py-16 px-4 min-h-screen">
//       <div className="text-center mb-14">
//         <h2 className="text-4xl font-bold text-[#222831] mb-3">
//           Find Guidance. Build Real Connections.
//         </h2>
//         <p className="text-[#31363F] max-w-xl mx-auto text-sm">
//           Connect with experienced seniors who’ve walked the same path. Real conversations, real growth.
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto">
//         <CardSection twoPerRow={twoPerRow} />
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-center">
//         {[
//           { icon: <FaUsers />, count: '12,345+', label: 'Visitors' },
//           { icon: <FaUserFriends />, count: '856+', label: 'Connections' },
//           { icon: <FaChalkboardTeacher />, count: '124+', label: 'Mentors' },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className="bg-white shadow-md border border-[#ddd] text-[#222831] rounded-xl p-6 hover:shadow-xl transition duration-300"
//           >
//             <div className="text-3xl text-[#76ABAE] mb-3">{item.icon}</div>
//             <h3 className="text-4xl font-extrabold">{item.count}</h3>
//             <p className="mt-1 text-sm font-medium">{item.label}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Middle;
// import React from 'react';
// import { FaUsers, FaUserFriends, FaChalkboardTeacher } from 'react-icons/fa';
// import CardSection from './Cardsection';

// function Middle({ twoPerRow }) {
//   return (
//     <section className="bg-[#EEEEEE] py-20 px-4 min-h-screen">
//       <div className="text-center mb-16">
//         <h2 className="text-4xl font-bold text-[#222831] mb-4">
//           Find Guidance. Build Real Connections.
//         </h2>
//         <p className="text-[#31363F] max-w-2xl mx-auto text-base">
//           Connect with experienced seniors who’ve walked the same path. Real conversations, real growth.
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto">
//         <CardSection twoPerRow={twoPerRow} />
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 text-center">
//         {[{ icon: <FaUsers />, count: "12,345+", label: "Visitors" }, { icon: <FaUserFriends />, count: "856+", label: "Connections" }, { icon: <FaChalkboardTeacher />, count: "124+", label: "Mentors" }].map((item, i) => (
//           <div
//             key={i}
//             className="bg-white shadow-lg border border-[#ddd] text-[#222831] rounded-2xl p-8 hover:shadow-2xl transition duration-300 hover:scale-[1.03]"
//           >
//             <div className="text-4xl text-[#76ABAE] mb-4">{item.icon}</div>
//             <h3 className="text-3xl font-bold">{item.count}</h3>
//             <p className="mt-2 text-sm font-medium">{item.label}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Middle;
import React from 'react';
import { FaUsers, FaUserFriends, FaChalkboardTeacher } from 'react-icons/fa';
import CardSection from './Cardsection';

function Middle({ twoPerRow }) {
  return (
    <section className="bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] py-20 px-4 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#222831] mb-4">
          Find Guidance. Build Real Connections.
        </h2>
        <p className="text-[#31363F] max-w-2xl mx-auto text-base">
          Connect with experienced seniors who’ve walked the same path. Real conversations, real growth.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <CardSection twoPerRow={twoPerRow} />
      </div>

      {/* <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 text-center">
        {[{ icon: <FaUsers />, count: "12,345+", label: "Visitors" }, { icon: <FaUserFriends />, count: "856+", label: "Connections" }, { icon: <FaChalkboardTeacher />, count: "124+", label: "Mentors" }].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-xl border border-[#ddd] text-[#222831] rounded-2xl p-8 hover:shadow-2xl transition duration-300 hover:scale-[1.05] hover:bg-[#f2fbfb]"
          >
            <div className="text-4xl text-[#76ABAE] mb-4">{item.icon}</div>
            <h3 className="text-3xl font-bold">{item.count}</h3>
            <p className="mt-2 text-sm font-medium">{item.label}</p>
          </div>
        ))}
      </div> */}
    </section>
  );
}

export default Middle;