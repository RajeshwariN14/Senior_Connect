import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import authenticate from '../middleware/authmiddleware.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//  Generate your custom JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '4h'
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
    res.status(201).json({ user, token });

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
    res.status(200).json({ user, token 
      
    });
   

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