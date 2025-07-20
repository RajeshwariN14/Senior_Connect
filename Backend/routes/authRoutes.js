import express from 'express';
import {
  signup,
  login,
  googleAuth
} from '../controller/authController.js';
import registerSenior from '../controller/registrationController.js';
import {authenticate} from '../middleware/authmiddleware.js';
import { auth } from 'google-auth-library';
import { getUserProfile, updateUserProfile } from '../controller/authController.js';
import { getAllSeniors } from '../controller/authController.js';
import { getSeniorById } from '../controller/authController.js';




const router = express.Router();

//  Route for manual signup
// Endpoint: POST /api/auth/signup
router.post('/signup', signup);

//  Route for manual login
// Endpoint: POST /api/auth/login
router.post('/login', login);

//  Route for Google OAuth login/signup
// Endpoint: POST /api/auth/google-auth
router.post('/google-auth', googleAuth);


//route for senior registration
router.post('/register',authenticate, registerSenior);
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate,updateUserProfile );
router.get('/seniors', getAllSeniors);
router.get('/seniors/:id', getSeniorById);


export default router;