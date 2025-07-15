import authmiddleware from '../middleware/authmiddleware.js';
import Senior from '../models/senior.js';

const registerSenior = async (req, res) => {
  const { collegeName, branch, currentYear, passingYear, idCardURL, LinkedInUrl } = req.body;

  try {
    
    const userId =  req.user.id;
    if(!userId) {
      return res.status(401).json({ message: "No such user exist , Please try Sign up" });
    }
    // Check if the user is already registered as a senior
    const existingSenior = await Senior.findOne({ name: userId });
    
    if (existingSenior) {
      return res.status(400).json({ message: "You are already registered as a senior." });
    }

  
    const senior = new Senior({
      // This should be the user's ID from the auth middleware
      name: userId, // userId is the _id from the User model

      collegeName,
      branch,
      currentYear,
      passingYear,
      idCardURL,
      LinkedInUrl
    });

    await senior.save();
    res.status(201).json({ message: "Senior registration successful", senior });

  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
}

export default registerSenior;