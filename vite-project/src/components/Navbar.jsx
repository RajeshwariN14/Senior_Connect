
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext'; // Import useAuth hook

// function Navbar() {
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const { user, logout } = useAuth(); // Get user and logout from AuthContext
//   const navigate = useNavigate();

//   // No longer need to manually sync from localStorage here, AuthContext handles it
//   // The 'userUpdated' event listener can be removed if AuthContext is the sole source of truth
//   // For robustness, you might keep it if other parts of your app dispatch it for specific reasons.
//   // For this fix, we'll rely on the context.
//   useEffect(() => {
//     // Close dropdown if user logs out or navigates away
//     if (!user) {
//       setShowProfileDropdown(false);
//     }
//   }, [user]);

//   const handleLogout = () => {
//     logout(); // Call the logout function from AuthContext
//     setShowProfileDropdown(false);
//     navigate('/');
//     // window.location.reload(); // Avoid full page reload if possible for better UX
//   };

//   return (
//     <nav className="w-full bg-[#222831] py-4 shadow-md text-white sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center flex-wrap gap-y-3">
//         {/* Logo */}
//         <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
//           <img src="/seniorlogo.png" alt="Logo" className="w-10 h-10" />
//           <span className="text-2xl font-bold text-[#EEEEEE]">
//             Senior<span className="text-[#76ABAE]">Connect</span>
//           </span>
//         </div>

//         {/* Navigation & Auth Buttons */}
//         <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-5 w-full md:w-auto">
//           <button
//             onClick={() => {
//               if (user?.role === 'senior') {
//                 navigate('/seniorconnection');
//               } else {
//                 navigate('/connections');
//               }
//             }}
//             className="hover:text-[#76ABAE] text-sm"
//           >
//             Your Sessions
//           </button>

//           <button
//             onClick={() =>
//               document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
//             }
//             className="hover:text-[#76ABAE] text-sm"
//           >
//             About Us
//           </button>

//           <input
//             type="text"
//             placeholder="Search Seniors..."
//             onChange={(e) => props.onSearch(e.target.value)} // pass this as a prop
//             className="px-3 py-2 w-full sm:w-56 text-sm rounded-md bg-[#31363F] text-white placeholder-gray-400 border border-[#76ABAE] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
//           />

//           {!user ? (
//             <>
//               <button
//                 onClick={() => navigate('/login')}
//                 className="bg-[#76ABAE] text-[#222831] px-4 py-2 rounded hover:bg-[#EEEEEE] font-medium"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => navigate('/register')}
//                 className="bg-[#EEEEEE] text-[#222831] px-4 py-2 rounded hover:bg-[#76ABAE] font-medium"
//               >
//                 Create Account
//               </button>
//             </>
//           ) : (
//             <>
//               {user.role === 'student' && (
//                 <button
//                   onClick={() => navigate('/become-senior')}
//                   className="bg-[#76ABAE] text-[#222831] px-4 py-2 rounded hover:bg-[#EEEEEE] font-medium"
//                 >
//                   Become a Senior
//                 </button>
//               )}

//               <div className="relative">
//                 {user.picture ? (
//                   <img
//                     src={user.picture}
//                     alt="Profile"
//                     className="w-9 h-9 rounded-full border-2 border-[#76ABAE] cursor-pointer"
//                     onClick={() => setShowProfileDropdown(prev => !prev)}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = '/profile.svg'; // Fallback to a default SVG/image
//                     }}
//                   />
//                 ) : (
//                   <div
//                     className="w-9 h-9 rounded-full bg-[#76ABAE] text-[#222831] flex items-center justify-center font-bold cursor-pointer"
//                     onClick={() => setShowProfileDropdown(prev => !prev)}
//                   >
//                     {user.name?.charAt(0).toUpperCase() || 'U'}
//                   </div>
//                 )}

