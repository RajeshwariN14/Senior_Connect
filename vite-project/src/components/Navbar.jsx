import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('name', user.name);
      localStorage.setItem('email', user.email);
      if (!localStorage.getItem('role')) {
        localStorage.setItem('role', 'student');
      }
    }
  }, [isAuthenticated, user]);

  const role = localStorage.getItem('role') || 'student';

  return (
    <nav className="w-full bg-[#222831] py-4 shadow-md text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap justify-between items-center gap-y-3">
        {/* LOGO + BRAND */}
        <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
          <img
            src="/seniorlogo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-bold text-[#EEEEEE]">
            Senior<span className="text-[#76ABAE]">Connect</span>
          </span>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-5 w-full md:w-auto">
          <button
            onClick={() => navigate('/seniorconnection')}
            className="hover:text-[#76ABAE] text-sm"
          >
            Your Connections
          </button>

          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-[#76ABAE] text-sm"
          >
            About Us
          </button>

          <input
            type="text"
            placeholder="Search Seniors..."
            className="px-3 py-2 w-full sm:w-56 text-sm rounded-md bg-[#31363F] text-white placeholder-gray-400 border border-[#76ABAE] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
          />

          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="bg-[#76ABAE] text-[#222831] px-4 py-2 rounded hover:bg-[#EEEEEE] font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-[#EEEEEE] text-[#222831] px-4 py-2 rounded hover:bg-[#76ABAE] font-medium"
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              {role === 'student' && (
                <button
                  onClick={() => navigate('/become-senior')}
                  className="bg-[#76ABAE] text-[#222831] px-4 py-2 rounded hover:bg-[#EEEEEE] font-medium"
                >
                  Become a Senior
                </button>
              )}

              <div className="relative">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-[#76ABAE] cursor-pointer"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  />
                ) : (
                  <FaUserCircle
                    className="text-3xl cursor-pointer hover:text-[#76ABAE]"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  />
                )}

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#31363F] text-white border border-gray-600 rounded-md shadow-lg z-10">
                    <div
                      onClick={() => {
                        navigate('/profile');
                        setShowProfileDropdown(false);
                      }}
                      className="px-4 py-2 hover:bg-[#222831] cursor-pointer"
                    >
                      My Profile
                    </div>
                    <div
                      onClick={() => {
                        localStorage.clear();
                        logout({ returnTo: window.location.origin });
                        setShowProfileDropdown(false);
                      }}
                      className="px-4 py-2 hover:bg-[#222831] cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
