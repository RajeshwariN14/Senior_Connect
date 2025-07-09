// import express from 'express';
// import { signup, login, googleCallback } from '../controller/authController.js';
// // For Google OAuth, you would use passport or similar middleware
// // import passport from 'passport';

// const router = express.Router();

// // Manual signup
// router.post('/signup', signup);

// // Manual login
// router.post('/login', login);

// // Google OAuth routes (pseudo, actual implementation needs passport setup)
// // router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// // router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);

// export default router; 

import express from 'express';
import {
  signup,
  login,
  googleAuth
} from '../controller/authController.js';
import {authenticate} from '../middleware/authmiddleware.js';



const router = express.Router();

// ✅ Route for manual signup
// Endpoint: POST /api/auth/signup
router.post('/signup', signup);

// ✅ Route for manual login
// Endpoint: POST /api/auth/login
router.post('/login', login);

// ✅ Route for Google OAuth login/signup
// Endpoint: POST /api/auth/google-auth
router.post('/google-auth', googleAuth);

export default router;