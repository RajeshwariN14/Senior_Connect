
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
//     <div className="min-h-screen bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f0fdfa] px-6 py-10 flex flex-col md:flex-row items-start justify-center gap-8 font-sans">

//       {/* Left Card */}
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center border border-[#ddd]">
//         <div
//           className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#76ABAE] to-[#5ea0a2] flex items-center justify-center text-white text-3xl overflow-hidden hover:scale-105 transition-transform duration-300"
//         >
//           {profileImage ? (
//             <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
//           ) : (
//             <FaUser />
//           )}
//         </div>

//         <div className="mt-3">
//           <button
//             type="button"
//             onClick={triggerUpload}
//             className="text-sm bg-[#31363F] text-white px-4 py-1.5 rounded-md hover:bg-[#4b5b66] transition"
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

//         <h2 className="mt-4 text-xl font-bold text-[#31363F]">{formData.name}</h2>
//         <p className="text-sm text-[#76ABAE] font-medium">Computer Science Student</p>
//         <p className="text-gray-500 text-sm">{formData.collegeName}</p>

//         <div className="mt-4 flex justify-around text-sm font-semibold">
//           <div className="bg-[#d4f1f1] text-[#366769] px-3 py-1 rounded-md text-center">
//             <p className="text-xs">Current Year</p>
//             <p>{formData.currentYear}</p>
//           </div>
//           <div className="bg-[#e4dcf1] text-[#603f8b] px-3 py-1 rounded-md text-center">
//             <p className="text-xs">Graduating</p>
//             <p>{formData.passingYear}</p>
//           </div>
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 border border-[#ddd]">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold text-[#31363F]">Personal Information</h3>
//           <FaEdit
//             className="cursor-pointer text-gray-500 hover:text-[#76ABAE] transition"
//             onClick={() => setIsEditing(!isEditing)}
//           />
//         </div>

//         {message && <p className="text-green-600 text-sm mb-4">{message}</p>}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           {['name', 'email'].map((field) => (
//             <div key={field}>
//               <label className="block text-gray-600 font-medium mb-1 capitalize">
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
//             <label className="block text-gray-600 font-medium mb-1">LinkedIn Profile</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="linkedin"
//                   value={formData.linkedin}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none"
//                 />
//               ) : (
//                 <a
//                   href={formData.linkedin}
//                   className="text-[#76ABAE] underline"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   {formData.linkedin}
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>

//         <hr className="my-6" />

//         <h3 className="text-xl font-semibold text-[#31363F] mb-4">Academic Information</h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           {['collegeName', 'branch', 'currentYear', 'passingYear'].map((field) => (
//             <div key={field}>
//               <label className="block text-gray-600 font-medium mb-1 capitalize">
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
//               className="bg-[#76ABAE] text-white px-6 py-2 rounded hover:bg-[#5ea0a2] text-sm transition"
//             >
//               💾 Save Changes
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
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SeniorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState('');
  const [message, setMessage] = useState('');
  const { token, logout } = useAuth(); // Get token and logout from AuthContext
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    collegeName: '',
    branch: '',
    currentYear: '',
    passingYear: '',
    LinkedInUrl: '',
    profilePicture: '',
  });

  // Fetch senior profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setMessage('You are not logged in.');
        logout(); // Force logout if token is missing
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('https://senior-connect-backend.onrender.com3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          // Token expired or unauthorized
          setMessage('Your session has expired. Please log in again.');
          logout();
          navigate('/login');
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await res.json();

        if (data.role === 'senior' && data.seniorDetails) {
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            collegeName: data.seniorDetails.collegeName || '',
            branch: data.seniorDetails.branch || '',
            currentYear: data.seniorDetails.currentYear || '',
            passingYear: data.seniorDetails.passingYear || '',
            LinkedInUrl: data.seniorDetails.LinkedInUrl || '',
            profilePicture: data.seniorDetails.profilePicture || '',
          });
          setProfileImage(data.seniorDetails.profilePicture || '');
        } else {
          setMessage('You are not registered as a senior or profile data is incomplete.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setMessage('Failed to fetch profile. ' + err.message);
      }
    };

    fetchProfile();
  }, [token, logout, navigate]); // Depend on token, logout, navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!token) {
      setMessage('You are not logged in. Please log in to save changes.');
      logout();
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('https://senior-connect-backend.onrender.com3000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          collegeName: formData.collegeName,
          branch: formData.branch,
          currentYear: formData.currentYear,
          graduatingYear: formData.passingYear, // Backend expects graduatingYear
          linkedInUrl: formData.LinkedInUrl, // Backend expects linkedInUrl
        }),
      });

      if (res.status === 401 || res.status === 403) {
        setMessage('Your session has expired. Please log in again.');
        logout();
        navigate('/login');
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('Error updating profile: ' + err.message);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!token) {
      setMessage('You are not logged in. Please log in to upload image.');
      logout();
      navigate('/login');
      return;
    }

    const form = new FormData();
    form.append('profilePicture', file);

    try {
      const res = await fetch('https://senior-connect-backend.onrender.com3000/api/auth/profile', {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'multipart/form-data' is automatically set by FormData
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (res.status === 401 || res.status === 403) {
        setMessage('Your session has expired. Please log in again.');
        logout();
        navigate('/login');
        return;
      }

      const data = await res.json();
      if (res.ok) {
        // Assuming backend returns the new image URL in data.seniorDetails.profilePicture
        setProfileImage(data.seniorDetails.profilePicture || data.imageUrl);
        setMessage('Profile picture uploaded successfully!');
        // Update localStorage if you store picture there
        localStorage.setItem('picture', data.seniorDetails.profilePicture || data.imageUrl);
      } else {
        throw new Error(data.message || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      setMessage('Image upload error: ' + err.message);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f0fdfa] px-6 py-10 flex flex-col md:flex-row items-start justify-center gap-8 font-sans">
      {/* Left Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center border border-[#ddd]">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#76ABAE] to-[#5ea0a2] flex items-center justify-center text-white text-3xl overflow-hidden hover:scale-105 transition-transform duration-300">
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
            className="text-sm bg-[#76ABAE] text-white px-4 py-1.5 rounded-md hover:bg-[#5ea0a2] transition w-fit"
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
        <p className="text-sm text-[#76ABAE] font-medium">
          {formData.branch ? formData.branch + ' Student' : ''}
        </p>
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
                    disabled={field === 'email'} // Email usually not editable
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
                  name="LinkedInUrl"
                  value={formData.LinkedInUrl}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                <a
                  href={formData.LinkedInUrl}
                  className="text-[#76ABAE] underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {formData.LinkedInUrl}
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
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeniorProfile;
