// import React, { useState, useEffect, useRef } from 'react';
// import { FaEdit, FaUser } from 'react-icons/fa';

// function SeniorProfile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const fileInputRef = useRef(null);
//   const [profileImage, setProfileImage] = useState(null);
//   const [message, setMessage] = useState('');

//   const defaultData = {
//     name: 'Alex Johnson',
//     email: 'alex.johnson@email.com',
//     collegeName: 'Stanford University',
//     branch: 'Computer Science',
//     currentYear: 'Final Year',
//     passingYear: '2024',
//     linkedin: 'https://linkedin.com/in/alexjohnson',
//   };

//   const [formData, setFormData] = useState(defaultData);

//   useEffect(() => {
//     const storedData = localStorage.getItem('seniorProfile');
//     const storedImage = localStorage.getItem('seniorProfileImage');
//     if (storedData) setFormData(JSON.parse(storedData));
//     if (storedImage) setProfileImage(storedImage);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     localStorage.setItem('seniorProfile', JSON.stringify(formData));
//     setMessage('Profile updated successfully!');
//     setIsEditing(false);
//     setTimeout(() => setMessage(''), 3000);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//       localStorage.setItem('seniorProfileImage', imageUrl);
//     }
//   };

//   const triggerUpload = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 px-6 py-10 flex flex-col md:flex-row items-start justify-center gap-8">
//       {/* Left Card */}
//       <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-6 text-center">
//         <div
//           className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-md"
//         >
//           {profileImage ? (
//             <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
//           ) : (
//             <FaUser />
//           )}
//         </div>

//         {/* Upload Button */}
//         <div className="mt-3">
//           <button
//             type="button"
//             onClick={triggerUpload}
//             className="text-sm text-white bg-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
//           >
//             Upload Profile Photo
//           </button>
//         </div>

//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleImageChange}
//           className="hidden"
//         />

//         <h2 className="mt-4 text-xl font-bold text-gray-800">{formData.name}</h2>
//         <p className="text-sm text-blue-600 font-medium">Computer Science Student</p>
//         <p className="text-gray-500 text-sm">{formData.collegeName}</p>

//         <div className="mt-4 flex justify-around text-sm font-semibold">
//           <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-center">
//             <p className="text-xs">Current Year</p>
//             <p>{formData.currentYear}</p>
//           </div>
//           <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-center">
//             <p className="text-xs">Graduating</p>
//             <p>{formData.passingYear}</p>
//           </div>
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
//           <FaEdit
//             className="cursor-pointer text-gray-500 hover:text-purple-600"
//             onClick={() => setIsEditing(!isEditing)}
//           />
//         </div>

//         {message && <p className="text-green-600 text-sm mb-4">{message}</p>}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           {['name', 'email'].map((field) => (
//             <div key={field}>
//               <label className="block text-gray-500 font-medium mb-1 capitalize">
//                 {field === 'email' ? 'Email Address' : 'Full Name'}
//               </label>
//               <div className="border rounded-md px-3 py-2 bg-gray-50">
//                 {isEditing ? (
//                   <input
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="w-full bg-transparent outline-none"
//                   />
//                 ) : (
//                   <p className="text-gray-800">{formData[field]}</p>
//                 )}
//               </div>
//             </div>
//           ))}

//           {/* LinkedIn */}
//           <div className="md:col-span-2">
//             <label className="block text-gray-500 font-medium mb-1">LinkedIn Profile</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="linkedin"
//                   value={formData.linkedin}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none"
//                 />
//               ) : (
//                 <a href={formData.linkedin} className="text-blue-600 underline" target="_blank" rel="noreferrer">
//                   {formData.linkedin}
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>

//         <hr className="my-6" />

//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           {['collegeName', 'branch', 'currentYear', 'passingYear'].map((field) => (
//             <div key={field}>
//               <label className="block text-gray-500 font-medium mb-1 capitalize">
//                 {field === 'collegeName'
//                   ? 'College/University'
//                   : field === 'passingYear'
//                   ? 'Expected Graduation Year'
//                   : field === 'currentYear'
//                   ? 'Current Academic Year'
//                   : 'Branch/Major'}
//               </label>
//               <div className="border rounded-md px-3 py-2 bg-gray-50">
//                 {isEditing ? (
//                   <input
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="w-full bg-transparent outline-none"
//                   />
//                 ) : (
//                   <p className="text-gray-800">{formData[field]}</p>
//                 )}
//               </div>
//             </div>
//           ))}
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

