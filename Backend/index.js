

// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import session from 'express-session';
// import dotenv from 'dotenv';
// import connectDB from './config/database.js';
// import sendEmail from './utils/sendEmail.js';
// import {authenticate} from './middleware/authmiddleware.js';
// import authRoutes from './routes/authRoutes.js';
// import PendingRoutes from './routes/PendingRoutes.js';
// import sessionRoutes from './routes/sessionRoutes.js';
// import requestRoutes from './routes/RequestRoutes.js';
// import cookieParser from "cookie-parser";

 
// dotenv.config(); 

// connectDB();

// const app = express();
// const PORT = process.env.PORT || 3000;


// app.use(cors({
//   origin:'http://localhost:5173',
//   credentials:true
// }));

// app.use(express.json());
// app.use(bodyParser.json());
// app.use(cookieParser());

// app.use('/api/auth', authRoutes);
// app.use('/api/sessions', sessionRoutes);
// app.use('/api/requests', requestRoutes);
// app.use('/api/pending', PendingRoutes);



// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000,
//   }
// }));

// app.use('/api/auth', authRoutes);
// app.use('/api/sessions', sessionRoutes);
// app.use('/api/requests', requestRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import sendEmail from './utils/sendEmail.js';
import {authenticate} from './middleware/authmiddleware.js';
import authRoutes from './routes/authRoutes.js';
import PendingRoutes from './routes/PendingRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import requestRoutes from './routes/RequestRoutes.js';
import cookieParser from "cookie-parser";
 
dotenv.config(); 
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-domain.vercel.app'],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

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

// Health check routes - MUST be before other routes
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Senior Connect Backend API is running successfully',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/pending', PendingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});