//                 {showProfileDropdown && (
//                   <div className="absolute right-0 mt-2 w-44 bg-[#31363F] text-white border border-gray-600 rounded-md shadow-lg z-10">
//                     <div
//                       onClick={() => {
//                         navigate('/profile');
//                         setShowProfileDropdown(false);
//                       }}
//                       className="px-4 py-2 hover:bg-[#222831] cursor-pointer"
//                     >
//                       My Profile
//                     </div>
//                     <div
//                       onClick={handleLogout}
//                       className="px-4 py-2 hover:bg-[#222831] cursor-pointer"
//                     >
//                       Logout
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      const picture = localStorage.getItem('picture');
      const role = localStorage.getItem('role') || 'student';

      if (email) {
        setUser({ name, email, picture, role });
      } else {
        setUser(null);
      }
    };

    updateUser();
    window.addEventListener('userUpdated', updateUser);
    return () => window.removeEventListener('userUpdated', updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setShowProfileDropdown(false);
    navigate('/');
    window.location.reload();
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      try {
        const res = await fetch(`https://senior-connect-backend.onrender.com3000/api/auth/search?collegeName=${encodeURIComponent(searchQuery.trim())}`);
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        navigate('/search-results', { state: { results: data } });
      } catch (err) {
        console.error('Search error:', err);
        alert('No results found or server error.');
      }
    }
  };

  return (
    <nav className="w-full bg-[#222831] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <img src="/seniorlogo.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
          <span className="text-xl sm:text-2xl font-bold text-[#EEEEEE]">
            Senior<span className="text-[#76ABAE]">Connect</span>
          </span>
        </div>

        {/* Hamburger */}
        <div className="sm:hidden flex items-center gap-3">
          {user && (
            <div className="relative">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-[#76ABAE] cursor-pointer"
                  onClick={() => setShowProfileDropdown(prev => !prev)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/profile.svg';
                  }}
                />
              ) : (
                <div
                  className="w-9 h-9 rounded-full bg-[#76ABAE] text-[#222831] flex items-center justify-center font-bold cursor-pointer"
                  onClick={() => setShowProfileDropdown(prev => !prev)}
                >
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-[#31363F] text-white border border-gray-600 rounded-md shadow-lg z-10">
                  <div
                    onClick={() => {
                      navigate(user.role === 'senior' ? '/seniorprofile' : '/studentprofile');
                      setShowProfileDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-[#222831] cursor-pointer"
                  >
                    My Profile
                  </div>
                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-[#222831] cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl focus:outline-none">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => navigate(user?.role === 'senior' ? '/seniorconnection' : '/connections')}
            className="hover:text-[#76ABAE] text-sm"
          >
            Your Sessions
          </button>
          <button
            onClick={() => navigate('/about')}
            className="hover:text-[#76ABAE] text-sm"
          >
            About Us
          </button>

          <input
            type="text"
            placeholder="Search Seniors by College..."
            className="px-3 py-1.5 w-56 text-sm rounded-md bg-[#31363F] text-white placeholder-gray-400 border border-[#76ABAE] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />

          {!user ? (
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
              {user.role === 'student' && (
                <button
                  onClick={() => navigate('/become-senior')}
                  className="bg-[#76ABAE] text-[#222831] px-4 py-2 rounded hover:bg-[#EEEEEE] font-medium"
                >
                  Become a Senior
                </button>
              )}
              <div className="relative">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-[#76ABAE] cursor-pointer"
                    onClick={() => setShowProfileDropdown(prev => !prev)}
                  />
                ) : (
                  <div
                    className="w-9 h-9 rounded-full bg-[#76ABAE] text-[#222831] flex items-center justify-center font-bold cursor-pointer"
                    onClick={() => setShowProfileDropdown(prev => !prev)}
                  >
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#31363F] text-white border border-gray-600 rounded-md shadow-lg z-10">
                    <div
                      onClick={() => {
                        navigate(user.role === 'senior' ? '/seniorprofile' : '/studentprofile');
                        setShowProfileDropdown(false);
                      }}
                      className="px-4 py-2 hover:bg-[#222831] cursor-pointer"
                    >
                      My Profile
                    </div>
                    <div
                      onClick={handleLogout}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-[#222831] px-6 pb-4 flex flex-col gap-4 text-sm">
          <button onClick={() => navigate(user?.role === 'senior' ? '/seniorconnection' : '/connections')}>
            Your Sessions
          </button>
          <button onClick={() => navigate('/about')}>About Us</button>
          <input
            type="text"
            placeholder="Search Seniors by College..."
            className="px-3 py-2 text-sm rounded-md bg-[#31363F] text-white placeholder-gray-400 border border-[#76ABAE] focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          {!user ? (
            <>
              <button onClick={() => navigate('/login')} className="bg-[#76ABAE] text-[#222831] py-2 rounded font-medium">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="bg-[#EEEEEE] text-[#222831] py-2 rounded font-medium">
                Create Account
              </button>
            </>
          ) : (
            user.role === 'student' && (
              <button onClick={() => navigate('/become-senior')} className="bg-[#76ABAE] text-[#222831] py-2 rounded font-medium">
                Become a Senior
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;