// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import Card from "../components/Card"; 


// // // function SeniorList() {
// // //   const [seniors, setSeniors] = useState([]);

// // //   useEffect(() => {
// // //     axios.get('http://localhost:3000/api/auth/seniors', { withCredentials: true })
// // //       .then((res) => setSeniors(res.data))
// // //       .catch((err) => console.error('Error fetching seniors:', err));
// // //   }, []);

// // //   return (
// // //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
// // //       {seniors.map((senior) => (
// // //         <Card
// // //           key={senior._id}
// // //           id={senior._id}
// // //           name={senior.name}
// // //           university={senior.university}
// // //           year={senior.year}
// // //           branch={senior.branch}
// // //           image={senior.profileImage}
// // //           onConnectClick={() => window.open(`/profile/${senior._id}`, '_blank')}
// // //         />
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // export default SeniorList;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import Card from '../components/Card';

// // function SeniorList() {
// //   const [seniors, setSeniors] = useState([]);

// // //   useEffect(() => {
// // //     const fetchSeniors = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:3000/api/auth/seniors', {
// // //           withCredentials: true
// // //         });
// // //         console.log('Backend response:', response.data); 
// // //         setSeniors(response.data);
         
// // //       } catch (error) {
// // //         console.error('Error fetching seniors:', error);
// // //       }
// // //     };

// // //     fetchSeniors();
// // //   }, []);

// // // useEffect(() => {
// // //   const fetchSeniors = async () => {
// // //     console.log('Fetching seniors...'); // ADD THIS
// // //     try {
// // //       const response = await axios.get('http://localhost:3000/api/auth/seniors', {
// // //         withCredentials: true
// // //       });
// // //       // ADD THIS
// // //        console.log('Backend response:', response.data); // ADD THIS LINE
// // //       console.log('First senior object:', response.data[0]); // ADD THIS LINE
// // //       setSeniors(response.data);
// // //     } catch (error) {
// // //       console.error('Error fetching seniors:', error);
// // //       console.log('Error details:', error.response); // ADD THIS
// // //     }
// // //   };
// // useEffect(() => {
// //   const fetchSeniors = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:3000/api/auth/seniors', {
// //         withCredentials: true
// //       });
// //       console.log('Backend response:', response.data);
// //       setSeniors(response.data);
// //     } catch (error) {
// //       console.error('Error fetching seniors:', error);
// //     }
// //   };

// //   fetchSeniors();
// // }, []);

// // //   fetchSeniors();
// // // }, []);

// //   return (
// //     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //     {seniors.map((senior) => (
// //   <Card
// //     key={senior._id}
// //     id={senior._id}
// //     name={senior.user?.name || senior.name || "Unknown"}
// //     collegeName={senior.collegeName || "N/A"}
// //     currentYear={senior.currentYear || "N/A"}
// //     branch={senior.branch || "N/A"}
// //     image={senior.idCardURL || '/profile.svg'}
// //     isVerified={senior.isVerified}
// //   />
// // ))}
// //     </div>
// //   );
// // }

// // export default SeniorList;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from '../components/Card';

// function SeniorList() {
//   const [seniors, setSeniors] = useState([]);

//   useEffect(() => {
//     const fetchSeniors = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/auth/seniors', {
//           withCredentials: true
//         });
//         setSeniors(response.data);
//       } catch (error) {
//         console.error('Error fetching seniors:', error);
//       }
//     };

//     fetchSeniors();
//   }, []);

//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//       {seniors.map((senior) => (

// //   key={senior._id}
// //   id={senior._id}
// //   name={
// //     typeof senior.name === 'object'
// //       ? senior.name.name
// //       : senior.name || "Unknown"
// //   }
// //   collegeName={senior.collegeName || "N/A"}

// //   currentYear={senior.currentYear || "N/A"}
// //   branch={senior.branch || "N/A"}
// //   profilePicture={senior.profilePicture || '/profile.svg'}
// //   isVerified={senior.isVerified}
// // />
// <Card
//   key={senior._id}
//   id={senior._id}
//   name={
//     typeof senior.name === 'object' && senior.name !== null
//       ? senior.name.name
//       : typeof senior.name === 'string'
//       ? senior.name
//       : "Unknown"
//   }
//   collegeName={senior.collegeName || "N/A"}
//   currentYear={senior.currentYear || "N/A"}
//   branch={senior.branch || "N/A"}
//   profilePicture={senior.profilePicture || '/profile.svg'}
//   isVerified={senior.isVerified}
// />


//       ))}
//     </div>
//   );
// }

// export default SeniorList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

function SeniorList() {
  const [seniors, setSeniors] = useState([]);

  useEffect(() => {
    const fetchSeniors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/seniors', {
          withCredentials: true
        });
        setSeniors(response.data);
      } catch (error) {
        console.error('Error fetching seniors:', error);
      }
    };

    fetchSeniors();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {seniors.map((senior) => (
        // <Card
        //   key={senior._id}
        //   id={senior._id}
        //   name={senior.user?.name || senior.name || "Unknown"}
        //   collegeName={senior.collegeName || "N/A"}
        //   currentYear={senior.currentYear || "N/A"}
        //   branch={senior.branch || "N/A"}
        //   image={senior.profilePicture || '/profile.svg'}  // ✅ Use profilePicture field
        //   isVerified={senior.isVerified}                   // ✅ Pass isVerified to Card
        // />
        <Card
  key={senior._id}
  id={senior._id}
  name={
    typeof senior.name === 'object'
      ? senior.name.name
      : senior.name || "Unknown"
  }
  collegeName={senior.collegeName || "N/A"}
  currentYear={senior.currentYear || "N/A"}
  branch={senior.branch || "N/A"}
  profilePicture={senior.profilePicture || '/profile.svg'}
  isVerified={senior.isVerified}
/>

      ))}
    </div>
  );
}

export default SeniorList;
