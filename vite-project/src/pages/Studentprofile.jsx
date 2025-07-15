// import React, { useState, useRef } from 'react';
// import { FaEdit, FaUser } from 'react-icons/fa';

// function StudentProfile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const fileInputRef = useRef(null);
//   const [profileImage, setProfileImage] = useState(null);

//   const [formData, setFormData] = useState({
//     name: 'Sneha Kodre',
//     email: 'sneha@email.com',
//     cetPercentile: '95.43',
//     jeePercentile: '89.10',
//   });

//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     // You can store the updated data in localStorage or send to backend later
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 px-6 flex flex-col md:flex-row items-start justify-center gap-8">
//       {/* Left card */}
//       <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-6 text-center">
//         <div
//           className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl cursor-pointer overflow-hidden"
//           onClick={handleImageClick}
//         >
//           {profileImage ? (
//             <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//           ) : (
//             <FaUser />
//           )}
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleImageChange}
//           className="hidden"
//         />
//         <h2 className="mt-4 text-xl font-bold text-gray-800">{formData.name}</h2>
//         <p className="text-sm text-blue-600 font-medium">Aspiring AI & DS Student</p>
//         <p className="text-gray-500 text-sm mt-1">Engineering Candidate</p>
//       </div>

//       {/* Right form panel */}
//       <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold text-gray-800">Student Profile</h3>
//           <FaEdit
//             className="cursor-pointer text-gray-500 hover:text-purple-600"
//             onClick={() => setIsEditing(!isEditing)}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           {/* Name */}
//           <div>
//             <label className="block text-gray-500 font-medium mb-1">Full Name</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none"
//                 />
//               ) : (
//                 <p className="text-gray-800">{formData.name}</p>
//               )}
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-500 font-medium mb-1">Email Address</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none"
//                 />
//               ) : (
//                 <p className="text-gray-800">{formData.email}</p>
//               )}
//             </div>
//           </div>

//           {/* CET Percentile */}
//           <div>
//             <label className="block text-gray-500 font-medium mb-1">CET Percentile</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="cetPercentile"
//                   value={formData.cetPercentile}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none"
//                 />
//               ) : (
//                 <p className="text-gray-800">{formData.cetPercentile}</p>
//               )}
//             </div>
//           </div>

//           {/* JEE Percentile */}
//           <div>
//             <label className="block text-gray-500 font-medium mb-1">JEE Percentile</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="jeePercentile"
//                   value={formData.jeePercentile}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none"
//                 />
//               ) : (
//                 <p className="text-gray-800">{formData.jeePercentile}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {isEditing && (
//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={handleSave}
//               className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 text-sm"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StudentProfile;
// import React, { useState, useEffect, useRef } from 'react';
// import { FaEdit, FaUser } from 'react-icons/fa';

// function StudentProfile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     cetPercentile: '',
//     jeePercentile: '',
//   });

//   // 🔵 Load data from localStorage
//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem('studentProfile'));
//     if (storedData) {
//       setFormData(storedData);
//       if (storedData.profileImage) {
//         setProfileImage(storedData.profileImage);
//       }
//     }
//   }, []);

//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);

//       // Save image as base64 to localStorage for persistence
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const updatedData = { ...formData, profileImage: reader.result };
//         localStorage.setItem('studentProfile', JSON.stringify(updatedData));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     // Save updated profile to localStorage
//     const updatedData = { ...formData, profileImage };
//     localStorage.setItem('studentProfile', JSON.stringify(updatedData));
//     alert("Profile saved locally!");
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 px-6 flex flex-col md:flex-row items-start justify-center gap-8">
//       {/* Left card */}
//       <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-6 text-center">
//         <div
//           className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl cursor-pointer overflow-hidden"
//           onClick={handleImageClick}
//         >
//           {profileImage ? (
//             <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//           ) : (
//             <FaUser />
//           )}
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleImageChange}
//           className="hidden"
//         />
//         <h2 className="mt-4 text-xl font-bold text-gray-800">{formData.name || "Your Name"}</h2>
//         <p className="text-sm text-blue-600 font-medium">Aspiring AI & DS Student</p>
//         <p className="text-gray-500 text-sm mt-1">Engineering Candidate</p>
//       </div>

