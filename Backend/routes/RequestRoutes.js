


// import express from "express";
// import SessionRequest from "../models/session.js";
// import Senior from "../models/senior.js";
// import User from "../models/user.js";
// import sendEmail from "../utils/sendEmail.js";
// import { authenticate } from "../middleware/authmiddleware.js";
// import upload from "../middleware/uploadmiddleware.js";

// const router = express.Router();
// router.post(
//   "/request",
//   authenticate,
//   upload.fields([
//     { name: "cetScoreCard", maxCount: 1 },
//     { name: "jeeScoreCard", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const { seniorId, jeePercentile, cetPercentile } = req.body;

//       if (!seniorId) return res.status(400).json({ msg: "seniorId required" });

//       if (jeePercentile == null && cetPercentile == null) {
//         return res
//           .status(400)
//           .json({ msg: "JEE or CET percentile is required" });
//       }

//       const studentId = req.user.id;

//       // Extract file URLs (from cloudinary)
//       let jeeScoreCardURL = null;
//       let cetScoreCardURL = null;

//       if (req.files && req.files.jeeScoreCard && req.files.jeeScoreCard[0]) {
//         jeeScoreCardURL = req.files.jeeScoreCard[0].path;
//       }

//       if (req.files && req.files.cetScoreCard && req.files.cetScoreCard[0]) {
//         cetScoreCardURL = req.files.cetScoreCard[0].path;
//       }
//       const getFilenameFromURL = (url, prefix) => {
//         const extension = url.split(".").pop().split("?")[0]; // handles .jpg?version=123
//         return `${prefix}.${extension}`;
//       };

//       const attachments = [];

//       if (jeeScoreCardURL) {
//         attachments.push({
//           filename: getFilenameFromURL(jeeScoreCardURL, "JEE_Scorecard"),
//           path: jeeScoreCardURL,
//         });
//       }

//       if (cetScoreCardURL) {
//         attachments.push({
//           filename: getFilenameFromURL(cetScoreCardURL, "CET_Scorecard"),
//           path: cetScoreCardURL,
//         });
//       }

//       const request = await SessionRequest.create({
//         student: studentId,
//         senior: seniorId,
//         jeePercentile,
//         cetPercentile,
//         jeeScoreCardURL,
//         cetScoreCardURL,
//       });

//       /* ----- email senior immediately ----- */
//       // 1. load senior → user → email
//       const seniorDoc = await Senior.findById(seniorId).populate("name"); // ‘name’ holds the User _id
//       if (!seniorDoc || !seniorDoc.name) {
//         return res
//       .status(404)
//       .json({ msg: "Senior not found or associated user does not exist" });
//       }
//       const seniorEmail = seniorDoc.name.email;
//       const studentUser = await User.findById(studentId);

//       await sendEmail(
//         seniorEmail,
//         " New Session request from SeniorConnect",
//         `
//         <h3>Hello ${seniorDoc.name.name},</h3>
//         <p>${studentUser.name} has requested you for a mentoring session.</p>
//         <p> Following are the students Exam Percentiles:</p>
//         <p>
//           ${
//             jeePercentile != null
//               ? `JEE percentile: <b>${jeePercentile}</b><br>`
//               : ""
//           }
//           ${
//             cetPercentile != null
//               ? `CET percentile: <b>${cetPercentile}</b><br>`
//               : ""
//           }
//         </p>
//         <p>Attached are the Scorecards provided by the student.</p>
//         <p>Log in → Your Sessions → <em>Pending</em> to confirm or reject.</p>
//         <P>We hope you can help him out in best way possible!</P>
//         <p>Thank you for being a mentor!</p>
//         <p>Regards,<br>Team SeniorConnect </p>
//       `,
//         attachments
//       );

//       return res.json({ msg: "Request submitted", request });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: "Server error" });
//     }
//   }
// );

// export default router;

// routes/sessionRoutes.js
import express from "express";
import SessionRequest from "../models/session.js";
import Senior from "../models/senior.js";
import User from "../models/user.js";
import sendEmail from "../utils/sendEmail.js";
import { authenticate } from "../middleware/authmiddleware.js";
import upload from "../middleware/uploadmiddleware.js";
import axios from "axios";

const router = express.Router();
router.post(
  "/request",
  authenticate,
  upload.fields([
    { name: "cetScoreCard", maxCount: 1 },
    { name: "jeeScoreCard", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { seniorId, jeePercentile, cetPercentile } = req.body;

      if (!seniorId) return res.status(400).json({ msg: "seniorId required" });

      if (jeePercentile == null && cetPercentile == null) {
        return res
          .status(400)
          .json({ msg: "JEE or CET percentile is required" });
      }

      const studentId = req.user.id;

      // Extract file URLs (from cloudinary)
      let jeeScoreCardURL = null;
      let cetScoreCardURL = null;

      if (req.files && req.files.jeeScoreCard && req.files.jeeScoreCard[0]) {
        jeeScoreCardURL = req.files.jeeScoreCard[0].path;
      }

      if (req.files && req.files.cetScoreCard && req.files.cetScoreCard[0]) {
        cetScoreCardURL = req.files.cetScoreCard[0].path;
      }
      const getFilenameFromURL = (url, prefix) => {
        const extension = url.split(".").pop().split("?")[0]; // handles .jpg?version=123
        return `${prefix}.${extension}`;
      };

      const attachments = [];

      if (jeeScoreCardURL) {
        attachments.push({
          filename: getFilenameFromURL(jeeScoreCardURL, "JEE_Scorecard"),
          path: jeeScoreCardURL,
        });
      }

      if (cetScoreCardURL) {
        attachments.push({
          filename: getFilenameFromURL(cetScoreCardURL, "CET_Scorecard"),
          path: cetScoreCardURL,
        });
      }



      const request = await SessionRequest.create({
        student: studentId,
        senior: seniorId,
        jeePercentile,
        cetPercentile,
        jeeScoreCardURL,
        cetScoreCardURL,
      });

      /* ----- email senior immediately ----- */
      // 1. load senior → user → email
      const seniorDoc = await Senior.findById(seniorId).populate("name"); // ‘name’ holds the User _id

      const seniorEmail = seniorDoc.name.email;
      const studentUser = await User.findById(studentId);

      await sendEmail(
        seniorEmail,
        " New Session request from SeniorConnect",
        `
        <h3>Hello ${seniorDoc.name.name},</h3>
        <p>${studentUser.name} has requested you for a mentoring session.</p>
        <p> Following are the students Exam Percentiles:</p>
        <p>
          ${
            jeePercentile != null
              ? `JEE percentile: <b>${jeePercentile}</b><br>`
              : ""
          }
          ${
            cetPercentile != null
              ? `CET percentile: <b>${cetPercentile}</b><br>`
              : ""
          }
        </p>
        <p>Attached are the Scorecards provided by the student.</p>
        <p>Log in → Your Sessions → <em>Pending</em> to confirm or reject.</p>
        <P>We hope you can help him out in best way possible!</P>
        <p>Thank you for being a mentor!</p>
        <p>Regards,<br>Team SeniorConnect </p>
      `,
        attachments
      );

      return res.json({ msg: "Request submitted", request });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

export default router;
