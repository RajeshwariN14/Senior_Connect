import React, { useState } from 'react';

function Becomesenior() {
  const [formData, setFormData] = useState({
    college: '',
    branch: '',
    currentYear: '',
    passingYear: '',
    idCard: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'idCard') {
      setFormData({ ...formData, idCard: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // 🔁 Replace with API call later
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-[#222831] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#d0d0d0]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#76ABAE]">
          Become a Senior
        </h2>

        {/* College Name */}
        <label className="block text-sm font-medium mb-1 text-[#31363F]">
          College Name
        </label>
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          required
          placeholder="Enter your college name"
          className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md mb-4 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
        />

        {/* Branch */}
        <label className="block text-sm font-medium mb-1 text-[#31363F]">
          Branch
        </label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
          placeholder="Enter your branch"
          className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md mb-4 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
        />

        {/* Current Year */}
        <label className="block text-sm font-medium mb-1 text-[#31363F]">
          Current Year
        </label>
        <input
          type="text"
          name="currentYear"
          value={formData.currentYear}
          onChange={handleChange}
          required
          placeholder="e.g., Second Year"
          className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md mb-4 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
        />

        {/* Passing Year */}
        <label className="block text-sm font-medium mb-1 text-[#31363F]">
          Passing Year
        </label>
        <input
          type="text"
          name="passingYear"
          value={formData.passingYear}
          onChange={handleChange}
          required
          placeholder="e.g., 2026"
          className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md mb-4 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
        />

        {/* Upload ID Card */}
        <label className="block text-sm font-medium mb-1 text-[#31363F]">
          Upload College ID Card
        </label>
        <input
          type="file"
          name="idCard"
          accept="image/*,application/pdf"
          onChange={handleChange}
          required
          className="w-full mb-6 text-sm text-[#444]"
        />

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
