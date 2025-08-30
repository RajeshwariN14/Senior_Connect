
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
//     const updatedData = { ...formData, profileImage };
//     localStorage.setItem('studentProfile', JSON.stringify(updatedData));
//     alert("✅ Profile saved locally!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] px-6 py-10 flex flex-col md:flex-row items-start justify-center gap-8 font-sans">
      
//       {/* Left Card */}
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center border border-[#ddd]">
//         <div
//           className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#76ABAE] to-[#5ea0a2] flex items-center justify-center text-white text-3xl cursor-pointer overflow-hidden hover:scale-105 transition duration-300"
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
//         <h2 className="mt-4 text-xl font-bold text-[#31363F]">{formData.name || "Your Name"}</h2>
//         <p className="text-sm text-[#76ABAE] font-medium">Aspiring AI & DS Student</p>
//         <p className="text-gray-500 text-sm mt-1">Engineering Candidate</p>
//       </div>

//       {/* Right Panel */}
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 border border-[#ddd]">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold text-[#31363F]">Student Profile</h3>
//           <FaEdit
//             className="cursor-pointer text-[#888] hover:text-[#76ABAE] transition"
//             onClick={() => setIsEditing(!isEditing)}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           {/* Name */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-1">Full Name</label>
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
//             <label className="block text-gray-600 font-medium mb-1">Email Address</label>
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

//           {/* CET */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-1">CET Percentile</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="cetPercentile"
//                   value={formData.cetPercentile}
//                   onChange={handleChange}
//                   type="number"
//                   step="0.01"
//                   className="w-full bg-transparent outline-none"
//                 />
//               ) : (
//                 <p className="text-gray-800">{formData.cetPercentile}</p>
//               )}
//             </div>
//           </div>

//           {/* JEE */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-1">JEE Percentile</label>
//             <div className="border rounded-md px-3 py-2 bg-gray-50">
//               {isEditing ? (
//                 <input
//                   name="jeePercentile"
//                   value={formData.jeePercentile}
//                   onChange={handleChange}
//                   type="number"
//                   step="0.01"
//                   className="w-full bg-transparent outline-none"
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
//               className="bg-[#31363F] text-white px-6 py-2 rounded hover:bg-[#5a9295] text-sm transition"
//             >
//               💾 Save Changes
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
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(''); // For user feedback
  const { token, logout } = useAuth(); // Get token and logout from AuthContext
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cetPercentile: '',
    jeePercentile: '',
  });

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setMessage('You are not logged in.');
        logout(); // Force logout if token is missing
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/auth/profile', {
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
          throw new Error('Failed to load profile');
        }

        const data = await res.json();
        if (data.user) {
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            cetPercentile: data.user.cetPercentile || '',
            jeePercentile: data.user.jeePercentile || '',
          });
          if (data.user.profilePicture) {
            setProfileImage(data.user.profilePicture);
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setMessage('Failed to load profile: ' + err.message);
      }
    };

    fetchProfile();
  }, [token, logout, navigate]); // Depend on token, logout, navigate

  const handleImageClick = () => {
    fileInputRef.current.click();
    setIsEditing(true); // Allow editing when image is clicked (might be separate from other fields)
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
    form.append('profilePicture', file); // Ensure your backend expects 'profilePicture' for student updates too

    try {
      const res = await fetch('http://localhost:3000/api/auth/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' is automatically set by FormData
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
        // Assuming backend returns the new image URL in data.user.profileImage
        setProfileImage(data.user.profilePicture);
        setMessage('Profile picture uploaded successfully!');
        // Update localStorage if you store picture there
        localStorage.setItem('picture', data.user.profileImage);
      } else {
        throw new Error(data.message || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      setMessage('Image upload error: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    if (!token) {
      setMessage('You are not logged in. Please log in to save changes.');
      logout();
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          cetPercentile: formData.cetPercentile,
          jeePercentile: formData.jeePercentile,
          // Do not send email as it's typically not editable via this endpoint
          // profileImage: profileImage, // If you handle base64 image uploads this way
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

      setMessage('Profile updated!');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('Failed to update profile: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#EEEEEE] to-[#f4fdfd] flex flex-col md:flex-row items-start justify-center gap-8 font-sans">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center border border-[#ddd]">
        <div
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#76ABAE] to-[#5ea0a2] flex items-center justify-center text-white text-3xl cursor-pointer overflow-hidden transition hover:scale-110"
          onClick={handleImageClick}
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <FaUser />
          )}
        </div>
        <button
          onClick={handleImageClick}
          className="mt-3 bg-[#31363F] text-white px-4 py-1 rounded text-sm hover:bg-[#5ea0a2]"
        >
          Upload Profile Picture
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <h2 className="mt-4 text-xl font-bold text-[#31363F]">{formData.name || "Your Name"}</h2>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 border border-[#ddd]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#31363F]">Student Profile</h3>
          <FaEdit
            className="cursor-pointer text-[#888] hover:text-[#76ABAE]"
            onClick={() => setIsEditing(!isEditing)}
          />
        </div>

        {message && (
          <p className={`text-sm mb-4 ${message.includes('Failed') || message.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {['name', 'email', 'cetPercentile', 'jeePercentile'].map((field) => (
            <div key={field}>
              <label className="block text-gray-600 font-medium mb-1">
                {field === 'name'
                  ? 'Full Name'
                  : field === 'email'
                  ? 'Email Address'
                  : field === 'cetPercentile'
                  ? 'CET Percentile'
                  : 'JEE Percentile'}
              </label>
              <div className="border rounded-md px-3 py-2 bg-gray-50">
                {isEditing ? (
                  <input
                    name={field}
                    type={field.includes('Percentile') ? 'number' : 'text'}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none"
                    step="0.01"
                    disabled={field === 'email'} // Email usually not editable
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
              className="bg-[#31363F] text-white px-6 py-2 rounded hover:bg-[#5a9295] text-sm"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;