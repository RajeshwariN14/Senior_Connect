import express from 'express';
import authMiddleware from '../middlewares/authmiddleware.js';
import SessionRequest from '../models/SessionRequest.js';
import Senior from '../models/senior.js';

const router = express.Router();

// ✅ Student pending
router.get('/student', authMiddleware, async (req, res) => {
  try {
    const pending = await SessionRequest.find({
      student: req.user._id,
      status: 'pending'
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

// ✅ Senior pending
router.get('/senior', authMiddleware, async (req, res) => {
  try {
    const seniorProfile = await Senior.findOne({ name: req.user._id });
    if (!seniorProfile) return res.status(404).json({ msg: 'Senior profile not found' });

    const pending = await SessionRequest.find({
      senior: seniorProfile._id,
      status: 'pending'
    })
    .populate('student', 'name email')
    .sort({ createdAt: -1 });

    res.json(pending);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
