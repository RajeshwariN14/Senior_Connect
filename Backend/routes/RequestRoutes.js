// routes/sessionRoutes.js
import express from 'express';
import SessionRequest from '../models/session.js'; 
import Senior from '../models/senior.js';
import User from '../models/user.js';
import sendEmail from '../utils/sendEmail.js';
import {authenticate} from '../middleware/authmiddleware.js';
const router = express.Router();
router.post('/request', authenticate, async (req, res) => {
  try {
    const { seniorId, jeePercentile, cetPercentile, jeeScoreCardURL, cetScoreCardURL } = req.body;
    if (!seniorId) return res.status(400).json({msg: 'seniorId required'});

    // must supply at least one percentile
    if (jeePercentile == null && cetPercentile == null) {
      return res.status(400).json({msg: 'JEE or CET percentile is required'});
    }

    // if (jeeScoreCardURL == null && cetScoreCardURL == null) {
    //   return res.status(400).json({msg: 'JEE or CET ScoreCard is required'});
    // }
    // if (jeeScoreCardURL && !isPDF(jeeScoreCardURL)) {
    //   return res.status(400).json({ msg: 'JEE scorecard must be a .pdf file' });
    // }

    // if (cetScoreCardURL && !isPDF(cetScoreCardURL)) {
    //   return res.status(400).json({ msg: 'CET scorecard must be a .pdf file' });
    
    // }

  //   const attachments = [];
  //   if (jeeScoreCardURL) {
  //     attachments.push({
  //     filename: 'JEE_Scorecard.pdf',
  //     path: jeeScoreCardURL, // must be a public URL
  //     });
  //   }

  //   if (cetScoreCardURL) {
  //     attachments.push({
  //     filename: 'CET_Scorecard.pdf',
  //     path: cetScoreCardURL,
  //   });
  // }

    const studentId = req.user.id;            // set by your auth middleware

    const request = await SessionRequest.create({
      student:  studentId,
      senior:   seniorId,
      jeePercentile,
      cetPercentile,
      jeeScoreCardURL,
      cetScoreCardURL
    });

    /* ----- email senior immediately ----- */
    // 1. load senior → user → email
    const seniorDoc = await Senior.findById(seniorId)
      .populate('name');  // ‘name’ holds the User _id

    const seniorEmail = seniorDoc.name.email;
    const studentUser = await User.findById(studentId);

    await sendEmail(
      seniorEmail,
      ' New Session request from SeniorConnect',
      `
        <h3>Hello ${seniorDoc.name.name},</h3>
        <p>${studentUser.name} has requested a mentoring session.</p>
        <p> Following are his/her  Exam Percentiles:</p>
        <p>
          ${jeePercentile != null ? `JEE percentile: <b>${jeePercentile}</b><br>` : ''}
          ${cetPercentile != null ? `CET percentile: <b>${cetPercentile}</b><br>` : ''}
        </p>
        <p>Attached are the provided Scorecards by the student.</p>
        <p>Log in → Your Sessions → <em>Pending</em> to confirm or reject.</p>
        <P>We hope you can help him out in best way possible!</P>
        <p>Thank you for being a mentor!</p>
        <p>Regards,<br>Team SeniorConnect </p>
      `
    );

    return res.json({msg: 'Request submitted', request});
  } catch(err) {
    console.error(err);
    res.status(500).json({msg: 'Server error'});
  }
});

export default router;