//       {/* Right form panel */}
//       <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold text-gray-800">Student Profile</h3>
//           <FaEdit
//             className="cursor-pointer text-gray-500 hover:text-blue-600"
//             onClick={() => setIsEditing(!isEditing)}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           {/* Name */}
//           <div>
//             <label className="block text-gray-500 font-medium mb-1">Full Name</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none"
//                 />
//               ) : (
//                 <p className="text-gray-800">{formData.name}</p>
//               )}
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-500 font-medium mb-1">Email Address</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none"
//                 />
//               ) : (
//                 <p className="text-gray-800">{formData.email}</p>
//               )}
//             </div>
//           </div>

//           {/* CET Percentile */}
//           <div>
//             <label className="block text-gray-500 font-medium mb-1">CET Percentile</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="cetPercentile"
//                   value={formData.cetPercentile}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none"
//                   type="number"
//                   step="0.01"
//                 />
//               ) : (
//                 <p className="text-gray-800">{formData.cetPercentile}</p>
//               )}
//             </div>
//           </div>

//           {/* JEE Percentile */}
//           <div>
//             <label className="block text-gray-500 font-medium mb-1">JEE Percentile</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="jeePercentile"
//                   value={formData.jeePercentile}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none"
//                   type="number"
//                   step="0.01"
//                 />
//               ) : (
//                 <p className="text-gray-800">{formData.jeePercentile}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         {isEditing && (
//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={handleSave}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StudentProfile;
import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaUser } from 'react-icons/fa';

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cetPercentile: '',
    jeePercentile: '',
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('studentProfile'));
    if (storedData) {
      setFormData(storedData);
      if (storedData.profileImage) {
        setProfileImage(storedData.profileImage);
      }
    }
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedData = { ...formData, profileImage: reader.result };
        localStorage.setItem('studentProfile', JSON.stringify(updatedData));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    const updatedData = { ...formData, profileImage };
    localStorage.setItem('studentProfile', JSON.stringify(updatedData));
    alert("✅ Profile saved locally!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] px-6 py-10 flex flex-col md:flex-row items-start justify-center gap-8 font-sans">
      
      {/* Left Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center border border-[#ddd]">
        <div
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#76ABAE] to-[#5ea0a2] flex items-center justify-center text-white text-3xl cursor-pointer overflow-hidden hover:scale-105 transition duration-300"
          onClick={handleImageClick}
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <FaUser />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <h2 className="mt-4 text-xl font-bold text-[#31363F]">{formData.name || "Your Name"}</h2>
        <p className="text-sm text-[#76ABAE] font-medium">Aspiring AI & DS Student</p>
        <p className="text-gray-500 text-sm mt-1">Engineering Candidate</p>
      </div>

      {/* Right Panel */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 border border-[#ddd]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#31363F]">Student Profile</h3>
          <FaEdit
            className="cursor-pointer text-[#888] hover:text-[#76ABAE] transition"
            onClick={() => setIsEditing(!isEditing)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Full Name</label>
            <div className="border rounded-md px-3 py-2 bg-gray-50">
              {isEditing ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                <p className="text-gray-800">{formData.name}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Email Address</label>
            <div className="border rounded-md px-3 py-2 bg-gray-50">
              {isEditing ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                <p className="text-gray-800">{formData.email}</p>
              )}
            </div>
          </div>

          {/* CET */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">CET Percentile</label>
            <div className="border rounded-md px-3 py-2 bg-gray-50">
              {isEditing ? (
                <input
                  name="cetPercentile"
                  value={formData.cetPercentile}
                  onChange={handleChange}
                  type="number"
                  step="0.01"
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                <p className="text-gray-800">{formData.cetPercentile}</p>
              )}
            </div>
          </div>

          {/* JEE */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">JEE Percentile</label>
            <div className="border rounded-md px-3 py-2 bg-gray-50">
              {isEditing ? (
                <input
                  name="jeePercentile"
                  value={formData.jeePercentile}
                  onChange={handleChange}
                  type="number"
                  step="0.01"
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                <p className="text-gray-800">{formData.jeePercentile}</p>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-[#31363F] text-white px-6 py-2 rounded hover:bg-[#5a9295] text-sm transition"
            >
              💾 Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
