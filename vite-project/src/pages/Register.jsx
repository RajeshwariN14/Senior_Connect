import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [googleError, setGoogleError] = useState('');

  const handleGoogleResponse = (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      localStorage.setItem('name', decoded.name);
      localStorage.setItem('email', decoded.email);
      localStorage.setItem('picture', decoded.picture);
      localStorage.setItem('role', 'student');
      navigate('/');
    } catch (error) {
      console.error('Error processing Google sign-in:', error);
      setGoogleError('Failed to process Google sign-in. Please try again.');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-register-btn'),
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
          }
        );

        clearInterval(interval);
      }
    }, 100);
  }, []);

  const handleManualRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('role', 'student');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] px-4 py-10 font-sans">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-[#d0d0d0]">
        {/* Header */}
        <div className="text-center mb-6">
          <img src="/seniorlogo.png" alt="Logo" className="w-16 h-16 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-[#222831]">
            Register on <span className="text-[#76ABAE] font-extrabold">SeniorConnect</span>
          </h2>
        </div>

        {/* Manual Form */}
        <form onSubmit={handleManualRegister} className="space-y-4 text-[#31363F]">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#222831] text-white py-2 rounded-md hover:bg-[#5a9295] transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-4 text-center text-sm text-[#888] font-medium relative">
          <span className="bg-white px-2 z-10 relative">OR</span>
          <div className="absolute inset-x-0 top-1/2 border-t border-gray-300 z-0"></div>
        </div>

        {/* Google Sign-Up */}
        <div id="google-register-btn" className="mb-4 flex justify-center"></div>
        
        {/* Google Error Display */}
        {googleError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{googleError}</p>
          </div>
        )}

        {/* Already have account */}
        <p className="text-sm text-center text-[#444] mt-5">
          Already have an account?{' '}
          <span
            className="text-[#76ABAE] font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
