// import React, { useState } from 'react';

// function Becomesenior() {
//   const [formData, setFormData] = useState({
//     college: '',
//     branch: '',
//     currentYear: '',
//     passingYear: '',
//     idCard: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'idCard') {
//       setFormData({ ...formData, idCard: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Submitted:', formData);
//     // 🔁 Replace with API call later
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] px-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white text-[#222831] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#d0d0d0]"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-[#76ABAE]">
//           Become a Senior
//         </h2>

//         {/* College Name */}
//         <label className="block text-sm font-medium mb-1 text-[#31363F]">
//           College Name
//         </label>
//         <input
//           type="text"
//           name="college"
//           value={formData.college}
//           onChange={handleChange}
//           required
//           placeholder="Enter your college name"
//           className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md mb-4 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
//         />

//         {/* Branch */}
//         <label className="block text-sm font-medium mb-1 text-[#31363F]">
//           Branch
//         </label>
//         <input
//           type="text"
//           name="branch"
//           value={formData.branch}
//           onChange={handleChange}
//           required
//           placeholder="Enter your branch"
//           className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md mb-4 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
//         />

//         {/* Current Year */}
//         <label className="block text-sm font-medium mb-1 text-[#31363F]">
//           Current Year
//         </label>
//         <input
//           type="text"
//           name="currentYear"
//           value={formData.currentYear}
//           onChange={handleChange}
//           required
//           placeholder="e.g., Second Year"
//           className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md mb-4 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
//         />

//         {/* Passing Year */}
//         <label className="block text-sm font-medium mb-1 text-[#31363F]">
//           Passing Year
//         </label>
//         <input
//           type="text"
//           name="passingYear"
//           value={formData.passingYear}
//           onChange={handleChange}
//           required
//           placeholder="e.g., 2026"
//           className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md mb-4 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
//         />

//         {/* Upload ID Card */}
//         <label className="block text-sm font-medium mb-1 text-[#31363F]">
//           Upload College ID Card
//         </label>
//         <input
//           type="file"
//           name="idCard"
//           accept="image/*,application/pdf"
//           onChange={handleChange}
//           required
//           className="w-full mb-6 text-sm text-[#444]"
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-[#222831] text-white py-2 rounded-md hover:bg-[#5a9295] transition font-semibold"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Becomesenior;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Becomesenior() {
  const [formData, setFormData] = useState({
    college: '',
    branch: '',
    currentYear: '',
    passingYear: '',
    LinkedInUrl: '',
  });

  const [idCardFile, setIdCardFile] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'idCard') {
      setIdCardFile(files[0]);
    } else if (name === 'profilePicture') {
      setProfilePictureFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idCardFile || !profilePictureFile) {
      alert('Please upload both ID card and profile picture.');
      return;
    }

    const data = new FormData();
    data.append('collegeName', formData.college);
    data.append('branch', formData.branch);
    data.append('currentYear', formData.currentYear);
    data.append('passingYear', formData.passingYear);
    data.append('LinkedInUrl', formData.LinkedInUrl);
    data.append('idCard', idCardFile);
    data.append('profilePicture', profilePictureFile);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://senior-connect-backend.onrender.com3000/api/auth/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to become senior');
      }

      localStorage.setItem('role', 'senior');
      window.dispatchEvent(new Event('userUpdated'));
      navigate('/');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-[#222831] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#d0d0d0]"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#76ABAE]">
          Become a Senior
        </h2>

        {/* College Name */}
        <label className="block text-sm font-medium mb-1 text-[#31363F]">College Name</label>
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          required
          placeholder="Enter your college name"
          className="w-full px-4 py-2 border rounded-md mb-4 bg-[#f9f9f9]"
        />

        {/* Branch */}
        <label className="block text-sm font-medium mb-1 text-[#31363F]">Branch</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
          placeholder="Enter your branch"
          className="w-full px-4 py-2 border rounded-md mb-4 bg-[#f9f9f9]"
        />

        {/* Current Year */}
        <label className="block text-sm font-medium mb-1 text-[#31363F]">Current Year</label>
        <input
          type="number"
          name="currentYear"
          value={formData.currentYear}
          onChange={handleChange}
          required
          min={1}
          max={6}
          placeholder="e.g., 2"
          className="w-full px-4 py-2 border rounded-md mb-4 bg-[#f9f9f9]"
        />

        {/* Passing Year */}
        <label className="block text-sm font-medium mb-1 text-[#31363F]">Passing Year</label>
        <input
          type="number"
          name="passingYear"
          value={formData.passingYear}
          onChange={handleChange}
          required
          placeholder="e.g., 2026"
          className="w-full px-4 py-2 border rounded-md mb-4 bg-[#f9f9f9]"
        />

        {/* LinkedIn */}
        <label className="block text-sm font-medium mb-1 text-[#31363F]">LinkedIn Profile URL</label>
        <input
          type="url"
          name="LinkedInUrl"
          value={formData.LinkedInUrl}
          onChange={handleChange}
          required
          placeholder="https://linkedin.com/in/your-profile"
          className="w-full px-4 py-2 border rounded-md mb-4 bg-[#f9f9f9]"
        />

        {/* Upload ID Card */}
        {/* Upload ID Card */}
<label className="block text-sm font-medium mb-1 text-[#31363F]">Upload College ID Card (JPEG/PNG)</label>
<div className="mb-4">
  <input
    type="file"
    name="idCard"
    accept="image/png, image/jpeg"
    onChange={handleFileChange}
    required
    className="hidden"
    id="idCardInput"
  />
  <label
    htmlFor="idCardInput"
    className="inline-block bg-[#76ABAE] hover:bg-[#609a9e] text-white font-semibold py-2 px-4 rounded-xl shadow cursor-pointer transition duration-200"
  >
    Upload ID Card
  </label>
</div>

{/* Upload Profile Picture */}
<label className="block text-sm font-medium mb-1 text-[#31363F]">Upload Profile Picture (JPEG/PNG)</label>
<div className="mb-6">
  <input
    type="file"
    name="profilePicture"
    accept="image/png, image/jpeg"
    onChange={handleFileChange}
    required
    className="hidden"
    id="profilePictureInput"
  />
  <label
    htmlFor="profilePictureInput"
    className="inline-block bg-[#76ABAE] hover:bg-[#609a9e] text-white font-semibold py-2 px-4 rounded-xl shadow cursor-pointer transition duration-200"
  >
    Upload Profile Photo
  </label>
</div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#222831] text-white py-2 rounded-md hover:bg-[#5a9295] transition font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Becomesenior;


