
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import sendEmail from './utils/sendEmail.js';
import {authenticate} from './middleware/authmiddleware.js';
import authRoutes from './routes/authRoutes.js';

import sessionRoutes from './routes/sessionRoutes.js';
import requestRoutes from './routes/RequestRoutes.js';


dotenv.config(); 

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/requests', requestRoutes);


app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  }
}));


// Test route
app.get('/test-email', async (req, res) => {


  try {
    await sendEmail("rrn14.college@gmail.com", "This is a test mail", "<h2>This is a test email sent from your Node.js app using SendGrid!</h2>");
    res.send("Test email sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error.response?.body || error.message);
    res.status(500).send("Failed to send email");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



