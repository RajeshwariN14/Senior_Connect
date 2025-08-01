import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import authenticate from '../middleware/authmiddleware.js';
import Senior from '../models/senior.js';



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//  Generate your custom JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '3h'
  });
};

//  Manual Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isGoogleUser: false
    });

    const token = generateToken(user._id);
    // res.status(201).json({ user, token });
    res.status(201).json({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: 'student' // default role after signup
  }
});


  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

//  Manual Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isGoogleUser) {
      return res.status(403).json({ message: "You signed up with Google. Please login using Google." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = generateToken(user._id);
    // Check if the user is a senior
const seniorProfile = await Senior.findOne({ name: user._id });

res.status(200).json({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: seniorProfile ? 'senior' : 'student'
  }
});

    // res.status(200).json({ user, token 
      
    // });
   

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

//  Google OAuth Login / Signup (with id_token from frontend)
export const googleAuth = async (req, res) => {
  const { id_token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        // Manually signed up before — link Google ID
        user.googleId = googleId;
        user.isGoogleUser = true;
        await user.save();
      }

      const token = generateToken(user._id);
      return res.status(200).json({ user, token });
    }

    // First time Google signup
    user = await User.create({
      name,
      email,
      googleId,
      isGoogleUser: true
    });

    const token = generateToken(user._id);
    res.status(201).json({ user, token });

  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google login failed", error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    // 1. Get user (student or base info)
    const user = await User.findById(userId).select('-password -__v -googleId -isGoogleUser -createdAt -updatedAt');
;
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Check if this user is a senior
    const seniorProfile = await Senior.findOne({ name: userId });

    // 3. Return appropriate response
    if (seniorProfile) {
      return res.status(200).json({
        role: 'senior',
        user,
        seniorDetails: seniorProfile,
      });
    } else {
      return res.status(200).json({
        role: 'student',
        user,
      });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, collegeName, linkedInUrl, currentYear, branch , graduatingYear } = req.body;

    // 1. Update the base User document (only name is allowed)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true, runValidators: true }
    ).select('-password -__v -googleId -isGoogleUser -createdAt -updatedAt');
;

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    // 2. Check if user is a senior
    const seniorProfile = await Senior.findOne({ name: userId });
    let updatedSenior = null;
    if (seniorProfile) {
      const updateFields = {
        ...(collegeName && { collegeName }),
        ...(linkedInUrl && { LinkedInUrl: linkedInUrl }),
        ...(currentYear && { currentYear }),
        ...(branch && { branch }),
        ...(graduatingYear && { passingYear: graduatingYear }),
      };

      //Handle new profile picture (uploaded file)
//       if (req.files && req.files.path) {
//           updateFields.profilePicture = req.file.path; // fallback
//       if (req.file.path.startsWith('http')) {
//         updateFields.profilePicture = req.file.path; // cloudinary gives full path
//       }
//       if (req.file.secure_url) {
//       updateFields.profilePicture = req.file.secure_url;
//       }
// }
      const profilePicture = req.files?.profilePicture?.[0];
      if (profilePicture) {
        updateFields.profilePicture = profilePicture.secure_url || profilePicture.path;
      }


      updatedSenior = await Senior.findByIdAndUpdate(
        seniorProfile._id,
        updateFields,
        { new: true, runValidators: true }
      );
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
      seniorDetails: updatedSenior,
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }

};


export const getAllSeniors = async (req, res) => {
  try {
    const seniors = await Senior.find().populate('name', 'name email'); // Populate 'name' from User model
//     const formattedSeniors = seniors.map(senior => ({
//   ...senior.toObject(),
//   name: senior.name.name // flatten
// }));
 const formattedSeniors = seniors
  .filter(s => s.name) //  Filter out seniors whose user reference is broken
  .map(senior => ({
    ...senior.toObject(),
    name: senior.name.name,
    email: senior.name.email
  }));

    res.status(200).json(formattedSeniors);
  } catch (error) {
    console.error('Error fetching seniors:', error);
    res.status(500).json({ message: 'Server error while fetching seniors' });
  }
};



export const getSeniorById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get senior document and populate the user's basic info
    const senior = await Senior.findById(id).populate('name', 'name email');

    if (!senior) {
      return res.status(404).json({ message: 'Senior not found' });
    }

    res.status(200).json(senior);
  } catch (error) {
    console.error('Error fetching senior by ID:', error);
    res.status(500).json({ message: 'Server error while fetching senior by ID' });
  }
};

export const getSeniorByCollegeName= async (req,res)=>{
  try {
    const { collegeName } = req.query;

    if (!collegeName) {
      return res.status(400).json({ message: "College query is required" });
    }

    // Case-insensitive search using RegExp
    const matchingSeniors = await Senior.find({
      collegeName: { $regex: collegeName, $options: "i" },
    }).populate("name", "name profilePicture");

    res.json(matchingSeniors);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

