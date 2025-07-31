// import express from 'express';
// import authMiddleware from '../middleware/authmiddleware.js';
// import {authenticate} from '../middleware/authmiddleware.js';
// import SessionRequest from '../models/session.js';
// import Senior from '../models/senior.js';

// const router = express.Router();

// //  Student pending
// router.get('/student', authenticate, async (req, res) => {
//   try {
//     const now=new Date();
//     const pending = await SessionRequest.find({
//       student: req.user.id,
//       $or:[
//         { status: 'pending' },
//         { status: 'confirmed', scheduledAt: { $gte: now } } 
//       ]
//     })
//     .populate({
//       path: 'senior',
//       populate: { path: 'name', select: 'name email' }
//     })
//     .sort({ createdAt: -1 });

//     res.json(pending);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// //  Senior pending
// router.get('/senior', authenticate, async (req, res) => {
//   try {
//     const now = new Date();
//     const seniorProfile = await Senior.findOne({ name: req.user.id });
//     if (!seniorProfile) return res.status(404).json({ msg: 'Senior profile not found' });

//     const pending = await SessionRequest.find({
//       senior: seniorProfile.id,
//       $or: [
//         { status: 'pending' },
//         { status: 'confirmed', scheduledAt: { $gte: new Date() } }
//       ]
//     })
//     .populate('student', 'name email')
//     .sort({ createdAt: -1 });

//     res.json(pending);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// export default router;


import express from 'express';
import authMiddleware from '../middleware/authmiddleware.js';
import {authenticate} from '../middleware/authmiddleware.js';
import SessionRequest from '../models/session.js';
import Senior from '../models/senior.js';

const router = express.Router();

//  Student pending
router.get('/student', authenticate, async (req, res) => {
  try {
    const now=new Date();
    const pending = await SessionRequest.find({
      student: req.user.id,
      $or:[
        { status: 'pending' },
        { status: 'confirmed', scheduledAt: { $gte: now } } 
      ]
    })
    .populate({
      path: 'senior',
      populate: { path: 'name', select: 'name email' }
    })
    .sort({ createdAt: -1 });

    res.json(pending);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

//  Senior pending
// router.get('/senior', authenticate, async (req, res) => {
//   try {
//     const seniorProfile = await Senior.findOne({ name: req.user.id });
//     if (!seniorProfile) return res.status(404).json({ msg: 'Senior profile not found' });

//     const pending = await SessionRequest.find({
//       senior: seniorProfile.id,
//       status: 'pending'
//     })
//     .populate('student', 'name email')
//     .sort({ createdAt: -1 });

//     res.json(pending);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });
// Route: GET /api/requests/senior
// router.get('/senior', authenticate, async (req, res) => {
//   try {
//     // Find logged-in senior's profile
//     const seniorProfile = await Senior.findOne({ name: req.user._id }); // use _id

//     if (!seniorProfile)
//       return res.status(404).json({ msg: 'Senior profile not found' });

//     // Find all session requests addressed to this senior
//     const pending = await SessionRequest.find({
//       senior: seniorProfile._id,  // get requests for this senior
//       status: 'pending',
//     })
//       .populate('student', 'name email profilePicture cetPercentile jeePercentile') // Populate student details
//       .sort({ createdAt: -1 });

//     res.json(pending);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });
router.get('/senior', authenticate, async (req, res) => {
  try {
    const now = new Date();
    const seniorProfile = await Senior.findOne({ name: req.user.id });

    if (!seniorProfile) {
      return res.status(404).json({ msg: 'Senior profile not found' });
    }

    const pending = await SessionRequest.find({
      senior: seniorProfile.id,
      $or: [
        { status: 'pending' },
        { status: 'confirmed', scheduledAt: { $gte: new Date() } }
      ]
    })
      .populate('student', 'name email profilePicture cetPercentile jeePercentile')
      .sort({ createdAt: -1 });

    res.json(pending);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
