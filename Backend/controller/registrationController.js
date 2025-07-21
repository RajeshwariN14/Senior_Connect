// import authmiddleware from '../middleware/authmiddleware.js';
// import Senior from '../models/senior.js';

// const registerSenior = async (req, res) => {
//   const { collegeName, branch, currentYear, passingYear, idCardURL, LinkedInUrl,ProfilePicture } = req.body;

//   try {
    
//     const userId =  req.user.id;
//     if(!userId) {
//       return res.status(401).json({ message: "No such user exist , Please try Sign up" });
//     }
//     // Check if the user is already registered as a senior
//     const existingSenior = await Senior.findOne({ name: userId });
    
//     if (existingSenior) {
//       return res.status(400).json({ message: "You are already registered as a senior." });
//     }

  
//     const senior = new Senior({
//       // This should be the user's ID from the auth middleware
//       name: userId, // userId is the _id from the User model

//       collegeName,
//       branch,
//       currentYear: Number(currentYear), 
//       passingYear: Number(passingYear),
      
      
//       idCardURL,
//       LinkedInUrl,
//       ProfilePicture
//     });

//     await senior.save();
//     res.status(201).json({ message: "Senior registration successful", senior });

//   } catch (err) {
//     res.status(500).json({ message: "Registration failed", error: err.message });
//   }
// }

// export default registerSenior;


import authmiddleware from '../middleware/authmiddleware.js';
import Senior from '../models/senior.js';
import { cloudinary } from '../utils/cloudinary.js';




// registrationController.js
const registerSenior = async (req, res) => {
  const { collegeName, branch, currentYear, passingYear, LinkedInUrl } = req.body;

  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "No such user exists. Please sign up." });
    }

    const existingSenior = await Senior.findOne({ name: userId });
    if (existingSenior) {
      return res.status(400).json({ message: "You are already registered as a senior." });
    }

    if (!req.files || !req.files.idCard || !req.files.profilePicture) {
      return res.status(400).json({ message: "ID Card and Profile Picture are required." });
    }

    // These are now Cloudinary URLs
    const idCardURL = req.files.idCard[0].path;
    const profilePictureURL = req.files.profilePicture[0].path;

    const senior = new Senior({
      name: userId,
      collegeName,
      branch,
      currentYear: Number(currentYear),
      passingYear: Number(passingYear),
      idCardURL,
      LinkedInUrl,
      profilePicture: profilePictureURL,
    });

    await senior.save();
    res.status(201).json({ message: "Senior registration successful", senior });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};
 
export default registerSenior;
