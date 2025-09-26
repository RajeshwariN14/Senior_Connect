// import { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// function Studentlogin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [googleError, setGoogleError] = useState('');


//   // Google login
//   // const handleCredentialResponse = (response) => {
//   //   const decoded = jwtDecode(response.credential);
//   //   console.log("✅ Google Sign-In Success:", decoded);
//   //   localStorage.setItem('name', decoded.name);
//   //   localStorage.setItem('email', decoded.email);
//   //   localStorage.setItem('picture', decoded.picture);
//   //   localStorage.setItem('role', 'student');
//   //   navigate('/');
//   // }
//   // ;
//   const handleCredentialResponse = (response) => {
//   try {
//     const decoded = jwtDecode(response.credential);
//     console.log("✅ Google Sign-In Success:", decoded);

//     localStorage.setItem('name', decoded.name);
//     localStorage.setItem('email', decoded.email);
//     localStorage.setItem('picture', decoded.picture);
//     localStorage.setItem('role', 'student');
//     navigate('/');
//   } catch (error) {
//     console.error("❌ Error decoding Google credential:", error);
//     setGoogleError("Google login failed. Please try again.");
//   }
// };


//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (window.google && window.google.accounts) {
//         window.google.accounts.id.initialize({
//           client_id:
//             import.meta.env.VITE_GOOGLE_CLIENT_ID,

//           callback: handleCredentialResponse,
//         });

//         window.google.accounts.id.renderButton(
//           document.getElementById('google-signin-btn'),
//           {
//             theme: 'outline',
//             size: 'large',
//             width: '300',
//           }
//         );

//         clearInterval(interval);
//       }
//     }, 100);
//   }, []);

//   const handleManualLogin = (e) => {
//     e.preventDefault();
//     if (email && password) {
//       localStorage.setItem('email', email);
//       localStorage.setItem('role', 'student');
//       navigate('/');
//     } else {
//       alert('Please enter both email and password');
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] px-4 py-10 font-sans">
//       <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-[#d0d0d0]">
//         {/* Logo and Heading */}
//         <div className="text-center mb-6">
//           <img src="/seniorlogo.png" alt="Logo" className="w-16 h-16 mx-auto mb-2" />
//           <h2 className="text-2xl font-bold text-[#222831]">
//             Sign in to{' '}
//             <span className="text-[#76ABAE] font-extrabold">SeniorConnect</span>
//           </h2>
//         </div>

//         {/* Manual Login Form */}
//         <form onSubmit={handleManualLogin} className="space-y-4 text-[#31363F]">
//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border border-[#d0d0d0] rounded-md bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="••••••••"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#222831] text-white py-2 rounded-md font-semibold hover:bg-[#5a9295] transition"
//           >
//             Sign In
//           </button>
//         </form>

//         {/* OR Divider */}
//         <div className="my-4 text-center text-sm text-[#888] font-medium relative">
//           <span className="bg-white px-2 z-10 relative">OR</span>
//           <div className="absolute inset-x-0 top-1/2 border-t border-gray-300 z-0"></div>
//         </div>

//         {/* Google Sign-In */}
//         <div id="google-signin-btn" className="flex justify-center"></div>
        
//         {/* Google Error Display */}
//         {googleError && (
//           <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
//             <p className="text-sm text-red-600">{googleError}</p>
//           </div>
//         )}

//         {/* Link to Register */}
//         <p className="text-sm text-center text-[#444] mt-5">
//           Don’t have an account?{' '}
//           <span
//             className="text-[#76ABAE] font-medium cursor-pointer hover:underline"
//             onClick={() => navigate('/register')}
//           >
//             Create one
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Studentlogin;

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Studentlogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleError, setGoogleError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-btn'),
          {
            theme: 'outline',
            size: 'large',
            width: '300',
          }
        );

        clearInterval(interval);
      }
    }, 100);
  }, []);
  const handleCredentialResponse = async (response) => {
  try {
    const res = await fetch("https://senior-connect-backend.onrender.com/api/auth/google-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: response.credential }),
    });

    if (!res.ok) throw new Error("Google auth failed");

    const data = await res.json();

    // Store returned JWT token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("role", data.user.role || "student");

    window.dispatchEvent(new Event("userUpdated"));
    navigate("/");
    window.location.reload(); // Reload to apply changes
  } catch (err) {
    console.error("Google Login Error:", err);
    setGoogleError("Google login failed. Please try again.");
  }
};


  // ✅ Manual Login Handler
  // const handleManualLogin = (e) => {
  //   e.preventDefault();
  //   if (email && password) {
  //     localStorage.setItem('email', email);
  //     localStorage.setItem('role', 'student');

  //     // ✅ Notify navbar to update
  //     window.dispatchEvent(new Event('userUpdated'));

  //     navigate('/');
  //   } else {
  //     alert('Please enter both email and password');
  //   }
  // };
  const handleManualLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  try {
    const res = await fetch("https://senior-connect-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();

    // Store token and basic info
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("role", data.user.role || "student");

    window.dispatchEvent(new Event("userUpdated"));
    navigate("/");
    window.location.reload(); // Reload to apply changes
  } catch (err) {
    console.error("Login Error:", err);
    alert("❌ Invalid email or password");
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] px-4 py-10 font-sans">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-[#d0d0d0]">
        {/* Logo and Heading */}
        <div className="text-center mb-6">
          <img src="/seniorlogo.png" alt="Logo" className="w-16 h-16 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-[#222831]">
            Sign in to{' '}
            <span className="text-[#76ABAE] font-extrabold">SeniorConnect</span>
          </h2>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleManualLogin} className="space-y-4 text-[#31363F]">
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

          <button
            type="submit"
            className="w-full bg-[#222831] text-white py-2 rounded-md font-semibold hover:bg-[#5a9295] transition"
          >
            Sign In
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-4 text-center text-sm text-[#888] font-medium relative">
          <span className="bg-white px-2 z-10 relative">OR</span>
          <div className="absolute inset-x-0 top-1/2 border-t border-gray-300 z-0"></div>
        </div>

        {/* Google Sign-In */}
        <div id="google-signin-btn" className="flex justify-center"></div>

        {/* Google Error Display */}
        {googleError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{googleError}</p>
          </div>
        )}

        {/* Link to Register */}
        <p className="text-sm text-center text-[#444] mt-5">
          Don’t have an account?{' '}
          <span
            className="text-[#76ABAE] font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}

export default Studentlogin;

