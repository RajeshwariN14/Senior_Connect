
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


// dotenv.config(); 

// connectDB();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

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
  origin:'http://localhost:5173',
  credentials:true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/pending', PendingRoutes);



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

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/requests', requestRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