// export default SeniorProfile;
import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaUser } from 'react-icons/fa';

function SeniorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('');

  const defaultData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    collegeName: 'Stanford University',
    branch: 'Computer Science',
    currentYear: 'Final Year',
    passingYear: '2024',
    linkedin: 'https://linkedin.com/in/alexjohnson',
  };

  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    const storedData = localStorage.getItem('seniorProfile');
    const storedImage = localStorage.getItem('seniorProfileImage');
    if (storedData) setFormData(JSON.parse(storedData));
    if (storedImage) setProfileImage(storedImage);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('seniorProfile', JSON.stringify(formData));
    setMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem('seniorProfileImage', imageUrl);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f0fdfa] px-6 py-10 flex flex-col md:flex-row items-start justify-center gap-8 font-sans">

      {/* Left Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center border border-[#ddd]">
        <div
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#76ABAE] to-[#5ea0a2] flex items-center justify-center text-white text-3xl overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
          ) : (
            <FaUser />
          )}
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={triggerUpload}
            className="text-sm bg-[#31363F] text-white px-4 py-1.5 rounded-md hover:bg-[#4b5b66] transition"
          >
            Upload Profile Photo
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <h2 className="mt-4 text-xl font-bold text-[#31363F]">{formData.name}</h2>
        <p className="text-sm text-[#76ABAE] font-medium">Computer Science Student</p>
        <p className="text-gray-500 text-sm">{formData.collegeName}</p>

        <div className="mt-4 flex justify-around text-sm font-semibold">
          <div className="bg-[#d4f1f1] text-[#366769] px-3 py-1 rounded-md text-center">
            <p className="text-xs">Current Year</p>
            <p>{formData.currentYear}</p>
          </div>
          <div className="bg-[#e4dcf1] text-[#603f8b] px-3 py-1 rounded-md text-center">
            <p className="text-xs">Graduating</p>
            <p>{formData.passingYear}</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 border border-[#ddd]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#31363F]">Personal Information</h3>
          <FaEdit
            className="cursor-pointer text-gray-500 hover:text-[#76ABAE] transition"
            onClick={() => setIsEditing(!isEditing)}
          />
        </div>

        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {['name', 'email'].map((field) => (
            <div key={field}>
              <label className="block text-gray-600 font-medium mb-1 capitalize">
                {field === 'email' ? 'Email Address' : 'Full Name'}
              </label>
              <div className="border rounded-md px-3 py-2 bg-gray-50">
                {isEditing ? (
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-800">{formData[field]}</p>
                )}
              </div>
            </div>
          ))}

          {/* LinkedIn */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">LinkedIn Profile</label>
            <div className="border rounded-md px-3 py-2 bg-gray-50">
              {isEditing ? (
                <input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                <a
                  href={formData.linkedin}
                  className="text-[#76ABAE] underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {formData.linkedin}
                </a>
              )}
            </div>
          </div>
        </div>

        <hr className="my-6" />

        <h3 className="text-xl font-semibold text-[#31363F] mb-4">Academic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {['collegeName', 'branch', 'currentYear', 'passingYear'].map((field) => (
            <div key={field}>
              <label className="block text-gray-600 font-medium mb-1 capitalize">
                {field === 'collegeName'
                  ? 'College/University'
                  : field === 'passingYear'
                  ? 'Expected Graduation Year'
                  : field === 'currentYear'
                  ? 'Current Academic Year'
                  : 'Branch/Major'}
              </label>
              <div className="border rounded-md px-3 py-2 bg-gray-50">
                {isEditing ? (
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-800">{formData[field]}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-[#76ABAE] text-white px-6 py-2 rounded hover:bg-[#5ea0a2] text-sm transition"
            >
              💾 Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeniorProfile;
